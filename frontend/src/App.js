import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import WorkflowList from './components/WorkflowList';
import WorkflowBuilder from './components/WorkflowBuilder';
import WorkflowDetail from './components/WorkflowDetail';
import WorkflowEdit from './components/WorkflowEdit';
import SignUpWithProvider from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main>
          <Switch>
            <Route path="/login" render={props => <Login {...props} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" component={SignUpWithProvider} />
            <Route exact path="/" render={props => 
              isAuthenticated ? <Dashboard {...props} /> : <Redirect to="/login" />
            } />
            <Route path="/workflows" render={props => 
              isAuthenticated ? <WorkflowList {...props} /> : <Redirect to="/login" />
            } />
            <Route path="/workflows/:id" render={props => 
              isAuthenticated ? <WorkflowDetail {...props} /> : <Redirect to="/login" />
            } />
            <Route path="/workflows/:id/edit" render={props => 
              isAuthenticated ? <WorkflowEdit {...props} /> : <Redirect to="/login" />
            } />
            <Route path="/builder" render={props => 
              isAuthenticated ? <WorkflowBuilder {...props} /> : <Redirect to="/login" />
            } />
            <Redirect to="/login" />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
