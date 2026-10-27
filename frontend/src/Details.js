import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from './api';
import { addCartItem } from './cartStorage';
import './css/Details.css';

const clinicalSections = [
  ['uses-benefits', 'Uses and benefits'],
  ['side-effects', 'Side effects'],
  ['how-to-use', 'How to use'],
  ['how-it-works', 'How the drug works'],
  ['safety-advice', 'Safety advice'],
  ['missed-dose', 'Missed dose'],
  ['alternates', 'Alternate brands or substitutes'],
  ['quick-tips', 'Quick tips'],
  ['interactions', 'Interaction with drugs'],
];

const clinicalInformationNote =
  "This medicine-specific information is not included in QuickCure's current catalogue data. Check the product leaflet or ask a qualified healthcare professional.";

// Recovered from the original Details.js (Git commit ff67c834c). This was
// hardcoded Dolo 650 sample copy, not data returned by the catalogue or a
// verified clinical source. Keep it scoped to its matching listing and label it.
const doloLegacyCopy = {
  'uses-benefits': <>The old component listed “Pain relief” and “Treatment of Fever.” Its benefits text read: “{`Dolo 650 Tablet`} is a common painkiller for treating aches and pains. It is widely used and rarely causes any side effects if taken properly. To get the most benefits, take it as prescribed. Do not take more or for longer than needed as that can be dangerous.”</>,
  'side-effects': <>The old component said: “Most side effects do not require any medical attention and disappear as your body adjusts to the medicine. Consult your doctor if they persist or if you’re worried about them.” It then listed stomach pain, nausea, and vomiting.</>,
  'how-to-use': <>The old product-introduction paragraph advised taking it with food and included a specific dose limit and interval. That advice is preserved in the archived product introduction below only as historical sample text.</>,
  'how-it-works': <>The old product-introduction paragraph said it works by blocking the release of chemical messengers responsible for fever and pain.</>,
  'safety-advice': <>The old “Note” read: “Consult the doctor if any of these side effects persist or become bothersome. Though Dolo 650 Tablet is essentially safe, it may not suit everyone. Before taking this medicine, let the doctor know if you have any liver or kidney problems, are allergic to it, or are taking other medications as this might affect the dose or suitability of the medicine. In general, take the lowest dose that works for the shortest possible time. It is also the first choice of painkillers during pregnancy or breastfeeding.” This sample was not verified.</>,
  'alternates': <>The old component displayed these unverified sample names: Paracetamol 500mg, Tylenol 500mg, Panadol 500mg, and Calpol 500mg. The project did not store substitute-product records or confirm equivalence.</>,
  'quick-tips': <>The old benefits text said to take the medicine as prescribed and not to take more or for longer than needed. This is archived sample wording, not individualized advice.</>,
  'interactions': <>The old “Note” only mentioned that other medications might affect suitability or dose; it did not name or describe any drug interactions.</>,
};

