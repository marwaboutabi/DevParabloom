import { useEffect, useState } from 'react';
import api from '../services/api';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState(0); 

  useEffect(() => {
    // Appel à l'API Laravel
    api.get('/products')
      .then(response => {
        const data = response.data.data?.data || response.data.data || response.data;
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Erreur:', err))
      .finally(() => setLoading(false));
  }, [lastFetch]); 

  const refreshProducts = () => {
    setLoading(true);
    setLastFetch(Date.now());
  };

  useEffect(() => {
    window.refreshProducts = refreshProducts;
    return () => { delete window.refreshProducts; };
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="products-grid">
      
      <button 
        onClick={refreshProducts}
        style={{ marginBottom: '16px', padding: '8px 16px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
         Rafraîchir les prix
      </button>

      {products.map(product => (
        <div key={product.id} className="product-card">
          <img 
            src={`http://localhost:8000${product.image_url || product.image}`} 
            alt={product.name} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <h3>{product.name}</h3>
          <p style={{ color: '#d4879a', fontWeight: 'bold' }}>
            {parseFloat(product.price).toFixed(2)} dh
          </p>
          <button>Ajouter au panier</button>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;