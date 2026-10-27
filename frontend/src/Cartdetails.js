import React, { useState, useEffect, useRef } from 'react';
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
import { API_BASE_URL } from './api';
import { addCartItem, getCartOwnerId, readCart, readMembershipSelection, removeOrderedItems, writeCart, writeMembershipSelection } from './cartStorage';
import { MEMBERSHIP_CATALOG, membershipPrice } from './membershipCatalog';
import { getLabProductId } from './labProductId';

const getUnitPrice = (price) => {
  const amount = Number.parseFloat(String(price ?? '0').replace(/[^\d.]/g, ''));
  return Number.isFinite(amount) ? amount : 0;
};

const CartDetails = () => {
  const navigate = useNavigate();
  const [cartOwnerId] = useState(() => getCartOwnerId());
  const [cartItems, setCartItems] = useState([]);
  const [topDeals, setTopDeals] = useState([]);
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  const [catalogError, setCatalogError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [membershipAdded, setMembershipAdded] = useState(() => readMembershipSelection(cartOwnerId));
  const idempotencyKey = useRef(null);

  useEffect(() => {
    setCartItems(readCart(cartOwnerId));
    Promise.all([
      axios.get(`${API_BASE_URL}/medicines`),
      axios.get(`${API_BASE_URL}/lab-tests`),
    ])
      .then(([medicineResponse, labTestResponse]) => {
        const medicines = Array.isArray(medicineResponse.data.data) ? medicineResponse.data.data : [];
        const labTests = Array.isArray(labTestResponse.data.data) ? labTestResponse.data.data : [];
        const catalogueById = new Map(medicines.map((medicine) => [String(medicine._id), medicine]));
        const labTestsById = new Map(labTests.map((test) => [String(test.id), test]));
        setTopDeals(medicines.slice(0, 4));
        const refreshedCart = readCart(cartOwnerId).map((item) => {
          if (item.type === 'labTest') {
            const labTest = labTestsById.get(String(item._id || getLabProductId(item.name)));
            if (!labTest) return { ...item, unavailable: true };
            return { ...item, _id: labTest.id, name: labTest.name, price: `₹${labTest.price}`, unavailable: false };
          }
          const current = catalogueById.get(String(item._id));
          if (!current || getUnitPrice(current.price) <= 0) return { ...item, unavailable: true };
          return { ...item, name: current.name, price: current.price, img: current.img, unavailable: false };
        });
        writeCart(refreshedCart, cartOwnerId);
        setCartItems(refreshedCart);
      })
      .catch((error) => {
        setCatalogError('Medicine and lab-test prices could not be refreshed. Reconnect and retry before placing an order.');
        console.error('Unable to refresh the checkout catalogues:', error);
      })
      .finally(() => setCatalogLoaded(true));
  }, [cartOwnerId]);

  useEffect(() => {
    const refreshCart = () => {
      idempotencyKey.current = null;
      setCartItems(readCart(cartOwnerId));
    };
    window.addEventListener('cartUpdated', refreshCart);
    window.addEventListener('storage', refreshCart);
    return () => {
      window.removeEventListener('cartUpdated', refreshCart);
      window.removeEventListener('storage', refreshCart);
    };
  }, [cartOwnerId]);

  useEffect(() => {
    const refreshMembership = () => setMembershipAdded(readMembershipSelection(cartOwnerId));
    window.addEventListener('membershipUpdated', refreshMembership);
    window.addEventListener('storage', refreshMembership);
    return () => {
      window.removeEventListener('membershipUpdated', refreshMembership);
      window.removeEventListener('storage', refreshMembership);
    };
  }, [cartOwnerId]);

  const medicineSubtotal = cartItems.filter((item) => item.type !== 'labTest').reduce(
    (sum, item) => sum + getUnitPrice(item.price) * (Number(item.quantity) || 1),
    0
  );
  const labTestSubtotal = cartItems.filter((item) => item.type === 'labTest').reduce(
    (sum, item) => sum + getUnitPrice(item.price) * (Number(item.quantity) || 1),
    0
  );
  const itemTotal = medicineSubtotal + labTestSubtotal;
  const selectedMembershipPlan = MEMBERSHIP_CATALOG.find((plan) => plan.tier === membershipAdded);
  const selectedMembershipPrice = membershipPrice(membershipAdded);
  const totalAmount = itemTotal + selectedMembershipPrice;
  const hasUnavailableItems = cartItems.some((item) => item.unavailable);

  const saveCart = (updatedCart) => {
    const savedCart = writeCart(updatedCart, cartOwnerId);
    setCartItems(savedCart);
    idempotencyKey.current = null;
    setCheckoutError('');
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart[index];
    updatedCart.splice(index, 1);
    saveCart(updatedCart);
    toast.success(`${removedItem.name} removed from cart`);
  };

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = (Number(updatedCart[index].quantity) || 1) + change;
    if (newQuantity > 0 && newQuantity <= 99) {
      updatedCart[index].quantity = newQuantity;
      saveCart(updatedCart);
      toast.info(`Updated quantity for ${updatedCart[index].name} to ${newQuantity}`);
    }
  };

  const handleClearCart = () => {
    saveCart([]);
    toast.success('Cart cleared successfully');
  };

  const handleCheckout = async () => {
    if (isCheckingOut) return;
    if (cartItems.length === 0 && !membershipAdded) {
      setCheckoutError('Add a medicine, lab-test package, or membership before placing a demo order.');
      return;
    }
    if (!catalogLoaded || catalogError) {
      setCheckoutError('The medicine catalogue must load successfully before checkout.');
      return;
    }
    if (hasUnavailableItems) {
      setCheckoutError('Remove unavailable medicines or lab packages to place a medicine demo order.');
      return;
    }
    const token = localStorage.getItem('token');
    const currentOwnerId = getCartOwnerId();
    if (!token || !cartOwnerId || currentOwnerId !== cartOwnerId) {
      setCheckoutError('Please log in to place a demo order.');
      navigate('/login', {
        state: {
          from: { pathname: '/cartdetails' },
          cartOwnerId,
          resumeCheckout: true,
        },
      });
      return;
    }

    if (!idempotencyKey.current) {
      idempotencyKey.current = window.crypto?.randomUUID?.()
        || `qc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    const submittedItems = cartItems.map((item) => ({
      productId: item._id,
      type: item.type === 'labTest' ? 'labTest' : 'medicine',
      quantity: item.quantity,
    }));
    if (selectedMembershipPlan) {
      submittedItems.push({ productId: selectedMembershipPlan.id, type: 'membership', quantity: 1 });
    }
    setIsCheckingOut(true);
    setCheckoutError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, {
        items: submittedItems,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Idempotency-Key': idempotencyKey.current,
        },
      });
      const order = response.data?.data;
      if (response.data?.status !== 'success' || !order?._id) throw new Error('The order response was incomplete.');
      const latestCart = readCart(cartOwnerId);
      const remainingCart = removeOrderedItems(latestCart, submittedItems);
      writeCart(remainingCart, cartOwnerId);
      setCartItems(remainingCart);
      if (selectedMembershipPlan && readMembershipSelection(cartOwnerId) === selectedMembershipPlan.tier) {
        writeMembershipSelection('', cartOwnerId);
        setMembershipAdded('');
      }
      navigate(`/orders/${order._id}`);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to place the demo order. Your cart has been kept.';
      setCheckoutError(message);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('userUpdated'));
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/login', {
          state: {
            from: { pathname: '/cartdetails' },
            cartOwnerId,
            resumeCheckout: true,
            authMessage: 'Your login session expired. Please log in again; your cart is saved.',
          },
        });
      }
      console.error('Order placement failed:', error.response?.status || error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleAddToCart = (product) => {
    const updatedCart = addCartItem(product, cartOwnerId);
    setCartItems(updatedCart);
    idempotencyKey.current = null;
    setCheckoutError('');
    toast.success(`${product.name} added to cart`);
  };

  const handleAddMembership = () => {
    if (!selectedMembership) return;
    setMembershipAdded(selectedMembership);
    idempotencyKey.current = null;
    writeMembershipSelection(selectedMembership, cartOwnerId);
    setMembershipModalOpen(false);
    toast.success(`Added ${MEMBERSHIP_CATALOG.find((plan) => plan.tier === selectedMembership)?.name || 'Membership'}!`);
  };

  return (
    <div className="cart-details-page">
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 }, pb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%' }}>
          {/* Left Side: Cart Items and Top Deals */}
          <Box sx={{ flex: 1.5, minWidth: 0, pr: { md: 3 }, borderRight: { md: '1px solid #ddd' } }}>
            <Box mb={4}>
              <Typography variant="h6">Cart</Typography>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <Box key={item._id || item.name || index} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, py: 2, borderBottom: '1px solid #e4e8ea' }}>
                    <img src={item.img || im1} alt={item.name} style={{ width: 76, height: 76, marginRight: 4, objectFit: 'contain' }} />
                    <Box sx={{ minWidth: 120, flex: '1 1 150px' }}>
                      <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
                      <Typography variant="body2">{item.price} each</Typography>
                      <Typography variant="body2" fontWeight="bold">Line total ₹{(getUnitPrice(item.price) * (Number(item.quantity) || 1)).toFixed(2)}</Typography>
                      {item.type === 'labTest' && <Typography variant="caption" display="block">Lab-test package · demo only</Typography>}
                      {item.unavailable && <Typography variant="caption" color="error">Unavailable for demo orders</Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 0.5 }}>
                      <IconButton aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => handleQuantityChange(index, -1)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography>{item.quantity || 1}</Typography>
                      <IconButton aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= 99} onClick={() => handleQuantityChange(index, 1)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                      <IconButton color="error" aria-label={`Remove ${item.name}`} onClick={() => handleRemoveItem(index)}>
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
              <Typography variant="h6" gutterBottom>More medicines</Typography>
              {topDeals.length === 0 && <Typography variant="body2">No additional medicines are available.</Typography>}
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
                    key={deal._id || deal.name || index}
                    sx={{
                      minWidth: 150,
                      height: '100%',
                      marginRight: 2,
                      padding: 2,
                      borderRadius: 2,
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img src={deal.img || im1} alt={deal.name} style={{ width: '80px', height: '80px', marginBottom: 8, objectFit: 'contain' }} />
                    <Typography variant="body2" fontWeight="bold">{deal.name}</Typography>
                    <Typography variant="body2">MRP {deal.price || 'Price unavailable'}</Typography>
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

          {/* Bill Summary */}
          <Box sx={{ flex: 0.85, minWidth: 0, mt: 1 }}>
            <Divider sx={{ marginBottom: 4, borderColor: 'grey.500', borderWidth: '2px' }} />
            <Box mb={3}>
              <Typography variant="h6">Care Plan</Typography>
              {selectedMembershipPlan ? (
                <>
                  <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>Membership selected: {selectedMembershipPlan.name}</Typography>
                  <Typography variant="body2">₹{selectedMembershipPlan.price.toFixed(2)} / month</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    <Button variant="outlined" onClick={() => { setSelectedMembership(membershipAdded); setMembershipModalOpen(true); }}>
                      Change Membership
                    </Button>
                    <Button variant="text" color="error" onClick={() => { setMembershipAdded(''); setSelectedMembership(''); idempotencyKey.current = null; writeMembershipSelection('', cartOwnerId); }}>
                      Remove Membership
                    </Button>
                  </Box>
                </>
              ) : (
                <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={() => { setSelectedMembership(''); setMembershipModalOpen(true); }}>
                  Add Membership
                </Button>
              )}
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Membership is priced by the server and included in this demo order. Payment and ongoing billing are not connected.
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: 3 }} />
            <Box mb={2}>
              <Typography variant="h6">Bill Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Medicine subtotal</Typography>
                <Typography sx={{ marginLeft: 'auto' }}>
                    ₹{medicineSubtotal.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Lab-test subtotal</Typography>
                <Typography>₹{labTestSubtotal.toFixed(2)}</Typography>
              </Box>
              {selectedMembershipPlan && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                  <Typography>{selectedMembershipPlan.name} ({selectedMembershipPlan.period})</Typography>
                  <Typography>₹{selectedMembershipPrice.toFixed(2)}</Typography>
                </Box>
              )}
              <Divider sx={{ marginY: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Typography fontWeight="bold">Total Amount</Typography>
                <Typography fontWeight="bold" sx={{ marginLeft: 'auto' }}>₹{totalAmount.toFixed(2)}</Typography>
              </Box>
            </Box>
            <Divider sx={{ marginBottom: 4, borderColor: 'grey.500', borderWidth: '2px' }} />
            <Box mb={2} sx={{ textAlign: 'center' }}>
              {catalogError && <Typography role="alert" color="error" sx={{ mb: 1 }}>{catalogError}</Typography>}
              {checkoutError && <Typography role="alert" color="error" sx={{ mb: 1 }}>{checkoutError}</Typography>}
              <Button
                variant="contained"
                color="error"
                onClick={handleCheckout}
                disabled={(!cartItems.length && !membershipAdded) || !catalogLoaded || isCheckingOut || hasUnavailableItems}
              >
                {isCheckingOut ? 'Placing demo order…' : 'Place demo order'}
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Demo order only. Payment, delivery, and real lab booking are not connected.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Modal open={membershipModalOpen} onClose={() => setMembershipModalOpen(false)} aria-labelledby="care-plan-title">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 400 }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography id="care-plan-title" variant="h6" mb={2}>Add Membership</Typography>
          <RadioGroup value={selectedMembership} onChange={(event) => setSelectedMembership(event.target.value)}>
            {MEMBERSHIP_CATALOG.map((plan) => (
              <FormControlLabel
                key={plan.id}
                value={plan.tier}
                control={<Radio />}
                label={`${plan.name} — ₹${plan.price}/month`}
              />
            ))}
          </RadioGroup>
          <Typography variant="caption" color="text.secondary">The monthly prices come from the existing membership options. This is a demo order; payment and recurring billing are not connected.</Typography>
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setMembershipModalOpen(false)}>Cancel</Button>
            <Button variant="contained" color="error" disabled={!selectedMembership} onClick={handleAddMembership}>Add Membership</Button>
          </Box>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default CartDetails;
