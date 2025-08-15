"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const { database } = await createAdminClient();

    // Create the document data object explicitly
    const transactionData = {
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      type: "debit",
      date: new Date().toISOString(),
      paymentChannel: "online",
      pending: false,
      category: "Transfer",
      image: "/icons/transfer.svg",
      channel: "online",
      senderBankId: transaction.senderBankId,
      receiverBankId: transaction.receiverBankId,
      accountId: transaction.senderBankId,
      email: transaction.email,
      senderId: transaction.senderId,
      receiverId: transaction.receiverId,
    };

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      transactionData
    );

    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)]
    );

    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal("receiverBankId", bankId)]
    );

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.documents,
        ...receiverTransactions.documents,
      ],
    };

    return parseStringify(transactions);
  } catch (error) {
    console.log(error);
  }
};
