import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './image/logo-png.png';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dropdown from 'react-bootstrap/Dropdown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [cityModalOpen, setCityModalOpen] = useState(false);

  // Function to load user from localStorage
  const loadUser = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(storedUser);
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
    }
  };

  // Function to load cart from localStorage
  const loadCart = () => {
    try {
      const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]') || [];
      setCartItems(storedItems);
      const total = storedItems.reduce((sum, item) => {
        const price = parseFloat(item.price?.replace('₹', '') || 0);
        return sum + price * (item.quantity || 1);
      }, 0);
      setCartTotal(total);
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
      setCartTotal(0);
    }
  };

  // Load initial state on mount
  useEffect(() => {
    try {
      const storedCity = localStorage.getItem('selectedCity');
      if (storedCity) {
        setSelectedCity(storedCity);
      }
      loadUser();
      loadCart();
    } catch (error) {
      console.error('Error loading initial state:', error);
    }
  }, []);

  // Listen for user updates (login/logout)
  useEffect(() => {
    const handleUserUpdate = () => {
      loadUser();
    };

    window.addEventListener('storage', handleUserUpdate);
    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleUserUpdate);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // Fallback: Check localStorage every few seconds to catch missed updates
    const interval = setInterval(() => {
      const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]') || [];
      if (storedItems.length !== cartItems.length) {
        loadCart();
      }
    }, 1000);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, [cartItems.length]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search-results?keyword=${searchTerm}`);
    }
  };

  const handleCityClick = () => {
    setCityModalOpen(true);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
    setCityModalOpen(false);
    // Removed window.location.reload() to prevent logout
  };

  const handleRemoveItem = (index) => {
    try {
      const updatedCart = [...cartItems];
      const removedItem = updatedCart[index];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleClearCart = () => {
    try {
      localStorage.removeItem('cartItems');
      setCartItems([]);
      setCartTotal(0);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      window.dispatchEvent(new Event('userUpdated'));
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div className="full">
        <div className="navbar d-flex">
          <img onClick={() => navigate('/homepage')} className="logo" src={logo} alt="logo" />
          <h3 onClick={() => navigate('/medicines')}>Medicines</h3>
          <h3 onClick={() => navigate('/consult')}>Consult Doctors</h3>
          <h3 onClick={() => navigate('/cancer')}>Cancer Care</h3>
          <h3 onClick={() => navigate('/lab')}>Lab Tests</h3>
          <p className="fw-bold me-5 mt-3" onClick={() => navigate('/aboutus')}>
            About Us
          </p>
          <button className="buttonn border-0 shadow-none" onClick={handleOpen}>
            <Badge badgeContent={cartItems.length} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </button>
          {user ? (
            <div className="d-flex align-items-center">
              <Avatar
                sx={{
                  bgcolor: '#4dd0e1',
                  width: 45,
                  height: 45,
                  fontSize: 20,
                  marginTop: '6px',
                  marginLeft: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 0 10px rgba(77, 208, 225, 0.7)',
                }}
                onClick={() => navigate('/profile')}
              >
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || '?'}
              </Avatar>
              <p
                className="ooo fw-bold mt-3 ms-2"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          ) : (
            <>
              <p className="ooo fw-bold mt-3" onClick={() => navigate('/login')}>
                Login
              </p>
              <p className="ooo fw-bold mt-3" onClick={() => navigate('/signup')}>
                Signup
              </p>
            </>
          )}
        </div>
        <hr className="p-0 m-0 border-black" />

        <div className="secondnav d-flex">
          <div className="d-flex">
            <LocationOnIcon className="loc mt-3 me-2" />
            <h4 className="hi mt-3" onClick={handleCityClick} style={{ cursor: 'pointer' }}>
              {selectedCity}
            </h4>
          </div>

          <div className="d-flex mt-1 mb-1 w-50 col-5">
            <input
              placeholder="Search for Medicines and Health Products"
              className="search w-100 rounded rounded-1 border border-black border-1"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="aaaa bt btn border-black border-1 bg-warning rounded rounded-end rounded-start-0"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="d-flex">
            <p className="fw-bold ps-2 ms-2 mt-3 me-2">QUICK BUY! Get 15% off on medicines*</p>
          </div>
        </div>

        <hr className="p-0 m-0" />

        <div className="thirdnav">
           {[
            { title: 'Health Resource Center', items: ['All Diseases', 'All Medicines', 'Medicines by Therapeutic Class'] },
            { title: 'Vitamins & Nutrition', items: ['Vitamins & Supplements', 'Multivitamins', 'Vitamin C', 'Minerals', 'Calcium', 'Nutritional Drinks', 'Kids Nutrition'] },
            { title: 'Personal Care', items: ['Men Care', 'Women Care', 'Oral Care', 'Pet Care'] },
            { title: 'Ayurveda Products', items: ['Ayurveda Personal Care', 'Ayurveda Oral Care', 'Ayurveda Baby Care', 'Ayurveda Skin Care', 'Ayurveda Hair Care'] },
            { title: 'Diabetes', items: ['Diabetes Monitoring Devices', 'Sugar Free', 'Diabetic Medicines', 'Sugar Substitutes', 'Diabetics Diet'] },
            { title: 'Health Conditions', items: ['Stomach Care', 'Health Care', 'Bone, Joint & Muscle Care', 'Pain Relief', 'Ear Care', 'Liver Care', 'Derma Care', 'Respiratory Care', 'Kidney Care'] },
            { title: 'Homeopathy', items: ['Homeopathy Medicines', 'Homeopathy Drops', 'Dilutions', 'Triturations', 'Bio Combinations', 'Bio Chemics', 'Bach Flower Remedies'] },
            { title: 'Features', items: ['Summer Essentials', 'New Arrivals', 'Top Brands on Quick Cure', 'Deals of the Day', 'Super Savings'] },
          ].map((category) => (
            <Dropdown key={category.title}>
              <Dropdown.Toggle id="dropdown-basic">{category.title}</Dropdown.Toggle>
              <Dropdown.Menu>
                {category.items.map((item) => (
                  <Dropdown.Item key={item}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
 
        </div>

        <hr className="p-0 m-0" />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 300,
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Order Summary
          </Typography>
          <Divider sx={{ my: 1 }} />
          {cartItems.length > 0 ? (
            <>
              <Typography sx={{ mt: 1 }}>
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                {cartItems.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* Display image only for medicines (not lab tests) */}
                      {item.type !== 'labTest' && item.img && (
                        <img src={item.img} alt={item.name} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                      )}
                      <Typography variant="body2">
                        {item.name} (x{item.quantity || 1})
                        {/* Lab tests (type: 'labTest') should not display images; medicines (type undefined) can have images if added later */}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">
                        ₹{(parseFloat(item.price?.replace('₹', '') || 0) * (item.quantity || 1)).toFixed(2)}
                      </Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveItem(index)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography fontWeight="bold">Total:</Typography>
                <Typography fontWeight="bold">₹{cartTotal.toFixed(2)}</Typography>
              </Box>
              <Button
                sx={{ mt: 1, bgcolor: '#008080' }}
                fullWidth
                variant="contained"
                onClick={() => {
                  handleClose();
                  navigate('/CartDetails');
                }}
              >
                Proceed to Cart
              </Button>
              <Button
                sx={{ mt: 1 }}
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </>
          ) : (
            <Typography sx={{ mt: 1 }}>Your cart is empty.</Typography>
          )}
          <Button
            sx={{ mt: 1 }}
            fullWidth
            variant="outlined"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Modal open={cityModalOpen} onClose={() => setCityModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50px',
            left: '30px',
            width: 300,
            maxHeight: 400,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Select Your City
          </Typography>
          <Divider sx={{ my: 2 }} />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {[
              'New Delhi', 'Gurgaon', 'Pune', 'Mumbai', 'Bengaluru', 'Kolkata', 'Hyderabad', 'Ahmedabad',
              'Chennai', 'Indore', 'Lucknow', 'Jaipur', 'Chandigarh', 'Nagpur', 'Surat', 'Patna', 'Bhopal',
              'Visakhapatnam', 'Vadodara', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Ghaziabad', 'Rajkot',
              'Meerut', 'Aurangabad', 'Jodhpur', 'Coimbatore', 'Kochi', 'Mysuru',
            ].map((city) => (
              <li key={city} style={{ margin: '8px 0' }}>
                <Button fullWidth variant="outlined" onClick={() => handleCitySelect(city)}>
                  {city}
                </Button>
              </li>
            ))}
          </ul>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setCityModalOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Header;