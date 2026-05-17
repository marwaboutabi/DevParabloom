/* src/pages/OrdersPage.jsx */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/my-orders')
      .then(res => {
        if (res.success) setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <>
      <Header />
      <div style={{ textAlign: 'center', padding: '80px', color: '#999' }}>
        Chargement...
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <div className="orders-page">
        <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>Mes Commandes</h2>

        {orders.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: '12px', border: '1px solid #f0f0f0'
          }}>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '20px' }}>
              Aucune commande pour le moment
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '12px 28px', background: '#d4879a', color: '#fff',
                border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
              }}
            >
              Découvrir nos produits
            </button>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">📦 #{order.id}</span>
                <span className="order-date">{order.date}</span>
              </div>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} style={{ marginBottom: '4px', fontSize: '13px', color: '#555' }}>
                    {item.name} × {item.quantity} — {(parseFloat(item.price) * item.quantity).toFixed(2)} dh
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{
                  fontSize: '12px', padding: '4px 12px', borderRadius: '12px',
                  background: '#e8f5e9', color: '#4caf50', fontWeight: '500'
                }}>
                  ✓ {order.status}
                </span>
                <div className="order-total">
                  Total : {parseFloat(order.total).toFixed(2)} dh
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;