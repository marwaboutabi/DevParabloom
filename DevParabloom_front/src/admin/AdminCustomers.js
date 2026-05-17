import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminCustomers = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/customers')
      .then(res => setClients(res.data))
      .catch(() => alert('Erreur chargement clients'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '30px' }}>Chargement...</p>;

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Gestion des Clients</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Liste des clients */}
        <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0 }}>Liste des clients</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {clients.length === 0 && (
              <li style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
                Aucun client enregistré
              </li>
            )}
            {clients.map(client => (
              <li
                key={client.email}
                onClick={() => setSelectedClient(client)}
                style={{
                  padding: '12px',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  background: selectedClient?.email === client.email ? '#fce4e8' : 'transparent',
                  borderRadius: '6px'
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{client.email}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  {client.ordersCount} commandes • {parseFloat(client.totalSpent).toFixed(2)} dh
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Détails du client */}
        <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {selectedClient ? (
            <>
              <h3 style={{ marginTop: 0 }}>Historique : {selectedClient.email}</h3>
              <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', flex: 1 }}>
                  <p style={{ margin: '0 0 5px', fontSize: '12px', color: '#888' }}>Total dépensé</p>
                  <h4 style={{ margin: 0, color: '#d4879a' }}>
                    {parseFloat(selectedClient.totalSpent).toFixed(2)} dh
                  </h4>
                </div>
                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', flex: 1 }}>
                  <p style={{ margin: '0 0 5px', fontSize: '12px', color: '#888' }}>Nombre de commandes</p>
                  <h4 style={{ margin: 0 }}>{selectedClient.ordersCount}</h4>
                </div>
              </div>

              <h4>Commandes récentes</h4>
              {selectedClient.orders.length === 0 && (
                <p style={{ color: '#999' }}>Aucune commande</p>
              )}
              {selectedClient.orders.map(order => (
                <div key={order.id} style={{ padding: '12px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600' }}>#{order.id}</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{order.date}</span>
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    {order.items?.length || 0} article(s) • {parseFloat(order.total).toFixed(2)} dh
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              Sélectionnez un client pour voir son historique
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;