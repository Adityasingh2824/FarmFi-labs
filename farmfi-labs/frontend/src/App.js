import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import FarmerDashboard from './components/Dashboard/FarmerDashboard';
import MerchantDashboard from './components/Dashboard/MerchantDashboard';
import DefiDashboard from './components/Dashboard/DefiDashboard';
import Marketplace from './pages/Marketplace';
import FarmerProfile from './components/Profile/FarmerProfile';
import MerchantProfile from './components/Profile/MerchantProfile';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);

  // Simulate a loading state if needed in the future
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/marketplace" element={<Marketplace />} />

          {/* Routes for Different Dashboards */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
          <Route path="/defi-dashboard" element={<DefiDashboard />} />

          {/* Profile Routes */}
          <Route path="/farmer-profile" element={<FarmerProfile />} />
          <Route path="/merchant-profile" element={<MerchantProfile />} />

          {/* Fallback for Unknown Routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
