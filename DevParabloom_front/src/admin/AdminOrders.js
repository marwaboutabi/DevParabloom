import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/orders')
      .then(res => setOrders(res.data))
      .catch(() => alert('Erreur chargement commandes'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '30px' }}>Chargement...</p>;

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Gestion des Commandes</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#888', margin: '0 0 5px' }}>Total Commandes</p>
          <h3 style={{ margin: 0 }}>{orders.length}</h3>
        </div>
        <div style={{ visibility: 'hidden' }}></div>
      </div>

      <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9f9f9' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>ID Commande</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Date & Heure</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Client</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600' }}>{order.id}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#666' }}>{order.date}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px' }}>{order.clientEmail}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#d4879a' }}>
                  {parseFloat(order.total).toFixed(2)} dh
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
            Aucune commande enregistrée
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;