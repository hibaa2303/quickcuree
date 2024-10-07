// src/components/HomePage.js
import React from 'react';
import hi from './image/hi.png';
import Footer from "./Footer";

const Lab = () => {



  return (
    <div className="page">

<div className="lab-test-banner">
      <div className="carousell w-100">
        {/* Add your image URLs directly here */}
        <img
          src={hi}
          alt="Lab Test"
          className="carousel-image"
        />
      </div>
      <div className="banner-content">
        <h1>Lab Test From The Comfort Of Your Home</h1>
        <p>Trusted by 40 Lakhs+ satisfied customers | 1 Crore+ lab tests booked</p>
        <div className="features">
          <div className="feature-item">
            <i className="fas fa-shield-alt"></i>
            <span>100% Safe & Hygienic</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-vial"></i>
            <span>Home Sample Pick Up</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-file-medical-alt"></i>
            <span>View Reports Online</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-user-md"></i>
            <span>Free Doctor Consultation</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-percentage"></i>
            <span>Best Prices Guaranteed</span>
          </div>
        </div>
        <button className="view-packages-button">View Popular Packages</button>
      </div>
    </div>




      <section className="popular-health-checkups">
        <h2>Popular Health Checkups</h2>
        <div className="checkups-grid">
          <div className="checkup-card">
            <h3>Comprehensive Gold Full Body</h3>
            <p>Includes 88 Tests</p>
            <p>Serum Calcium</p>
            <p>Serum Iron Studies Basic (4)</p>
            <p>Vitamin Profile (3)</p>
            <p className="price">₹1999 <span className="old-price">₹4498</span> <span className="discount">55% Off</span></p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
          <div className="checkup-card">
            <h3>Comprehensive Silver Full Body</h3>
            <p>Includes 80 Tests</p>
            <p>Serum Calcium</p>
            <p>Serum Iron Studies Basic (4)</p>
            <p>Vitamin B12</p>
            <p className="price">₹1599 <span className="old-price">₹3798</span> <span className="discount">57% Off</span></p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
          <div className="checkup-card">
            <h3>Comprehensive Platinum Full Body</h3>
            <p>Includes 101 Tests</p>
            <p>Serum Calcium</p>
            <p>Vitamin Profile (3)</p>
            <p>ESR (Erythrocyte Sedimentation Rate)</p>
            <p className="price">₹3399 <span className="old-price">₹7498</span> <span className="discount">52% Off</span></p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
        </section>

    <section className="popular-health-checkups">
        <div className="checkups-grid">
    <div className="checkup-card">
      <h3>Basic Health Checkup</h3>
      <p>Includes 50 Tests</p>
      <p>Serum Cholesterol</p>
      <p>Blood Glucose</p>
      <p>Thyroid Profile</p>
      <p className="price">₹999 <span className="old-price">₹1998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Advanced Health Checkup</h3>
      <p>Includes 120 Tests</p>
      <p>Serum Creatinine</p>
      <p>Liver Function Test</p>
      <p>Kidney Function Test</p>
      <p className="price">₹4499 <span className="old-price">₹8998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Heart Care Checkup</h3>
      <p>Includes 60 Tests</p>
      <p>ECG</p>
      <p>Lipid Profile</p>
      <p>Blood Pressure</p>
      <p className="price">₹2999 <span className="old-price">₹5998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    </div>
    </section>


    <section className="popular-health-checkups">
        <div className="checkups-grid">
    <div className="checkup-card">
      <h3>Diabetes Care Checkup</h3>
      <p>Includes 40 Tests</p>
      <p>HbA1c</p>
      <p>Fasting Blood Sugar</p>
      <p>Kidney Function Test</p>
      <p className="price">₹2499 <span className="old-price">₹4998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Women Wellness Checkup</h3>
      <p>Includes 75 Tests</p>
      <p>Hormone Panel</p>
      <p>Bone Health</p>
      <p>Thyroid Profile</p>
      <p className="price">₹3499 <span className="old-price">₹6998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Senior Citizen Checkup</h3>
      <p>Includes 90 Tests</p>
      <p>Heart Function</p>
      <p>Kidney Function</p>
      <p>Bone Health</p>
      <p className="price">₹3999 <span className="old-price">₹7998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    </div>
    </section>


    <section className="popular-health-checkups">
  <div className="checkups-grid">
    <div className="checkup-card">
      <h3>Comprehensive Gold Full Body</h3>
      <p>Includes 88 Tests</p>
      <p>Serum Calcium</p>
      <p>Serum Iron Studies Basic (4)</p>
      <p>Vitamin Profile (3)</p>
      <p className="price">₹1999 <span className="old-price">₹4498</span> <span className="discount">55% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Comprehensive Silver Full Body</h3>
      <p>Includes 80 Tests</p>
      <p>Serum Calcium</p>
      <p>Serum Iron Studies Basic (4)</p>
      <p>Vitamin B12</p>
      <p className="price">₹1599 <span className="old-price">₹3798</span> <span className="discount">57% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Comprehensive Platinum Full Body</h3>
      <p>Includes 101 Tests</p>
      <p>Serum Calcium</p>
      <p>Vitamin Profile (3)</p>
      <p>ESR (Erythrocyte Sedimentation Rate)</p>
      <p className="price">₹3399 <span className="old-price">₹7498</span> <span className="discount">52% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    </div></section>

    {/* Additional 6 Unique Health Checkup Cards */}
    <section className="popular-health-checkups">
    <div className="checkups-grid">
    <div className="checkup-card">
      <h3>Kidney Health Checkup</h3>
      <p>Includes 25 Tests</p>
      <p>Serum Creatinine</p>
      <p>Urea</p>
      <p>Electrolytes</p>
      <p className="price">₹1299 <span className="old-price">₹2598</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Liver Health Checkup</h3>
      <p>Includes 18 Tests</p>
      <p>Serum Bilirubin</p>
      <p>SGPT</p>
      <p>SGOT</p>
      <p className="price">₹999 <span className="old-price">₹1998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Thyroid Health Checkup</h3>
      <p>Includes 10 Tests</p>
      <p>TSH</p>
      <p>T3</p>
      <p>T4</p>
      <p className="price">₹799 <span className="old-price">₹1598</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    </div>
    </section>

    <section className="popular-health-checkups">
    <div className="checkups-grid">
    <div className="checkup-card">
      <h3>Bone Health Checkup</h3>
      <p>Includes 12 Tests</p>
      <p>Calcium</p>
      <p>Vitamin D</p>
      <p>Phosphate</p>
      <p className="price">₹1499 <span className="old-price">₹2998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Lung Health Checkup</h3>
      <p>Includes 20 Tests</p>
      <p>Chest X-ray</p>
      <p>Pulmonary Function Test</p>
      <p>Sputum Test</p>
      <p className="price">₹1999 <span className="old-price">₹3998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="checkup-card">
      <h3>Cardiac Health Checkup</h3>
      <p>Includes 30 Tests</p>
      <p>ECG</p>
      <p>2D Echo</p>
      <p>Lipid Profile</p>
      <p className="price">₹2499 <span className="old-price">₹4998</span> <span className="discount">50% Off</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  </div>
</section>

    <Footer/>
</div>


  );
};

export default Lab;

