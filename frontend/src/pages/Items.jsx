import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState('');
  const [category, setCategory] = useState('');   // category filter
  const [maxPrice, setMaxPrice] = useState('');   // max price filter
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5000/api";

  // Map full medicine name (lowercase) to public images
  const imageMap = {
    "aspirin 75": "/aspirin.jpg",
    "paracetamol 500": "/paracetamol.jpg",
    "vitamin c 500": "/vitamin.jpg",
    "cough syrup": "/syrup.jpg",
  };

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE}/items`);
        setItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Add to cart
  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartMessage('Please login to add items to cart.');
        return;
      }

      await axios.post(
        `${API_BASE}/cart/add`,
        { itemId: item._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Save image info in localStorage for cart page
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ ...item, imageUrl: imageMap[item.name.toLowerCase()] || '/aspirin.jpg' });
      localStorage.setItem('cart', JSON.stringify(cart));

      setCartMessage('Item added to cart successfully!');
      setTimeout(() => setCartMessage(''), 3000);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setCartMessage('Error adding item to cart.');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading medicines...</p>
      </div>
    );
  }

  // Apply filters
  const filteredItems = items
    .filter(it => !category || it.category === category)
    .filter(it => !maxPrice || it.price <= maxPrice);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Available Medicines</h2>

      {/* Filters */}
      <div className="mb-3 d-flex gap-2 justify-content-center">
        <select
          className="form-select w-auto"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="pain">Pain</option>
          <option value="cardio">Cardio</option>
          <option value="supplement">Supplement</option>
          <option value="cold">Cold & Cough</option>
        </select>

        <input
          type="number"
          className="form-control w-auto"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Cart message */}
      {cartMessage && (
        <div className="alert alert-info text-center">{cartMessage}</div>
      )}

      {/* Items grid */}
      <div className="row">
        {filteredItems.length === 0 ? (
          <p className="text-center">No medicines found.</p>
        ) : (
          filteredItems.map((it) => {
            const key = it.name.toLowerCase();
            return (
              <div className="col-md-3" key={it._id}>
                <div className="card mb-3">
                  <img
                    src={imageMap[key] || '/aspirin.jpg'}
                    className="card-img-top"
                    alt={it.name}
                    style={{ height: 180, objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5>{it.name}</h5>
                    <p>{it.description}</p>
                    <p>₹{it.price}</p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => addToCart(it)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
