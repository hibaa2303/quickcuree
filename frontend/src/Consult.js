import React from 'react';
import doci from './image/doci.webp';
import doc from './image/doc.png';
import online from './image/online.png';
import pop1 from './image/pop1.jpg';
import confi from './image/confi.jpg';
import certi from './image/certi.png';
import convi from './image/convi.png';
import mny from './image/mny.jpeg';
import line from './image/line.png';
import count from './image/count.png';
import doctor from './image/doctor.jpeg';
import './css/Consult.css';

function Consult() {
  const benefits = [
    { image: confi, title: 'Privacy matters', text: 'This page does not collect consultation requests or medical history.' },
    { image: certi, title: 'Qualified care', text: 'QuickCure does not currently connect to a doctor network through this page.' },
    { image: convi, title: 'Simple access', text: 'This page explains the project’s consultation concept; appointment requests are not available.' },
    { image: mny, title: 'Clear pricing', text: 'No consultation fee is collected through this demo.' },
  ];

  const questions = [
    ['Can I request a consultation here?', 'No. This page is informational; it does not submit or schedule consultation requests.'],
    ['Who are the consulting doctors?', 'QuickCure does not currently connect to a doctor network through this page.'],
    ['Can I get medical advice here?', 'No. For health concerns, contact a qualified healthcare professional. This demo does not provide medical advice.'],
    ['Is my consultation private?', 'This page does not collect consultation requests or medical history.'],
    ['Can I follow up with a doctor?', 'Follow-up messaging is not available because consultations are not connected yet.'],
    ['Do you take consultation payments?', 'No consultation payments are taken through this demo, so no consultation refund flow is available.'],
  ];

  return (
    <main className="consult-page">
      <section className="consult-plan">
        <img src={doci} alt="QuickCure consultation" />
        <div>
          <h2>Doctor consultations</h2>
          <p>Online consultations are not available through this demo yet.</p>
          <strong>Care Plan</strong>
          <span>Plan sign-up is not connected.</span>
        </div>
      </section>

      <section className="consult-hero">
        <div className="consult-hero-copy">
          <h1>Online doctor consultation</h1>
          <p>QuickCure does not currently accept appointment requests from this page.</p>
          <img src={online} alt="Online consultation information" />
          <button type="button" className="btn btn-warning" disabled>Booking unavailable</button>
        </div>
        <img className="consult-doctor-image" src={doc} alt="Illustration for online doctor consultation" />
      </section>

      <img className="consult-banner" src={pop1} alt="QuickCure healthcare information" />

      <section className="consult-note">
        <h2>Consultation page preview</h2>
        <p>QuickCure is a student project. Consultation requests and customer reviews are not connected to this page.</p>
      </section>

      <section className="consult-benefits" aria-label="About this consultation demo">
        {benefits.map((benefit) => (
          <article key={benefit.title}>
            <img src={benefit.image} alt="" />
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </section>

      <section className="consult-faq">
        <h2>Frequently Asked Questions</h2>
        {questions.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
            <img src={line} alt="" />
          </article>
        ))}
      </section>

      <section className="consult-doctor-cta">
        <img src={doctor} alt="Healthcare professional illustration" />
        <div>
          <h2>Are you a doctor?</h2>
          <p>Doctor registration is not connected to QuickCure yet.</p>
          <button type="button" className="btn btn-warning" disabled>Registration unavailable</button>
        </div>
      </section>

      <img className="consult-count" src={count} alt="QuickCure healthcare information" />
    </main>
  );
}

export default Consult;
