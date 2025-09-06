import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h3>Your cart is empty</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Your Cart</h2>
      <div className="row">
        {cartItems.map((item) => (
          <div className="col-md-4 mb-3" key={item._id}>
            <div className="card">
              <img
                src={item.imageUrl || '/aspirin.jpg'}
                className="card-img-top"
                alt={item.name}
                style={{ height: 150, objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5>{item.name}</h5>
                <p>₹{item.price}</p>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="text-center mt-4">
        <h4>Total: ₹{totalPrice}</h4>
      </div>
    </div>
  );
}
