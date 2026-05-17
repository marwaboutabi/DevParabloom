import { useState, useEffect } from 'react';
import api from '../../services/api';

const DEFAULT_PREFS = {
  essential:  true,
  functional: false,
  analytics:  false,
  marketing:  false,
};

export default function CookieBanner() {
  const [visible, setVisible]     = useState(false);
  const [showDetails, setDetails] = useState(false);
  const [prefs, setPrefs]         = useState(DEFAULT_PREFS);

  useEffect(() => {
  const saved = localStorage.getItem('cookie_consent');
  if (!saved) {
    setTimeout(() => setVisible(true), 3000); // ← 3 secondes
  }
}, []);

  const save = async (selectedPrefs) => {
    localStorage.setItem('cookie_consent', JSON.stringify(selectedPrefs));
    try {
      await api.post('/api/v1/cookie-consent', selectedPrefs);
    } catch (_) {}
    setVisible(false);
  };

  const acceptAll  = () => save({ essential: true, functional: true, analytics: true, marketing: true });
  const saveCustom = () => save(prefs);
  const toggle     = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.banner} role="dialog" aria-label="Gestion des cookies">

        {!showDetails ? (
          // ── Vue principale ──
          <>
            <h2 style={styles.title}>Notre site utilise des cookies</h2>
            <p style={styles.desc}>
              Nous utilisons des{' '}
              <a href="/politique-confidentialite" style={styles.link}>cookies</a>
              {' '}pour assurer la fiabilité et la sécurité du site, personnaliser
              le contenu, proposer des fonctionnalités sociales et analyser
              la façon dont nos sites sont utilisés.
            </p>

            <div style={styles.actions}>
              <button onClick={() => setDetails(true)} style={styles.btn}>
                Gérer les cookies
              </button>
              <button onClick={acceptAll} style={{ ...styles.btn, ...styles.btnPrimary }}>
                Accepter &amp; continuer
              </button>
            </div>
          </>

        ) : (
          // ── Vue personnalisation ──
          <>
            <h2 style={styles.title}>Gérer les cookies</h2>

            <div style={styles.toggleList}>
              {[
                { key: 'essential',  label: 'Essentiels',   sub: 'Nécessaires au fonctionnement du site', disabled: true  },
                { key: 'functional', label: 'Fonctionnels', sub: 'Mémorisation de vos préférences',        disabled: false },
                { key: 'analytics',  label: 'Analytiques',  sub: 'Statistiques de navigation anonymisées', disabled: false },
                { key: 'marketing',  label: 'Marketing',    sub: 'Publicités personnalisées',               disabled: false },
              ].map(({ key, label, sub, disabled }) => (
                <div key={key} style={styles.row}>
                  <div>
                    <p style={styles.rowLabel}>{label}</p>
                    <p style={styles.rowSub}>{sub}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs[key]}
                    disabled={disabled}
                    onChange={() => toggle(key)}
                    style={{ width: 18, height: 18, cursor: disabled ? 'not-allowed' : 'pointer' }}
                  />
                </div>
              ))}
            </div>

            <div style={styles.actions}>
              <button onClick={() => setDetails(false)} style={styles.btn}>
                ← Retour
              </button>
              <button onClick={saveCustom} style={{ ...styles.btn, ...styles.btnPrimary }}>
                Enregistrer mes choix
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

const styles = {
overlay: { position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, padding: '1rem', zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  banner:     { background: '#fff', borderRadius: 12, padding: '1.5rem', maxWidth: 560, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' },
  title:      { margin: '0 0 8px', fontSize: 18, fontWeight: 500 },
  desc:       { margin: '0 0 1rem', fontSize: 14, color: '#555', lineHeight: 1.6 },
  link:       { color: '#1D9E75' },
  toggleList: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.25rem' },
  row:        { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f7f7f5', borderRadius: 8, padding: '10px 14px' },
  rowLabel:   { margin: 0, fontSize: 13, fontWeight: 500 },
  rowSub:     { margin: '2px 0 0', fontSize: 12, color: '#888' },
  actions:    { display: 'flex', gap: 10, flexWrap: 'wrap' },
  btn:        { flex: 1, minWidth: 120, padding: '9px 14px', borderRadius: 8, fontSize: 14, cursor: 'pointer', border: '1px solid #ddd', background: '#fff' },
  btnPrimary: { background: '#111', color: '#fff', border: 'none' },
};