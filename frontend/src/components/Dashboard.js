import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentExecutions, setRecentExecutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, executionsResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/workflows/stats', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('http://localhost:5001/api/workflows/recent-executions', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        setStats(statsResponse.data);
        setRecentExecutions(executionsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to fetch dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Welcome to AI Workflow Automation</h2>
      <p>This dashboard provides an overview of your workflows and quick access to important features.</p>
      
      <div>
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/workflows">View All Workflows</Link></li>
          <li><Link to="/builder">Create New Workflow</Link></li>
        </ul>
      </div>

      {stats && (
        <div>
          <h3>Workflow Statistics</h3>
          <ul>
            <li>Total Workflows: {stats.totalWorkflows}</li>
            <li>Active Workflows: {stats.activeWorkflows}</li>
            <li>Total Executions: {stats.totalExecutions}</li>
            <li>Successful Executions: {stats.successfulExecutions}</li>
          </ul>
        </div>
      )}

      <div>
        <h3>Recent Executions</h3>
        {recentExecutions.length > 0 ? (
          <ul>
            {recentExecutions.map((execution) => (
              <li key={execution.id}>
                <strong>{execution.workflowName}</strong> - {execution.status} at {new Date(execution.executedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent executions found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
