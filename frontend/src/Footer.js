import React from "react";
import im1 from './image/im1.jpeg'
import im2 from './image/im2.jpeg'
import im3 from './image/im3.jpeg'
import im4 from './image/im4.htm'
import im5 from './image/im5.jpeg'
import im6 from './image/im6.jpeg'
import im7 from './image/im7.jpeg'
import im8 from './image/im8.jpeg'
import styled from "styled-components";
function Footer(){
    return(<div>
        <Design1>
        <div class="box d-flex pt-5 pb-5 ">
            <Design2>
            <div class="box1 mt-4 ms-5 pl-4 mb-4">
                    <h6>About Us</h6>
                    <p>Contact Us</p>
                    <p>Press Coverage</p>
                    <p>Careers</p>
                    <p>Business Partnership</p>
                    <p>Become a Health Partner</p>
                    <p>Corporate Governance</p>

             </div>
             </Design2>
             <Design2>
            <div class="box1 mt-4 ms-5 pl-4 mb-4">
                    <h6>Our Policies</h6>
                    <p>Privacy Policy</p>
                    <p>Terms and Conditions</p>
                    <p>Editorial Policy</p>
                    <p>Return Policy</p>
                    <p>IP Policy</p>
                    <p>Grievance Redressal Policy</p>
                    <p>Fake Jobs and Fraud Disclaimer</p>
                </div>
            </Design2>
            <Design2>
            <div class="box1  mt-4 ms-5 pl-4 mb-4">
                    <h6>Our Services</h6>
                    <p>Order Medicines</p>
                    <p>Book Lab Tests</p>
                    <p>Consult a Doctor</p>
                    <p>Order Medicines</p>
                    <p>Care Plan</p>
                    
            </div>
            </Design2>
            <Design2>
            <div class="box1 ms-5 mt-4 pl-4 mb-4">
            <h6>Connect</h6>
            <p>Social Links</p>
            <Design>
            <div className="d-flex mt-4 mb-4 ms-2 ">
                <img className="box1 me-2" src={im1}></img>
                <img className="box1 me-2" src={im2}></img>
                <img className="box1 me-2" src={im3}></img>
                <img className="box1 me-2" src={im5}></img>
            </div>
            </Design>
            <p>Want daily dose of health?</p>
            <button className="btn btn-warning w-75 bg-danger mb-4">submit</button>
            </div>
            </Design2>
            

        </div>
        </Design1>
        <Design5>
        <div className="boxx d-flex mt-3 pt-5 pb-5">
            <div className="boxx1 d-flex">
                <Design4>
                <img className="boxx1" src={im6}></img>
                </Design4>
                <div>
                <h4 className="ms-4 mt-4">Reliable</h4>
                <p className="w-75 mt-2 ms-4">All products displayed on Tata 1mg are procured from verified and licensed pharmacies. All labs listed on the platform are accredited</p>
            </div>
            </div>
            <div className="boxx1 d-flex">
                <Design4>
                <img className="boxx1" src={im7}></img>
                </Design4>
                <div>
                <h4 className="ms-4 mt-4">Secure</h4>
                <p className=" w-75 mt-2 ms-4">Tata 1mg uses Secure Sockets Layer (SSL) 128-bit encryption and is Payment Card Industry Data Security Standard (PCI DSS) compliant</p>
            </div>
            </div>
            <div className="boxx1 d-flex">
                <Design4>
                <img className="boxx1" src={im8}></img>
                </Design4>
                <div>
                <h4 className="ms-4 mt-4">Affordable</h4>
                <p className=" w-75  mt-2 ms-4">Find affordable medicine substitutes, save up to 50% on health products, up to 80% off on lab tests and free doctor consultations.</p>
            </div>
            </div>
        </div>
    </Design5>
    </div>)
}
export default Footer
const Design=styled.div`
.box1{
    width:40px;
    
}`
const Design1=styled.div`
.box{
   
    background-color:#28a99e;
    padding-left:80px;
    padding-right:80px;
    border:1px solid black;
    justify-content:space-evenly;
    margin-top:20px;
    
}`
const Design2=styled.div`
.box1{
    line-height:8px;
    text-weight:20px;
    align-tems:center;
    margin-left:auto;
    margin-right:auto;
    justify-content:space-evenly;
    
}`
const Design4=styled.div`
.boxx1{
    width:100px;
    margin-top:40%;
    padding-left:20%;
}`
const Design5=styled.div`
.boxx{
   background-color:whitesmoke;
   padding-left:50px;
   padding-right:50px;
}`