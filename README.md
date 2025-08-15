# 💸 FinSync Bank – Seamless Online Banking & Finance Dashboard

**FinSync Bank** is a modern, secure platform to manage your finances effortlessly. Connect multiple bank accounts, track real-time transactions, and transfer money safely—all through a sleek, user-friendly interface.

> "Smart Finance for a Smarter You"

## ✨ Key Highlights

- 🏦 **Multi-bank Integration** - Connect multiple accounts with Plaid sandbox
- 📊 **Real-time Analytics** - Live transaction updates and smart categorization
- 💸 **Secure Transfers** - Safe money transfers powered by Dwolla
- 📈 **Interactive Dashboard** - Dynamic charts and financial insights
- ⚡ **Modern Tech Stack** - Built with Next.js 14, TypeScript, Tailwind CSS, and Appwrite
- 🔐 **Enterprise Security** - Robust authentication and error monitoring with Sentry

## 🚀 Installation Guide

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/raghdaneiazyy6/finsync-bank.git
cd finsync-bank
```

---

### Step 2: Install Dependencies

```bash
# Install with legacy peer deps flag for compatibility
npm install --legacy-peer-deps
```

---

### Step 3: Environment Setup

#### For Local Development:

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Update the `.env` file with your actual credentials:

```env
#NEXT
NEXT_PUBLIC_SITE_URL=http://localhost:3000

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_appwrite_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=your_user_collection_id
APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id
APPWRITE_TRANSACTION_COLLECTION_ID=your_transaction_collection_id
NEXT_APPWRITE_KEY=your_appwrite_api_key

#PLAID
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth, transactions, identity
PLAID_COUNTRY_CODES=US, CA

#DWOLLA
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

---

### Step 4: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser to see the application running.

### 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

### 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Appwrite (Database & Auth)
- **Banking APIs**: Plaid (Account linking), Dwolla (Transfers)
- **Charts**: Chart.js, React Chart.js 2
- **Form Handling**: React Hook Form, Zod validation
- **Monitoring**: Sentry
- **Deployment**: Vercel

---

### 🎯 Key Features

- **🔐 Secure Authentication**
  - Multi-factor authentication
  - Session management
  - Password encryption
- **🏦 Account Management**
  - Link multiple bank accounts
  - Real-time balance updates
  - Account categorization
- **💳 Transaction Tracking**
  - Automatic transaction categorization
  - Search and filter capabilities
  - Transaction history with pagination
- **💸 Money Transfers**
  - Bank-to-bank transfers
  - Transfer scheduling
  - Transaction status tracking
- **📊 Financial Analytics**
  - Spending categorization
  - Budget tracking
  - Interactive charts and graphs

---

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

### 👨‍💻 About Me

**🐰 Raghda Tarek Neiazy** - Full Stack Developer

Passionate about creating innovative financial technology solutions that make banking accessible and user-friendly. Specialized in modern web technologies and secure payment integrations.

- **🌐 Portfolio**: [Portfolio](https://raghdatarek.vercel.app/)
- **📧 Contact**: [raghda.neiazy@gmail.com](mailto:raghda.neiazy@gmail.com)
- **💼 LinkedIn**: [Connect with me](https://www.linkedin.com/in/raghda-tarek-neiazy)
- **🐙 GitHub**: [Follow my projects](https://github.com/raghdaneiazyy6)

---

<p align="center">Built with ❤️ and 🥕 by a 🐇 Coder!</p>
