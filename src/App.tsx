import { useState, useEffect } from 'react';
import { useLeads, useApiConfig, useEmailTemplates } from './lib/supabase-store';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Scorer from './components/Scorer';
import WebsiteGen from './components/WebsiteGen';
import WebsiteGenV2 from './components/WebsiteGenV2';
import Outreach from './components/Outreach';
import Pipeline from './components/Pipeline';
import Settings from './components/Settings';
import Campaigns from './components/Campaigns';
import { NotificationContainer, ApiStatusIndicator } from './components/Notifications';
import Login from './components/Login';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

type View = 'dashboard' | 'scorer' | 'website' | 'website-v2' | 'outreach' | 'pipeline' | 'campaigns' | 'settings';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [view, setView] = useState<View>('dashboard');
  
  // N'instancier les hooks que si authentifié, ou bien on les garde mais on protège le rendu
  const { leads, addLeads, updateLead, deleteLeads, loadLeads, loading: leadsLoading } = useLeads();
  const { config, updateConfig, loading: configLoading } = useApiConfig();
  const { templates } = useEmailTemplates();

  // Gestion de la session Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitializing(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isInitializing) {
    return <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>Chargement sécurisé...</div>;
  }

  if (!session) {
    return <Login />;
  }

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
            {view === 'website-v2' && (
              <WebsiteGenV2 leads={leads} updateLead={updateLead} apiConfig={config} loadLeads={loadLeads} />
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
