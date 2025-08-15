/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { topCategoryStyles } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

// Function to map raw category names to topCategoryStyles keys
export const getCategoryKey = (categoryName: string): string => {
  const name = categoryName.toUpperCase().trim();

  switch (name) {
    case "FOOD_AND_DRINK":
    case "FOOD AND DRINK":
      return "Food and Drink";
    case "TRANSPORTATION":
      return "Transportation";
    case "TRAVEL":
      return "Travel";
    case "TRANSFER":
      return "Transfer";
    case "GENERAL_MERCHANDISE":
    case "GENERAL MERCHANDISE":
      return "General Merchandise";
    case "INCOME":
      return "Income";
    default:
      return "default";
  }
};

// Function to get display name for categories
export const getDisplayName = (categoryName: string): string => {
  const name = categoryName.toUpperCase().trim();

  switch (name) {
    case "FOOD_AND_DRINK":
    case "FOOD AND DRINK":
      return "Food and Drink";
    case "TRANSPORTATION":
      return "Transportation";
    case "TRAVEL":
      return "Travel";
    case "TRANSFER":
      return "Transfer";
    case "GENERAL_MERCHANDISE":
    case "GENERAL MERCHANDISE":
      return "General Merchandise";
    case "INCOME":
      return "Income";
    default:
      return (
        categoryName.charAt(0).toUpperCase() +
        categoryName.slice(1).toLowerCase()
      );
  }
};

// Calculate budget based on category and spending
export const calculateBudget = (
  styleKey: string,
  totalSpent: number
): number => {
  const categoryKey = styleKey.toLowerCase();

  if (categoryKey.includes("food")) {
    return Math.max(200 + totalSpent * 0.5, totalSpent + 50);
  } else if (categoryKey.includes("transportation")) {
    return Math.max(150 + totalSpent * 0.7, totalSpent + 40);
  } else if (categoryKey.includes("transfer")) {
    return Math.max(500, totalSpent + 100);
  } else if (categoryKey.includes("travel")) {
    return Math.max(300 + totalSpent * 0.3, totalSpent + 80);
  } else if (categoryKey.includes("general")) {
    return Math.max(180 + totalSpent * 0.6, totalSpent + 60);
  } else if (categoryKey.includes("income")) {
    return Math.max(totalSpent * 1.2, 1000);
  } else {
    return Math.max(150 + totalSpent * 0.8, totalSpent + 50);
  }
};

// Get category styles
export const getCategoryStyles = (styleKey: string) => {
  return (
    topCategoryStyles[styleKey as keyof typeof topCategoryStyles] ||
    topCategoryStyles.default
  );
};
