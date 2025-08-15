import React from "react";

interface CategoryProgressBarProps {
  progressPercentage: number;
  progressBgClass: string;
  progressIndicatorClass: string;
}

const CategoryProgressBar = ({
  progressPercentage,
  progressBgClass,
  progressIndicatorClass,
}: CategoryProgressBarProps) => {
  return (
    <div
      className={`w-full h-2 rounded-full ${progressBgClass} overflow-hidden`}
    >
      <div
        className={`h-full transition-all duration-300 ease-out ${progressIndicatorClass}`}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default CategoryProgressBar;
