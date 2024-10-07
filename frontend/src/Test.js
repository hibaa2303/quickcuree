import React from "react"
import styled from "styled-components"
import logo from "./image/logo-png.png";

function Test(){
  const [value, setValue] = React.useState('offer');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  

    
    return(<div className="stt">
        

        
  <div className='d-flex'>       
            
    <div className='w-25 mt-5 ms-3 ps-4 pe-4 border'>          

   <h4 className="mt-4 mb-4">Overview of Test</h4>
<p>Test Details</p>
<hr></hr>
<p>Understand Test</p>
<hr></hr>
<p>Test Measures</p>
<hr></hr>
<p>FAQ's</p>
<hr></hr>
<p>City Price Info</p>
<hr></hr>
<p>Home Collection</p>
<hr></hr>
<p>Reference</p>
<hr></hr>
<p>Other tests</p>
<hr></hr>
<p>About</p>
<hr></hr>
<b className="text-dark mt-5">Note:</b>
<p className="fw-bold">If there are further Queries please mail us at quickcure@gmail.com or call us at 1700170017</p>
  </div>
  <div className="div w-50 ms-3">
  <div className='  d-flex border mt-5 '>
    <Design1>
  <div className='box mt-5 ms-3 me-0 '>
    <div className="d-flex ">
  <h3 className="fw-light me-5">Good Health Smart Package</h3>
  <button  className="btn btn-danger fs-6 w-25 me-0 h-25 ms-5">Book Now</button>
  
 </div>
<h6>Good Health Smart Package Include 3 tests <p className="text-danger">View all</p></h6>
<div className="d-flex">
<p>₹399</p>
<h6 className="mt-2 ms-2 fw-light"><del>₹800</del></h6>
<p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0 text-success small'>50% off</p>
</div>
<div className="d-flex">
    <div>
    <p className="fw-lighter me-5">You need to provide<br></br><p className="fw-light">Blood</p></p>
</div>
<div>
    <p className="fw-lighter ms-5">This test is for<br></br><p className="fw-light">Male,Female</p></p>
</div>
</div>
<div className=" mt-4 mb-5 p-3 col-10 m-2 border">
        <h6 className="ms-1 mb-2">Test Preparation</h6>
        <p className='me-2 mb-0'>You need not stop taking your thyroid medications on the day of the test unless otherwise advised by the doctor.</p>
        </div>
        </div>
  
  </Design1>
  </div>
  <div className="boxx w-100 mt-4 px-4">
    <h4>Understanding Good Health Smart Package</h4>
    <hr></hr>
    <b>What is Good Health Smart Package?</b>
  <p className="mt-3">Being healthy is the key to being happy, and the importance of screening 
    tests for our health cannot be neglected. A Good Health Smart package is tailored
     to identify the health risks early so that preventive steps can be taken in advance, 
     as timely screening helps ensure the right treatment at the right time, which gives you
      better control over your health. This package offers tests to evaluate your cholesterol levels,
       thyroid function,and average blood sugar levels over the past 8 to 12 weeks. This package helps
        in the evaluation of your overall health. No fasting is required for this package. 
        You can eat and drink normally as per your routine. </p>
  </div>
  <hr></hr>
  </div>
  <div className="w-25 box border border-1 mt-5 ms-4">
  <div className="d-flex bg-white">
    <img className="w-25 h-100 m-3"src={logo}></img>
  <p className=" mt-3 me-0">Test Performed by QuickCure Labs</p>
  </div>
  <Design1/>
            <div className="d-flex">
    
      </div>
        <hr></hr>
         <div className="boxx border mt-4 px-4">
            <h4 className="fw-light mb-3">Frequently Booked Together</h4>
            <hr></hr>
            <p className="fw-light">FBS (Fasting Blood Sugar)</p>
            <hr></hr>
            <p className="fw-light">PPBS (Postprandial Blood Sugar)</p>
            <hr></hr>

            <p className="fw-light">CBC (Complete Blood Count)</p>
            <hr></hr>

            <p className="fw-light">Vitamin D (25- Hydroxy)</p>
            <hr></hr>
            <p className="fw-light">Vitamin b12</p>
            <hr></hr>
            <p className="fw-light">Vitamin D & Vitamin B12</p>
            <hr></hr>
            <p className="fw-light">Urine R/M (Urine Routine )</p>
            <hr></hr>
            <p className="fw-light">Lipid Profile</p>
            <hr></hr>
            <p className="fw-light">Tryglecerides Count</p>
            <hr></hr>


</div>
</div>

  </div>

  </div>
                
                
                
                
            





                    





)
}

export default Test
const Design=styled.div`
.img{
    width:55%;
    margin-top:100px;
    margin-left:70px;
    
    
}`
const Design1=styled.div`
.box{
    width:100%;
    color:dark-gary;
    
    
}`
const Design2=styled.div`
.radio{
    width:20px;
    margin-left:20px;
    
}`
const Design3=styled.div`
.dropdown-basic{
background-color:whitesmoke;
color:black;
width:120%; 
 
}`