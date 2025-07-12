import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function Login() {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const LoginUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        const userData = {
          id: response.data.data.id,
          username: response.data.data.username,
          firstName: response.data.data.firstName || response.data.data.username,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('userUpdated')); // Trigger user update
        toast.success('Login successful!');
        navigate('/homepage');
      } else {
        setError('Invalid Email or Password');
        toast.error('Invalid Email or Password');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      setError('An error occurred during login. Please try again.');
      toast.error('An error occurred during login. Please try again.');
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
    <div className="log container center p-4 w-5">
      <div className="col d-flex">
        <div className="rounded mt-2 mb-2 p-3 w-50 border">
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
                      {index === 4 && 'Consult our certified doctors from anywhere, anytime, and for free. We guarantee your privacy.'}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>

        <div className="rounded mt-2 mb-2 p-3 border">
          <h3 className="login mt-4 text-center">Login</h3>
          <p className="first mb-5">
            Get access to your orders, lab tests & doctor consultations
          </p>

          {error && (
            <p className="text-danger text-center mb-3">{error}</p>
          )}

          <form onSubmit={LoginUser}>
            <h6 className="second mb-1 ms-5 fw-bold">Enter Email ID or Mobile Number</h6>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              placeholder="Enter your email"
              className="form-control ms-5 w-75 mb-3"
              value={email}
              required
            />

            <h6 className="second ms-5 mb-1 fw-bold">Password</h6>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your Password"
              className="form-control ms-5 w-75 mb-3 me-5"
              value={password}
              required
            />

            <button type="submit" className="btn btn-info w-75 ms-5 mt-5 mb-5">
              LOGIN
            </button>
          </form>

          <div className="red d-flex justify-content-center">
            <h6 className="mr-1">New on 1mg?</h6>
            <h6
              className="text-danger ms-1"
              onClick={handleSignupRedirect}
              style={{ cursor: 'pointer' }}
            >
              Sign Up
            </h6>
          </div>
          <p className="text-center p-2">
            By logging in, you agree to our
            <div className="space">
              <a href="#">Terms and Conditions</a>
              <p>&</p>
              <a href="#">Privacy Policy</a>
            </div>
          </p>
          <p className="text-center text-danger">Need Help? Get In Touch</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;