import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => setStats(res.data))
      .catch(() => alert('Erreur chargement dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '30px' }}>Chargement...</p>;
  if (!stats)  return <p style={{ padding: '30px' }}>Erreur de chargement</p>;

  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: '30px', fontSize: '24px', color: '#333', fontWeight: '600' }}>
        Tableau de bord
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Chiffre d'affaires</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>
            {parseFloat(stats.total_sales).toFixed(2)} <span style={{ fontSize: '16px', color: '#999' }}>DH</span>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Commandes</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>{stats.total_orders}</div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Clients</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>{stats.total_customers}</div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Panier moyen</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>
            {parseFloat(stats.average_order).toFixed(2)} <span style={{ fontSize: '16px', color: '#999' }}>DH</span>
          </div>
        </div>
      </div>

      {(stats.low_stock > 0 || stats.out_of_stock > 0) && (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', color: '#333', fontWeight: '600', textTransform: 'uppercase' }}>
            Alertes stock
          </h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {stats.out_of_stock > 0 && (
              <div style={{ flex: '1', minWidth: '150px', background: '#fee', padding: '12px 16px', borderRadius: '6px' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc3545' }}>{stats.out_of_stock}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Rupture de stock</div>
              </div>
            )}
            {stats.low_stock > 0 && (
              <div style={{ flex: '1', minWidth: '150px', background: '#fff3cd', padding: '12px 16px', borderRadius: '6px' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#856404' }}>{stats.low_stock}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Stock faible</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;