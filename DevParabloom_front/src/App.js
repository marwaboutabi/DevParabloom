import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth} from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import SearchPage from './pages/SearchPage';

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminCustomers from './admin/AdminCustomers';
import CookieBanner from './components/common/CookieBanner';


// Composant de protection
// Composant de protection corrigé
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  const token = localStorage.getItem('auth_token');
  if (!token) return <Navigate to="/" replace />;

  const storedUser = JSON.parse(localStorage.getItem('para_user') || 'null');
  const isAdmin = user?.role === 'admin' || storedUser?.role === 'admin';

  if (!isAdmin && !user) return null; // ⏳ attendre que user soit chargé
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
               <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }>
              <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="customers" element={<AdminCustomers />} />
              </Route>
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/search" element={<SearchPage />} />
              {/* Redirection si l'URL n'existe pas */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <CookieBanner />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;