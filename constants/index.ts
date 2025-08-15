export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-200",
      indicator: "bg-pink-500",
    },
    icon: "/icons/food.svg",
  },
  Travel: {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-200",
      indicator: "bg-blue-500",
    },
    icon: "/icons/travel.svg",
  },
  Transfer: {
    bg: "bg-yellow-25",
    circleBg: "bg-yellow-100",
    text: {
      main: "text-yellow-900",
      count: "text-yellow-700",
    },
    progress: {
      bg: "bg-yellow-200",
      indicator: "bg-yellow-500",
    },
    icon: "/icons/transfer.svg",
  },
  Transportation: {
    bg: "bg-red-25",
    circleBg: "bg-red-100",
    text: {
      main: "text-red-900",
      count: "text-red-700",
    },
    progress: {
      bg: "bg-red-200",
      indicator: "bg-red-500",
    },
    icon: "/icons/car.svg",
  },
  "General Merchandise": {
    bg: "bg-orange-25",
    circleBg: "bg-orange-100",
    text: {
      main: "text-orange-900",
      count: "text-orange-700",
    },
    progress: {
      bg: "bg-orange-200",
      indicator: "bg-orange-500",
    },
    icon: "/icons/shopping.svg",
  },
  Income: {
    bg: "bg-green-25",
    circleBg: "bg-green-100",
    text: {
      main: "text-green-900",
      count: "text-green-700",
    },
    progress: {
      bg: "bg-green-200",
      indicator: "bg-green-500",
    },
    icon: "/icons/money.svg",
  },
  "Loan Payments": {
    bg: "bg-cyan-25",
    circleBg: "bg-cyan-100",
    text: {
      main: "text-cyan-900",
      count: "text-cyan-700",
    },
    progress: {
      bg: "bg-cyan-200",
      indicator: "bg-cyan-500",
    },
    icon: "/icons/loan.svg",
  },

  default: {
    bg: "bg-gray-25",
    circleBg: "bg-gray-100",
    text: {
      main: "text-gray-900",
      count: "text-gray-700",
    },
    progress: {
      bg: "bg-gray-200",
      indicator: "bg-gray-500",
    },
    icon: "/icons/monitor.svg",
  },
};

export const transactionCategoryStyles = {
  FOOD_AND_DRINK: {
    borderColor: "border-pink-200",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-pink-50",
  },
  TRANSPORTATION: {
    borderColor: "border-red-200",
    backgroundColor: "bg-red-500",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-red-50",
  },
  TRAVEL: {
    borderColor: "border-blue-200",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-blue-50",
  },
  LOAN_PAYMENTS: {
    borderColor: "border-cyan-200",
    backgroundColor: "bg-cyan-500",
    textColor: "text-cyan-700",
    chipBackgroundColor: "bg-cyan-50",
  },
  BANK_FEES: {
    borderColor: "border-yellow-200",
    backgroundColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    chipBackgroundColor: "bg-yellow-50",
  },
  INCOME: {
    borderColor: "border-emerald-200",
    backgroundColor: "bg-emerald-500",
    textColor: "text-emerald-700",
    chipBackgroundColor: "bg-emerald-50",
  },
  TRANSFER: {
    borderColor: "border-yellow-200",
    backgroundColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    chipBackgroundColor: "bg-yellow-50",
  },
  GENERAL_MERCHANDISE: {
    borderColor: "border-orange-200",
    backgroundColor: "bg-orange-500",
    textColor: "text-orange-700",
    chipBackgroundColor: "bg-orange-50",
  },
  Processing: {
    borderColor: "border-gray-200",
    backgroundColor: "bg-gray-400",
    textColor: "text-gray-700",
    chipBackgroundColor: "bg-gray-50",
  },
  Success: {
    borderColor: "border-green-200",
    backgroundColor: "bg-green-500",
    textColor: "text-green-700",
    chipBackgroundColor: "bg-green-50",
  },
  Failed: {
    borderColor: "border-red-200",
    backgroundColor: "bg-red-500",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-red-50",
  },
  default: {
    borderColor: "border-gray-200",
    backgroundColor: "bg-gray-500",
    textColor: "text-gray-700",
    chipBackgroundColor: "bg-gray-50",
  },
};
