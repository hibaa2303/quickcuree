import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem } from 'react-bootstrap';
import s1 from './image/s1.png';
import s2 from './image/s2.png';
import s3 from './image/s3.png';
import s4 from './image/s4.png';
import s5 from './image/s5.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Forms.css';
import { API_BASE_URL } from './api';
import { moveCart, moveMembershipSelection } from './cartStorage';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const LoginUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email.trim().toLowerCase(),
        password,
      });

      if (response.data.status === 'success') {
        const userData = {
          id: response.data.data.id,
          username: response.data.data.username,
          firstName: response.data.data.firstName || response.data.data.username,
        };
        const intendedLocation = location.state?.from;
        const targetPath = typeof intendedLocation?.pathname === 'string'
          && intendedLocation.pathname.startsWith('/')
          && !intendedLocation.pathname.startsWith('//')
          && intendedLocation.pathname !== '/login'
          ? `${intendedLocation.pathname}${intendedLocation.search || ''}${intendedLocation.hash || ''}`
          : '/homepage';
        const hasCartSource = location.state?.resumeCheckout === true
          && Object.prototype.hasOwnProperty.call(location.state, 'cartOwnerId');

        if (hasCartSource) {
          try {
            moveCart(location.state.cartOwnerId ?? null, String(userData.id));
            moveMembershipSelection(location.state.cartOwnerId ?? null, String(userData.id));
          } catch (storageError) {
            setError('Login succeeded, but your cart could not be transferred. Your original cart is still saved; please check browser storage and try again.');
            return;
          }
        }
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.data.token);
        window.dispatchEvent(new Event('userUpdated')); // Trigger user update
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success('Login successful!');
        navigate(targetPath, { replace: true });
      } else {
        setError('Invalid Email or Password');
        toast.error('Invalid Email or Password');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      const message = error.response?.status === 401
        ? 'Invalid email or password.'
        : 'Unable to log in right now. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageSources = [
    { src: s1, alt: 'home', className: 'who center' },
    { src: s2, alt: 'home', className: 'who' },
    { src: s3, alt: 'home', className: 'who' },
    { src: s4, alt: 'home', className: 'who' },
    { src: s5, alt: 'homeimages', className: 'nature' },
  ];

  return (
    <div className="auth-page log login-page">
      <div className="auth-layout">
        <div className="auth-intro rounded mt-2 mb-2 p-3 border">
          <Carousel>
            {imageSources.map((image, index) => (
              <CarouselItem key={index}>
                <div className="text-center p-5">
                  <img
                    className={image.className}
                    alt={image.alt}
                    src={image.src}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      console.error(`Failed to load image: ${image.src}`);
                    }}
                  />
                  <div className="p-5">
                    <h4 className="text-center mb-4">
                      {index === 0 && 'Know your Medicines'}
                      {index === 1 && 'Make Healthcare Simpler'}
                      {index === 2 && 'Medicine, Home Delivered'}
                      {index === 3 && 'Lab Tests at Home'}
                      {index === 4 && 'Health Related Queries?'}
                    </h4>
                    <p className="m-0">
                      {index === 0 && 'View medicine information like usage, side effects, and cheaper substitutes before you take them.'}
                      {index === 1 && 'Get medicine information, order medicines, book lab tests, and consult doctors online from the comfort of your home.'}
                      {index === 2 && "Order any medicines or health product and we'll deliver it for free. Enjoy discounts on everything."}
                      {index === 3 && "Book any test from any lab. We'll collect the sample and send the reports. Save up to 80% every time."}
                      {index === 4 && 'Explore QuickCure’s consultation information. Appointment requests are not connected yet.'}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>

        <div className="auth-form rounded mt-2 mb-2 p-3 border">
          <h3 className="login mt-4 text-center">Login</h3>
          <p className="first mb-5">
            Get access to your orders, lab tests & doctor consultations
          </p>

          {error && (
            <p className="text-danger text-center mb-3">{error}</p>
          )}
          {!error && location.state?.authMessage && (
            <p className="text-danger text-center mb-3" role="status">{location.state.authMessage}</p>
          )}

          <form onSubmit={LoginUser}>
            <label htmlFor="login-email" className="second mb-1 fw-bold">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter your email"
              className="form-control mb-3"
              value={email}
              required
            />

            <label htmlFor="login-password" className="second mb-1 fw-bold">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              maxLength={128}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="form-control mb-3"
              value={password}
              required
            />

            <button type="submit" className="btn btn-info auth-submit mt-3 mb-3" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in…' : 'LOGIN'}
            </button>
          </form>

          <div className="red d-flex justify-content-center">
            <h6 className="mr-1">New to QuickCure?</h6>
            <h6
              className="text-danger ms-1"
              onClick={handleSignupRedirect}
              style={{ cursor: 'pointer' }}
            >
              Sign Up
            </h6>
          </div>
          <p className="text-center p-2 auth-note">By logging in, you agree to our Terms and Conditions &amp; Privacy Policy.</p>
          <p className="text-center text-danger">Need Help? Get In Touch</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
