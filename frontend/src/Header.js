import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { clearCart as clearStoredCart, clearGuestCart, readCart, readMembershipSelection, writeCart, writeMembershipSelection } from './cartStorage';
import { MEMBERSHIP_CATALOG, membershipPrice } from './membershipCatalog';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [membershipSelection, setMembershipSelection] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = location.pathname === '/search-results'
      ? params.get('keyword')
      : location.pathname === '/medicines'
        ? params.get('search')
        : '';
    setSearchTerm(query || '');
  }, [location.pathname, location.search]);

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
      const storedItems = readCart();
      const storedMembership = readMembershipSelection();
      setCartItems(storedItems);
      setMembershipSelection(storedMembership);
      const total = storedItems.reduce((sum, item) => {
        const price = Number.parseFloat(String(item.price ?? '0').replace(/[^\d.]/g, '')) || 0;
        return sum + price * (Number(item.quantity) || 1);
      }, 0);
      setCartTotal(total + membershipPrice(storedMembership));
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
      setCartTotal(0);
      setMembershipSelection('');
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
      loadCart();
    };

    window.addEventListener('storage', handleUserUpdate);
    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleUserUpdate);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  // Listen for cart updates from this page and other tabs.
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    window.addEventListener('membershipUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('membershipUpdated', handleCartUpdate);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    const keyword = searchTerm.trim();
    navigate(keyword ? `/medicines?search=${encodeURIComponent(keyword)}` : '/medicines');
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const keyword = value.trim();
    navigate(keyword ? `/medicines?search=${encodeURIComponent(keyword)}` : '/medicines');
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
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      writeCart(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleClearCart = () => {
    try {
      clearStoredCart();
      writeMembershipSelection('');
      setCartItems([]);
      setCartTotal(0);
      setMembershipSelection('');
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleLogout = () => {
    try {
      // Keep this account's scoped cart for its next login, but never expose
      // the guest cart from a previous browser session after logout.
      clearGuestCart();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setCartItems([]);
      setCartTotal(0);
      window.dispatchEvent(new Event('userUpdated'));
      window.dispatchEvent(new Event('cartUpdated'));
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0) + (membershipSelection ? 1 : 0);
  const membershipPlan = MEMBERSHIP_CATALOG.find((plan) => plan.tier === membershipSelection);

  return (
    <div className="header-shell">
      <div className="full">
        <div className="navbar">
          <img onClick={() => navigate('/homepage')} className="logo" src={logo} alt="QuickCure home" role="button" tabIndex={0} onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && navigate('/homepage')} />
          <nav className="header-primary-nav" aria-label="Main navigation">
            <button type="button" className="header-link" onClick={() => navigate('/medicines')}>Medicines</button>
            <button type="button" className="header-link" onClick={() => navigate('/consult')}>Consult Doctors</button>
            <button type="button" className="header-link" onClick={() => navigate('/cancer')}>Cancer Care</button>
            <button type="button" className="header-link" onClick={() => navigate('/lab')}>Lab Tests</button>
            <button type="button" className="header-link" onClick={() => navigate('/aboutus')}>About Us</button>
          </nav>
          <div className="header-account-area">
            <button aria-label={`Open cart, ${cartCount} items`} className="buttonn border-0 shadow-none" onClick={handleOpen}>
              <Badge badgeContent={cartCount} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </button>
            {user ? (
              <div className="header-user-controls d-flex align-items-center">
                <Avatar
                  sx={{
                    bgcolor: '#b9e5e5',
                    width: 40,
                    height: 40,
                    fontSize: 18,
                    cursor: 'default',
                  }}
                  title={user.firstName || user.username || 'Signed-in user'}
                >
                  {user.firstName ? user.firstName.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || '?'}
                </Avatar>
                <button type="button" className="header-link" onClick={() => navigate('/orders')}>
                  My Orders
                </button>
                <button type="button" className="header-link" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="header-user-controls">
                <button type="button" className="header-link" onClick={() => navigate('/login')}>
                  Login
                </button>
                <button type="button" className="header-link" onClick={() => navigate('/signup')}>
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
        <hr className="p-0 m-0 border-black" />

        <div className="secondnav">
          <div className="header-search-group">
            <button type="button" className="header-location" onClick={handleCityClick} aria-label={`Select location, currently ${selectedCity}`}>
              <LocationOnIcon className="loc" />
              <span>{selectedCity}</span>
            </button>
            <form className="header-search" onSubmit={(event) => { event.preventDefault(); handleSearch(); }}>
              <input
                placeholder="Search for Medicines and Health Products"
                className="search w-100 rounded rounded-1 border border-black border-1"
                type="text"
                aria-label="Search medicines and health products"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <button type="submit" className="aaaa bt btn border-black border-1 bg-warning rounded rounded-end rounded-start-0">
                Search
              </button>
            </form>
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
              <Dropdown.Toggle id={`dropdown-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                {category.title}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {category.items.map((item) => {
                  const categoryByItem = {
                    'All Medicines': '/medicines',
                    'Diabetes Monitoring Devices': '/medicines?category=diabetes',
                    'Diabetic Medicines': '/medicines?category=diabetes',
                    'Stomach Care': '/medicines?category=stomach',
                    'Bone, Joint & Muscle Care': '/medicines?category=bone',
                    'Derma Care': '/medicines?category=derma',
                    'Respiratory Care': '/medicines?category=respiratory',
                    'Kidney Care': '/medicines?category=kidney',
                  };
                  const destination = categoryByItem[item];
                  return (
                    <Dropdown.Item
                      key={item}
                      onClick={() => navigate(destination || '/medicines')}
                    >
                      {item}
                    </Dropdown.Item>
                  );
                })}
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
          {cartCount > 0 ? (
            <>
              <Typography sx={{ mt: 1 }}>
                {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart
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
                        ₹{(Number.parseFloat(String(item.price ?? '0').replace(/[^\d.]/g, '')) * (item.quantity || 1) || 0).toFixed(2)}
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
                {membershipPlan && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2">{membershipPlan.name} (monthly)</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">₹{membershipPlan.price.toFixed(2)}</Typography>
                      <IconButton size="small" color="error" aria-label="Remove membership" onClick={() => writeMembershipSelection('')} sx={{ ml: 1 }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
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
