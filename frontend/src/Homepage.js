import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {CarouselItem} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img1 from './image/img1.png';
import img2 from './image/img2.png';
import img3 from './image/img3.png';
import img4 from './image/img4.jpg';
import img5 from './image/img5.png';
import img6 from './image/img6.png';
import item1 from './image/item1.webp';
import item2 from './image/item2.webp';
import Footer from './Footer';
import Medicines from './Medicines';


function Homepage() {
  
  const List=async()=>{
    window.location.replace("/List")
  }
  const Test=async()=>{
    window.location.replace("/Test")
  }
  const Medicines=async()=>{
    window.location.replace("/Medicines")
  }

  return (<div  className='fulll '>
  <div className='first d-flex mt-0'>
<Carousel >
      <CarouselItem>
        <img className="image" alt="homeimages" src={img1}/>
      </CarouselItem>
      <CarouselItem>
      <img className="image" alt="homeimages" src={img2}/>
      </CarouselItem>
      <CarouselItem>
        <img className="image" alt="homeimages" src={img3}/>
      </CarouselItem>
      <CarouselItem>
        <img className="image"  alt="homeimages" src={img4}/>
      </CarouselItem>
      <CarouselItem>
        <img className="image" alt="homeimages"  src={img5}/>
      </CarouselItem>
      <CarouselItem>
        <img className="image" alt="homeimages" src={img6}/>
      </CarouselItem>

    </Carousel>
      <img className='image1' src={item1}/>
   </div>
   <div className='line'>
    <h2>Quick Cure: India’s Leading Online Pharmacy & Healthcare Platform</h2>
   </div>
   <div>
    <img className='image3' src={item2}/>
   </div>
    <Container fluid className='m-0'>
      <Row>
        <b className='box'>Shop by Health Concern</b>
        <Col className='bg-light p-4'>
          <div className='health-buttons cont'>
            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Diabetes Care' src='https://onemg.gumlet.io/a56b26a0-30f1-4977-96f8-7acf1b3e0e02.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Diabetes Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Heart Care' src='https://onemg.gumlet.io/629aaf65-515f-4069-b730-28618f78597b.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Heart Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Stomach Care' src='https://onemg.gumlet.io/b251c9cf-8d88-4fb8-8c3c-7b328caa9f70.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Stomach Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Liver Care' src='https://onemg.gumlet.io/573d8a1a-edd0-46a5-a0fe-01a1c2bcc8f2.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Liver Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Bone Care' src='https://onemg.gumlet.io/a1af8b43-2836-483d-8709-99eff1cc6f70.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Bone Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Kidney Care' src='https://onemg.gumlet.io/96f9ed8a-ba62-426c-bd66-6762f40f3370.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Kidney Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Derma Care' src='https://onemg.gumlet.io/730dbe50-4bdc-4fa8-9a09-93bc5d6c6f38.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Derma Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Respiratory Care' src='https://onemg.gumlet.io/8051e79c-6152-440e-b402-8d1ba8d7c82e.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Respiratory Care</button>
              </div>
            </div>
            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Derma Care' src='https://onemg.gumlet.io/730dbe50-4bdc-4fa8-9a09-93bc5d6c6f38.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Derma Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Respiratory Care' src='https://onemg.gumlet.io/8051e79c-6152-440e-b402-8d1ba8d7c82e.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Respiratory Care</button>
              </div>
            </div>
            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Derma Care' src='https://onemg.gumlet.io/730dbe50-4bdc-4fa8-9a09-93bc5d6c6f38.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Derma Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Respiratory Care' src='https://onemg.gumlet.io/8051e79c-6152-440e-b402-8d1ba8d7c82e.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Respiratory Care</button>
              </div>
            </div>
            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Derma Care' src='https://onemg.gumlet.io/730dbe50-4bdc-4fa8-9a09-93bc5d6c6f38.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Derma Care</button>
              </div>
            </div>

            <div className='health-button'>
              <img className='u mb-2 mt-1 h-75' alt='Respiratory Care' src='https://onemg.gumlet.io/8051e79c-6152-440e-b402-8d1ba8d7c82e.png?format=auto' />
              <div className="product-btn">
                <button onClick={() => Medicines()}>Respiratory Care</button>
              </div>
            </div>

            

          </div>
        </Col>
      </Row>
    </Container>
      <Container fluid className='m-0'>
        <Row>
        <b className='box p-0'>Featured Brands</b>
          <Col className='const bg-light w-auto m-0 p-0'>
          <div className='utensil'>
          <div className='uten'>
          <div className='item'>
            
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1718863018_Morepen.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1718863024_Kapiva.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1718687527_Himalaya.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1718863030_Iodex.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1718863037_Optimum+Nutrition.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1718863043_Baidyanath.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1718863048_Revital+Icon.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-05%2F1716558850_tejasya.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-05%2F1716558862_Tata+1mg.png?format=auto'/>
          </div>
          </div>
          </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className='m-0'>
        <Row>
        <b className='box p-0'>Full Body Tests</b>
          <Col className="container center p-4 d-flex ">
          <div className='cont d-flex'>

        <div className="test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
      
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Good Health Smart Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹399</p>
        <p><del>798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Comprehensive Gold Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹2249</p>
        <p><del>4498</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Good Health Silver Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹699</p>
        <p><del>1398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Comprehensive Silver Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>

        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Women Wellness Premium Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Comprehensive Platinum Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3599</p>
        <p><del>₹7198</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Good Health Premium Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1499</p>
        <p><del>₹2998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Senior Citizen Advanced Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1675</p>
        <p><del>₹3350</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Men Health Premium Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3  m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Fever Package Extensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹999</p>
        <p><del>₹1998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex ">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Good Health Gold Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹999</p>
        <p><del>₹1998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3  m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>
       
        <div className=" test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5"onClick={()=>{Test()}}>Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>
        </div>
      
           </Col>
        </Row>
      </Container>
      <Container fluid className='m-0'>
    <Row>
        <Col className='bg-light p-4'>
            <b className='box'>Popular Categories</b>
            <div className='popular-categories'>
                <div className='category-item'>
                    <img className='category-img' alt='Best Offers' src='https://onemg.gumlet.io/859adc35-4c39-4094-a74d-281ffff9a3e6.png?format=auto'/>
                    <div className='product-btn'>
                        <button onClick={() => {Medicines()}}>Best Offers</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Supplements' src='https://onemg.gumlet.io/67be6470-4f74-4a2e-a37a-ececb775afeb.png?format=auto'/>
                    <div className='product-btn'>
                        <button>Supplements</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Nutritional Drinks' src='https://onemg.gumlet.io/diagnostics%2F2024-01%2F1706010756_Women+care.jpg?format=auto'/>
                    <div className='product-btn'>
                        <button>Nutritional Drinks</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Skin Care' src='https://onemg.gumlet.io/624f6cd2-f857-4f8c-a689-75c849516ea8.png?format=auto'/>
                    <div className='product-btn'>
                        <button>Skin Care</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Hair Care' src='https://onemg.gumlet.io/4e4b7cd8-0885-42c2-8915-65b7355fc1d8.png?format=auto'/>
                    <div className='product-btn'>
                        <button>Hair Care</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Ayurveda' src='https://onemg.gumlet.io/59e2ffed-ab85-496d-9423-d97cd0305b52.png?format=auto'/>
                    <div className='product-btn'>
                        <button>Ayurveda</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Pain Relief' src='https://onemg.gumlet.io/33d8bac6-26c1-4828-8b39-4f6183430833.png?format=auto'/>
                    <div className='product-btn'>
                        <button>Pain Relief</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Homeopathy' src='https://onemg.gumlet.io/f1683989-9e0d-4a8b-9c6c-55ef674cfc0f.png?format=auto'/>
                    <div className='product-btn'>
                        <button>Homeopathy</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Hoop Rollon' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/8ce22cf76f4044b6bc5d840104d52c1c.jpg'/>
                    <div className='product-btn'>
                        <button>Hoop Rollon</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Saridon' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/278b211d32c64c0884dc4b7befcb7c40.jpg'/>
                    <div className='product-btn'>
                        <button>Saridon</button>
                    </div>
                </div>
                <div className='category-item'>
                    <img className='category-img' alt='Volini' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/4f52de3934a24db98550be0e08ab6044.jpg'/>
                    <div className='product-btn'>
                        <button>Volini</button>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
</Container>


      <Container fluid className='m-0'>
        <Row>
        <b className='box p-0'>Featured Brands</b>
          <Col className='const bg-light w-auto m-0 p-0'>
          <div className='utensil'>
          <div className='uten'>
          <div className='item'>
            
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-09%2F1725426638_Goqii.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-09%2F1725516243_Centrum.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-09%2F1725426617_Aimil.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-09%2F1725516254_Cetaphil.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-09%2F1725516289_Protinex1.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/diagnostics%2F2024-06%2F1719206972_tejasya.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1627648261/onneibznnitqsn5twumi.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1627648428/xemgonnppssxvagkjxzd.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1630927780/guiy84rk41kgofd5atft.png?format=auto'/>
          </div>
          </div>
          </div>
          </Col>
        </Row>
      </Container>
      
      <Container fluid className='m-0'>
        <Row>
        <b className='box p-0'>Full Body Tests</b>
          <Col className="container center p-4 d-flex ">
          <div className='cont d-flex'>

        <div className=" test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
      
        <h6 className="ms-1 mb-5">Good Health Smart Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹399</p>
        <p><del>798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Comprehensive Gold Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹2249</p>
        <p><del>4498</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Good Health Silver Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹699</p>
        <p><del>1398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Comprehensive Silver Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>

        </div>

        <div className="test  mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Women Wellness Premium Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Comprehensive Platinum Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3599</p>
        <p><del>₹7198</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Good Health Premium Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1499</p>
        <p><del>₹2998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Advanced Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1675</p>
        <p><del>₹3350</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Men Health Premium Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3  m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Fever Package Extensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹999</p>
        <p><del>₹1998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex ">
        <h6 className="ms-1 mb-5">Good Health Gold Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹999</p>
        <p><del>₹1998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3  m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>
       
        <div className="test  mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>
        </div>
      
           </Col>
        </Row>
      </Container>
      <Container fluid className='m-0'>
    <Row>
        <Col className='ef const bg-light'>
            <b className='box'>Dabur Top Sellers</b>
            <div className='dabur-top-sellers'>
                <div className='product-item'>
                    <img className='product-img' alt='Dabur Jamun Neem' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/dc307fcd6716499bb996d3b2a96031ce.jpg'/>
                    <div className='product-btn'>
                        <button onClick={() => {List()}}>Dabur Jamun Neem</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Chawanprash' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/2ff26656d9fc407fbd08258be406ad56.jpg'/>
                    <div className='product-btn'>
                        <button>Chawanprash</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Chawanprash' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/5ce674b9d31a49dea8301209348feca0.jpg'/>
                    <div className='product-btn'>
                        <button>Chawanprash</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Dabur Pudin Pearls' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/35cff9f550194badaf09202d71f4f72e.jpg'/>
                    <div className='product-btn'>
                        <button>Dabur Pudin Pearls</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Honitus Cough Syrup' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/48e266d08fe04f60912b3db3186cc8d7.jpg'/>
                    <div className='product-btn'>
                        <button>Honitus Cough Syrup</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Giloy Neem Juice' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/cropped/xpf6kmidkixkwktg87sm.png'/>
                    <div className='product-btn'>
                        <button>Giloy Neem Juice</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Glycodab Tablets' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/5aabe80e44734a52a21eb2a1ecd472d4.jpg'/>
                    <div className='product-btn'>
                        <button>Glycodab Tablets</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Isabgol Powder' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/eeolcgztmtkubin5mjfg.jpg'/>
                    <div className='product-btn'>
                        <button>Isabgol Powder</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Double Isabgol Powder' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/a0a1956f-2a5e-4095-8754-d30822a0a3b4.jpeg'/>
                    <div className='product-btn'>
                        <button>Double Isabgol Powder</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Triphala Churna' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/69350a870b264b77b7dff27a90599323.jpg'/>
                    <div className='product-btn'>
                        <button>Triphala Churna</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Adulsa Cough Syrup' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/f50301f544ae48cbaacd858c112a7eb7.jpg'/>
                    <div className='product-btn'>
                        <button>Adulsa Cough Syrup</button>
                    </div>
                </div>
                <div className='product-item'>
                    <img className='product-img' alt='Amla & Vit C Juice' src='https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/cropped/xrutleivd3jyw7e4ho8h.png'/>
                    <div className='product-btn'>
                        <button>Amla & Vit C Juice</button>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
</Container>

      <Container fluid className='m-0'>
        <Row>
        <b className='box p-0'>Ayurveda top brands</b>
          <Col className='const bg-light w-auto m-0 p-0'>
          <div className='utensil'>
          <div className='uten'>
          <div className='item'>
            
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1627648521/ktzih4wnm4xfynusrep6.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1627648507/kvwlak2daqdzaflvgx2u.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1627648455/shxhntpjye31tu8frfjs.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1630927780/guiy84rk41kgofd5atft.png?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/image/upload/v1627648303/dekl61bd9thu21vmypkm.png?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/d6f2e4a2-1dd8-43fe-ae99-fe61777f478d.webp?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/32571bdc-487c-4ebe-98f9-9aa91464fd76.webp?format=auto'/>
            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/295fa7a6-58c0-4ae5-8057-e33bef42b6f2.webp?format=auto'/>

            <img className='u m-4' alt='images' src='https://onemg.gumlet.io/02e74893-3203-4bd5-8b1e-375b28f62a62.webp?format=auto'/>
          </div>
          </div>
          </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className='m-0'>
        <Row>
        <b className='box p-0'>Full Body Tests</b>
          <Col className="container center p-4 d-flex ">
          <div className='cont d-flex'>

        <div className="test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
      
        <h6 className="ms-1 mb-5">Good Health Smart Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹399</p>
        <p><del>798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Comprehensive Gold Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹2249</p>
        <p><del>4498</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Good Health Silver Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹699</p>
        <p><del>1398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Comprehensive Silver Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>

        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Women Wellness Premium Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Comprehensive Platinum Full Body Test</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3599</p>
        <p><del>₹7198</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Good Health Premium Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1499</p>
        <p><del>₹2998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Advanced Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1675</p>
        <p><del>₹3350</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3 m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Men Health Premium Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹1899</p>
        <p><del>₹3798</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className=" test mt-2 mb-2 p-3 col-3  m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Fever Package Extensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹999</p>
        <p><del>₹1998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex ">
        <h6 className="ms-1 mb-5">Good Health Gold Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹999</p>
        <p><del>₹1998</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 col-3  m-2 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>

        <div className="test  mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>
       
        <div className="test  mt-2 mb-2 p-3 m-2 col-3 shadow border">
        <div className="d-flex">
        <h6 className="ms-1 mb-5">Senior Citizen Comprehensive Package</h6></div>
        <div className='d-flex'>
        <p className='me-2 mb-0'>₹3699</p>
        <p><del>₹7398</del></p>
        <p className='border border-success-subtle bg-success-subtle p-1 ms-3 mt-0'>50% off</p>
        </div>
        </div>
        </div>
      
           </Col>
        </Row>
      </Container>
      <Footer/>
   </div>
  
   
  )}

   export default Homepage