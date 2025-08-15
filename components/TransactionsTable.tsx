import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const formatDisplayName = (name: string) => {
  if (name === "FOOD_AND_DRINK") return "Food and Drink";
  if (name === "GENERAL_MERCHANDISE") return "General Merchandise";
  if (["Processing", "Success", "Failed"].includes(name)) return name;

  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  // Handle status badges
  if (["Processing", "Success", "Failed"].includes(category)) {
    const statusStyles =
      transactionCategoryStyles[
        category as keyof typeof transactionCategoryStyles
      ] || transactionCategoryStyles.default;
    return (
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full w-fit",
          statusStyles.borderColor,
          statusStyles.chipBackgroundColor
        )}
      >
        <div
          className={cn("size-2 rounded-full", statusStyles.backgroundColor)}
        />
        <p className={cn("text-[12px] font-medium", statusStyles.textColor)}>
          {category}
        </p>
      </div>
    );
  }

  // Handle category badges
  const styleKey = category.toUpperCase().replace(/\s/g, "_");
  const styles =
    transactionCategoryStyles[
      styleKey as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1 rounded-full border w-fit",
        styles.borderColor,
        styles.chipBackgroundColor
      )}
    >
      <div className={cn("size-2 rounded-full", styles.backgroundColor)} />
      <p className={cn("text-[12px] font-medium", styles.textColor)}>
        {formatDisplayName(styleKey)}
      </p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));

          // Determine if transaction is negative (debit) or positive (credit)
          const isNegativeAmount = t.amount < 0;
          const isDebitType = t.type === "debit";

          // A transaction is considered a debit (red) if:
          // 1. The amount is negative, OR
          // 2. The type is explicitly "debit"
          const isDebit = isNegativeAmount || isDebitType;

          // Format amount - if it's already negative, don't add another minus sign
          let displayAmount;
          if (isDebit && !isNegativeAmount) {
            // Type is debit but amount is positive, so add minus sign
            displayAmount = `-${formatAmount(Math.abs(t.amount))}`;
          } else if (isNegativeAmount) {
            // Amount is already negative, format it as is
            displayAmount = `-${formatAmount(Math.abs(t.amount))}`;
          } else {
            // Positive amount, credit transaction
            displayAmount = formatAmount(t.amount);
          }

          return (
            <TableRow
              key={t.id}
              className={`${
                isDebit ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"
              } !over:bg-none !border-b-DEFAULT`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit ? "text-[#f04438]" : "text-[#039855]"
                }`}
              >
                {displayAmount}
              </TableCell>

              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} />
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>

              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {t.paymentChannel}
              </TableCell>

              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
