"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // get banks from db
    const banks = await getBanks({ userId });

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        // Get custom transactions for this bank to calculate adjusted balance
        const customTransactions = await getTransactionsByBankId({
          bankId: bank.$id,
        });

        // Calculate balance adjustments from custom transactions
        let balanceAdjustment = 0;
        if (customTransactions && customTransactions.documents) {
          customTransactions.documents.forEach((transaction: any) => {
            // If this bank sent money (debit), subtract from balance
            if (transaction.senderBankId === bank.$id) {
              balanceAdjustment -= transaction.amount;
            }
            // If this bank received money (credit), add to balance
            if (
              transaction.receiverBankId === bank.$id &&
              transaction.senderBankId !== bank.$id
            ) {
              balanceAdjustment += transaction.amount;
            }
          });
        }

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available! + balanceAdjustment,
          currentBalance: accountData.balances.current! + balanceAdjustment,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          shareableId: bank.shareableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    const bank = await getBank({ documentId: appwriteItemId });
    if (!bank) {
      return { data: null, error: "Bank not found" };
    }

    const { accessToken } = bank;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    if (!accountsResponse.data || !accountsResponse.data.accounts[0]) {
      return { data: null, error: "No account data found" };
    }

    // Get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Get Plaid transactions
    const transactionsResponse = await plaidClient.transactionsSync({
      access_token: accessToken,
      options: {
        include_personal_finance_category: true,
      },
    });

    const plaidTransactions = transactionsResponse.data.added.map(
      (transaction) => ({
        $id: transaction.transaction_id,
        id: transaction.transaction_id,
        name: transaction.name,
        amount: transaction.amount, // Keep original Plaid amount (positive for debits)
        date: transaction.date,
        paymentChannel: transaction.payment_channel,
        pending: transaction.pending,
        status: transaction.pending ? "Processing" : "Success",
        category:
          transaction.personal_finance_category?.primary ||
          (transaction?.category?.[0] ?? "Other"),
        type: transaction.transaction_type || "default",
        channel: transaction.payment_channel || "default",
        image: "",
        accountId: transaction.account_id,
        senderBankId: bank.$id,
        receiverBankId: "",
        $createdAt: new Date(transaction.date).toISOString(),
      })
    ) as Transaction[];

    // Get custom transfer transactions
    const customTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    let customTransactions: Transaction[] = [];
    let balanceAdjustment = 0;

    if (customTransactionsData && customTransactionsData.documents) {
      customTransactions = customTransactionsData.documents.map(
        (transaction: any) => {
          let transactionAmount = transaction.amount;
          let transactionType = "credit";

          // Calculate balance adjustment and set proper amount/type
          if (transaction.senderBankId === bank.$id) {
            balanceAdjustment -= transaction.amount;
            transactionAmount = transaction.amount; // Positive amount, will show as negative with type "debit"
            transactionType = "debit";
          }
          if (
            transaction.receiverBankId === bank.$id &&
            transaction.senderBankId !== bank.$id
          ) {
            balanceAdjustment += transaction.amount;
            transactionAmount = transaction.amount; // Positive amount, will show as positive with type "credit"
            transactionType = "credit";
          }

          return {
            $id: transaction.$id,
            id: transaction.$id,
            name: transaction.name,
            amount: transactionAmount, // Always positive, type determines display
            date: transaction.date,
            paymentChannel: transaction.paymentChannel,
            pending: transaction.pending,
            status: transaction.pending ? "Processing" : "Success",
            category: transaction.category,
            type: transactionType, // "debit" or "credit"
            channel: transaction.channel,
            image: transaction.image,
            accountId: transaction.accountId || bank.accountId,
            senderBankId: transaction.senderBankId,
            receiverBankId: transaction.receiverBankId,
            $createdAt: transaction.$createdAt,
          } as Transaction;
        }
      );
    }

    // Combine and sort all transactions by date (newest first)
    const allTransactions = [...plaidTransactions, ...customTransactions].sort(
      (a, b) =>
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    );

    // Format account data with adjusted balance
    const formattedAccountData = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available! + balanceAdjustment,
      currentBalance: accountData.balances.current! + balanceAdjustment,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
      shareableId: bank.shareableId,
      transactions: allTransactions,
    };

    return {
      data: formattedAccountData,
      error: null,
    };
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
    return { data: null, error: "Failed to load account details" };
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};
