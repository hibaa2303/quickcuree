import React, { useState } from "react";
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem } from 'react-bootstrap';
import s1 from './image/s1.png';
import s2 from './image/s2.png';
import s3 from './image/s3.png';
import s4 from './image/s4.png';
import s5 from './image/s5.png';
import axios from "axios";


function Login() {
  const Signup=async()=>{
    window.location.replace("/Signup")
  }
  // State hooks for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const LoginUser = async (e) => {
    e.preventDefault();

    try {
      // Using axios to send POST request to the server
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      if (response.data.status === "success") {
        localStorage.setItem("user_data", JSON.stringify(response.data.data));
        alert("Login successful");
        window.location.replace('/Homepage');
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="log container center p-4 w-5">
      <div className="col d-flex">
        <div className="rounded mt-2 mb-2 p-3 w-50 border">
          <Carousel>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="who center" alt='home' src={s1} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Know your Medicines</h4>
                  <p className="m-0">View medicine information like usage, side effects, and cheaper substitutes before you take them.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="who" alt='home' src={s2} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Make Healthcare Simpler</h4>
                  <p className="m-0">Get medicine information, order medicines, book lab tests, and consult doctors online from the comfort of your home.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="who" alt='home' src={s3} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Medicine, Home Delivered</h4>
                  <p className="m-0">Order any medicines or health product and we'll deliver it for free. Enjoy discounts on everything.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="who" alt='home' src={s4} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Lab Tests at Home</h4>
                  <p className="m-0">Book any test from any lab. We'll collect the sample and send the reports. Save up to 80% every time.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="nature" alt='homeimages' src={s5} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Health Related Queries?</h4>
                  <p className="m-0">Consult our certified doctors from anywhere, anytime, and for free. We guarantee your privacy.</p>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>

        <div className="rounded mt-2 mb-2 p-3 border">
          <h3 className='login mt-4 text-center'>Login</h3>
          <p className="first mb-5">Get access to your orders, lab tests & doctor consultations</p>

          {/* Login form */}
          <form onSubmit={LoginUser}>
            <h6 className="second mb-1 ms-5 fw-bold">Enter Email ID or Mobile Number</h6>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              placeholder="Enter your email"
              className="form-control ms-5 w-75 mb-3"
              required
            />

            <h6 className="second ms-5 mb-1 fw-bold">Password</h6>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your Password"
              className="form-control ms-5 w-75 mb-3 me-5"
              required
            />

            <button type="submit" className="btn btn-info w-75 ms-5 mt-5 mb-5">LOGIN</button>
          </form>

          <div className="red">
            <h6 className="mr-5">New on 1mg? </h6><h6 className="text-danger ms-1"onClick={()=>{Signup()}}>Sign Up</h6>
          </div>
          <p className="text-center p-2">By logging in, you agree to our
            <div className="space">
              <a href="#">Terms and Conditions</a>
              <p>&</p>
              <a href="#">Privacy Policy</a>
            </div>
          </p>
          <p className="text-center text-danger">Need Help? Get In Touch</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
