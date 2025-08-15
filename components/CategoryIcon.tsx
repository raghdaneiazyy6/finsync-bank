import React from "react";
import Image from "next/image";

interface CategoryIconProps {
  iconPath: string;
  displayName: string;
  bgClass: string;
}

const CategoryIcon = ({
  iconPath,
  displayName,
  bgClass,
}: CategoryIconProps) => {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full ${bgClass}`}
    >
      <Image
        src={iconPath}
        alt={displayName}
        width={24}
        height={24}
        className="object-contain"
      />
    </div>
  );
};

export default CategoryIcon;
