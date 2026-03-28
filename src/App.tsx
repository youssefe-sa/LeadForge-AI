import { useState } from 'react';
import { useLeads, useApiConfig, useEmailTemplates } from './lib/store';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Scorer from './components/Scorer';
import WebsiteGen from './components/WebsiteGen';
import Outreach from './components/Outreach';
import Pipeline from './components/Pipeline';
import Settings from './components/Settings';

type View = 'dashboard' | 'scorer' | 'website' | 'outreach' | 'pipeline' | 'settings';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const { leads, addLeads, updateLead, deleteLeads, clearAll } = useLeads();
  const { config, updateConfig, statuses, setStatus } = useApiConfig();
  const { templates } = useEmailTemplates();

  const activeApis = Object.values(statuses).filter(s => s === 'active').length;

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F6F2' }}>
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
              <Dashboard leads={leads} addLeads={addLeads} updateLead={updateLead} deleteLeads={deleteLeads} />
            )}
            {view === 'scorer' && (
              <Scorer leads={leads} updateLead={updateLead} apiConfig={config} />
            )}
            {view === 'website' && (
              <WebsiteGen leads={leads} updateLead={updateLead} apiConfig={config} />
            )}
            {view === 'outreach' && (
              <Outreach leads={leads} updateLead={updateLead} apiConfig={config} templates={templates} />
            )}
            {view === 'pipeline' && (
              <Pipeline leads={leads} updateLead={updateLead} />
            )}
            {view === 'settings' && (
              <Settings config={config} updateConfig={updateConfig} statuses={statuses} setStatus={setStatus} onClearData={clearAll} />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}
