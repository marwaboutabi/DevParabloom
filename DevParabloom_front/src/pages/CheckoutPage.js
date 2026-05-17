/* src/pages/CheckoutPage.jsx */
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { user, setShowAuth } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', address: '', city: '' });
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvc: '' });
  const [processing, setProcessing] = useState(false);

  if (!user) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '80px 20px', paddingTop: '150px' }}>          <h2 style={{ marginBottom: '16px' }}>Authentification requise</h2>
          <p style={{ color: '#777', marginBottom: '24px' }}>Veuillez vous connecter pour passer commande.</p>
          <button
            onClick={() => setShowAuth(true)}
            style={{ padding: '14px 32px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            Se connecter
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone || !clientInfo.address || !clientInfo.city) {
    alert('Veuillez remplir tous les champs.');
    return;
  }
  
  setStep(2);
  };

  const handlePayment = async (e) => {
  e.preventDefault();
  setProcessing(true);

  try {
    const orderData = {
      items: cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
      total_price: parseFloat(total),
      client_info: JSON.stringify({        
        name:    clientInfo.name.trim(),
        email:   clientInfo.email.trim().toLowerCase(),
        phone:   clientInfo.phone,
        address: clientInfo.address.trim(),
        city:    clientInfo.city.trim()
      })
    };

    const result = await api.post('/orders', orderData);

    if (result.success) {           
  clearCart();
  alert('Commande enregistrée avec succès !');
  navigate('/orders');
} else {
  alert('Erreur: ' + (result.message || 'Échec de la commande'));
}

  } catch (error) {
    console.error('Erreur:', error);
    if (error.response?.data?.errors) {
      const msgs = Object.values(error.response.data.errors).flat().join('\n');
      alert('Erreurs de validation:\n' + msgs);  
    } else {
      alert('Erreur de connexion au serveur.');
    }
  } finally {
    setProcessing(false);
  }
};

  return (
    <>
      <Header />
      <div className="checkout-page">
        <div className="checkout-steps">
          <div className={step === 1 ? 'step active' : 'step'}>
            <span className="step-num">1</span>
            Informations Client
          </div>
          <div className={step === 2 ? 'step active' : 'step'}>
            <span className="step-num">2</span>
            Paiement
          </div>
        </div>

        {step === 1 && (
          <form className="checkout-form" onSubmit={handleClientSubmit}>
            <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Informations de livraison</h3>
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" value={clientInfo.name} onChange={e => setClientInfo({ ...clientInfo, name: e.target.value })} required placeholder="Votre nom complet" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={clientInfo.email} onChange={e => setClientInfo({ ...clientInfo, email: e.target.value })} required placeholder="votre@email.com" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Téléphone</label>
                <input type="tel" value={clientInfo.phone} onChange={e => setClientInfo({ ...clientInfo, phone: e.target.value })} required placeholder="+212 6XX XXX XXX" />
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input type="text" value={clientInfo.city} onChange={e => setClientInfo({ ...clientInfo, city: e.target.value })} required placeholder="Casablanca" />
              </div>
            </div>
            <div className="form-group">
              <label>Adresse de livraison</label>
              <input type="text" value={clientInfo.address} onChange={e => setClientInfo({ ...clientInfo, address: e.target.value })} required placeholder="Adresse complète" />
            </div>

            <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Récapitulatif</h4>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#666' }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(parseFloat(item.price) * item.quantity).toFixed(2)} dh</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #ddd', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '14px' }}>
                <span>Total</span>
                <span style={{ color: '#d4879a' }}>{total.toFixed(2)} dh</span>
              </div>
            </div>

            <button type="submit" className="auth-btn" style={{ marginTop: '24px' }}>
              Continuer vers le paiement
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="checkout-form" onSubmit={handlePayment}>
            <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Paiement par carte</h3>

            <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#666' }}>Total à payer</span>
                <span style={{ fontWeight: '700', color: '#d4879a' }}>{total.toFixed(2)} dh</span>
              </div>
            </div>

            <div className="form-group">
              <label>Numéro de carte</label>
              <input type="text" value={cardInfo.number} onChange={e => setCardInfo({ ...cardInfo, number: e.target.value.replace(/\D/g, '').slice(0, 16) })} required placeholder="4242 4242 4242 4242" maxLength={16} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date d'expiration</label>
                <input type="text" value={cardInfo.expiry} onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value.slice(0, 5) })} required placeholder="MM/AA" maxLength={5} />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input type="text" value={cardInfo.cvc} onChange={e => setCardInfo({ ...cardInfo, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} required placeholder="123" maxLength={4} />
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#999', marginBottom: '16px' }}>
               Paiement sécurisé via Stripe (Test Mode)
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => setStep(1)}
                style={{ flex: 1, padding: '14px', background: '#fff', color: '#d4879a', border: '1px solid #d4879a', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                Retour
              </button>
              <button type="submit" disabled={processing}
                style={{ flex: 2, padding: '14px', background: processing ? '#ccc' : '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: processing ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600' }}>
                {processing ? 'Traitement en cours...' : `Payer ${total.toFixed(2)} dh`}
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;