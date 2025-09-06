// frontend/src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = '/' }){
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      style={{
        background:'#198754',
        color:'#fff',
        padding:'8px 12px',
        border:'none',
        borderRadius:8,
        cursor:'pointer'
      }}
    >
      ← Back to Home
    </button>
  );
}
