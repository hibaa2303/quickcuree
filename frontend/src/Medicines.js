import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [membershipDiscount, setMembershipDiscount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch medicines and check membership on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams(location.search);
        const category = query.get('category');
        console.log('Category on Medicines page:', category);

        const response = await axios.get('http://localhost:3000/medicines', {
          params: { category }
        });
        const fetchedMedicines = response.data.data || [];
        setMedicines(fetchedMedicines);
        setFilteredMedicines(fetchedMedicines);
        setError(null);

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
          const membershipResponse = await axios.post('http://localhost:3000/add-membership', {
            userId: user.id
          });
          if (membershipResponse.data.status === 'success') {
            setMembershipDiscount(0.1);
          }
        }
      } catch (err) {
        setError('Failed to fetch medicines.');
        console.error('Error fetching medicines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  // Handle search
  useEffect(() => {
    const searchMedicines = async () => {
      if (searchQuery.trim() === '') {
        setFilteredMedicines(medicines);
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/search', {
          params: { keyword: searchQuery }
        });
        setFilteredMedicines(response.data.items || []);
      } catch (err) {
        console.error('Error searching medicines:', err);
        setFilteredMedicines(medicines);
      }
    };

    searchMedicines();
  }, [searchQuery, medicines]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);

  // Navigate to Details page
  const handleDetailsClick = (medicine) => {
    navigate('/Details', { state: { medicine } });
  };

  // Add to Cart
  const handleAddToCart = (medicine) => {
    try {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const index = cartItems.findIndex(item => item._id === medicine._id);

      if (index !== -1) {
        cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
      } else {
        cartItems.push({ ...medicine, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdated')); // Dispatch cartUpdated event
      // Removed toast.success notification
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Dynamic title based on category
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const pageTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Medicines` : 'All Medicines';

  // Apply membership discount to price
  const getDiscountedPrice = (price) => {
    const numericPrice = parseFloat(price.replace('₹', ''));
    const discountedPrice = numericPrice * (1 - membershipDiscount);
    return `₹${discountedPrice.toFixed(2)}`;
  };

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="medicines-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Title */}
      <h2>{pageTitle}</h2>

      {/* Medicines Grid */}
      {currentMedicines.length > 0 ? (
        currentMedicines.map((medicine) => (
          <div key={medicine._id} className="medicine-card">
            <img src={medicine.img} alt={medicine.name} className="medicine-image" />
            <h3>{medicine.name}</h3>
            <p className="price">
              MRP {membershipDiscount > 0 ? getDiscountedPrice(medicine.price) : medicine.price}{' '}
              <span className="discount">58% off</span>
              {membershipDiscount > 0 && <span className="membership-discount"> + 10% member discount</span>}
            </p>
            <div className="buttons">
              <button
                type="button"
                className="cart-btn"
                onClick={() => handleAddToCart(medicine)}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="details-btn"
                onClick={() => handleDetailsClick(medicine)}
              >
                Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No medicines available</p>
      )}

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination">
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredMedicines.length / itemsPerPage) ||
              filteredMedicines.length === 0
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Medicines;



  