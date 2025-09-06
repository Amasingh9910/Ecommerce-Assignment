
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Items from './pages/Items';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(u);
  }, []);

  
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <>
     
      <nav className="navbar navbar-expand bg-white px-4">
        <Link className="navbar-brand" to="/">Aushadi</Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-primary me-2" to="/cart">Cart</Link>

         
          {!user ? (
            <>
              <Link className="btn btn-outline-success me-2" to="/login">Login</Link>
              <Link className="btn btn-success" to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <span className="me-2">Hi, {user.name}</span>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />
      </Routes>
    </>
  );
}
