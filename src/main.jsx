import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartContext'; // <-- 1. IMPORT THE PROVIDER

// --- All Your Pages ---
import HomePage from './pages/HomePage'; 
import CategoriesPage from './pages/CategoriesPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import AccessoriesPage from './pages/AccessoriesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import LatestPage from './pages/LatestPage';
import ReturnsPage from './pages/ReturnsPage';
import ShippingPage from './pages/ShippingPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/categories', element: <CategoriesPage /> },
  { path: '/men', element: <MenPage /> },
  { path: '/women', element: <WomenPage /> },
  { path: '/accessories', element: <AccessoriesPage /> },
  { path: '/latest-arrivals', element: <LatestPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/returns', element: <ReturnsPage /> },
  { path: '/shipping', element: <ShippingPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
]);

const GOOGLE_CLIENT_ID = "852153091923-qgpfpoln19eq12k0sid5fvtvukuh9fmv.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* 2. WRAP THE APP WITH THE CART PROVIDER */}
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);