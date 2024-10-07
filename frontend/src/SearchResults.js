import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';


const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get('keyword');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search?keyword=${keyword}`);
        const data = await response.json();

        if (data.status === "success") {
          setSearchResults(data.items);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred while fetching search results.");
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [keyword]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='search-results-container'>
      <h3>Search Results for "{keyword}"</h3>
      {searchResults.length > 0 ? (
        <div className='results-grid'>
          {searchResults.map(item => (
            <div key={item._id} className='medicine-card'>
              <img src={item.img} alt={item.name} className='medicine-image' />
              <h4>{item.name}</h4>
              <p>MRP {item.price}</p>
              <p className="discount text-danger">-58% off</p>
              <div className='buttons'>
                <button className='cart-button'>Cart</button>
                <Link to={`/medicine/${item._id}`}>
                  <button className='details-button'>Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default SearchResults;

