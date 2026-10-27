import React, { useRef, useState } from 'react';
import hi from './image/hi.png';
import Footer from "./Footer";
import './css/Lab.css';
import { addCartItem } from './cartStorage';
import { getLabProductId } from './labProductId';

const Lab = () => {
  // Define lab test data as an array of objects
  const labTests = [
    // First Section: Popular Health Checkups (Repeated)
    {
      name: "Comprehensive Gold Full Body",
      tests: 88,
      details: ["Serum Calcium", "Serum Iron Studies Basic (4)", "Vitamin Profile (3)"],
      price: "₹1999",
      oldPrice: "₹4498",
      discount: "55% Off",
      img: null, // Explicitly set to null
    },
    {
      name: "Comprehensive Silver Full Body",
      tests: 80,
      details: ["Serum Calcium", "Serum Iron Studies Basic (4)", "Vitamin B12"],
      price: "₹1599",
      oldPrice: "₹3798",
      discount: "57% Off",
      img: null,
    },
    {
      name: "Comprehensive Platinum Full Body",
      tests: 101,
      details: ["Serum Calcium", "Vitamin Profile (3)", "ESR (Erythrocyte Sedimentation Rate)"],
      price: "₹3399",
      oldPrice: "₹7498",
      discount: "52% Off",
      img: null,
    },
    // Second Section
    {
      name: "Basic Health Checkup",
      tests: 50,
      details: ["Serum Cholesterol", "Blood Glucose", "Thyroid Profile"],
      price: "₹999",
      oldPrice: "₹1998",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Advanced Health Checkup",
      tests: 120,
      details: ["Serum Creatinine", "Liver Function Test", "Kidney Function Test"],
      price: "₹4499",
      oldPrice: "₹8998",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Heart Care Checkup",
      tests: 60,
      details: ["ECG", "Lipid Profile", "Blood Pressure"],
      price: "₹2999",
      oldPrice: "₹5998",
      discount: "50% Off",
      img: null,
    },
    // Third Section
    {
      name: "Diabetes Care Checkup",
      tests: 40,
      details: ["HbA1c", "Fasting Blood Sugar", "Kidney Function Test"],
      price: "₹2499",
      oldPrice: "₹4998",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Women Wellness Checkup",
      tests: 75,
      details: ["Hormone Panel", "Bone Health", "Thyroid Profile"],
      price: "₹3499",
      oldPrice: "₹6998",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Senior Citizen Checkup",
      tests: 90,
      details: ["Heart Function", "Kidney Function", "Bone Health"],
      price: "₹3999",
      oldPrice: "₹7998",
      discount: "50% Off",
      img: null,
    },
    // Fourth Section (Repeated from First)
    {
      name: "Comprehensive Gold Full Body",
      tests: 88,
      details: ["Serum Calcium", "Serum Iron Studies Basic (4)", "Vitamin Profile (3)"],
      price: "₹1999",
      oldPrice: "₹4498",
      discount: "55% Off",
      img: null,
    },
    {
      name: "Comprehensive Silver Full Body",
      tests: 80,
      details: ["Serum Calcium", "Serum Iron Studies Basic (4)", "Vitamin B12"],
      price: "₹1599",
      oldPrice: "₹3798",
      discount: "57% Off",
      img: null,
    },
    {
      name: "Comprehensive Platinum Full Body",
      tests: 101,
      details: ["Serum Calcium", "Vitamin Profile (3)", "ESR (Erythrocyte Sedimentation Rate)"],
      price: "₹3399",
      oldPrice: "₹7498",
      discount: "52% Off",
      img: null,
    },
    // Fifth Section
    {
      name: "Kidney Health Checkup",
      tests: 25,
      details: ["Serum Creatinine", "Urea", "Electrolytes"],
      price: "₹1299",
      oldPrice: "₹2598",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Liver Health Checkup",
      tests: 18,
      details: ["Serum Bilirubin", "SGPT", "SGOT"],
      price: "₹999",
      oldPrice: "₹1998",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Thyroid Health Checkup",
      tests: 10,
      details: ["TSH", "T3", "T4"],
      price: "₹799",
      oldPrice: "₹1598",
      discount: "50% Off",
      img: null,
    },
    // Sixth Section
    {
      name: "Bone Health Checkup",
      tests: 12,
      details: ["Calcium", "Vitamin D", "Phosphate"],
      price: "₹1499",
      oldPrice: "₹2998",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Lung Health Checkup",
      tests: 20,
      details: ["Chest X-ray", "Pulmonary Function Test", "Sputum Test"],
      price: "₹1999",
      oldPrice: "₹3998",
      discount: "50% Off",
      img: null,
    },
    {
      name: "Cardiac Health Checkup",
      tests: 30,
      details: ["ECG", "2D Echo", "Lipid Profile"],
      price: "₹2499",
      oldPrice: "₹4998",
      discount: "50% Off",
      img: null,
    },
  ];

  const packagesRef = useRef(null);
  const [cartMessage, setCartMessage] = useState('');
  const uniqueLabTests = labTests.filter(
    (test, index, allTests) => allTests.findIndex((candidate) => candidate.name === test.name) === index
  );

  // Package selections stay in the browser cart; this page does not create bookings.
  const handleAddToCart = (labTest) => {
    try {
      addCartItem({ ...labTest, _id: getLabProductId(labTest.name), type: 'labTest' });
      setCartMessage(`${labTest.name} added to your cart. This does not create a booking.`);
    } catch (error) {
      console.error('Error adding lab test to cart:', error);
      setCartMessage('Unable to update your cart. Please try again.');
    }
  };

  return (
    <div className="page lab-page">
      <div className="lab-test-banner">
        <div className="carousell w-100">
          <img
            src={hi}
            alt="Lab Test"
            className="carousel-image"
          />
        </div>
        <div className="banner-content">
          <h1>Lab Test From The Comfort Of Your Home</h1>
          <p>Browse the sample health checkup packages available in this demo.</p>
          <div className="features">
            <div className="feature-item">
              <span>Package details and prices</span>
            </div>
            <div className="feature-item">
              <span>Add selections to your cart</span>
            </div>
            <div className="feature-item">
              <span>Booking is not connected</span>
            </div>
          </div>
          <button className="view-packages-button" type="button" onClick={() => packagesRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            View Popular Packages
          </button>
          <p className="lab-demo-note">Adding a package to your cart does not book a test. Online booking is not connected yet.</p>
        </div>
      </div>

      <section className="popular-health-checkups" ref={packagesRef}>
        <h2>Popular Health Checkups</h2>
        <div className="checkups-grid">
          {uniqueLabTests.slice(0, 3).map((test) => (
            <div key={test.name} className="checkup-card">
              <h3>{test.name}</h3>
              <p>Includes {test.tests} Tests</p>
              {test.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
              <p className="price">
                {test.price} <span className="old-price">{test.oldPrice}</span> <span className="discount">{test.discount}</span>
              </p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(test)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="popular-health-checkups">
        <h2>More Health Checkups</h2>
        <div className="checkups-grid">
          {uniqueLabTests.slice(3).map((test) => (
            <div key={test.name} className="checkup-card">
              <h3>{test.name}</h3>
              <p>Includes {test.tests} Tests</p>
              {test.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
              <p className="price">
                {test.price} <span className="old-price">{test.oldPrice}</span> <span className="discount">{test.discount}</span>
              </p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(test)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <p className="lab-cart-message" role="status" aria-live="polite">{cartMessage}</p>

      <Footer />
    </div>
  );
};

export default Lab;
