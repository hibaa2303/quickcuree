import React from "react"
import doci from './image/doci.webp'
import doc from './image/doc.png'
import online from './image/online.png'
import pop1 from './image/pop1.jpg'
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem, ModalBody, ModalDialog, ModalFooter} from 'react-bootstrap';
import confi from './image/confi.jpg'
import certi  from './image/certi.png'
import convi from './image/convi.png'
import mny from './image/mny.jpeg'
import line from './image/line.png'
import count from './image/count.png'
import doctor from './image/doctor.jpeg'

function Consult(){

  
    return(
        
        <div>
         <div className='navbar1 '>
         <div className="container col-9 p-3 ps-2 d-flex ">
         <img  className="img ps-5 " alt='image' src={doci}/>
         <h5 >Free consultation and more benefits with Care Plan membership.<div className="d-flex mt-2"> <h5 className="me-3 text-danger">Care Plan  </h5>
        <h5 className="text-danger" >Join now!</h5>
        
       </div></h5></div>
       </div>
       <div className="container p-5 col-9 d-flex ">
       <h2 className="text-center pt-3">Online doctor consultation with qualified doctors  
       <img className="immg "alt='image'src={online}/> <button class=" btn btn-warning border rounded-0 borderbg-transparent shadow  ">Start new consultation</button> 
           </h2>
       <img className="imgg "alt="image" src={doc}/>
       </div>
       <img  className="container mb-4 col-9 d-flex" alt='image' src={pop1}/>
       <div className="navbar2">
       <h5 className="pt-5 pb-0">Our Happy Customers</h5>
       <div className="container col-9 p-3 ps-2 d-flex ">
        
        <Carousel>
        <CarouselItem>
      <div className="text-center p-5">
    <p className="m-0 pt-0 ">I installed the app and went for a free consultation with a dietician. The advice given by Dr. Mirza was simply great. He shared a detailed diet chart and exercises with me which was easy to incorporate into my hectic schedule.</p>
        <h6> -Aarohi</h6>
        </div>
      </CarouselItem>
      <CarouselItem>
      <div className="text-center p-5">
        <p className="m-0 ">Initially, I was a little skeptical of consulting a doctor online. But the consultation turned out to be honest and cool, the doctor's behavior was friendly. The best part is that I saved so much time and money!</p>
        <h6>-Aarzoo</h6>
        </div>
      </CarouselItem>
      <CarouselItem>
      <div className="text-center p-5">
        <p className="m-0 ">Dr. Chakraborty is so concerned about his patient. I sincerely wish him the best. He always takes the time to understand the problem and on the basis of that he takes the decision and explains it very well. And if you miss out on anything, you can come back with more questions.</p>
        <h6> -Yash</h6>
        </div>
      </CarouselItem>
      <CarouselItem>
      <div className="text-center p-5">
        <p className="m-0 ">Best app for consultation and the most effective way to connect with the doctor from anywhere. The doctor replies with great detail and is extremely polite. One can also come back to consult the same doctor anytime.</p>
        <h6> -Ronak</h6>
        </div>
      </CarouselItem>
      <CarouselItem>
      <div className="text-center p-5">
        <p className="m-0 ">Amazingly easy and convenient. Great service for the same price as a clinic visit, without the hassle of having to drive to the doctor's clinic. Couldn't be any happier.
        </p>
        <h6> -Rahul</h6>
        </div>
      </CarouselItem>
      </Carousel>
       </div>
       </div>
       <div>
        <div className=" container space col-10  d-flex">
           <div> <img className="box icon me-2" alt="image" src={confi}></img><h5>100% Confidential </h5><p className="mm me-4">All advice & consultations are completely confidential. You can also delete chats whenever you want.</p></div>
            <div> <img className="box icon1 me-2 " alt="image" src={certi}></img><h5>Certified Doctors </h5><p className="mm me-2">We offer quality healthcare through our network of certified and experienced doctors.</p></div>
            <div> <img className="box icon2 me-2 ms-2" alt="image" src={convi}></img><h5>Convenience </h5><p className="mm me-2">Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.            </p></div>
            <div> <img className="box icon3 ms-3" alt="image" src={mny}></img><h5>Cost Effective </h5><p className="mm me-4">We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.            </p></div>

        </div>
       </div>
       <div className="container col-10 text-center ">
       <h3 className="  p-5 fw-bold text-secondary ">Frequently Asked Questions</h3>
       <div className="text-start "><h5 >When will I get an answer to my query? What happens if I don’t get a response?</h5>
       <p  className="text-secondary ">If you opt for a free consult, then we make sure the doctor replies within 24 to 48 hours. In case of a paid consult, you will receive a reply within 2-4 business hours. However, if you do not get any response within the stipulated time, we will refund your money back into your account.</p>
       <img alt="ima" src={line}/>
       </div>
       <div className="text-start"><h5 >Who are the consulting doctors?</h5>
       <p className="text-secondary">All the doctors are registered medical practitioners. Along with qualifying degrees - experience, research and track-record of practice are taken into account before a doctor is credentialed with Tata 1mg and is given access to answer patient queries.</p>
       <img alt="ima" src={line}/>
       </div>
       <div className="text-start"><h5 >Will the doctor be able to resolve my issue?       </h5>
       <p className="text-secondary">Our doctors will give you expert advice on your problem and help you identify next steps which may include further tests, medicine recommendation or lifestyle tips. Few cases require face-to-face examination and we do ask patients to share pictures or reports if they can, for a conclusive diagnosis.       </p>
       <img alt="ima" src={line}/>
       </div>
       <div className="text-start"><h5 >Is my consultation private with my doctor?       </h5>
       <p className="text-secondary">Privacy of data is one of the fundamental human rights and we at Tata 1mg understand that. All your medical history and online consultation with us are completely private and confidential. We are compliant with industry standards to ensure your consultations are securely stored.       </p>
       <img alt="ima" src={line}/>
       </div>
       <div className="text-start"><h5 >For how long is the consultation valid?       </h5>
       <p className="text-secondary">In the case of a paid consult, you can follow-up with your doctor for up to 3 days. In case you opt for a free consult, follow-up questions are valid for one day only.       </p>
       <img alt="ima" src={line}/>
       </div>
       <div className="text-start"><h5 >Do you have a refund policy?       </h5>
       <p className="text-secondary pb-4">We have a “take-it-easy” policy. If for any reason you’re not convinced with your online consultation, you can write to us at contact@1mgdoctors.com and we will review the consult with the doctor - seeking clarifications on your queries that were answered. 100% refund will be given in genuine cases.       </p>
      
       </div></div>
       <div className="navbar3">
        <div className="container d-flex col-9 pt-4">
          <div className="box"><img alt="ima" src={doctor}/></div>
          <div className="p-5">
            <h3 >Are you a doctor ?</h3>
            <h5 className="pt-3 text-secondary pb-2">Be a part of our panel of specialists and connect with your patients from anywhere.</h5>
            <button class=" btn btn-warning  rounded-0 borderbg-transparent shadow  "> JOIN WITH US</button> 
            
          </div>

        </div>

       </div>
       
       <img  className="container col-9 d-flex p-5" alt='image' src={count}/>
       
       </div>
       

    )
}
export default Consult