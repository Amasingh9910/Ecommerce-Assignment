// frontend/src/pages/Signup.jsx
import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (onLogin) onLogin(res.data.user);

      nav('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={submit} className="w-50 mx-auto bg-white p-4 rounded">
        <h3>Signup</h3>
        <input
          className="form-control my-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="btn btn-success w-100 mt-2">Signup</button>
      </form>
    </div>
  );
}
