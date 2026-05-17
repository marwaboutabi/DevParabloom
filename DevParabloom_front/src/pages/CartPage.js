/* src/pages/CartPage.jsx */
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2 style={{ marginBottom: '16px' }}>Votre panier est vide</h2>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '12px 32px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
          >
            Continuer les achats
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>Mon Panier ({cart.length} article{cart.length > 1 ? 's' : ''})</h2>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '16px', background: '#fff', borderRadius: '8px', marginBottom: '12px', border: '1px solid #f0f0f0', alignItems: 'center' }}>
            <img
              src={`https://placehold.co/80x80/f9f9f9/ccc?text=P&font=roboto`}
              alt={item.name}
              style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#f9f9f9', borderRadius: '4px' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#d4879a' }}>{item.price.toFixed(2)} dh</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '6px' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{ width: '32px', height: '32px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}
              >-</button>
              <span style={{ width: '36px', textAlign: 'center', fontSize: '13px' }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{ width: '32px', height: '32px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}
              >+</button>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', minWidth: '80px', textAlign: 'right' }}>
              {(item.price * item.quantity).toFixed(2)} dh
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '18px' }}
            >✕</button>
          </div>
        ))}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #f0f0f0', marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
            <span>Total</span>
            <span style={{ color: '#d4879a' }}>{total.toFixed(2)} dh</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/checkout')}
              style={{ flex: 1, padding: '14px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              Passer au Paiement
            </button>
            <button
              onClick={() => navigate('/')}
              style={{ padding: '14px 24px', background: '#fff', color: '#d4879a', border: '1px solid #d4879a', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              Continuer les achats
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;