import { useState, useEffect } from 'react';
import { subCategories as SUB_CATEGORIES_DATA } from '../data/mockData';
import api from '../services/api';

// ─── Données catégories ───────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, key: 'visage',      name: 'Visage' },
  { id: 2, key: 'cheveux',     name: 'Cheveux' },
  { id: 3, key: 'corps',       name: 'Corps' },
  { id: 4, key: 'complement',  name: 'Complément alimentaire' },
];

// Retourne la key de catégorie à partir de l'id
const getCatKey = (id) => {
  const cat = CATEGORIES.find(c => c.id === Number(id));
  return cat ? cat.key : null;
};

// ─── Composant ───────────────────────────────────────────────────────────────
const AdminProducts = () => {
  const [products, setProducts]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [showForm, setShowForm]             = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyForm = {
    name: '', price: '', promo_price: '', description: '',
    image_url: '', category_id: '', sub_category: '',
  };
  const [formData, setFormData] = useState(emptyForm);

  // Sous-catégories disponibles selon la catégorie choisie
  // Retourne un tableau d'objets { key, name } depuis mockData
  const availableSubs = SUB_CATEGORIES_DATA[getCatKey(formData.category_id)] ?? [];

  // ── Chargement produits ──────────────────────────────────────────────────
  useEffect(() => {
    api.get('/admin/products')
      .then(res => {
        const data = res.data.data || res.data;
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => { console.error(err); alert('Erreur chargement produits'); })
      .finally(() => setLoading(false));
  }, []);

  // ── Stock ────────────────────────────────────────────────────────────────
  const handleStockChange = async (id, value) => {
    const stock = Math.max(0, parseInt(value) || 0);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock } : p));
    try {
      const res = await api.patch(`/admin/products/${id}/stock`, { stock });
      const updated = res.data.data || res.data;
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: updated.stock } : p));
    } catch {
      alert('Erreur mise à jour stock');
      const res = await api.get('/admin/products');
      setProducts(res.data.data || res.data);
    }
  };

  // ── Sauvegarde (ajout / modification) ───────────────────────────────────
  const handleSave = async () => {
    if (!formData.category_id) { alert('Veuillez sélectionner une catégorie'); return; }
    if (availableSubs.length > 0 && !formData.sub_category) {
      alert('Veuillez sélectionner une sous-catégorie'); return;
    }
    try {
      if (editingProduct) {
        // formData.sub_category contient déjà le slug (ex: "huile-nourrissante")
        const res = await api.put(`/admin/products/${editingProduct.id}`, formData);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? (res.data.data || res.data) : p));
      } else {
        const res = await api.post('/admin/products', { ...formData, stock: 10 });
        setProducts(prev => [...prev, res.data.data || res.data]);
      }
      closeForm();
    } catch {
      alert('Erreur lors de la sauvegarde');
    }
  };

  // ── Suppression ──────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit définitivement ?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch { alert('Erreur suppression'); }
  };

  // ── Ouverture édition ────────────────────────────────────────────────────
  const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name:         product.name,
      price:        product.price,
      promo_price:  product.promo_price  || '',
      description:  product.description  || '',
      image_url:    product.image_url    || '',
      category_id:  product.category_id  || '',
      sub_category: product.sub_category || '',
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData(emptyForm);
  };

  // Quand on change la catégorie, on reset la sous-catégorie
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category_id: e.target.value, sub_category: '' });
  };

  // ── Rendu ────────────────────────────────────────────────────────────────
  if (loading) return <p style={{ padding: '30px' }}>Chargement des produits...</p>;

  return (
    <div>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Gestion des Produits</h2>
        <button
          onClick={() => { setShowForm(true); setEditingProduct(null); setFormData(emptyForm); }}
          style={{ background: '#d4879a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          + Ajouter un produit
        </button>
      </div>

      {/* Grille produits */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: product.stock === 0 ? '2px solid #d32f2f' : product.stock < 5 ? '2px solid #ef6c00' : '1px solid #f0f0f0',
            borderRadius: '8px',
            background: product.stock === 0 ? '#ffebee' : product.stock < 5 ? '#fffaf0' : '#fff',
            padding: '15px',
          }}>
            <img src={product.image_url} alt={product.name}
              style={{ width: '100%', height: '160px', objectFit: 'contain', marginBottom: '10px' }} />
            <h4 style={{ fontSize: '14px', margin: '0 0 4px', color: '#333' }}>{product.name}</h4>
            <p style={{ color: '#d4879a', fontWeight: '600', margin: '0 0 4px' }}>
              {parseFloat(product.price).toFixed(2)} dh
            </p>
            <p style={{ fontSize: '11px', color: '#999', margin: '0 0 2px' }}>
              {product.category?.name || 'Sans catégorie'}
            </p>
            {product.sub_category && (
              <p style={{ fontSize: '11px', color: '#bbb', margin: '0 0 10px' }}>
                {product.sub_category}
              </p>
            )}

            {/* Stock */}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '11px', color: '#666', display: 'block', marginBottom: '4px' }}>Stock</label>
              <input
                type="number" min="0" value={product.stock}
                onChange={e => handleStockChange(product.id, e.target.value)}
                style={{
                  width: '70px', padding: '6px 8px', textAlign: 'center', fontSize: '13px',
                  border: product.stock === 0 ? '2px solid #d32f2f' : product.stock < 5 ? '2px solid #ef6c00' : '1px solid #ddd',
                  borderRadius: '4px',
                  color: product.stock === 0 ? '#d32f2f' : product.stock < 5 ? '#ef6c00' : '#333',
                  background: product.stock === 0 ? '#ffebee' : product.stock < 5 ? '#fff8f0' : '#fff',
                }}
              />
              {product.stock === 0 && <span style={{ fontSize: '10px', color: '#d32f2f', marginLeft: '8px', fontWeight: '600' }}>Rupture de stock</span>}
              {product.stock > 0 && product.stock < 5 && <span style={{ fontSize: '10px', color: '#ef6c00', marginLeft: '8px' }}>Stock faible</span>}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => openEdit(product)} style={{ flex: 1, padding: '8px', background: '#fff', border: '1px solid #d4879a', color: '#d4879a', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Modifier</button>
              <button onClick={() => handleDelete(product.id)} style={{ flex: 1, padding: '8px', background: '#fff', border: '1px solid #e74c3c', color: '#e74c3c', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal formulaire */}
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '420px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0 }}>{editingProduct ? 'Modifier' : 'Ajouter'} un produit</h3>

            {/* ── Catégorie ── */}
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Catégorie *</label>
              <select
                value={formData.category_id}
                onChange={handleCategoryChange}
                style={selectStyle}
              >
                <option value="">-- Choisir une catégorie --</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* ── Sous-catégorie ── */}
            {formData.category_id && availableSubs.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Sous-catégorie *</label>
                <select
                  value={formData.sub_category}
                  onChange={e => setFormData({ ...formData, sub_category: e.target.value })}
                  style={selectStyle}
                >
                  <option value="">-- Choisir une sous-catégorie --</option>
                  {availableSubs.map(sub => (
                    // ✅ value = slug "huile-nourrissante" | affiché = label "Huile nourrissante"
                    <option key={sub.key} value={sub.key}>{sub.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* ── Nom ── */}
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Nom du produit</label>
              <input
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                placeholder="Ex: Crème hydratante"
              />
            </div>

            {/* ── Prix & Promo ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <div>
                <label style={labelStyle}>Prix (dh)</label>
                <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} style={inputStyle} placeholder="0.00" />
              </div>
              <div>
                <label style={labelStyle}>Prix promo</label>
                <input type="number" value={formData.promo_price} onChange={e => setFormData({ ...formData, promo_price: e.target.value })} style={inputStyle} placeholder="0.00" />
              </div>
            </div>

            {/* ── Description ── */}
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Décrivez le produit..."
              />
            </div>

            {/* ── Image URL ── */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>URL de l'image</label>
              <input
                value={formData.image_url}
                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                style={inputStyle}
                placeholder="/images/..."
              />
            </div>

            {/* ── Boutons ── */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={closeForm} style={{ padding: '10px 20px', background: '#f5f5f5', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleSave} style={{ padding: '10px 20px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Styles partagés ─────────────────────────────────────────────────────────
const labelStyle = { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' };
const inputStyle  = { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' };
const selectStyle = { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box', background: '#fff' };

export default AdminProducts;