import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  IconButton,
  Button,
  Typography,
  Box,
  Divider,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import im1 from './image/ims1.webp';
import im2 from './image/ims2.webp';
import im3 from './image/ims3.webp';
import im4 from './image/ims4.webp';
import im5 from './image/ims5.webp';

const CartDetails = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [membershipAdded, setMembershipAdded] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [packagingCharge] = useState(4); // Fixed green packaging charge

  useEffect(() => {
    // Load cart items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedItems = storedItems.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedItems);

    // Check for membership (assumes user is logged in and userId is in localStorage)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      axios
        .post('http://localhost:3000/add-membership', { userId: user.id })
        .then(response => {
          if (response.data.status === 'success') {
            setMembershipAdded('Gold'); // Assume 'Gold' membership for now
          }
        })
        .catch(error => {
          console.error('Error checking membership:', error);
        });
    }
  }, []);

  // Calculate total whenever cartItems or membership changes
  useEffect(() => {
    calculateTotal();
  }, [cartItems, membershipAdded]);

  const calculateTotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.price.replace('₹', '')) || 0;
      subtotal += price * (item.quantity || 1);
    });

    // Apply discounts
    let discountAmount = subtotal * 0.14; // 14% price discount (to match your "58% off" display logic)
    let membershipDiscount = 0;
    if (membershipAdded) {
      switch (membershipAdded) {
        case 'Silver':
          membershipDiscount = 30;
          break;
        case 'Gold':
          membershipDiscount = 50;
          break;
        case 'Platinum':
          membershipDiscount = 100;
          break;
        default:
          membershipDiscount = 0;
      }
    }

    const finalTotal = subtotal - discountAmount - membershipDiscount + packagingCharge;
    setDiscount(discountAmount + membershipDiscount);
    setTotalAmount(finalTotal > 0 ? finalTotal : 0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  const handleAddMembership = () => {
    if (selectedMembership) {
      setMembershipAdded(selectedMembership);
      setOpen(false);
      toast.success(`Added ${selectedMembership} Membership!`);
    }
  };

  const handleCloseMembershipModal = () => {
    setOpen(false);
  };

  const handleRemoveMembership = () => {
    setMembershipAdded(null);
    toast.info('Membership Removed');
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart[index];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    toast.success(`${removedItem.name} removed from cart`);
  };

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + change;
    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      toast.info(`Updated quantity for ${updatedCart[index].name} to ${newQuantity}`);
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.success('Cart cleared successfully');
  };

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      toast.error('Please log in to proceed to checkout');
      navigate('/login');
      return;
    }

    axios
      .post('http://localhost:3000/checkout', {
        userId: user.id,
        cartDetails: cartItems,
      })
      .then(response => {
        if (response.data.status === 'success') {
          toast.success(response.data.message);
          window.location.href = response.data.paymentLink; // Redirect to payment gateway
        } else {
          toast.error('Checkout failed. Please try again.');
        }
      })
      .catch(error => {
        toast.error('Error during checkout. Please try again.');
        console.error('Checkout error:', error);
      });
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(item => item.name === product.name);
    if (index !== -1) {
      updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1, price: product.price.split(' ')[0] }); // Extract price (e.g., ₹100)
    }
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart`);
  };

  // Static "Cipla Top Deals" products
  const topDeals = [
    { name: 'Maxirich', price: '₹100', originalPrice: '₹120', discount: '20% off', rating: '4.0 ★ (123)', img: im2 },
    { name: 'Omnigel', price: '₹150', originalPrice: '₹180', discount: '15% off', rating: '4.5 ★ (200)', img: im3 },
    { name: 'Nicotex', price: '₹200', originalPrice: '₹250', discount: '20% off', rating: '5.0 ★ (50)', img: im4 },
    { name: 'Endura Mass', price: '₹250', originalPrice: '₹300', discount: '10% off', rating: '3.5 ★ (80)', img: im5 },
  ];

  return (
    <div className="nam">
      <Container maxWidth="lg" sx={{ padding: 0, margin: 0, mt: 25 }}>
        <Box sx={{ display: 'flex', marginTop: 4, width: '100%', ml: 10 }}>
          {/* Left Side: Cart Items and Top Deals */}
          <Box sx={{ flex: 2.5, paddingRight: 2, borderRight: '1px solid #ddd' }}>
            <Box mb={4}>
              <Typography variant="h6">Cart</Typography>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
                    <img src={item.img || im1} alt={item.name} style={{ width: 100, height: 100, marginRight: 16 }} />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
                      <Typography variant="body2">{item.price}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 1 }}>
                      <IconButton onClick={() => handleQuantityChange(index, -1)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography>{item.quantity || 1}</Typography>
                      <IconButton onClick={() => handleQuantityChange(index, 1)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleRemoveItem(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No items in the cart</Typography>
              )}
              {cartItems.length > 0 && (
                <Box mt={2}>
                  <Button variant="contained" color="error" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                </Box>
              )}
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Cipla Top Deals</Typography>
              <Box
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  height: '200px',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': { height: '8px' },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
                  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                }}
              >
                {topDeals.map((deal, index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: 150,
                      height: '100%',
                      marginRight: 2,
                      padding: 2,
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  >
                    <img src={deal.img} alt={deal.name} style={{ width: '80px', height: '80px', marginBottom: 8 }} />
                    <Typography variant="body2" fontWeight="bold">{deal.name}</Typography>
                    <Typography variant="caption" color="green">{deal.rating}</Typography>
                    <Typography variant="body1">
                      {deal.price}{' '}
                      <span style={{ textDecoration: 'line-through', color: '#888' }}>{deal.originalPrice}</span>{' '}
                      <span style={{ color: 'green' }}>{deal.discount}</span>
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ marginTop: 1 }}
                      onClick={() => handleAddToCart(deal)}
                    >
                      Add to cart
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right Side: Care Plan and Bill Summary */}
          <Box sx={{ flex: 5.5, paddingLeft: 6, mr: 4, mt: 1 }}>
            <Box mb={2}>
              <Typography variant="h6">Care Plan</Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                You can save extra ₹{membershipAdded ? (membershipAdded === 'Silver' ? 30 : membershipAdded === 'Gold' ? 50 : 100) : 0} on this order
              </Typography>
              {membershipAdded ? (
                <Box>
                  <Typography variant="body2" color="green">Membership Added: {membershipAdded}</Typography>
                  <Button variant="contained" color="warning" sx={{ marginTop: 2 }} onClick={handleRemoveMembership}>
                    Remove Membership
                  </Button>
                </Box>
              ) : (
                <Button variant="contained" color="error" sx={{ marginTop: 2 }} onClick={handleOpen}>
                  Add Membership
                </Button>
              )}
            </Box>
            <Divider sx={{ marginBottom: 4, borderColor: 'grey.500', borderWidth: '2px' }} />
            <Box mb={2}>
              <Typography variant="h6" mt={-2}>Bill Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Item Total (MRP)</Typography>
                <Typography sx={{ marginLeft: 'auto' }}>
                  ₹{(cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('₹', '')) * (item.quantity || 1)), 0)).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Green Packaging Charge</Typography>
                <Typography sx={{ marginLeft: 'auto' }}>₹{packagingCharge.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Price Discount</Typography>
                <Typography sx={{ marginLeft: 'auto' }}>-₹{discount.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ marginY: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Typography fontWeight="bold">Total Amount</Typography>
                <Typography fontWeight="bold" sx={{ marginLeft: 'auto' }}>₹{totalAmount.toFixed(2)}</Typography>
              </Box>
            </Box>
            <Divider sx={{ marginBottom: 4, borderColor: 'grey.500', borderWidth: '2px' }} />
            <Box mb={2} sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="error" onClick={handleCheckout}>
                Proceed to Payment
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Membership Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px' }}>
          <Typography variant="h6" mb={2}>Add Membership</Typography>
          <RadioGroup value={selectedMembership} onChange={handleMembershipChange}>
            <FormControlLabel value="Silver" control={<Radio />} label="Silver - Save ₹30" />
            <FormControlLabel value="Gold" control={<Radio />} label="Gold - Save ₹50" />
            <FormControlLabel value="Platinum" control={<Radio />} label="Platinum - Save ₹100" />
          </RadioGroup>
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleCloseMembershipModal}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleAddMembership}>Add Membership</Button>
          </Box>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default CartDetails;