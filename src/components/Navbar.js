import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '15px', background: '#2e7d32', color: 'white' }}>
      <Link to="/" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/dashboard" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/about" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>About</Link>
    </nav>
  );
}

export default Navbar;