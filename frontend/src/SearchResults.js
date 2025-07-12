import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

// Fallback image in case medicine image fails to load
const fallbackImage = 'https://via.placeholder.com/150?text=Medicine+Image';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get('keyword');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`http://localhost:3000/search?keyword=${keyword}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.status === "success") {
          setSearchResults(Array.isArray(data.items) ? data.items : []);
        } else {
          setError(data.message || 'No results found.');
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred while fetching search results. Please try again.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    } else {
      setLoading(false);
      setError('Please enter a search keyword.');
      setSearchResults([]);
    }
  }, [keyword]);

  const handleAddToCart = (medicine) => {
    if (!medicine || !medicine.name) {
      setError('Invalid medicine data. Please try again.');
      return;
    }
    try {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const index = cartItems.findIndex(item => item.name === medicine.name);
      if (index !== -1) {
        cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
      } else {
        cartItems.push({ ...medicine, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdated'));
      navigate('/medicines');
    } catch (error) {
      console.error('Error adding medicine to cart:', error);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  const handleRetry = () => {
    if (keyword) {
      setLoading(true);
      setError('');
      setSearchResults([]);
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`http://localhost:3000/search?keyword=${keyword}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          if (data.status === "success") {
            setSearchResults(Array.isArray(data.items) ? data.items : []);
          } else {
            setError(data.message || 'No results found.');
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          setError('An error occurred while fetching search results. Please try again.');
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    }
  };

  return (
    <div style={styles.container}>

      {loading ? (
        <div style={styles.loader}>
          <div style={styles.spinner}></div>
          <p>Loading results...</p>
        </div>
      ) : error ? (
        <div style={styles.error}>
          <p>{error}</p>
          <button style={styles.retryButton} onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : searchResults.length > 0 ? (
        <div style={styles.resultsGrid}>
          {searchResults.map((item, index) => (
            <div key={item._id || index} style={styles.medicineCard}>
              <img
                src={item?.img || fallbackImage}
                alt={item?.name || 'Medicine'}
                style={styles.medicineImage}
                onError={(e) => (e.target.src = fallbackImage)}
              />
              <h4 style={styles.medicineName}>{item?.name || 'Unknown Medicine'}</h4>
              <p style={styles.medicinePrice}>MRP {item?.price || 'N/A'}</p>
              <p style={styles.discount}>-58% off</p>
              <div style={styles.buttons}>
                <button
                  style={styles.cartButton}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
                <Link to={`/details`} state={{ medicine: item }}>
                  <button style={styles.detailsButton}>Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noResults}>No items found for "{keyword || 'No Keyword'}". Try a different search term.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '200px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #008080',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    textAlign: 'center',
    color: '#d32f2f',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#008080',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },
  medicineCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.2s',
  },
  medicineImage: {
    width: '100%',
    height: '150px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  medicineName: {
    fontSize: '18px',
    fontWeight: '500',
    margin: '5px 0',
    color: '#333',
  },
  medicinePrice: {
    fontSize: '16px',
    color: '#555',
    margin: '5px 0',
  },
  discount: {
    fontSize: '14px',
    color: '#d32f2f',
    margin: '5px 0',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  cartButton: {
    padding: '8px 16px',
    backgroundColor: '#ffca28',
    color: '#000',
    width:'50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  detailsButton: {
    padding: '8px 16px',
    backgroundColor: '#008080',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    width:'50',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  noResults: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

try {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
} catch (error) {
  console.error('Error adding keyframes:', error);
}

export default SearchResults;