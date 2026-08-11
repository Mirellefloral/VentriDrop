import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Auth pages
import WelcomePage from './pages/auth/WelcomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Buyer pages
import BuyerHome from './pages/buyer/BuyerHome';
import BuyerMarketplace from './pages/buyer/BuyerMarketplace';
import BuyerOrders from './pages/buyer/BuyerOrders';
import MessagesPage from './components/shared/MessagesPage';
import NotificationsPage from './components/shared/NotificationsPage';
import SettingsPage from './components/shared/SettingsPage';

// Seller pages
import SellerHome from './pages/seller/SellerHome';
import SellerProducts from './pages/seller/SellerProducts';
import SellerOrders from './pages/seller/SellerOrders';
import { SellerRiders, SellerTracking, SellerAnalytics } from './pages/seller/SellerExtra';

// Rider pages
import { RiderHome, RiderDeliveries, RiderHistory, RiderEarnings } from './pages/rider/RiderPages';

function ProtectedRoute({ children, role }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}`} replace />;
  return children;
}

function AppRoutes() {
  const { user } = useApp();
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <WelcomePage />} />
      <Route path="/login" element={user ? <Navigate to={`/${user.role}`} /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to={`/${user.role}`} /> : <SignupPage />} />

      {/* Buyer */}
      <Route path="/buyer" element={<ProtectedRoute role="buyer"><BuyerHome /></ProtectedRoute>} />
      <Route path="/buyer/marketplace" element={<ProtectedRoute role="buyer"><BuyerMarketplace /></ProtectedRoute>} />
      <Route path="/buyer/orders" element={<ProtectedRoute role="buyer"><BuyerOrders /></ProtectedRoute>} />
      <Route path="/buyer/messages" element={<ProtectedRoute role="buyer"><MessagesPage role="buyer" /></ProtectedRoute>} />
      <Route path="/buyer/notifications" element={<ProtectedRoute role="buyer"><NotificationsPage /></ProtectedRoute>} />
      <Route path="/buyer/settings" element={<ProtectedRoute role="buyer"><SettingsPage /></ProtectedRoute>} />

      {/* Seller */}
      <Route path="/seller" element={<ProtectedRoute role="seller"><SellerHome /></ProtectedRoute>} />
      <Route path="/seller/products" element={<ProtectedRoute role="seller"><SellerProducts /></ProtectedRoute>} />
      <Route path="/seller/orders" element={<ProtectedRoute role="seller"><SellerOrders /></ProtectedRoute>} />
      <Route path="/seller/riders" element={<ProtectedRoute role="seller"><SellerRiders /></ProtectedRoute>} />
      <Route path="/seller/tracking" element={<ProtectedRoute role="seller"><SellerTracking /></ProtectedRoute>} />
      <Route path="/seller/analytics" element={<ProtectedRoute role="seller"><SellerAnalytics /></ProtectedRoute>} />
      <Route path="/seller/messages" element={<ProtectedRoute role="seller"><MessagesPage role="seller" /></ProtectedRoute>} />
      <Route path="/seller/notifications" element={<ProtectedRoute role="seller"><NotificationsPage /></ProtectedRoute>} />
      <Route path="/seller/settings" element={<ProtectedRoute role="seller"><SettingsPage /></ProtectedRoute>} />

      {/* Rider */}
      <Route path="/rider" element={<ProtectedRoute role="rider"><RiderHome /></ProtectedRoute>} />
      <Route path="/rider/deliveries" element={<ProtectedRoute role="rider"><RiderDeliveries /></ProtectedRoute>} />
      <Route path="/rider/history" element={<ProtectedRoute role="rider"><RiderHistory /></ProtectedRoute>} />
      <Route path="/rider/earnings" element={<ProtectedRoute role="rider"><RiderEarnings /></ProtectedRoute>} />
      <Route path="/rider/notifications" element={<ProtectedRoute role="rider"><NotificationsPage /></ProtectedRoute>} />
      <Route path="/rider/settings" element={<ProtectedRoute role="rider"><SettingsPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
