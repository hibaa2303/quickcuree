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


const Signup = () => {
  const Login=async()=>{
    window.location.replace("/Login")
  }
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async (e) => {
    e.preventDefault(); 
    
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        fname,
        email,
        password
      });

      if (response.data.status === 'success') {
        alert('Account created');
        window.location.replace('/login');
      } else {
        alert('Account creation failed');
      }
    } catch (error) {
      console.error('There was an error creating the account:', error);
      alert('Error creating account');
    }
  };

  return (
    <div className="sign container center border ms-5 p-4 w-5 ">
      <div className="col d-flex">
        <div className="rounded mt-2 mb-2 m-5 p-3 w-50 border">
          <Carousel>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="nature center" alt='homeimages' src={s1} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Know your Medicines</h4>
                  <p className="m-0">View medicine information like usage, side effects, and</p>
                  <p>cheaper substitutes before you take them.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="nature" alt='homeimages' src={s2} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Make Healthcare Simpler</h4>
                  <p className="m-0">Get medicine information, order medicines, book lab</p>
                  <p className="m-0">tests, and consult doctors online from the comfort of</p>
                  <p>your home.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="nature" alt='homeimages' src={s3} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Medicine, Home Delivered</h4>
                  <p className="m-0">Order any medicines or health product and we'll deliver</p>
                  <p> it for free. Enjoy discounts on everything.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="nature" alt='homeimages' src={s4} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Lab Tests at Home</h4>
                  <p className="m-0">Book any test from any lab. We'll collect the sample</p>
                  <p> and send the reports. Save up to 80% every time.</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="text-center p-5">
                <img className="nature" alt='homeimages' src={s5} />
                <div className="p-5">
                  <h4 className="text-center mb-4">Health Related Queries?</h4>
                  <p className="m-0">Consult our certified doctors from anywhere, anytime,</p>
                  <p> and for free. We guarantee your privacy.</p>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
        <div className="rounded mt-2 mb-2 p-3 border col-4">
          <h3 className='login mt-4 text-center'>Sign up</h3>
          <p className="first text-center">Create your Account</p>
          <p className="second ms-5 mb-1 fw-bold"> Full Name</p>
          <form onSubmit={createAccount}>
            <input onChange={(e) => setFname(e.target.value)} placeholder="Enter your Full Name" className="form-control ms-5 w-75 mb-3 me-5" />
            <p className="second ms-5 mb-1 fw-bold"> Email</p>
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter your E-mail" className="form-control ms-5 w-75 mb-3 me-5" />
            <p className="second ms-5 mb-1 fw-bold"> Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" className="form-control ms-5 w-75 mb-3 me-5" />
            <button type="submit" className="btn btn-info w-75 ms-5 mt-1 mb-1 me-5">CREATE ACCOUNT</button>
          </form>
          <div className="red">
            <h6 className="mr-5">Already have an account? </h6><h6 className="text-danger ms-1"onClick={()=>{Login()}}>Login</h6>
          </div>
          <p className="text-center">By Signing up, you agree to our
            <div className="space">
              <a href="#">Terms and Conditions</a>
              <p>&</p>
              <a href="#"> Privacy Policy</a>
            </div>
          </p>
          <p className="text-center text-danger">Need Help? Get In Touch</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
