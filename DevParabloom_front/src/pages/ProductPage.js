import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        const data = res.data.data || res.data;
        setProduct(data);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <><Header />
    <div style={{ textAlign: 'center', padding: '80px' }}>Chargement...</div>
    <Footer /></>
  );

  if (!product) return (
    <><Header />
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h2>Produit non trouvé</h2>
      <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 24px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Retour à l'accueil
      </button>
    </div>
    <Footer /></>
  );

  const isOutOfStock = product.in_stock === false || product.stock === 0;
  const imageUrl = product.image_url || product.image;
  const price = parseFloat(product.price);

  return (
    <>
      <Header />
      <div className="product-detail-page">
        <div className="product-detail-img">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/f9f9f9/ccc?text=Image+non+trouvee';
            }}
          />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="price">{price.toFixed(2)} dh</div>
          <p className="description">{product.description}</p>

          {!isOutOfStock && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Quantité :</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '6px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '36px', height: '36px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer' }}
                >-</button>
                <span style={{ width: '40px', textAlign: 'center', fontSize: '14px' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '36px', height: '36px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer' }}
                >+</button>
              </div>
            </div>
          )}

          {isOutOfStock ? (
            <button
              disabled
              style={{ padding: '14px 40px', background: '#f0f0f0', color: '#aaa', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'not-allowed', width: '100%' }}
            >
              Rupture de stock
            </button>
          ) : (
            <button
              className="detail-btn"
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(product);
              }}
            >
              Ajouter au Panier — {(price * quantity).toFixed(2)} dh
            </button>
          )}

          <div style={{ marginTop: '32px', fontSize: '12px', color: '#999' }}>
            <p>🚚 Livraison gratuite à Casablanca</p>
            <p>📦 Expédition sous 24-48h</p>
            <p>↩️ Retour sous 14 jours</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;