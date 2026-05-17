import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subCategories } from '../data/mockData';
import api from '../services/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/common/ProductCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const sub = searchParams.get('sub') || '';

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const params = {};
    if (category) params.category = category;
    if (sub) params.sub = sub;

    api.get('/products', { params })
      .then(res => {
        const data = res.data.data || res.data;
        if (Array.isArray(data)) setAllProducts(data);
      })
      .catch(() => console.error('Erreur chargement produits'));
  }, [category, sub]);

  const filtered = allProducts.filter(p => {
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  });

  const availableSubs = subCategories[category] || [];

  return (
    <>
      <Header />

      <div className="search-results">
        <h2>
          {query ? `Résultats pour "${searchParams.get('q')}"` : ''}
          {category && !query ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}
          {!query && !category ? 'Tous les produits' : ''}
          <span style={{ fontWeight: '400', color: '#999', fontSize: '16px', marginLeft: '8px' }}>
            ({filtered.length} produit{filtered.length !== 1 ? 's' : ''})
          </span>
        </h2>

        {category && availableSubs.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0 30px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate(`/search?category=${category}`, { replace: true })}
              style={{
                padding: '10px 20px',
                background: !sub ? '#d4879a' : '#f5f5f5',
                color: !sub ? '#fff' : '#555',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
            >
              Tous
            </button>

            {availableSubs.map(subCat => (
              <button
                key={subCat.key}
                onClick={() => navigate(`/search?category=${category}&sub=${subCat.key}`, { replace: true })}
                style={{
                  padding: '10px 20px',
                  background: sub === subCat.key ? '#d4879a' : '#ffffff',
                  color: sub === subCat.key ? '#fff' : '#555',
                  border: sub === subCat.key ? 'none' : '1px solid #eee',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  boxShadow: sub === subCat.key ? '0 4px 10px rgba(212,135,154,0.3)' : 'none'
                }}
              >
                {subCat.name}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '60px 0' }}>Aucun produit trouvé</p>
        ) : (
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SearchPage;