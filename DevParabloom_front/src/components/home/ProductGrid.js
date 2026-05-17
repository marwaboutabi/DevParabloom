/* src/components/home/ProductGrid.jsx */
import { useState, useEffect } from 'react';
import ProductCard from '../common/ProductCard';
import api from '../../services/api'; 

const ProductGrid = ({ title = "Nos Produits" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchProducts = () => {
      api.get('/products') 
        .then(res => {
  const data = res.data.data || res.data;
  if (Array.isArray(data)) setProducts(data);
  setLoading(false);
})
        .catch(() => {
          setError('Impossible de charger les produits.');
          setLoading(false);
        });
    };

    fetchProducts();
    const interval = setInterval(fetchProducts, 10000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px' }}>
      Chargement des produits...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', color: 'red', padding: '40px' }}>
      {error}
    </div>
  );

  const caudalieProducts = products.filter(p =>
    p.name.toLowerCase().includes('caudalie')
  );

  const otherProducts = products.filter(p =>
    !p.name.toLowerCase().includes('caudalie')
  );

  const groupedByCategory = otherProducts.reduce((acc, product) => {
    const category = product.category?.name || 'Autres';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const limitedProducts = Object.values(groupedByCategory)
    .flatMap(cat => cat.slice(0, 4));

  return (
    <div style={{ marginTop: '60px' }}>

      {caudalieProducts.length > 0 && (
        <div className="product-grid" style={{ marginBottom: '40px' }}>
          {caudalieProducts.map(product => (
            <ProductCard key={`caudalie-${product.id}`} product={product} />
          ))}
        </div>
      )}

      <h2 className="section-title" style={{ marginBottom: '30px' }}>{title}</h2>

      {limitedProducts.length > 0 && (
        <div className="product-grid">
          {limitedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductGrid;