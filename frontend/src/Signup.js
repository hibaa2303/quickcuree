import React, { useState } from "react";
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { CarouselItem } from 'react-bootstrap';
import s1 from './image/s1.png';
import s2 from './image/s2.png';
import s3 from './image/s3.png';
import s4 from './image/s4.png';
import s5 from './image/s5.png';
import axios from "axios";
import './css/Forms.css';
import { API_BASE_URL } from './api';

const Signup = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const createAccount = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fname.trim() || !email.trim() || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Please use a password with at least 8 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        fname: fname.trim(),
        email: email.trim().toLowerCase(),
        password
      });

      if (response.data.status === 'success') {
        alert('Account created successfully!');
        navigate('/login');

      } else {
        setError(response.data.message || 'Account creation failed');
      }
    } catch (err) {
      console.error('Signup error:', err);

      if (err.response) {
        setError(err.response.data.message || 'Error creating account');
      } else if (err.request) {
        setError('No response from server. Please try later.');
      } else {
        setError('Error: ' + err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page sign signup-page">
      <div className="auth-layout">
        {/* Carousel */}
        <div className="auth-intro rounded mt-2 mb-2 p-3 border">
          <Carousel>
            {[s1, s2, s3, s4, s5].map((img, idx) => (
              <CarouselItem key={idx}>
                <div className="text-center p-5">
                  <img className="nature center" alt={`slide-${idx + 1}`} src={img} />
                  <div className="p-5">
                    {idx === 0 && <>
                      <h4 className="text-center mb-4">Know your Medicines</h4>
                      <p>View medicine information like usage, side effects, and cheaper substitutes before you take them.</p>
                    </>}
                    {idx === 1 && <>
                      <h4 className="text-center mb-4">Make Healthcare Simpler</h4>
                      <p>Get medicine information, order medicines, book lab tests, and consult doctors online from home.</p>
                    </>}
                    {idx === 2 && <>
                      <h4 className="text-center mb-4">Medicine, Home Delivered</h4>
                      <p>Order medicines or health products and we'll deliver it for free. Enjoy discounts on everything.</p>
                    </>}
                    {idx === 3 && <>
                      <h4 className="text-center mb-4">Lab Tests at Home</h4>
                      <p>Book any test from any lab. We'll collect the sample and send the reports. Save up to 80% every time.</p>
                    </>}
                    {idx === 4 && <>
                      <h4 className="text-center mb-4">Health Related Queries?</h4>
                      <p>Explore QuickCure's consultation information. Appointment requests are not connected yet.</p>
                    </>}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>

        {/* Signup form */}
        <div className="auth-form rounded mt-2 mb-2 p-3 border">
          <h3 className="login mt-4 text-center">Sign up</h3>
          <p className="first text-center">Create your Account</p>

          <form onSubmit={createAccount}>
            <label htmlFor="signup-name" className="second mb-1 fw-bold">Full Name</label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              maxLength={80}
              required
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="Enter your Full Name"
              className="form-control ms-5 w-75 mb-3 me-5"
            />

            <label htmlFor="signup-email" className="second mb-1 fw-bold">Email</label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your E-mail"
              className="form-control ms-5 w-75 mb-3 me-5"
            />

            <label htmlFor="signup-password" className="second mb-1 fw-bold">Password</label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="form-control ms-5 w-75 mb-3 me-5"
            />

            {error && <p className="text-danger ms-5">{error}</p>}

            <button type="submit" className="btn btn-info auth-submit mt-1 mb-1" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="red d-flex justify-content-center align-items-center">
            <h6 className="mr-2">Already have an account?</h6>
            <h6
              className="text-danger ms-1"
              style={{ cursor: 'pointer' }}
              onClick={handleLoginRedirect}
            >
              Login
            </h6>
          </div>

          <p className="text-center auth-note">By signing up, you agree to our Terms and Conditions &amp; Privacy Policy.</p>

          <p className="text-center text-danger">Need Help? Get In Touch</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
