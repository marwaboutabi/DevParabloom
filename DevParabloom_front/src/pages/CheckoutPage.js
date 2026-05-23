/* src/pages/CheckoutPage.jsx */
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// ── Sanitisation XSS ──────────────────────────────────────
const sanitize = (str) =>
  str.trim().replace(/[<>'"]/g, '').slice(0, 255);

// ── Validation données client ─────────────────────────────
const validateClientInfo = (info) => {
  const errors = {};
  if (!/^[a-zA-ZÀ-ÿ\s]{2,100}$/.test(info.name.trim()))
    errors.name = 'Nom invalide (lettres uniquement, 2-100 caractères)';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email.trim()))
    errors.email = 'Adresse email invalide';
  if (!/^(\+212|0)[5-7]\d{8}$/.test(info.phone.replace(/\s/g, '')))
    errors.phone = 'Numéro marocain invalide (ex: 0612345678)';
  if (info.address.trim().length < 5 || info.address.trim().length > 200)
    errors.address = 'Adresse invalide (5-200 caractères)';
  if (info.city.trim().length < 2 || info.city.trim().length > 50)
    errors.city = 'Ville invalide (2-50 caractères)';
  return errors;
};

// ── NOUVEAU : Validation données carte ────────────────────
const validateCardInfo = (card) => {
  const errors = {};

  // Numéro : exactement 16 chiffres
  if (card.number.replace(/\s/g, '').length !== 16)
    errors.number = 'Numéro de carte invalide (16 chiffres requis)';

  // Expiration : format MM/AA + non expirée
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
    errors.expiry = 'Format invalide (ex: 07/26)';
  } else {
    const [month, year] = card.expiry.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
    const today = new Date();
    today.setDate(1);
    if (expiryDate < today)
      errors.expiry = 'Cette carte est expirée';
  }

  // CVC : 3 chiffres (Visa/MC) ou 4 chiffres (Amex)
  if (!/^\d{3,4}$/.test(card.cvc))
    errors.cvc = 'CVC invalide (3 ou 4 chiffres requis)';

  return errors;
};

