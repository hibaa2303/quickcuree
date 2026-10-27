import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/Medicines.css';
import { API_BASE_URL } from './api';
import { addCartItem } from './cartStorage';

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const searchQuery = query.get('search')?.trim() || '';

  // Fetch medicines for the selected category
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/medicines`, {
          params: { category }
        });
        const fetchedMedicines = response.data.data || [];
        setMedicines(fetchedMedicines);
        setError(null);

      } catch (err) {
        setError('Failed to fetch medicines.');
        console.error('Error fetching medicines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const filteredMedicines = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    if (!keyword) return medicines;
    return medicines.filter((medicine) =>
      String(medicine.name || '').toLowerCase().includes(keyword)
    );
  }, [medicines, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, location.search]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredMedicines.length / itemsPerPage);

  // Navigate to Details page
  const handleDetailsClick = (medicine) => {
    navigate(`/details/${medicine._id}`, { state: { medicine } });
  };

  // Add to Cart
  const handleAddToCart = (medicine) => {
    try {
      addCartItem(medicine);
      // Removed toast.success notification
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Dynamic title based on category
  const pageTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Medicines` : 'All Medicines';

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="medicines-container">
      {/* Title */}
      <h2>{pageTitle}</h2>

      {/* Medicines Grid */}
      {currentMedicines.length > 0 ? (
        <div className="medicines-grid">
        {currentMedicines.map((medicine) => (
          <div key={medicine._id} className="medicine-card">
            <img src={medicine.img} alt={medicine.name} className="medicine-image" loading="lazy" />
            <h3>{medicine.name}</h3>
            <p className="price">
              MRP {medicine.price}{' '}
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
        ))}
        </div>
      ) : (
        <p>{searchQuery ? 'No matching medicines found.' : 'No medicines available'}</p>
      )}

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {pageCount === 0 ? 0 : currentPage} of {pageCount}</span>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage >= pageCount ||
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
