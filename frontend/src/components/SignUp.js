import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';

require('@solana/wallet-adapter-react-ui/styles.css');

const SignUpWithProvider = ({ history, setIsAuthenticated }) => {
  const { publicKey, signMessage } = useWallet();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!publicKey || !signMessage) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create a message to sign
      const message = new TextEncoder().encode(
        `Sign up for Workflow Automation\nWallet: ${publicKey.toString()}\nTimestamp: ${Date.now()}`
      );

      // Request signature from user
      const signature = await signMessage(message);

      // Send the signature and public key to backend
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        walletAddress: publicKey.toString(),
        signature: Buffer.from(signature).toString('base64'),
        message: Buffer.from(message).toString('base64')
      });

      // Store the token
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      history.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up with Solana</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="wallet-buttons">
        <WalletMultiButton />
        {publicKey && (
          <button 
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            style={{ marginTop: '20px' }}
          >
            {loading ? 'Signing up...' : 'Complete Sign Up'}
          </button>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        {publicKey && (
          <p>Connected wallet: {publicKey.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default withRouter(SignUpWithProvider);
