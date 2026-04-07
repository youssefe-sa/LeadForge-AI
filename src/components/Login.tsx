import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const C = {
  surface: '#ffffff',
  surface2: '#f8f9fa',
  border: '#e9ecef',
  tx1: '#2c3e50',
  tx2: '#6c757d',
  tx3: '#adb5bd',
  accent: '#4361ee',
  accentHover: '#3a56d4',
  red: '#ef476f',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Inscription
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Inscription réussie ! Veuillez vérifier vos e-mails (si la confirmation est activée dans Supabase) ou connectez-vous.');
        setIsSignUp(false);
      } else {
        // Connexion
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F6F2', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: C.surface, padding: '40px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🚀</div>
          <h1 style={{ margin: 0, fontSize: 24, color: C.tx1 }}>LeadForge AI</h1>
          <p style={{ margin: '8px 0 0 0', color: C.tx2, fontSize: 14 }}>
            Portail Administrateur Sécurisé
          </p>
        </div>

        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px 15px', borderRadius: '6px', fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.tx1, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: `1px solid ${C.border}`, fontSize: 14 }}
              placeholder="admin@leadforge.ai"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.tx1, marginBottom: 6 }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: `1px solid ${C.border}`, fontSize: 14 }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px', borderRadius: '6px', border: 'none',
              background: C.accent, color: '#fff', fontSize: 15, fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer', marginTop: 10, opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Veuillez patienter...' : (isSignUp ? 'Créer un compte' : 'Se connecter')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ background: 'none', border: 'none', color: C.tx2, fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isSignUp ? 'Déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  );
}
