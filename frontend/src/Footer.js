import React from 'react';
import { Link } from 'react-router-dom';
import im6 from './image/im6.jpeg';
import im7 from './image/im7.jpeg';
import im8 from './image/im8.jpeg';
import './css/Footer.css';

function Footer() {
  return (
    <footer className="quickcure-footer">
      <div className="footer-main">
        <section className="footer-brand">
          <h2>QuickCure</h2>
          <p>A student-built healthcare and medicine storefront project.</p>
        </section>

        <nav className="footer-links" aria-label="QuickCure pages">
          <h3>Explore</h3>
          <Link to="/medicines">Medicines</Link>
          <Link to="/lab">Lab Tests</Link>
          <Link to="/consult">Consult Doctors</Link>
          <Link to="/cancer">Cancer Care</Link>
          <Link to="/aboutus">About Us</Link>
        </nav>

        <section className="footer-demo-info">
          <h3>Demo information</h3>
          <p>Your cart is stored in this browser. Online payments, lab bookings, and consultation requests are not connected.</p>
        </section>
      </div>

      <div className="footer-notes">
        <article>
          <img src={im6} alt="" />
          <div><h3>Product listings</h3><p>Medicine information is loaded from the project database.</p></div>
        </article>
        <article>
          <img src={im7} alt="" />
          <div><h3>Local cart</h3><p>Cart items remain in this browser and can be updated or removed.</p></div>
        </article>
        <article>
          <img src={im8} alt="" />
          <div><h3>Service status</h3><p>Booking and payment integrations are not part of this demo.</p></div>
        </article>
      </div>
      <p className="footer-copyright">QuickCure student project</p>
    </footer>
  );
}

export default Footer;
