import { useState, useEffect } from 'react';
import api from '../services/api';
import { categories, subCategories } from '../data/mockData';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', promo_price: '', description: '',
    image_url: '', category_id: '', subCategory: ''
  });

  useEffect(() => {
  api.get('/admin/products')
    .then(res => {
      const data = res.data.data || res.data;
      setProducts(Array.isArray(data) ? data : []);
    })
    .catch((err) => {
      console.error(err);
      alert('Erreur chargement produits');
    })
    .finally(() => setLoading(false));
}, []);

  
const handleStockChange = async (id, value) => {
  const stock = Math.max(0, parseInt(value) || 0);
  // Mise à jour optimiste immédiate
  setProducts(prev => prev.map(p => p.id === id ? { ...p, stock } : p));
  try {
    const res = await api.patch(`/admin/products/${id}/stock`, { stock });
    // Sync avec la vraie valeur retournée par le serveur
    const updated = res.data.data || res.data;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: updated.stock } : p));
  } catch {
    alert('Erreur mise à jour stock');
    // Recharger pour annuler la mise à jour optimiste
    const res = await api.get('/admin/products');
    setProducts(res.data.data || res.data);
  }
};
  const handleSave = async () => {
    if (!formData.category_id) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }
    try {
      if (editingProduct) {
        const res = await api.put(`/admin/products/${editingProduct.id}`, formData);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? res.data : p));
      } else {
        const res = await api.post('/admin/products', { ...formData, stock: 10 });
        setProducts(prev => [...prev, res.data]);
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData({ name: '', price: '', promo_price: '', description: '', image_url: '', category_id: '', subCategory: '' });
    } catch {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit définitivement ?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Erreur suppression');
    }
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name:        product.name,
      price:       product.price,
      promo_price: product.promo_price || '',
      description: product.description || '',
      image_url:   product.image_url || '',
      category_id: product.category_id || '',
      subCategory: product.subCategory || ''
    });
    setShowForm(true);
  };

  if (loading) return <p style={{ padding: '30px' }}>Chargement des produits...</p>;

  return (
    <div>
      {/* En-tête + Bouton Ajouter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Gestion des Produits</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
            setFormData({ name: '', price: '', promo_price: '', description: '', image_url: '', category_id: '', subCategory: '' });
          }}
          style={{ background: '#d4879a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          + Ajouter un produit
        </button>
      </div>

      {/* Grille des produits */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} className="product-card" style={{
            position: 'relative',
            border: product.stock === 0 ? '2px solid #d32f2f' : product.stock < 5 ? '2px solid #ef6c00' : '1px solid #f0f0f0',
            borderRadius: '8px',
            background: product.stock === 0 ? '#ffebee' : product.stock < 5 ? '#fffaf0' : '#fff',
            padding: '15px'
          }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'contain', marginBottom: '10px' }} />
            <h4 style={{ fontSize: '14px', margin: '0 0 5px', color: '#333' }}>{product.name}</h4>
            <p style={{ color: '#d4879a', fontWeight: '600', margin: '0 0 10px' }}>{parseFloat(product.price).toFixed(2)} dh</p>

            <p style={{ fontSize: '11px', color: '#999', margin: '0 0 10px' }}>
              {product.category?.name || 'Sans catégorie'}
            </p>

            {/* Stock modifiable */}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '11px', color: '#666', display: 'block', marginBottom: '4px' }}>Stock</label>
              <input
                type="number"
                min="0"
                value={product.stock}
                onChange={(e) => handleStockChange(product.id, e.target.value)}
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

      {/* Modal Formulaire */}
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0 }}>{editingProduct ? 'Modifier' : 'Ajouter'} un produit</h3>

            {/* Catégorie */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Catégorie</label>
              <select
                value={formData.category_id}
                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px' }}
              >
                <option value="">-- Choisir --</option>
                {categories.map(cat => (
                  <option key={cat.key} value={
                    cat.key === 'visage' ? 1 : cat.key === 'cheveux' ? 2 : cat.key === 'corps' ? 3 : 4
                  }>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Nom */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Nom du produit</label>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} placeholder="Ex: Crème hydratante" />
            </div>

            {/* Prix & Promo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Prix (dh)</label>
                <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="0.00" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Prix promo</label>
                <input type="number" value={formData.promo_price} onChange={e => setFormData({ ...formData, promo_price: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="0.00" />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Description</label>
              <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px', resize: 'vertical' }} placeholder="Décrivez le produit..." />
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>URL de l'image</label>
              <input value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px' }} placeholder="/images/..." />
            </div>

            {/* Boutons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowForm(false)} style={{ padding: '10px 20px', background: '#f5f5f5', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleSave} style={{ padding: '10px 20px', background: '#d4879a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;