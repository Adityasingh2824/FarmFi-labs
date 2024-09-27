// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const wallets = [
    new PetraWallet(),
    //new FewchaWalletAdapter(), // Include other wallet adapters as needed
  ];

// Lazy load your pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tokenization = lazy(() => import('./pages/Tokenization'));
const OracleIntegration = lazy(() => import('./pages/OracleIntegration'));
const Farmers = lazy(() => import('./pages/Farmers'));
const Merchants = lazy(() => import('./pages/Merchants'));
const GrainHolders = lazy(() => import('./pages/GrainHolders'));
const Enterprise = lazy(() => import('./pages/Enterprise'));
const FinancialInstitutions = lazy(() => import('./pages/FinancialInstitutions'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Settings = lazy(() => import('./pages/Settings'));
const Orders = lazy(() => import('./pages/Orders'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const FarmerSubmissionForm = lazy(() => import('./pages/FarmerSubmissionForm'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const AgrotechNews = lazy(() => import('./pages/AgrotechNews')); // Import the Agrotech News page

// Not Found Component
const NotFound: React.FC = () => <h1>404 - Page Not Found</h1>;

const App: React.FC = () => {
    return (
        <AptosWalletAdapterProvider plugins={wallets} autoConnect>
            <Router>
                <div className="app">
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <div className="content">
                            <Suspense fallback={<div>Loading...</div>}>
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

                                    {/* Contact Us Page */}
                                    <Route path="/contact-us" element={<ContactUs />} />

                                    {/* Agrotech News Page */}
                                    <Route path="/news" element={<AgrotechNews />} /> {/* Add this line */}

                                    {/* Authentication */}
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />

                                    {/* Additional Pages */}
                                    <Route path="/solutions" element={<Solutions />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/orders" element={<Orders />} />
                                    <Route path="/settings" element={<Settings />} />

                                    {/* New Pages */}
                                    <Route path="/how-it-works" element={<HowItWorks />} />
                                    <Route path="/farmer-submission" element={<FarmerSubmissionForm />} />
                                    <Route path="/marketplace" element={<Marketplace />} />

                                    {/* Fallback Route for 404 - Page Not Found */}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AptosWalletAdapterProvider>
        
    );
};

export default App;
