import Link from "next/link";
import React, { use } from "react";
import Image from "next/image";
import BankCard from "./BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";

const RightSidebar = ({
  user,
  transactions = [],
  banks,
}: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  // Sorting: first by total amount spent (descending), then by transaction count
  const topCategories = categories
    .filter((category) => category.totalCount > 0) // Only show categories with spending
    .sort((a, b) => {
      // Primary sort: by total amount spent (descending)
      if (b.totalCount !== a.totalCount) {
        return b.totalCount - a.totalCount;
      }
      // Secondary sort: by transaction count (descending)
      return b.count - a.count;
    })
    .slice(0, 5);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user?.firstName[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{`${user.firstName} ${user.lastName}`}</h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between ">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className=" relative z-10 ">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="header-2">Top Categories</h2>
            <span className="text-12 text-gray-500">
              {categories.length} total
            </span>
          </div>
          <div className="space-y-5">
            {topCategories.length > 0 ? (
              topCategories.map((category, index) => (
                <Category
                  key={`${category.name}-${index}`}
                  category={category}
                />
              ))
            ) : (
              <div className="flex items-center justify-center p-4 text-gray-500">
                <p className="text-14">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
