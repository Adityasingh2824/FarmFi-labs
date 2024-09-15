import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Tokenization from './pages/Tokenization';
import OracleIntegration from './pages/OracleIntegration';
import Farmers from './pages/Farmers';
import Merchants from './pages/Merchants';
import GrainHolders from './pages/GrainHolders';
import Enterprise from './pages/Enterprise';
import FinancialInstitutions from './pages/FinancialInstitutions';
import Login from './pages/Login';
import Register from './pages/Register';
import Solutions from './pages/Solutions';
import Products from './pages/Products';
import About from './pages/About';
import Settings from './pages/Settings'; // Import Settings page
import Orders from './pages/Orders'; // Import Orders page if available
import './App.css';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="app">
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <div className="content">
                            <Routes>
                                {/* Core Pages */}
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/dashboard" element={<Dashboard />} />

                                {/* Tokenization and Oracle Integration */}
                                <Route path="/tokenization" element={<Tokenization />} />
                                <Route path="/oracle-integration" element={<OracleIntegration />} />

                                {/* User Profiles and Entities */}
                                <Route path="/farmers" element={<Farmers />} />
                                <Route path="/merchants" element={<Merchants />} />
                                <Route path="/grain-holders" element={<GrainHolders />} />
                                <Route path="/enterprise" element={<Enterprise />} />
                                <Route path="/financial-institutions" element={<FinancialInstitutions />} />

                                {/* Authentication */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Additional Pages */}
                                <Route path="/solutions" element={<Solutions />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/orders" element={<Orders />} /> {/* Assuming Orders page exists */}
                                <Route path="/settings" element={<Settings />} />

                                {/* Fallback Route for 404 - Page Not Found */}
                                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                            </Routes>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
