import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from './api';
import { addCartItem } from './cartStorage';
import './css/SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword')?.trim() || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(Boolean(keyword));
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      setLoading(false);
      setError('Please enter a search keyword.');
      return undefined;
    }

    const controller = new AbortController();
    const search = async () => {
      setLoading(true);
      setError('');
      setCartMessage('');
      try {
        const response = await fetch(
          `${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`Search failed (${response.status}).`);
        const data = await response.json();
        if (data.status !== 'success') throw new Error(data.message || 'Search failed.');
        setResults(Array.isArray(data.items) ? data.items : []);
      } catch (searchError) {
        if (searchError.name !== 'AbortError') {
          console.error('Search request failed:', searchError);
          setResults([]);
          setError('Unable to load search results. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    search();
    return () => controller.abort();
  }, [keyword, retryCount]);

  const handleAddToCart = (medicine) => {
    try {
      addCartItem(medicine);
      setCartMessage(`${medicine.name} added to your cart.`);
    } catch (cartError) {
      console.error('Unable to add medicine to cart:', cartError);
      setCartMessage('Unable to update your cart. Please try again.');
    }
  };

  return (
    <main className="search-results-page">
      <h1>Search results for “{keyword || '—'}”</h1>
      {loading && <p role="status">Loading results…</p>}
      {error && (
        <div className="search-error" role="alert">
          <p>{error}</p>
          {keyword && <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Retry</button>}
        </div>
      )}
      {!loading && !error && results.length === 0 && <p>No matching medicines found.</p>}
      <p className="search-cart-message" role="status" aria-live="polite">{cartMessage}</p>
      <div className="search-results-grid">
        {results.map((medicine, index) => (
          <article key={medicine._id || index} className="search-result-card">
            <img src={medicine.img} alt={medicine.name} loading="lazy" />
            <h2>{medicine.name}</h2>
            <p>MRP {medicine.price || 'Price unavailable'}</p>
            <div className="search-result-actions">
              <button type="button" className="cart-btn" onClick={() => handleAddToCart(medicine)}>Add to Cart</button>
              <Link className="details-btn" to={medicine._id ? `/details/${medicine._id}` : '/details'} state={{ medicine }}>Details</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default SearchResults;
