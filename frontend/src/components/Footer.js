import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2025 Workflow Automation. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #e7e7e7'
  },
  text: {
    margin: 0,
    color: '#6c757d'
  }
};

export default Footer;
