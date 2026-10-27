import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartuu from './image/cart.jpeg';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './css/Cart.css';
import axios from 'axios';
import { API_BASE_URL } from './api';
import { readCart, writeCart } from './cartStorage';


function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [catalogError, setCatalogError] = useState('');

  useEffect(() => {
    const updateCart = () => setCartItems(readCart());
    updateCart();
    axios.get(`${API_BASE_URL}/medicines`)
      .then((response) => {
        const medicines = Array.isArray(response.data.data) ? response.data.data : [];
        const byId = new Map(medicines.map((medicine) => [String(medicine._id), medicine]));
        const refreshed = readCart().map((item) => {
          if (item.type === 'labTest') return item;
          const current = byId.get(String(item._id));
          if (!current || !Number.parseFloat(String(current.price || '').replace(/[^\d.]/g, ''))) {
            return { ...item, unavailable: true };
          }
          return { ...item, name: current.name, price: current.price, img: current.img, unavailable: false };
        });
        writeCart(refreshed);
        setCartItems(refreshed);
      })
      .catch((error) => {
        setCatalogError('Medicine prices could not be refreshed. Cart totals may use the last saved listing prices.');
        console.error('Unable to refresh medicine prices:', error.response?.status || error.message);
      });
    window.addEventListener('cartUpdated', updateCart);
    window.addEventListener('storage', updateCart);
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  const itemCount = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  const itemTotal = cartItems.reduce((sum, item) => {
    if (item.unavailable) return sum;
    const price = Number.parseFloat(String(item.price ?? '0').replace(/[^\d.]/g, '')) || 0;
    return sum + price * (Number(item.quantity) || 1);
  }, 0);

  // Navigate to Homepage
  const goToHomepage = () => {
    navigate('/Homepage');
  };

  // Navigate to CartDetails
  const goToCartDetails = () => {
    navigate('/CartDetails');
  };

  return (
    <div className="cart-page">
      <div className="cart container text-center">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <>
            <img className="cart-image" src={cartuu} alt="Empty Cart" />
            <h4 className="fw-bold">Your cart is empty</h4>
            <div className="text-secondary mb-3">
              We have all the medicines and health care
              <div>products that you need</div>
            </div>
            <button
              className="btn text-danger border border-danger"
              onClick={goToHomepage}
            >
              <AddShoppingCartIcon /> Shop Now
            </button>
            <div className="pb-5"></div>
          </>
        ) : (
          // Cart Summary State
          <>
            <h4 className="fw-bold">Your Cart</h4>
            {catalogError && <p className="text-danger" role="alert">{catalogError}</p>}
            <p>You have {itemCount} item(s) in your cart.</p>
            <ul className="cart-summary-list">
              {cartItems.map((item, index) => (
                <li key={item._id || item.name || index} className="cart-summary-item">
                  <span>{item.name} × {item.quantity || 1}{item.unavailable ? ' — unavailable' : ''}</span>
                  <span>{item.unavailable ? 'Price unavailable' : item.price}</span>
                </li>
              ))}
            </ul>
            <p className="cart-subtotal">Items total: ₹{itemTotal.toFixed(2)}</p>
            <button
              className="btn btn-primary"
              onClick={goToCartDetails}
            >
              Proceed to Cart Details
            </button>
            <button
              className="btn text-danger border border-danger ms-3"
              onClick={goToHomepage}
            >
              <AddShoppingCartIcon /> Continue Shopping
            </button>
            <div className="pb-5"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
