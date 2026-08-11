# 🚀 VentriDrop — by VENTRIX

Fast delivery marketplace PWA built for cities across Cameroon, with a buyer, seller, and rider flow for local commerce and logistics.

## 🌍 About the Project
VentriDrop is a mobile-first marketplace and delivery platform designed for Buea, Douala, and Yaoundé. It helps buyers discover products, sellers manage orders and inventory, and riders complete deliveries with a simple, guided experience.

## 🎯 Demo Credentials
Use these demo accounts to explore the app:

| Role   | Email          | Password |
|--------|----------------|----------|
| Buyer  | buyer@demo.com | demo123  |
| Seller | seller@demo.com | demo123  |
| Rider  | rider@demo.com | demo123  |

## 🚀 Run Locally
```bash
npm install
npm run dev
```
Then open: http://localhost:5173

## 🏗️ Production Build
```bash
npm run build
npm run preview
```

## 🔥 Firebase Setup
If you want to connect the app to a live backend:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication, Firestore, and Storage
3. Replace the config in `src/firebase/config.js`

## ✨ Features
- 🛒 Buyers can browse products by region and place multi-step orders
- 💳 MoMo-ready checkout flow and order tracking experience
- 🏪 Sellers can manage products, confirmations, and rider assignment
- 🛵 Riders receive delivery tasks and complete proof-of-delivery uploads
- 💬 Messaging and notifications across roles
- ⚙️ Personal settings, dark mode, and profile controls
- 📱 PWA-ready experience for mobile use and offline demo flow

## 🌍 Regions Covered
- **Buea**: Molyko, Great Soppo, Small Soppo, Bonduma, Mile 16, Mile 17, and more
- **Douala**: Akwa, Bonanjo, Bepanda, New Bell, Deido, Makepe, and more
- **Yaoundé**: Bastos, Biyem-Assi, Nlongkak, Melen, Essos, and more

## 📦 Tech Stack
- React + Vite
- JavaScript
- Firebase-ready structure
- Progressive Web App configuration
