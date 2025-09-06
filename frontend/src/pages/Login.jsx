// frontend/src/pages/Login.jsx
import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (onLogin) onLogin(res.data.user);

      // Merge guest cart if any
      const guest = JSON.parse(localStorage.getItem('guestCart') || '[]');
      if (guest.length) {
        await API.post('/api/cart/merge', { items: guest });
        localStorage.removeItem('guestCart');
      }

      nav('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={submit} className="w-50 mx-auto bg-white p-4 rounded">
        <h3>Login</h3>
        <input
          className="form-control my-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100 mt-2">Login</button>
      </form>
    </div>
  );
}
