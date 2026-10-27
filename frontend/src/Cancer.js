import React from 'react';
import cancer from './image/cancer.png';
import cancersss from './image/cancersss.png';
import child from './image/child.webp';
import adult from './image/adult.webp';
import did from './image/did.png';
import india from './image/india.png';
import lite from './image/lite.png';
import da from './image/da.jpg';
import './css/Cancer.css';

const resources = [
  {
    title: 'Tata Memorial Centre',
    icon: 'https://onemg.gumlet.io/staging/308ebd83-c1f8-499b-accf-fc9c9e73ef2c.svg',
  },
  {
    title: 'Find cancer specialists',
    icon: 'https://onemg.gumlet.io/staging/ff1111e4-3cb5-4f9c-ab19-7353e4076ceb.svg',
  },
  {
    title: 'Buy Cancer Medicines',
    icon: 'https://onemg.gumlet.io/staging/592c21f5-b62c-44a1-adda-acbfaff44292.svg',
  },
  {
    title: 'Get Financial Support',
    icon: 'https://onemg.gumlet.io/staging/fe623d02-d64e-41be-b054-61a79b3f7d0b.svg',
  },
  {
    title: 'Book Tests for Cancer',
    icon: 'https://onemg.gumlet.io/staging/e424a497-1d07-47fe-a5b9-688d728bf5d0.svg',
  },
  {
    title: 'Cancer Care NGOs',
    icon: 'https://onemg.gumlet.io/staging/fff45a56-8545-45d4-b0b4-e39242091891.svg',
  },
  {
    title: 'Patient Support Programs',
    icon: 'https://onemg.gumlet.io/staging/b50e6720-4d2e-43b2-82ad-0097b51e4798.svg',
  },
];

function Cancer() {
  return (
    <main className="cancer-page">
      <img className="cancer-hero-image" alt="Cancer care information" src={cancer} />

      <section className="cancer-intro">
        <h1>Access to quality cancer care does not occur by chance</h1>
        <p>QuickCure is here to support you and provide access to quality cancer care.</p>
      </section>

      <section className="cancer-resources" aria-label="Cancer care resources">
        {resources.map(({ title, icon }) => (
          <article className="cancer-resource" key={title}>
            <img src={icon} alt="" loading="lazy" />
            <h2>{title}</h2>
          </article>
        ))}
      </section>

      <section className="cancer-types">
        <h2>Major Types of Cancer</h2>
        <img src={cancersss} alt="Illustration showing different types of cancer" />
      </section>

      <section className="cancer-causes">
        <div className="cancer-causes-copy">
          <h2>What Causes Cancer</h2>
          <p>Cancer comprises a complex group of diseases with many possible causes. While genetics play a major role in cancer, other causes of cancer can differ between children and adults.</p>
        </div>
        <div className="cancer-age-groups">
          <article>
            <img src={child} alt="" />
            <h3>Childhood cancers</h3>
            <p>A mutation or cell change that just happened by chance is a common cause for cancer in children.</p>
          </article>
          <article>
            <img src={adult} alt="" />
            <h3>Adult cancers</h3>
            <p>In addition to mutations, lifestyle factors like smoking, tobacco, an unhealthy diet, lack of physical activity, working with toxic chemicals, or exposure to certain viruses may put adults at risk for cancers.</p>
          </article>
        </div>
      </section>

      <section className="cancer-promotions" aria-label="Cancer care information">
        <img src={lite} alt="Did you know? Information about cancer medicine access" loading="lazy" />
        <img src={india} alt="Cancer statistics in India" loading="lazy" />
        <img src={did} alt="Empowering you through information" loading="lazy" />
        <img src={da} alt="Cancer care information" loading="lazy" />
      </section>
    </main>
  );
}

export default Cancer;
