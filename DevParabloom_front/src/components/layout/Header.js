import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CartSidebar from '../cart/CartSidebar';
import AuthModal from '../auth/AuthModal';
import { categories } from '../../data/mockData';

const Header = () => {
  const navigate = useNavigate();
  const { user, setShowAuth, logout } = useAuth();
  const { cart, setShowCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>

        {/* Ligne 1 : Logo + Search + Actions */}
        <div className="header-main">
          <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            Para<span>Bloom</span>
          </div>

          <form className="header-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon" />
          </form>

          <div className="header-actions">
            {user ? (
              <div ref={menuRef} style={{ position: 'relative' }}>
                <button className="header-action-btn" onClick={() => setMenuOpen(!menuOpen)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {user.name}
                </button>
                {menuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                    background: '#fff', border: '0.5px solid #eee', borderRadius: '10px',
                    overflow: 'hidden', minWidth: '170px', zIndex: 1000,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}>
                    <button
                      onClick={() => { setMenuOpen(false); navigate('/orders'); }}
                      style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none',
                        textAlign: 'left', cursor: 'pointer', fontSize: '13px', color: '#444',
                        display: 'flex', alignItems: 'center', gap: '9px', borderBottom: '0.5px solid #f5f5f5' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fdf5f7'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4879a" strokeWidth="2">
                        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                        <rect x="9" y="3" width="6" height="4" rx="2"/>
                      </svg>
                      Mes commandes
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); logout(); }}
                      style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none',
                        textAlign: 'left', cursor: 'pointer', fontSize: '13px', color: '#c0392b',
                        display: 'flex', alignItems: 'center', gap: '9px' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="header-action-btn" onClick={() => setShowAuth(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Connexion
              </button>
            )}

            <button className="header-action-btn" onClick={() => setShowCart(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Panier</span>
              {cartCount > 0 && (
                <span style={{
                  background: '#d4879a', color: '#fff', borderRadius: '50%',
                  width: '18px', height: '18px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '10px', fontWeight: '600'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="header-nav">
            <button className="nav-link" onClick={() => navigate('/')}> Accueil</button>

          {categories.map(cat => (
            <button
              key={cat.key}
              className="nav-link"
              onClick={() => navigate(`/search?category=${cat.key}`)}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </header>

      <CartSidebar />
      <AuthModal />
    </>
  );
};

export default Header;