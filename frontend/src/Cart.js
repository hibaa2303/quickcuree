import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartuu from './image/cart.jpeg';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

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
            <p className="text-secondary">
              We have all the medicines and health care
              <p>products that you need</p>
            </p>
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
            <p>You have {cartItems.length} item(s) in your cart.</p>
            <ul className="cart-summary-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-summary-item">
                  {item.name} - {item.price} x {item.quantity || 1}
                </li>
              ))}
            </ul>
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