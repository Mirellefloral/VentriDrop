# 🚀 VentriDrop — by VENTRIX

Fast delivery marketplace PWA for Buea, Douala & Yaoundé, Cameroon.

## 🎯 Demo Credentials (do not share — works silently in background)
| Role   | Email             | Password  |
|--------|-------------------|-----------|
| Buyer  | buyer@demo.com    | demo123   |
| Seller | seller@demo.com   | demo123   |
| Rider  | rider@demo.com    | demo123   |

## 🚀 Running Locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## 🏗️ Build for Production
```bash
npm run build
npm run preview
```

## 🔥 Firebase Setup (for live backend)
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password), Firestore, Storage
3. Replace credentials in `src/firebase/config.js`

## ✨ Features
- 🛒 **Buyers**: Browse marketplace by region/area, multi-step ordering with MoMo payment, real-time order tracking, delivery ratings
- 🏪 **Sellers**: Product management with emoji/photo icons, order confirmation, rider assignment, live tracking, analytics
- 🛵 **Riders**: Accept/decline delivery requests, step-by-step delivery guide, proof of delivery upload, earnings dashboard
- 💬 **Messaging**: Real-time chat with auto-replies between buyers and sellers
- 🔔 **Notifications**: Expandable notifications for all roles
- ⚙️ **Settings**: Profile, security, dark mode, product management, rider blocking, payout info
- 🌙 **Dark Mode**: Full light/dark theme support
- 📱 **PWA Ready**: Works offline in demo mode

## 🌍 Regions Covered
- **Buea** (SW Region): Molyko, Great Soppo, Small Soppo, Bonduma, Mile 16, Mile 17, and more
- **Douala** (Littoral): Akwa, Bonanjo, Bepanda, New Bell, Deido, Makepe, and more  
- **Yaoundé** (Centre): Bastos, Biyem-Assi, Nlongkak, Melen, Essos, and more
