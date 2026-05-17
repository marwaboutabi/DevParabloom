import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = () => {
  // Ajout de loading et error depuis le context
  const { showAuth, setShowAuth, authMode, setAuthMode, login, register, loading, error } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!showAuth) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(formData.email, formData.password);
    } else {
      register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="auth-overlay" onClick={() => setShowAuth(false)}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <h2>{authMode === 'login' ? 'Connexion' : 'Créer un compte'}</h2>
        
        {/* Affichage des erreurs API */}
        {error && <p style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '12px', fontSize: '14px' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} autoComplete="off">
          {authMode === 'register' && (
            <div className="form-group">
              <label>Nom complet</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          
          {/* Bouton sécurisé : désactivé pendant le chargement */}
          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Patientez...' : (authMode === 'login' ? 'Se connecter' : "S'inscrire")}
          </button>
        </form>
        
        <div className="auth-switch">
          {authMode === 'login' ? (
            <>Pas encore de compte ? <span onClick={() => !loading && setAuthMode('register')}>Créer un compte</span></>
          ) : (
            <>Déjà un compte ? <span onClick={() => !loading && setAuthMode('login')}>Se connecter</span></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 