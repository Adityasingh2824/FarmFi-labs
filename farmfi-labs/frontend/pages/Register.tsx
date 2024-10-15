import React, { useState, useEffect } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
import './Register.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  identityProof: File | null;
  walletAddress: string;
  agreeToTerms: boolean;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    identityProof: null,
    walletAddress: '',
    agreeToTerms: false
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { connect, account, connected } = useWallet();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleIdentityProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, identityProof: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    setIsLoading(true);
    // Submit form logic
    setIsLoading(false);
  };

  const handleWalletConnect = async () => {
    try {
      if (!connected) {
        const walletToConnect = wallets?.[0]?.name;
        if (walletToConnect) {
          await connect(walletToConnect);
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    if (account?.address) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        walletAddress: account.address,
      }));
    }
  }, [account]);

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <p className="register-subtitle">
        Join FarmFi Labs to manage and trade your agricultural assets securely.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Create a password"
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            placeholder="Confirm your password"
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">Select Your Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="merchant">Merchant</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="identityProof">Upload Identity Proof</label>
          <input
            type="file"
            id="identityProof"
            name="identityProof"
            accept="image/*,.pdf"
            onChange={handleIdentityProofUpload}
            required
          />
        </div>

        <div className="input-group wallet-connect">
          <WalletConnector />
          {formData.walletAddress && (
            <p className="wallet-address">Wallet: {formData.walletAddress}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="agreeToTerms">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            I agree to the terms and conditions
          </label>
        </div>

        <button
          type="submit"
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="register-footer">
        <p>Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
};

export default Register;
