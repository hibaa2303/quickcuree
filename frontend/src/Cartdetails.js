import React, { useState, useEffect } from 'react';
import { Container, IconButton, Button, Typography, Box, Divider, Modal, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import im1 from './image/ims1.webp';
import im2 from './image/ims2.webp'; 
import im3 from './image/ims3.webp';
import im4 from './image/ims4.webp'; 
import im5 from './image/ims5.webp';

const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [membershipAdded, setMembershipAdded] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
   
    const updatedItems = storedItems.map(item => ({
      ...item,
      quantity: item.quantity || 1, 
    }));
    setCartItems(updatedItems);
  }, []);
  

  const handleAdd = () => setQuantity(prevQuantity => prevQuantity + 1);
  const handleRemove = () => quantity > 1 && setQuantity(prevQuantity => prevQuantity - 1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  const handleAddMembership = () => {
    if (selectedMembership) {
      setMembershipAdded(selectedMembership);
      setOpen(false);
    }
  };

  const handleCloseMembershipModal = () => {
    setOpen(false);
  };

  const handleRemoveMembership = () => {
    setMembershipAdded(null);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + change;
    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
      console.log('Updated Cart:', updatedCart); 
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };
  
  

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <div className='nam'>
     <Container maxWidth="lg" sx={{ padding: 0, margin: 0, mt: 25 }}>

        <Box sx={{ display: 'flex', marginTop: 4, width: '100%', ml: 10 }}>
          <Box sx={{ flex: 2.5, paddingRight: 2, borderRight: '1px solid #ddd'  }}>
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
                <Box
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
                  <img src={im2} alt="Example Item" style={{ width: '80px', height: '80px', marginBottom: 8 }} />
                  <Typography variant="body2" fontWeight="bold">Maxirich</Typography>
                  <Typography variant="caption" color="green">4.0 ★ (123)</Typography>
                  <Typography variant="body1">₹100 <span style={{ textDecoration: 'line-through', color: '#888' }}>₹120</span> <span style={{ color: 'green' }}>20% off</span></Typography>
                  <Button variant="contained" color="error" size="small" sx={{ marginTop: 1 }}>Add to cart</Button>
                </Box>
                <Box
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
                  <img src={im3} alt="Example Item" style={{ width: '80px', height: '80px', marginBottom: 8 }} />
                  <Typography variant="body2" fontWeight="bold">Omnigel</Typography>
                  <Typography variant="caption" color="green">4.5 ★ (200)</Typography>
                  <Typography variant="body1">₹150 <span style={{ textDecoration: 'line-through', color: '#888' }}>₹180</span> <span style={{ color: 'green' }}>15% off</span></Typography>
                  <Button variant="contained" color="error" size="small" sx={{ marginTop: 1 }}>Add to cart</Button>
                </Box>
                <Box
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
                  <img src={im4} alt="Example Item" style={{ width: '80px', height: '80px', marginBottom: 8 }} />
                  <Typography variant="body2" fontWeight="bold">Nicotex</Typography>
                  <Typography variant="caption" color="green">5.0 ★ (50)</Typography>
                  <Typography variant="body1">₹200 <span style={{ textDecoration: 'line-through', color: '#888' }}>₹250</span> <span style={{ color: 'green' }}>20% off</span></Typography>
                  <Button variant="contained" color="error" size="small" sx={{ marginTop: 1 }}>Add to cart</Button>
                </Box>
                <Box
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
                  <img src={im5} alt="Example Item" style={{ width: '80px', height: '80px', marginBottom: 8 }} />
                  <Typography variant="body2" fontWeight="bold">Endura Mass</Typography>
                  <Typography variant="caption" color="green">3.5 ★ (80)</Typography>
                  <Typography variant="body1">₹250 <span style={{ textDecoration: 'line-through', color: '#888' }}>₹300</span> <span style={{ color: 'green' }}>10% off</span></Typography>
                  <Button variant="contained" color="error" size="small" sx={{ marginTop: 1 }}>Add to cart</Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 5.5, paddingLeft: 6, mr: 4, mt: 1 }}>
            <Box mb={2}>
              <Typography variant="h6">Care Plan</Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>You can save extra ₹22 on this order</Typography>
              {membershipAdded ? (
                <Box>
                  <Typography variant="body2" color="green">Membership Added: {membershipAdded}</Typography>
                  <Button variant="contained" color="warning" sx={{ marginTop: 2 }} onClick={handleRemoveMembership}>Remove Membership</Button>
                </Box>
              ) : (
                <Button variant="contained" color="error" sx={{ marginTop: 2 }} onClick={handleOpen}>Add Membership</Button>
              )}
            </Box>
            <Divider sx={{ marginBottom: 4, borderColor: 'grey.500', borderWidth: '2px' }} />
            <Box mb={2}>
              <Typography variant="h6" mt={-2}>Bill Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Item Total (MRP)</Typography>
                <Typography sx={{ marginLeft: 'auto' }}>₹33.76</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Green Packaging Charge</Typography>
                <Typography sx={{ marginLeft: 'auto' }}>₹4</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Typography>Price Discount</Typography>
                <Typography sx={{ marginLeft: 'auto' }}>-₹4.76</Typography>
              </Box>
              <Divider sx={{ marginY: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Typography fontWeight="bold">Total Amount</Typography>
                <Typography fontWeight="bold" sx={{ marginLeft: 'auto' }}>₹29</Typography>
              </Box>
            </Box>
            <Divider sx={{ marginBottom: 4, borderColor: 'grey.500', borderWidth: '2px' }} />
            <Box mb={2} sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="error">Proceed to Payment</Button>
            </Box>
          </Box>
        </Box>
      </Container>
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
    </div>
  );
};

export default CartDetails;