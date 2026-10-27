import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './api';
import './css/Orders.css';

const formatMoney = (amount) => `₹${Number(amount || 0).toFixed(2)}`;
const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString();
};

function Orders() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return undefined;
    }

    const controller = new AbortController();
    setLoading(true);
    setError('');
    setOrder(null);
    const requestUrl = id ? `${API_BASE_URL}/orders/${encodeURIComponent(id)}` : `${API_BASE_URL}/orders`;

    axios.get(requestUrl, {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (id) setOrder(response.data?.data || null);
        else setOrders(Array.isArray(response.data?.data) ? response.data.data : []);
      })
      .catch((requestError) => {
        if (axios.isCancel(requestError)) return;
        if (requestError.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('userUpdated'));
          window.dispatchEvent(new Event('cartUpdated'));
          navigate('/login', { replace: true });
          return;
        }
        setError(requestError.response?.data?.message || 'Unable to load order information. Please try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id, navigate, retryCount]);

  if (loading) return <main className="orders-page"><p role="status">Loading orders…</p></main>;

  if (error) {
    return (
      <main className="orders-page">
        <h1>{id ? 'Order details' : 'Order History'}</h1>
        <p className="orders-error" role="alert">{error}</p>
        <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
      </main>
    );
  }

  if (id) {
    if (!order) return <main className="orders-page"><h1>Order not found</h1><Link to="/orders">Back to order history</Link></main>;
    return (
      <main className="orders-page">
        <Link className="orders-back" to="/orders">← Order History</Link>
        <section className="order-panel">
          <div className="order-heading">
            <div>
              <p className="orders-eyebrow">Demo order</p>
              <h1>Order {order.orderId || order._id}</h1>
              <p>Placed {formatDate(order.createdAt)}</p>
            </div>
            <span className="order-status">{order.status}</span>
          </div>
          <p className="orders-demo-note">This is a demo order. Payment, delivery, and real lab booking are not connected. A lab-test line is only a cart/order record; no appointment has been booked.</p>
          <h2>Items</h2>
          <ul className="order-items">
            {(order.items || []).map((item, index) => (
              <li key={`${item.productId || item.name}-${index}`}>
                <span>
                  <small className="order-item-type">{item.type === 'labTest' ? 'Lab-test package' : item.type === 'membership' ? `Membership · ${item.billingPeriod || 'month'}` : 'Medicine'}</small>
                  <br />{item.name} × {item.quantity}
                </span>
                <span>{formatMoney(item.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="order-total"><strong>Order total</strong><strong>{formatMoney(order.totalAmount)}</strong></div>
        </section>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <h1>Order History</h1>
      <p className="orders-demo-note">Orders are saved for your signed-in account. This demo does not connect to payment or delivery services.</p>
      {orders.length === 0 ? (
        <section className="order-panel"><p>You have no demo orders yet.</p><Link to="/medicines">Browse medicines</Link></section>
      ) : (
        <div className="orders-list">
          {orders.map((savedOrder) => (
            <article className="order-panel order-summary" key={savedOrder._id}>
              <div>
                <p className="orders-eyebrow">Order {savedOrder.orderId || savedOrder._id}</p>
                <p>{formatDate(savedOrder.createdAt)}</p>
                <p>{(savedOrder.items || []).length} item{(savedOrder.items || []).length === 1 ? '' : 's'}</p>
              </div>
              <div className="order-summary-end">
                <span className="order-status">{savedOrder.status}</span>
                <strong>{formatMoney(savedOrder.totalAmount)}</strong>
                <Link to={`/orders/${savedOrder._id}`}>View order</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;
