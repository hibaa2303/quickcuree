import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useLocation } from 'react-router-dom'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem } from 'react-bootstrap';
import img22 from './image/img22.jpeg';
import img16 from './image/img16.png';
const Details = () => {
  const location = useLocation();
  const { medicine } = location.state; 
  const [value, setValue] = React.useState('offer');
  const handleChange = (event) => {
    setValue(event.target.value);
  };




  return (
    <div>
      <Design4>
      <div className=' boxx d-flex  '>
        <div className='w-25 mt-2 ms-3 ps-4 pe-4 '>
        <div className='w-100 mt-5 ms-1 ps-4 pe-4 border shadow'>
        <h4 className="mt-2">Overview of {medicine.name}</h4>
          <p>Uses and benefits</p>
          <p>Side effects</p>
          <p>How to use</p>
          <p>How drug works</p>
          <p>Safety advice</p>
          <p>Missed dose</p>
          <p>Alternate Brands of {medicine.name}</p>
          <p>Quick tips</p>
          <p>Fact box</p>
          <p>Interaction with drugs</p>
          <p>Patient concerns</p>
          </div>
          <div className='w-100 mt-4 ms-1 ps-4 pe-4 border shadow'>
          <h6 className="mt-3">Note</h6>
          <p>Consult the doctor if any of these side effects persist or become bothersome. Though Dolo 650 Tablet is essentially safe, it may not suit everyone. Before taking this medicine, let the doctor know if you have any liver or kidney problems, are allergic to it, or are taking other medications as this might affect the dose or suitability of the medicine. In general, take the lowest dose that works for the shortest possible time. It is also the first choice of painkillers during pregnancy or breastfeeding.</p>
          </div>
          
          <div className='w-100 mt-4 ms-1 ps-4 pe-4 border shadow'>
            <h6 className="mt-3">SUBSTITUTES</h6>
            <p>Here are some alternatives to {medicine.name}</p>
            <ul>
              <li>Paracetamol 500mg</li>
              <li>Tylenol 500mg</li>
              <li>Panadol 500mg</li>
              <li>Calpol 500mg</li>
            </ul>
          </div>
          <div className='w-100 mt-4 ms-1 ps-4   pe-4 border shadow'>
            <h6 className="mt-3">USES OF {medicine.name}</h6>
              <li className="text-black">Pain relief</li>
              <li className="text-black mb-2 ">Treatment of Fever</li>
          </div>
          

        </div>
        <div className="div w-50">
          <div className='d-flex border shadow w-100 mt-5 ms-2 me-2 px-4'>
            <Design1>
              <div className='box mt-4 ms-4'>
              <h4 className="text-black mb-4">{medicine.name}</h4>
                <h6 className="">MARKETER</h6>
                <p>Micro Labs Ltd</p>
                <h6>SALT COMPOSITION</h6>
                <p>Paracetamol (650mg)</p>
                <h6>SALT SYNONYMS</h6>
                <p>Acetaminophen</p>
                <h6>STORAGE</h6>
                <p>Store below 25°C</p>
                <p className="text-danger mb-4">Click here to view all substitutes</p>
              </div>
            </Design1>
            <div className="w-50">
            <Design>
                  
                      <img className="img w-75 h-75" alt='medicine' src={medicine.img} />
                    
                </Design>
            </div>
          </div>
          <div className="boxx border shadow w-100 mt-4 ms-2 me-2 px-4">
            <h6 className="mt-3">PRODUCT INTRODUCTION</h6>
            <p>PRODUCT INTRODUCTION {medicine.name} helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold. Dolo 650 Tablet has been one of the most widely prescribed paracetamol-based medications during the COVID-19 pandemic. It should be taken regularly as per the doctor’s advice. Take it with food to avoid an upset stomach. It may be taken alone or in combination with other medications. However, no more than four doses of Dolo 650 Tablet can be taken in 24 hours with a gap of at least 4 hours between two doses. Please do not take it for longer than recommended. Generally, Dolo 650 Tablet is well tolerated, and side effects are rare. However, it may temporarily cause stomach pain, nausea, and vomiting in some people.</p>
          </div>
          
          <div className="box border shadow ms-2 me-2 w-100 mt-4 px-4">
            <h6 className="mt-3">BENEFITS OF {medicine.name}</h6>
            <p>In Pain relief</p>
            <CustomFontText>
       <p> {medicine.name} is a common painkiller for treating aches and pains. It is widely used and rarely causes any side effects if taken properly. To get the most benefits, take it as prescribed. Do not take more or for longer than needed as that can be dangerous. </p>
      </CustomFontText>

          </div>
          <div className="box border shadow ms-2 me-2 w-100 mt-4 px-4">
            <h6 className="mt-3">SIDE EFFECTS OF {medicine.name}</h6>
            <CustomFontText>
            Most side effects do not require any medical attention and disappear as your body adjusts to the medicine. Consult your doctor if they persist or if you’re worried about them
            </CustomFontText>
            
            <button className="rounded-3 bg-body-secondary mb-2">Common side effects of {medicine.name}</button>
            <CustomFontText>
            <li>Stomach pain</li>
            <li>Nausea</li>
            <li>Vomiting</li>
            </CustomFontText>
          </div>
        </div>

        <div className="w-25 box mt-5 ms-4">
          <div className="border border-1 m-lg-2">
            <div className="d-flex bg-light">
              <img className="mt-3 ms-1" src={img16} alt="product" />
              <p className="px-2 mt-3">12,313 people bought this recently</p>
            </div>
            <FormControl>
              <div className="px-3">
                <FormLabel className="demo-controlled-radio-buttons-group"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel value="offer" control={<Radio />} label={medicine.price}/>
                  <div className="d-flex">
                  <FormControlLabel value="offer1" control={<Radio />} label={medicine.price}/>
                  <h6 className="mt-2">free shipping withCare Plan</h6>
                  </div>
                </RadioGroup>
              </div>
            </FormControl>
            <p className="px-4 mt-3 fw-light">Inclusive of all taxes. This offer price is valid on orders above ₹2499. Apply coupon HEALTHALL on the cart. Max. coupon discount is ₹400. T&C apply.</p>
            <Design3>
              <div className="d-flex">
                <Dropdown>
                  <Dropdown.Toggle className='dropdown-basic mt-4 ms-4 mb-4'>
                    1 strip
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>1 strip</Dropdown.Item>
                    <Dropdown.Item>2 strips</Dropdown.Item>
                    <Dropdown.Item>3 strips</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p className="ms-5 mt-4">15.0 tablets in 1 strip</p>
              </div>
            </Design3>
            <button className="btn btn-warning fs-6 w-75 me-1 ms-4 "onClick={() => window.location.replace('/cartdeets')}>Add to Cart</button>
            <p className="mt-3 ms-4">Cash on delivery available</p>
          </div>
          <div className="boxx border shadow mt-4 px-4">
            <div className="d-flex mt-4">
              <h6>Get it delivered by</h6>
              <p className="text-success ms-1">10pm, Tomorrow</p>
            </div>
            <div className="d-flex">
              <p>Delivering to:</p>
              <h6 className="mt-1 ms-1">110020, New Delhi</h6>
            </div>
          </div>
          <div className="boxx border shadow w-100 mt-4 px-4 mb-4">
            <img className="boxx1 w-25" src={img22} alt="promotion" />
            <CustomFontText>
            Airtel Payments Bank: Pay with Airtel Payments Bank wallet and get 10% cashback upto ₹200 on a minimum transaction of ₹1000. Valid only for first-time users of Airtel Payments Bank wallet.
            </CustomFontText>
          </div>
          <Carousel>
            <CarouselItem>
              <div className="container w-100 border shadow">
                <p>Question 1 </p>
                <h6>what are you using this medicine for?</h6>
                <div className=" mt-3 mb-3">
                  <button className="btn btn-primary w-50 mt-2 ms-2">pain relief</button>
                  <button className="btn btn-primary w-50 mt-2 ms-2">fever</button>
                  <button className="btn btn-primary w-50 mt-2 ms-2">others</button>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="rounded-2 bg-success w-25 mb-3">prev</button>
                  <button className="rounded-2 bg-success w-25 mb-3">next</button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="container w-100 border shadow">
                <p>Question 2 </p>
                <h6>How much was the improvement?</h6>
                <div className="mt-3 mb-3">
                 
                  
                    <button className="btn btn-primary mt-2 w-50 ms-1">1</button>
                    <button className="btn btn-primary mt-2 w-50 ms-1">2</button>
                    <button className="btn btn-primary mt-2 w-50 ms-1">3</button>
                    <button className="btn btn-primary mt-2 w-50 ms-1">4</button>
                  
                  <div className="d-flex justify-content-between mt-4">
                    <button className="rounded-2 bg-success w-25  mb-3">prev</button>
                    <button className="rounded-2 bg-success w-25  mb-3">next</button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="container w-100 border shadow">
                <p>Question 3 </p>
                <h6>What were the side-effects while using this medicine?</h6>
                <div className=" mt-3 mb-3">
                  <button className="btn btn-primary mt-2 w-50 ms-2">No Side Effect</button>
                  <button className="btn btn-primary mt-2 w-50 ms-2">Nausea</button>
                  <button className="btn btn-primary mt-2 w-50 ms-2">vomiting</button>
      
                <button className="btn btn-primary mt-2 w-50 ms-2 mt-1 mb-2">stomach pain</button>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="rounded-2 bg-success w-25 mb-2">prev</button>
                  <button className="rounded-2 bg-success w-25 mb-2">next</button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="container w-100 border shadow">
                <p>Question 4 </p>
                <h6>How do you take this medicine?</h6>
                <div className=" mt-3 mb-3">
                  <button className="btn btn-primary mt-2 w-50 ms-2">Empty stomach</button>
                  <button className="btn btn-primary mt-2 w-50 ms-2">with food</button>
                  <button className="btn btn-primary mt-2 w-50 ms-2">with or without food</button>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="rounded-2 bg-success w-25 mb-3">prev</button>
                  <button className="rounded-2 bg-success w-25 mb-3">next</button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="container w-100 border shadow">
                <p>Question 5 </p>
                <h6>Please rate this medicine on price?</h6>
                <div className="mt-3 mb-3">
                  
                  
                    <button className="btn btn-primary mt-2 w-50 ms-1">1</button>
                    <button className="btn btn-primary mt-2 w-50 ms-1">2</button>
                    <button className="btn btn-primary mt-2 w-50 ms-1">3</button>
                    <button className="btn btn-primary mt-2 w-50 ms-1">4</button>
                  
                  <div className="d-flex justify-content-between mt-4">
                    <button className="rounded-2 bg-success w-25 mb-3">prev</button>
                    <button className="rounded-2 bg-success w-25 mb-3">next</button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="container w-100 border shadow">
                <p>Question 6 </p>
                <h6>Any specific precautions you take while using this medicine?</h6>
                <div className="w-25 border-1 mt-5 mb-5">
           
                </div>
                <p>(maximum 200 characters)</p>
                <div className="d-flex justify-content-between">
                  <button className="rounded-2 bg-success w-25  mt-5 mb-3">prev</button>
                  <button className="rounded-2 bg-danger w-25 mt-5 mb-3">submit</button>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
      </div>
      </Design4>
    </div>
  );
}

export default Details;

const Design = styled.div`
  .img {
    width: 55%;
    margin-top: 100px;
    margin-left: 70px;
  }
`;
const Design4 = styled.div`
  .boxx {
    margin-top: 180px;
   
}
`;

const Design1 = styled.div`
  .box {
    width: 75%;
    color: dark-grey;
  }
`;

const Design2 = styled.div`
  .radio {
    width: 20px;
    margin-left: 20px;
  }
`;

const Design3 = styled.div`
  .dropdown-basic {
    background-color: whitesmoke;
    color: black;
    width: 120%;
  }
`;

const CustomFontText = styled.p`
  font-family: 'Arial, sans-serif'; /* Replace with your desired font */
`;