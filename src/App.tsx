import { useState } from 'react';
import { useLeads, useApiConfig, useEmailTemplates } from './lib/supabase-store';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Scorer from './components/Scorer';
import WebsiteGen from './components/WebsiteGen';
import Outreach from './components/Outreach';
import Pipeline from './components/Pipeline';
import Settings from './components/Settings';
import Campaigns from './components/Campaigns';
import { NotificationContainer, ApiStatusIndicator } from './components/Notifications';

type View = 'dashboard' | 'scorer' | 'website' | 'outreach' | 'pipeline' | 'campaigns' | 'settings';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const { leads, addLeads, updateLead, deleteLeads, loadLeads, loading: leadsLoading, error: leadsError } = useLeads();
  const { config, updateConfig, loading: configLoading, error: configError } = useApiConfig();
  const { templates } = useEmailTemplates();

  // Compter les APIs configurées (non vides)
  const activeApis = [
    config.groqKey,
    config.openrouterKey,
    config.geminiKey,
    config.nvidiaKey,
    config.serperKey,
    config.unsplashKey,
    config.pexelsKey,
    config.gmailSmtpUser && config.gmailSmtpPassword
  ].filter(Boolean).length;

  // Afficher un écran d'erreur critique si les deux services sont en erreur
  if (leadsError && configError) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        background: '#F7F6F2',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '16px' }}>🚫 Erreur de Connexion</h1>
          <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
            Impossible de se connecter à la base de données et de charger la configuration.
          </p>
          
          <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }}>
            <h3 style={{ color: '#dc2626', marginBottom: '12px', fontSize: '16px' }}>🔍 Vérifications à effectuer :</h3>
            <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li>Variables d'environnement <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> configurées dans Vercel</li>
              <li>Projet Supabase accessible et fonctionnel</li>
              <li>Connexion internet stable</li>
              <li>Aucun bloqueur réseau empêchant l'accès à Supabase</li>
            </ul>
          </div>

          <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>
            <p style={{ color: '#0369a1', margin: 0, fontSize: '14px' }}>
              <strong>En production :</strong> Allez dans <strong>Vercel Dashboard → Settings → Environment Variables</strong>
            </p>
          </div>

          <button 
            onClick={() => window.location.reload()} 
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '12px'
            }}
          >
            🔄 Réessayer
          </button>
          
          <button 
            onClick={() => {
              console.log('Debug info:', { leadsError, configError, environment: import.meta.env?.MODE });
              alert('Informations de débogage envoyées dans la console (F12)');
            }}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🐛 Déboguer
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F6F2' }}>
        {/* Système de notifications API */}
        <NotificationContainer />
        <ApiStatusIndicator />
        
        <Sidebar active={view} onNavigate={(id) => setView(id as View)} leadCount={leads.length} apiCount={activeApis} />

        <main style={{
          marginLeft: 240, flex: 1, padding: '28px 32px',
          maxWidth: 1440, minHeight: '100vh',
        }}>
          <ErrorBoundary fallback={
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h2>Erreur dans cette vue</h2>
              <button onClick={() => setView('dashboard')}>Retour au dashboard</button>
            </div>
          }>
            {view === 'dashboard' && (
              <Dashboard leads={leads} addLeads={addLeads} updateLead={updateLead} deleteLeads={deleteLeads} loadLeads={loadLeads} />
            )}
            {view === 'scorer' && (
              <Scorer leads={leads} updateLead={updateLead} apiConfig={config} />
            )}
            {view === 'website' && (
              <WebsiteGen leads={leads} updateLead={updateLead} apiConfig={config} loadLeads={loadLeads} />
            )}
            {view === 'outreach' && (
              <Outreach leads={leads} updateLead={updateLead} apiConfig={config} templates={templates} />
            )}
            {view === 'pipeline' && (
              <Pipeline leads={leads} updateLead={updateLead} />
            )}
            {view === 'campaigns' && (
              <Campaigns />
            )}
            {view === 'settings' && (
              <Settings config={config} updateConfig={updateConfig} statuses={{}} setStatus={() => {}} onClearData={() => {}} />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}
