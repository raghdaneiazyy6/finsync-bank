import React from "react";

interface CategoryStatsProps {
  transactionCount: number;
  progressPercentage: number;
}

const CategoryStats = ({
  transactionCount,
  progressPercentage,
}: CategoryStatsProps) => {
  return (
    <div className="flex justify-between items-center mt-2">
      <span className="text-12 text-gray-500">
        {transactionCount} transaction{transactionCount !== 1 ? "s" : ""}
      </span>
      <span className="text-12 text-gray-500">
        {progressPercentage.toFixed(0)}% of budget
      </span>
    </div>
  );
};

export default CategoryStats;
