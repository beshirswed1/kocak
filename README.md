# Kocak Kebap & Beyran - Restaurant Management System

A complete modern web application for a restaurant business, built with **Next.js**, **React**, **Tailwind CSS**, **Redux Toolkit**, and **Firebase**. The project includes a vibrant public-facing site for customers to browse the menu and place orders, and a secure administrative dashboard for managing restaurant data and incoming orders.

## 🚀 Features

### Customer Facing (Public)
- **Interactive Menu:** Browse categories, popular, and new items.
- **Dynamic Cart System:** Users can add products, set table numbers, add optional notes, and submit orders directly to the kitchen.
- **Beautiful UI:** Premium aesthetics with glassmorphism, interactive animations, smooth scrolling, and responsive design for mobile & desktop screens.
- **Real-time Sync:** Restaurant details, offers, and menu items are dynamically synced via Firebase.

### Admin Dashboard (Protected)
- **Live Order Management:** View incoming orders in real-time via Firestore listeners.
- **Order Tracking:** Track order statuses (Pending, Completed, Cancelled).
- **Product Management:** Add, edit, and remove menu items smoothly.
- **Category Management:** Control how items are grouped.
- **Landing Page Control:** Update restaurant details, hero sections, and SEO meta tags dynamically.
- **Secure Authentication:** Firebase Authentication to protect admin routes.

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **State Management:** Redux Toolkit 
- **Backend (BaaS):** Firebase (Firestore DB, Authentication, Storage)
- **Icons:** Lucide React & FontAwesome
- **Language:** TypeScript

## 📂 Project Structure
```text
src/
├── app/                  # Next.js App Router (Public routes & /admin pages)
├── components/           # Reusable UI components (Navbar, CartDrawer, etc.)
├── constants/            # Fallback/Default data configs
├── lib/                  # Firebase configurations and CRUD services
├── store/                # Redux Toolkit store and slices (cart, orders, etc.)
└── types/                # TypeScript interface definitions
```

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd KOÇAK_KEBAP_BEYRAN
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase configurations:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Deploy Firestore Rules:**
   Ensure the Firebase security rules (`firestore.rules`) allow order creation by customers and reading/updating by the admin:
   ```bash
   npx firebase deploy --only firestore:rules
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) for the public-facing site and [http://localhost:3000/admin](http://localhost:3000/admin) for the dashboard.

## 🔒 Security & Rules
- Customer actions (creating orders) are allowed publicly (`allow create: if true` in `orders` collection).
- Reading, updating, and deleting orders, as well as managing the menu and configuration, all require an authenticated admin session (`allow read, write: if request.auth != null`).