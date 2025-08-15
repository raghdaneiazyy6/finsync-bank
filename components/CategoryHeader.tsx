import React from "react";
import { formatAmount } from "@/lib/utils";

interface CategoryHeaderProps {
  displayName: string;
  displayAmount: number;
  displayText: string;
  textMainClass: string;
  textCountClass: string;
}

const CategoryHeader = ({
  displayName,
  displayAmount,
  displayText,
  textMainClass,
  textCountClass,
}: CategoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className={`text-16 font-semibold ${textMainClass}`}>
        {displayName}
      </h3>
      <span className={`text-14 font-medium ${textCountClass}`}>
        {formatAmount(displayAmount)} {displayText}
      </span>
    </div>
  );
};

export default CategoryHeader;
