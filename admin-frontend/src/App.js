import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import RestaurantManagement from './pages/RestaurantManagement/RestaurantManagement';
import DeliveryPartnerManagement from './pages/DeliveryPartnerManagement/DeliveryPartnerManagement';
import OrderManagement from './pages/OrderManagement/OrderManagement';
import FeedbackManagement from './pages/FeedbackManagement/FeedbackManagement';
import NotificationManagement from './pages/NotificationManagement/NotificationManagement';
import FinancialReports from './pages/FinancialReports/FinancialReports';
import Login from './pages/Login/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="restaurants" element={<RestaurantManagement />} />
            <Route path="delivery-partners" element={<DeliveryPartnerManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="notifications" element={<NotificationManagement />} />
            <Route path="reports" element={<FinancialReports />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AuthProvider>
  );
}

export default App;