import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <header>
      <h1>AI Workflow Automation Tool</h1>
      <nav>
        <ul>
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
    </header>
  );
};

export default Header;