// ── Messages d'erreur génériques ──────────────────────────
const getErrorMessage = (error) => {
  const status = error?.status || error?.response?.status;
  if (status === 422) return 'Données invalides, vérifiez le formulaire.';
  if (status === 429) return 'Trop de tentatives, réessayez dans 1 minute.';
  if (status === 401) return 'Session expirée, veuillez vous reconnecter.';
  if (status >= 500)  return 'Erreur serveur, réessayez plus tard.';
  return 'Une erreur est survenue. Veuillez réessayer.';
};

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { user, setShowAuth } = useAuth();
  const navigate = useNavigate();

  const [step, setStep]             = useState(1);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', address: '', city: '' });
  const [cardInfo, setCardInfo]     = useState({ number: '', expiry: '', cvc: '' });
  const [processing, setProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [cardErrors, setCardErrors] = useState({});  // NOUVEAU
  const [payError, setPayError]     = useState('');
  const [lastSubmit, setLastSubmit] = useState(0);

  // ── Garde : non connecté ──────────────────────────────
  if (!user) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '80px 20px', paddingTop: '150px' }}>
          <h2 style={{ marginBottom: '16px' }}>Authentification requise</h2>
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

  // ── Garde : panier vide ───────────────────────────────
  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '80px 20px', paddingTop: '150px' }}>
          <h2 style={{ marginBottom: '16px' }}>Votre panier est vide</h2>
          <p style={{ color: '#777', marginBottom: '24px' }}>Ajoutez des produits avant de passer commande.</p>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '14px 32px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            Continuer mes achats
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // ── Étape 1 : validation infos client ─────────────────
  const handleClientSubmit = (e) => {
    e.preventDefault();
    const errors = validateClientInfo(clientInfo);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setStep(2);
  };

  // ── Étape 2 : paiement ────────────────────────────────
  const handlePayment = async (e) => {
    e.preventDefault();

    // NOUVEAU : valider la carte en premier
    const cErrors = validateCardInfo(cardInfo);
    if (Object.keys(cErrors).length > 0) {
      setCardErrors(cErrors);
      return;
    }
    setCardErrors({});

    // Anti-spam
    const now = Date.now();
    if (now - lastSubmit < 3000) {
      setPayError('Veuillez patienter quelques secondes avant de réessayer.');
      return;
    }
    setLastSubmit(now);
    setPayError('');
    setProcessing(true);

    try {
      const orderData = {
        items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
        total_price: parseFloat(total.toFixed(2)),
        client_info: JSON.stringify({
          name:    sanitize(clientInfo.name),
          email:   clientInfo.email.trim().toLowerCase().slice(0, 255),
          phone:   clientInfo.phone.replace(/[^\d+\s\-()]/g, '').slice(0, 20),
          address: sanitize(clientInfo.address),
          city:    sanitize(clientInfo.city),
        }),
      };

      const result = await api.post('/orders', orderData);

      if (result.success) {
        clearCart();
        setCardInfo({ number: '', expiry: '', cvc: '' });
        setClientInfo({ name: '', email: '', phone: '', address: '', city: '' });
        navigate('/orders');
      } else {
        setPayError(getErrorMessage({ status: result.status }));
      }
    } catch (error) {
      console.error('Erreur paiement:', error);
      if (error?.errors) {
        const msgs = Object.values(error.errors).flat().join(' · ');
        setPayError('Erreurs : ' + msgs);
      } else {
        setPayError(getErrorMessage(error));
      }
    } finally {
      setProcessing(false);
    }
  };

  // ── Helper champ client ───────────────────────────────
  const updateClientField = (field, value) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ── NOUVEAU : Helper champ carte ──────────────────────
  const updateCardField = (field, value) => {
    setCardInfo(prev => ({ ...prev, [field]: value }));
    if (cardErrors[field]) setCardErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ── Styles réutilisables ──────────────────────────────
  const errStyle = { color: '#e53e3e', fontSize: '12px', marginTop: '4px', display: 'block' };
  const inputErrStyle = (field, errObj) => ({ borderColor: errObj[field] ? '#e53e3e' : '' });

  return (
    <>
      <Header />
      <div className="checkout-page">

        {/* Steps */}
        <div className="checkout-steps">
          <div className={step === 1 ? 'step active' : 'step'}>
            <span className="step-num">1</span>Informations Client
          </div>
          <div className={step === 2 ? 'step active' : 'step'}>
            <span className="step-num">2</span>Paiement
          </div>
        </div>

        {/* ══ ÉTAPE 1 ══ */}
        {step === 1 && (
          <form className="checkout-form" onSubmit={handleClientSubmit} noValidate>
            <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Informations de livraison</h3>

            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" value={clientInfo.name}
                onChange={e => updateClientField('name', e.target.value)}
                placeholder="Votre nom complet"
                style={inputErrStyle('name', formErrors)} />
              {formErrors.name && <span style={errStyle}>{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={clientInfo.email}
                onChange={e => updateClientField('email', e.target.value)}
                placeholder="votre@email.com"
                style={inputErrStyle('email', formErrors)} />
              {formErrors.email && <span style={errStyle}>{formErrors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Téléphone</label>
                <input type="tel" value={clientInfo.phone}
                  onChange={e => updateClientField('phone', e.target.value)}
                  placeholder="+212 6XX XXX XXX"
                  style={inputErrStyle('phone', formErrors)} />
                {formErrors.phone && <span style={errStyle}>{formErrors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input type="text" value={clientInfo.city}
                  onChange={e => updateClientField('city', e.target.value)}
                  placeholder="Casablanca"
                  style={inputErrStyle('city', formErrors)} />
                {formErrors.city && <span style={errStyle}>{formErrors.city}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Adresse de livraison</label>
              <input type="text" value={clientInfo.address}
                onChange={e => updateClientField('address', e.target.value)}
                placeholder="Adresse complète"
                style={inputErrStyle('address', formErrors)} />
              {formErrors.address && <span style={errStyle}>{formErrors.address}</span>}
            </div>

            {/* Récapitulatif */}
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

        {/* ══ ÉTAPE 2 ══ */}
        {step === 2 && (
          <form className="checkout-form" onSubmit={handlePayment} noValidate>
            <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Paiement par carte</h3>

            <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#666' }}>Total à payer</span>
                <span style={{ fontWeight: '700', color: '#d4879a' }}>{total.toFixed(2)} dh</span>
              </div>
            </div>

            {/* Numéro carte */}
            <div className="form-group">
              <label>Numéro de carte</label>
              <input
                type="text"
                value={cardInfo.number}
                onChange={e => updateCardField('number', e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="4242 4242 4242 4242"
                maxLength={16}
                autoComplete="cc-number"
                style={inputErrStyle('number', cardErrors)}
              />
              
            </div>

            <div className="form-row">
              {/* Expiration */}
              <div className="form-group">
                <label>Date d'expiration</label>
                <input
                  type="text"
                  value={cardInfo.expiry}
                  onChange={e => {
                    // NOUVEAU : formatage automatique MM/AA pendant la saisie
                    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
                    updateCardField('expiry', val);
                  }}
                  placeholder="MM/AA"
                  maxLength={5}
                  autoComplete="cc-exp"
                  style={inputErrStyle('expiry', cardErrors)}
                />
                
              </div>

              {/* CVC */}
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="password"
                  value={cardInfo.cvc}
                  onChange={e => updateCardField('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="•••"
                  maxLength={4}
                  autoComplete="cc-csc"
                  style={inputErrStyle('cvc', cardErrors)}
                />
                
              </div>
            </div>

            {/* Erreur globale paiement */}
            {payError && (
              <div style={{ background: '#fff5f5', border: '1px solid #fc8181', borderRadius: '6px', padding: '12px 16px', marginBottom: '16px', color: '#c53030', fontSize: '13px' }}>
                {payError}
              </div>
            )}

            <div style={{ fontSize: '11px', color: '#999', marginBottom: '16px' }}>
               Paiement sécurisé — Test Mode
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => { setStep(1); setPayError(''); setCardErrors({}); }}
                style={{ flex: 1, padding: '14px', background: '#fff', color: '#d4879a', border: '1px solid #d4879a', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={processing}
                style={{ flex: 2, padding: '14px', background: processing ? '#ccc' : '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: processing ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
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