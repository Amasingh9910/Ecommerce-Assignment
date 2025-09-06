// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="home-container">
      <div className="home-overlay">
        <div className="home-content text-center">
          <h1 style={{color:'#fff', fontSize: '2.2rem', marginBottom: '12px'}}>Welcome to Hospital Pharmacy</h1>
          <p style={{color:'#f0f0f0', maxWidth: 700, margin: '0 auto 20px'}}>
            Search, view and add medicines to cart. We ensure quality and safe handling.
          </p>
          <div>
            <Link className="btn btn-light me-2" to="/items">View Medicines</Link>
            <Link className="btn btn-outline-light" to="/cart">Go to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