function getHistoricalDoloContent(sectionId) {
  if (sectionId === 'missed-dose') return null;
  return doloLegacyCopy[sectionId] || null;
}

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const routeMedicine = location.state?.medicine || null;
  const [medicine, setMedicine] = useState(routeMedicine);
  const [loading, setLoading] = useState(!routeMedicine && Boolean(id));
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (routeMedicine && (!id || String(routeMedicine._id) === id)) {
      setMedicine(routeMedicine);
      setError('');
      setLoading(false);
      return undefined;
    }

    if (!id) {
      setMedicine(null);
      setLoading(false);
      setError('Choose a medicine from the listings to view its details.');
      return undefined;
    }

    const controller = new AbortController();
    setLoading(true);
    axios.get(`${API_BASE_URL}/medicines/${id}`, { signal: controller.signal })
      .then((response) => {
        const fetchedMedicine = response.data.data || null;
        setMedicine(fetchedMedicine);
        setError(fetchedMedicine ? '' : 'Medicine not found.');
      })
      .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
          setMedicine(null);
          setError(requestError.response?.data?.message || 'Unable to load this medicine.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id, routeMedicine]);

  const handleAddToCart = () => {
    if (!medicine) return;
    try {
      addCartItem(medicine);
      navigate('/cartdetails');
    } catch (cartError) {
      console.error('Unable to update the cart:', cartError);
      setError('Unable to update your cart. Please try again.');
    }
  };

  if (loading) {
    return <main className="medicine-details-page"><p role="status">Loading medicine…</p></main>;
  }

  if (!medicine) {
    return (
      <main className="medicine-details-page medicine-details-message">
        <p role="status">{error}</p>
        <Link to="/medicines">Browse medicines</Link>
      </main>
    );
  }

  const category = medicine.category || 'Not listed';
  const isLegacyDoloSample = String(medicine.name || '').trim().toLowerCase() === 'dolo 650 tablet';

  return (
    <main className="medicine-details-page">
      <button type="button" className="details-back" onClick={() => navigate('/medicines')}>
        ← Back to medicines
      </button>

      <div className="medicine-detail-layout">
        <nav className="medicine-detail-nav" aria-label="Medicine information sections">
          <h2>Medicine information</h2>
          <a href="#overview">Overview</a>
          {clinicalSections.map(([sectionId, title]) => (
            <a href={`#${sectionId}`} key={sectionId}>{title}</a>
          ))}
          <a href="#patient-concerns">Patient concerns</a>
          <a href="#product-information">Product introduction and additional information</a>
        </nav>

        <article className="medicine-detail-content">
          <section className="medicine-detail-overview" id="overview">
            <div className="medicine-overview-image">
              <img src={medicine.img} alt={medicine.name} />
            </div>
            <div className="medicine-overview-copy">
              <p className="medicine-detail-eyebrow">{category}</p>
              <h1>Overview of {medicine.name}</h1>
              <p>
                QuickCure's catalogue lists this product by name, category, image, and price.
                Medicine-specific clinical information is not included in the current record.
              </p>
              <div className="medicine-detail-listing">
                <span>Listed price</span>
                <strong>{medicine.price || 'Price unavailable'}</strong>
              </div>
            </div>
          </section>

          {clinicalSections.map(([sectionId, title]) => (
            <section className="medicine-detail-section" id={sectionId} key={sectionId}>
              <h2>{title}</h2>
              {isLegacyDoloSample && getHistoricalDoloContent(sectionId) ? (
                <>
                  <p className="medicine-legacy-warning">
                    Recovered from an older QuickCure component. This is unverified sample copy,
                    not checked medical information or treatment advice.
                  </p>
                  <p>{getHistoricalDoloContent(sectionId)}</p>
                </>
              ) : (
                <p>{sectionId === 'missed-dose'
                  ? 'No missed-dose information was found in the old component or current catalogue.'
                  : clinicalInformationNote}</p>
              )}
            </section>
          ))}

          <section className="medicine-detail-section" id="patient-concerns">
            <h2>Patient concerns</h2>
            {isLegacyDoloSample ? (
              <>
                <p className="medicine-legacy-warning">
                  The old page contained survey prompts only. It stored no answers or patient reports.
                </p>
                <ul>
                  <li>What are you using this medicine for?</li>
                  <li>How much was the improvement?</li>
                  <li>What side effects did you experience?</li>
                  <li>How do you take this medicine?</li>
                  <li>How would you rate its price?</li>
                  <li>What precautions do you take?</li>
                </ul>
              </>
            ) : (
              <p>No patient questions, reports, or responses for this product are stored in QuickCure.</p>
            )}
          </section>

          <section className="medicine-detail-section" id="product-information">
            <h2>Product introduction and additional information</h2>
            <p>
              The available listing for {medicine.name} includes its category ({category}) and
              listed price ({medicine.price || 'Price unavailable'}). No further product description
              is stored in the current catalogue record.
            </p>
            {isLegacyDoloSample && (
              <div className="medicine-legacy-copy">
                <p className="medicine-legacy-warning">
                  Archived text from the old QuickCure component, retained to document the prior
                  page content. It contains unverified medical claims and dosing language; do not
                  use it as guidance.
                </p>
                <p>
                  Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain
                  chemical messengers responsible for fever and pain. It is used to treat headaches,
                  migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle
                  aches, and the common cold. Dolo 650 Tablet has been one of the most widely
                  prescribed paracetamol-based medications during the COVID-19 pandemic. It should
                  be taken regularly as per the doctor’s advice. Take it with food to avoid an upset
                  stomach. It may be taken alone or in combination with other medications. However,
                  no more than four doses of Dolo 650 Tablet can be taken in 24 hours with a gap of
                  at least 4 hours between two doses. Please do not take it for longer than
                  recommended. Generally, Dolo 650 Tablet is well tolerated, and side effects are
                  rare. However, it may temporarily cause stomach pain, nausea, and vomiting in some
                  people.
                </p>
              </div>
            )}
          </section>
          {error && <p className="medicine-detail-error" role="status">{error}</p>}
        </article>

        <aside className="medicine-purchase-panel" aria-label="Purchase information">
          <p className="medicine-detail-eyebrow">{category}</p>
          <h2>{medicine.name}</h2>
          <p className="medicine-purchase-price">MRP {medicine.price || 'Price unavailable'}</p>
          <p className="medicine-purchase-note">Price shown is the current listing price.</p>
          <button type="button" className="cart-btn" onClick={handleAddToCart}>Add to Cart</button>

          <section className="medicine-purchase-details" aria-labelledby="purchase-details-title">
            <h3 id="purchase-details-title">Product Details</h3>
            <dl className="medicine-fact-box">
              <div><dt>Product Name</dt><dd>{medicine.name}</dd></div>
              <div><dt>Category</dt><dd>{category}</dd></div>
              <div><dt>Listed Price</dt><dd>{medicine.price || 'Price unavailable'}</dd></div>
            </dl>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default Details;
