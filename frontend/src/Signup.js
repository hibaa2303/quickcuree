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




const Signup = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
};

const createAccount = async (e) => {
  e.preventDefault();
  setError(null);

  if (!fname || !email || !password) {
    setError("Please fill all fields.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/signup', {
      fname,
      email,
      password
    });

    if (response.data.status === 'success') {
      alert('Account created successfully!');
      window.location.replace('/login');
    } else {
      setError(response.data.message || 'Account creation failed');
    }
  } catch (err) {
    console.error('Signup error:', err);

    if (err.response) {
      // Backend responded with error code
      console.error('Response data:', err.response.data);
      setError(err.response.data.message || 'Error creating account');
    } else if (err.request) {
      // No response received
      setError('No response from server. Please try later.');
    } else {
      // Something else
      setError('Error: ' + err.message);
    }
  }
};

  
  return (
    <div className="sign container center border ms-5 p-4 w-5">
      <div className="col d-flex">
        <div className="rounded mt-2 mb-2 m-5 p-3 w-50 border">
          <Carousel>
            {[s1, s2, s3, s4, s5].map((img, idx) => (
              <CarouselItem key={idx}>
                <div className="text-center p-5">
                  <img className="nature center" alt={`slide-${idx + 1}`} src={img} />
                  <div className="p-5">
                    {idx === 0 && <>
                      <h4 className="text-center mb-4">Know your Medicines</h4>
                      <p className="m-0">View medicine information like usage, side effects, and</p>
                      <p>cheaper substitutes before you take them.</p>
                    </>}
                    {idx === 1 && <>
                      <h4 className="text-center mb-4">Make Healthcare Simpler</h4>
                      <p className="m-0">Get medicine information, order medicines, book lab</p>
                      <p className="m-0">tests, and consult doctors online from the comfort of</p>
                      <p>your home.</p>
                    </>}
                    {idx === 2 && <>
                      <h4 className="text-center mb-4">Medicine, Home Delivered</h4>
                      <p className="m-0">Order any medicines or health product and we'll deliver</p>
                      <p> it for free. Enjoy discounts on everything.</p>
                    </>}
                    {idx === 3 && <>
                      <h4 className="text-center mb-4">Lab Tests at Home</h4>
                      <p className="m-0">Book any test from any lab. We'll collect the sample</p>
                      <p> and send the reports. Save up to 80% every time.</p>
                    </>}
                    {idx === 4 && <>
                      <h4 className="text-center mb-4">Health Related Queries?</h4>
                      <p className="m-0">Consult our certified doctors from anywhere, anytime,</p>
                      <p> and for free. We guarantee your privacy.</p>
                    </>}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>

        <div className="rounded mt-2 mb-2 p-3 border col-4">
          <h3 className="login mt-4 text-center">Sign up</h3>
          <p className="first text-center">Create your Account</p>

          <form onSubmit={createAccount}>
            <label className="second ms-5 mb-1 fw-bold">Full Name</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="Enter your Full Name"
              className="form-control ms-5 w-75 mb-3 me-5"
            />

            <label className="second ms-5 mb-1 fw-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your E-mail"
              className="form-control ms-5 w-75 mb-3 me-5"
            />

            <label className="second ms-5 mb-1 fw-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="form-control ms-5 w-75 mb-3 me-5"
            />

            {error && <p className="text-danger ms-5">{error}</p>}

            <button type="submit" className="btn btn-info w-75 ms-5 mt-1 mb-1 me-5">
              CREATE ACCOUNT
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

          <p className="text-center">
            By Signing up, you agree to our
            <div className="space">
              <a href="#">Terms and Conditions</a>
              <span> & </span>
              <a href="#">Privacy Policy</a>
            </div>
          </p>

          <p className="text-center text-danger">Need Help? Get In Touch</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
