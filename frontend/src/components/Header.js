import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [showResults, setShowResults] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleSimulate = async () => {
    const workflowId = new URLSearchParams(location.search).get('id');
    if (!workflowId) {
      alert('Please open a workflow to simulate');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/workflows/${workflowId}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setSimulationResults(data);
      } else {
        throw new Error(data.message || 'Failed to simulate workflow');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
      setShowResults(true);
    }
  };

  return (
    <header>
      <h1>AI Workflow Automation Tool</h1>
      <nav>
        <ul>
          <li className="simulate-container">
            {isAuthenticated && location.pathname === '/builder' && (
              <button 
                onClick={handleSimulate}
                className="simulate-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Simulating...' : 'Simulate Workflow'}
              </button>
            )}
          </li>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/workflows">Workflows</Link></li>
              <li><Link to="/builder">Workflow Builder</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>

      {showResults && (
        <div className="simulation-modal">
          <div className="simulation-content">
            <h2>Simulation Results</h2>
            <div className="results-container">
              {simulationResults?.results?.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.description}</h3>
                  {result.error ? (
                    <p className="error">{result.error}</p>
                  ) : (
                    <pre>{JSON.stringify(result.result, null, 2)}</pre>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setShowResults(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
