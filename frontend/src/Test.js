import React, { useState } from 'react';
import logo from './image/logo-png.png';
import './css/Test.css';
import { addCartItem } from './cartStorage';
import { getLabProductId } from './labProductId';

const samplePackage = {
  name: 'Good Health Smart Package',
  price: '₹399',
  tests: 3,
  details: ['Cholesterol screening', 'Thyroid function', 'Average blood sugar'],
};

function Test() {
  const [message, setMessage] = useState('');

  const addPackageToCart = () => {
    try {
      addCartItem({ ...samplePackage, _id: getLabProductId(samplePackage.name), type: 'labTest' });
      setMessage('Package added to your cart. This does not create a test booking.');
    } catch (error) {
      console.error('Unable to add test package to cart:', error);
      setMessage('Unable to update your cart. Please try again.');
    }
  };

  return (
    <main className="test-details-page">
      <section className="test-details-card">
        <div className="test-provider">
          <img src={logo} alt="QuickCure" />
          <p>Sample package information</p>
        </div>
        <div className="test-package-summary">
          <p className="test-demo-label">Package shown for demonstration</p>
          <h1>{samplePackage.name}</h1>
          <p>Includes {samplePackage.tests} sample test categories</p>
          <ul>{samplePackage.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          <p className="test-package-price">{samplePackage.price}</p>
          <button type="button" className="btn btn-warning" onClick={addPackageToCart}>Add package to cart</button>
          <p className="test-demo-note">Adding this item only updates your browser cart. QuickCure does not currently book lab tests.</p>
          <p className="test-cart-message" role="status" aria-live="polite">{message}</p>
        </div>
      </section>

      <section className="test-details-info">
        <h2>About this package</h2>
        <p>This sample entry is part of the project interface. The package contents and preparation guidance should be confirmed with a testing provider before any real test is arranged.</p>
        <h3>Preparation</h3>
        <p>Follow the instructions supplied by the testing provider. This demo does not collect samples or provide test preparation advice.</p>
      </section>
    </main>
  );
}

export default Test;
