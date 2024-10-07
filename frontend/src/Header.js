import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./image/logo-png.png";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dropdown from 'react-bootstrap/Dropdown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Cartdetails from './Cartdetails';
import Homepage from './Homepage';

const Header = () => {
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate(); 


  const [selectedCity, setSelectedCity] = useState('Chennai'); 
  const [cityModalOpen, setCityModalOpen] = useState(false);

  useEffect(() => {

    const storedCity = localStorage.getItem('selectedCity');
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

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
    window.location.reload(); 
  };


return (
    <div>
      <div className='full'>
        <div className='navbar d-flex '>
          <img onClick={() => navigate('/homepage')}className="logo" src={logo} alt="logo" />
          <h3 onClick={() => navigate('/medicines')}>Medicines</h3>
          <h3 onClick={() => navigate('/Consult')}>Consult Doctors</h3>
          <h3 onClick={() => navigate('/Cancer')}>Cancer Care</h3>
          <h3 onClick={() => navigate('/Lab')}>Lab Tests</h3>

          <p className="ooo fw-bold mt-3" onClick={() => navigate('/Login')}>Login</p>
          <p className="ooo fw-bold mt-3" onClick={() => navigate('/Signup')}>Signup</p>   
          <button className="buttonn border-0 shadow-none" onClick={handleOpen}><AddShoppingCartIcon /></button> 
          <p className='fw-bold me-5 mt-3' onClick={() => navigate('/aboutus')}>About Us</p>
        </div>
        <hr className='p-0 m-0 border-black' />
        <div className='secondnav d-flex'>
        <div className='secondnav d-flex'>
          <div className='d-flex'>
            <LocationOnIcon className='loc mt-3 me-2'/>
            <h4 className='hi mt-3' onClick={handleCityClick} style={{ cursor: 'pointer' }}>
              {selectedCity}
            </h4> 
          </div>
          </div>

          <div className='d-flex mt-1 mb-1 w-50 col-5'>
            <input
              placeholder ="  Search for Medicines and Health Products"
              className="search w-100 rounded rounded-1 border border-black border-1"
              type="text"
              value={searchTerm}  
              onChange={(e) => setSearchTerm(e.target.value)}  
            />
            <button className='aaaa bt btn border-black border-1 bg-warning rounded rounded-end rounded-start-0' onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className='d-flex'>
            <p className='fw-bold ps-2 ms-2 mt-3 me-2'>QUICK BUY! Get 15% off on medicines*</p>
          </div>
        </div>
        <hr className='p-0 m-0' />

        <div className='thirdnav'>
          {[
            { title: 'Health Resource Center', items: ['All Diseases', 'All Medicines', 'Medicines by Therapeutic Class'] },
            { title: 'Vitamins & Nutrition', items: ['Vitamins & Supplements', 'Multivitamins', 'Vitamin C', 'Minerals', 'Calcium', 'Nutritional Drinks', 'Kids Nutrition'] },
            { title: 'Personal Care', items: ['Men Care', 'Women Care', 'Oral Care', 'Pet Care'] },
            { title: 'Ayurveda Products', items: ['Ayurveda Personal Care', 'Ayurveda Oral Care', 'Ayurveda Baby Care', 'Ayurveda Skin Care', 'Ayurveda Hair Care'] },
            { title: 'Diabetes', items: ['Diabetes Monitoring Devices', 'Sugar Free', 'Diabetic Medicines', 'Sugar Substitutes', 'Diabetics Diet'] },
            { title: 'Health Conditions', items: ['Stomach Care', 'Health Care', 'Bone, Joint & Muscle Care', 'Pain Relief', 'Ear Care', 'Liver Care', 'Derma Care', 'Respiratory Care', 'Kidney Care'] },
            { title: 'Homeopathy', items: ['Homeopathy Medicines', 'Homeopathy Drops', 'Dilutions', 'Triturations', 'Bio Combinations', 'Bio Chemics', 'Bach Flower Remedies'] },
            { title: 'Features', items: ['Summer Essentials', 'New Arrivals', 'Top Brands on Quick Cure', 'Deals of the Day', 'Super Savings'] }
          ].map((category) => (
            <Dropdown key={category.title}>
              <Dropdown.Toggle id='dropdown-basic'>{category.title}</Dropdown.Toggle>
              <Dropdown.Menu>
                {category.items.map((item) => (
                  <Dropdown.Item key={item}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </div>
        <hr className='p-0 m-0' />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '10%', 
          right: '10%',
          width: 250, 
          bgcolor: 'background.paper',
          borderRadius: 2, 
          boxShadow: 24, 
          p: 2,
        }}>
          <Typography variant="h6" component="h2">
            Order Summary
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ mt: 1 }}>
            1 item added to your cart.
          </Typography>
          <Button 
            sx={{ mt: 2, bgcolor: '#008080' }}  
            fullWidth
            variant="contained" 
            onClick={handleClose}
          >
            <h6 onClick={() => window.location.replace('/cartdeets')}>Proceed to cart</h6>
          </Button>
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


      <Modal
        open={cityModalOpen}
        onClose={() => setCityModalOpen(false)}
      >
        <Box sx={{
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
        }}>
          <Typography variant="h6" component="h2">
            Select Your City
          </Typography>
          <Divider sx={{ my: 2 }} />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {['New Delhi', 'Gurgaon', 'Pune', 'Mumbai', 'Bengaluru', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Indore', 'Lucknow', 'Jaipur', 'Chandigarh', 'Nagpur', 'Surat', 'Patna', 'Bhopal', 'Visakhapatnam', 'Vadodara', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Ghaziabad', 'Rajkot', 'Meerut', 'Aurangabad', 'Jodhpur', 'Coimbatore', 'Kochi', 'Mysuru'].map((city) => (
              <li key={city} style={{ margin: '8px 0' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleCitySelect(city)}
                >
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '10%', 
          right: '10%',
          width: 250, 
          bgcolor: 'background.paper',
          borderRadius: 2, 
          boxShadow: 24, 
          p: 2,
        }}>
          <Typography variant="h6" component="h2">
            Order Summary
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ mt: 1 }}>
            1 item added to your cart.
          </Typography>
          <Button 
            sx={{ mt: 2, bgcolor: '#008080' }}  
            fullWidth
            variant="contained" 
            onClick={handleClose}
          >
            <h6 onClick={() => window.location.replace('/Cartdetails')}>Proceed to cart</h6>
          </Button>
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

    </div>
  );
}

export default Header;