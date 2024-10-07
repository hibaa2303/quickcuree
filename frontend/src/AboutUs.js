import React from 'react';
import Footer from './Footer'

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
  <div className="hero-overlay">
    <div className="hero-content">
      <h1>Welcome to QuickCure</h1>
      <p>Your Trusted Partner in Health & Wellness</p>
      <button className="cta-button">Explore Our Services</button>
    </div>
  </div>
</section>


      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              QuickCure is dedicated to providing comprehensive, high-quality, and affordable healthcare solutions.
              We aim to make healthcare accessible to everyone, regardless of their location or time constraints.
            </p>
          </div>
          <div className="mission-image">
            {/* Add your image URL here */}
            <img src="https://www.discountchemistliverpool.com.au/wp-content/uploads/2022/07/tips-for-medication-management-Save-deliver-Pharmacy-1170x613.jpg" alt="Mission" />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-content">
          <div className="vision-image">
            {/* Add your image URL here */}
            <img src="https://images.theconversation.com/files/424091/original/file-20210930-20-1owddsq.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C2121%2C1412&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="Vision" />
          </div>
          <div className="vision-text">
            <h2>Our Vision</h2>
            <p>
              To revolutionize healthcare by creating a seamless connection between patients and healthcare providers.
              We envision a world where healthcare is just a click away.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="service-items">
          <div className="service-item">
            {/* Add your image URL here */}
            <img src="https://www.swaconhospital.com/wp-content/uploads/2019/09/34-5-reasons-why-you-need-a-regular-checkup-feat-1080x600.jpg" alt="Health Checkups" />
            <h3>Health Checkups</h3>
            <p>Comprehensive diagnostic tests at your convenience.</p>
          </div>
          <div className="service-item">
            {/* Add your image URL here */}
            <img src="https://www.movementdisordersclinic.com/wp-content/uploads/2020/04/online-consult.jpg" alt="Online Consultations" />
            <h3>Online Consultations</h3>
            <p>Consult with top doctors from anywhere.</p>
          </div>
          <div className="service-item">
            {/* Add your image URL here */}
            <img src="https://www.holdings.toppan.com/en/news/2020/08/t5v1940000000jq1-img/Todokusuri.jpg" alt="Medicine Delivery" />
            <h3>Medicine Delivery</h3>
            <p>Order your medications and get them delivered to your door.</p>
          </div>
          <div className="service-item">
            {/* Add your image URL here */}
            <img src="https://media.istockphoto.com/id/1492377092/photo/magnifier-with-brainstorm-inside-to-smart-idea-creative-thinking-education-innovation-smart.jpg?s=612x612&w=0&k=20&c=OPlp7q4udogoliF4NaBhlzbubQ8k8WrwR1L8eN-fmts=" alt="Health Insights" />
            <h3>Health Insights</h3>
            <p>Personalized health tips and insights for a healthier life.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <h2>Why Choose QuickCure?</h2>
        <div className="reasons">
          <div className="reason">
            <h3>Trusted & Reliable</h3>
            <p>We work with accredited labs and certified professionals.</p>
          </div>
          <div className="reason">
            <h3>Convenience</h3>
            <p>All healthcare services accessible from your phone.</p>
          </div>
          <div className="reason">
            <h3>24/7 Support</h3>
            <p>Our support team is here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="join-us-section">
        <div className="join-us-content">
          <h2>Join Us on the Journey to Better Health</h2>
          <p>We're constantly innovating to make healthcare easier, more accessible, and affordable.</p>
          {/* Add your image URL here */}
          <img src="https://web.musc.edu/-/sm/news-center-media/news-center-images/2023-images/08/cttp-bannercatweb.jpg?h=666&w=1000&la=en&hash=D19CD7C62826C0014550328F78193DDA" alt="Join Us" />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutUs;



