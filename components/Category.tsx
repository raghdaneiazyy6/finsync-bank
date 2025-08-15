import React from "react";
import {
  getCategoryKey,
  getDisplayName,
  calculateBudget,
  getCategoryStyles,
} from "@/lib/utils";
import CategoryIcon from "./CategoryIcon";
import CategoryHeader from "./CategoryHeader";
import CategoryProgressBar from "./CategoryProgressBar";
import CategoryStats from "./CategoryStats";

const Category = ({ category }: CategoryProps) => {
  // Get category configuration
  const styleKey = getCategoryKey(category.name);
  const displayName = getDisplayName(category.name);
  const styles = getCategoryStyles(styleKey);

  // Calculate amounts and budget
  const totalSpent = Math.abs(category.totalCount);
  const transactionCount = category.count;
  const budgetTotal = calculateBudget(styleKey, totalSpent);
  const leftAmount = Math.max(0, budgetTotal - totalSpent);
  const progressPercentage = Math.min(100, (totalSpent / budgetTotal) * 100);

  // Special handling for income categories
  const isIncomeCategory = styleKey.toLowerCase().includes("income");
  const displayAmount = isIncomeCategory ? totalSpent : leftAmount;
  const displayText = isIncomeCategory ? "earned" : "left";

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <CategoryIcon
          iconPath={styles.icon}
          displayName={displayName}
          bgClass={styles.circleBg}
        />

        <div className="flex-1">
          <CategoryHeader
            displayName={displayName}
            displayAmount={displayAmount}
            displayText={displayText}
            textMainClass={styles.text.main}
            textCountClass={styles.text.count}
          />

          <CategoryProgressBar
            progressPercentage={progressPercentage}
            progressBgClass={styles.progress.bg}
            progressIndicatorClass={styles.progress.indicator}
          />

          <CategoryStats
            transactionCount={transactionCount}
            progressPercentage={progressPercentage}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
