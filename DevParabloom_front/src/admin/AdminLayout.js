import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', label: 'Tableau de bord' },
    { path: '/admin/products', label: 'Produits' },
    { path: '/admin/orders', label: 'Commandes' },
    { path: '/admin/customers', label: 'Clients'},
  ];

  const isActive = (path) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '0px',              
        borderRight: sidebarOpen ? '1px solid #eee' : 'none', 
        display: sidebarOpen ? 'flex' : 'none',            
        flexDirection: 'column',
        padding: sidebarOpen ? '20px 0' : '0',             
        flexShrink: 0,
        overflow: 'hidden',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        {/* Logo / Marque */}
        <div style={{
          padding: '0 20px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }} onClick={() => navigate('/')}>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#222', transition: 'opacity 0.2s', opacity: sidebarOpen ? 1 : 0 }}>
            Para<span style={{ color: '#d4879a' }}>Bloom</span>
          </span>
          <span style={{
            fontSize: '10px', background: '#d4879a', color: '#fff', padding: '2px 6px', borderRadius: '4px',
            transition: 'opacity 0.2s', opacity: sidebarOpen ? 1 : 0
          }}>ADMIN</span>
          {!sidebarOpen && <span style={{ fontSize: '20px', fontWeight: '700', color: '#d4879a' }}>PB</span>}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto' }}>
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                padding: '12px 20px',
                textAlign: 'left',
                background: isActive(item.path) ? '#fce4e8' : 'transparent',
                border: 'none',
                borderLeft: isActive(item.path) ? '4px solid #d4879a' : '4px solid transparent',
                color: isActive(item.path) ? '#d4879a' : '#555',
                fontWeight: isActive(item.path) ? '600' : '400',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
            >
              <span style={{ fontSize: '18px', minWidth: '20px', textAlign: 'center' }}>{item.icon}</span>
              <span style={{ opacity: sidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Déconnexion */}
        <button onClick={() => { logout(); navigate('/'); }} style={{
          padding: '12px 20px',
          background: '#fff0f3',
          border: 'none',
          color: '#d4879a',
          cursor: 'pointer',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          justifyContent: sidebarOpen ? 'flex-start' : 'center'
        }}>
          
          <span style={{ opacity: sidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>Déconnexion</span>
        </button>
      </aside>

      {/* Contenu principal */}
      <main style={{
        flex: 1,
        padding: '30px',
        transition: 'all 0.3s ease',
        overflowX: 'hidden',
        width: '100%'
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', color: '#333', margin: 0 }}>Bienvenue, {user?.name}</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'transform 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </header>
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;