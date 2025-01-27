import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const Logout = ({ history, setIsAuthenticated }) => {
  useEffect(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    history.push('/login');
  }, [history, setIsAuthenticated]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default withRouter(Logout);
