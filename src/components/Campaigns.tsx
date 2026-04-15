import { useState, useEffect } from 'react';
import { useCampaigns, useLeads, Lead } from '../lib/supabase-store';
import { eventBus, LeadForgeEvents } from '../lib/events';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

interface Campaign {
  name: string;
  date: string;
  count: number;
}

interface Props {
  leads: Lead[];
}

export default function Campaigns({ leads }: Props) {
  const { campaigns, loading, error, deleteCampaign } = useCampaigns();
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Forcer le rafraîchissement

  // Écouter les événements de synchronisation
  useEffect(() => {
    const handleDataChange = () => {
      console.log('Campaigns: Événement de synchronisation reçu, rafraîchissement...');
      setRefreshKey(prev => prev + 1);
    };

    // S'abonner aux événements
    eventBus.on(LeadForgeEvents.LEADS_CHANGED, handleDataChange);
    eventBus.on(LeadForgeEvents.CAMPAIGNS_CHANGED, handleDataChange);
    eventBus.on(LeadForgeEvents.LEAD_ADDED, handleDataChange);
    eventBus.on(LeadForgeEvents.LEAD_DELETED, handleDataChange);
    eventBus.on(LeadForgeEvents.CAMPAIGN_ADDED, handleDataChange);
    eventBus.on(LeadForgeEvents.CAMPAIGN_DELETED, handleDataChange);
    eventBus.on(LeadForgeEvents.DATA_REFRESH, handleDataChange);

    // Nettoyer les abonnements
    return () => {
      eventBus.off(LeadForgeEvents.LEADS_CHANGED, handleDataChange);
      eventBus.off(LeadForgeEvents.CAMPAIGNS_CHANGED, handleDataChange);
      eventBus.off(LeadForgeEvents.LEAD_ADDED, handleDataChange);
      eventBus.off(LeadForgeEvents.LEAD_DELETED, handleDataChange);
      eventBus.off(LeadForgeEvents.CAMPAIGN_ADDED, handleDataChange);
      eventBus.off(LeadForgeEvents.CAMPAIGN_DELETED, handleDataChange);
      eventBus.off(LeadForgeEvents.DATA_REFRESH, handleDataChange);
    };
  }, [refreshKey]); // Ajouter refreshKey pour forcer le recalcul

  const handleDeleteCampaign = (campaignName: string) => {
    setCampaignToDelete(campaignName);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCampaign = async () => {
    if (!campaignToDelete) return;
    
    try {
      await deleteCampaign(campaignToDelete);
      setDeleteModalOpen(false);
      setCampaignToDelete(null);
      
      // Émettre des événements de synchronisation
      eventBus.emit(LeadForgeEvents.CAMPAIGNS_CHANGED);
      eventBus.emit(LeadForgeEvents.CAMPAIGN_DELETED, campaignToDelete);
      eventBus.emit(LeadForgeEvents.LEADS_CHANGED);
      eventBus.emit(LeadForgeEvents.DATA_REFRESH);
    } catch (error) {
      alert('Erreur lors de la suppression de la campagne: ' + error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date inconnue';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const totalLeads = Array.isArray(campaigns) ? campaigns.reduce((sum, c) => sum + (Number(c?.count) || 0), 0) : 0;
  const safeLeads = Array.isArray(leads) ? leads : [];
  
  // Calculer les statistiques d'email et site web (avec clé de rafraîchissement)
  const emailStats = {
    with: safeLeads.filter(l => l && l.email).length,
    without: safeLeads.filter(l => l && !l.email).length,
  };
  
  const websiteStats = {
    with: safeLeads.filter(l => l && l.website && !(l.tags || []).includes('Sans site')).length,
    without: safeLeads.filter(l => l && (!l.website || (l.tags || []).includes('Sans site'))).length,
  };

  // Fonction pour calculer les statistiques d'une campagne spécifique (avec clé de rafraîchissement)
  const getCampaignStats = (campaignName: string) => {
    const safeLeads = Array.isArray(leads) ? leads : [];
    const campaignLeads = safeLeads.filter(l => l && l.campaign === campaignName);
    
    const emailStats = {
      with: campaignLeads.filter(l => l && l.email).length,
      without: campaignLeads.filter(l => l && !l.email).length,
    };
    
    const websiteStats = {
      with: campaignLeads.filter(l => l && l.website && !(l.tags || []).includes('Sans site')).length,
      without: campaignLeads.filter(l => l && (!l.website || (l.tags || []).includes('Sans site'))).length,
    };
    
    // Extraire les mots-clés uniques des tags et secteurs
    const keywords = new Set<string>();
    campaignLeads.forEach(lead => {
      if (!lead) return;
      if (lead.sector) keywords.add(lead.sector);
      if (Array.isArray(lead.tags)) {
        lead.tags.forEach((tag: string) => {
          if (tag) keywords.add(tag);
        });
      }
    });
    
    return {
      emailStats,
      websiteStats,
      keywords: Array.from(keywords).slice(0, 5), // Limiter à 5 mots-clés
      totalLeads: campaignLeads.length
    };
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        <div style={{ fontSize: 16, color: C.tx2 }}>Chargement des campagnes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        <div style={{ fontSize: 16, color: C.red }}>Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 28,
        padding: '20px 0',
        borderBottom: `1px solid ${C.border}`
      }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.tx, marginBottom: 4 }}>
            📋 Campagnes d'importation
          </h1>
          <p style={{ color: C.tx3, fontSize: 14 }}>
            Gérez toutes vos campagnes d'importation de leads B2B
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <div style={{
          background: C.surface, borderRadius: 8, padding: '20px 22px',
          borderLeft: `3px solid ${C.accent}`,
          boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
        }}>
          <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>Total Campagnes</div>
          <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{campaigns.length}</div>
          <div style={{ fontSize: 11, color: C.tx3, marginTop: 4 }}>Importations actives</div>
        </div>
        
        <div style={{
          background: C.surface, borderRadius: 8, padding: '20px 22px',
          borderLeft: `3px solid ${C.accent}`,
          boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
        }}>
          <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>Total Leads</div>
          <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{totalLeads}</div>
          <div style={{ fontSize: 11, color: C.tx3, marginTop: 4 }}>Tous les leads importés</div>
        </div>
        
        <div style={{
          background: C.surface, borderRadius: 8, padding: '20px 22px',
          borderLeft: `3px solid ${C.green}`,
          boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
        }}>
          <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 12 }}>Emails</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{emailStats.without}</div>
              <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Sans email</div>
            </div>
            <div style={{ width: 1, height: 40, background: C.border }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{emailStats.with}</div>
              <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Avec email</div>
            </div>
          </div>
        </div>
        
        <div style={{
          background: C.surface, borderRadius: 8, padding: '20px 22px',
          borderLeft: `3px solid ${C.blue}`,
          boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
        }}>
          <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 12 }}>Sites Web</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{websiteStats.without}</div>
              <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Sans site</div>
            </div>
            <div style={{ width: 1, height: 40, background: C.border }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{websiteStats.with}</div>
              <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Avec site</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, background: C.surface2 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: C.tx }}>
            Liste des campagnes
          </h2>
        </div>

        {(!Array.isArray(campaigns) || campaigns.length === 0) ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>📋</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 8 }}>
              Aucune campagne trouvée
            </h3>
            <p style={{ color: C.tx2, fontSize: 14, marginBottom: 20 }}>
              Importez un fichier avec un nom de campagne pour commencer
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              style={{
                padding: '10px 20px', borderRadius: 6, border: 'none', 
                background: C.accent, color: '#fff', fontSize: 14, fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Importer des leads
            </button>
          </div>
        ) : (
          <div>
            {Array.isArray(campaigns) && campaigns.map((campaign, index) => {
              if (!campaign) return null;
              const stats = getCampaignStats(campaign.name);
              return (
                <div key={campaign.name} style={{
                  padding: '20px',
                  borderBottom: index < campaigns.length - 1 ? `1px solid ${C.border}` : 'none',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.surface2}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {/* Header de la campagne */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: C.tx, marginBottom: 4 }}>
                        {campaign.name}
                      </div>
                      <div style={{ fontSize: 13, color: C.tx3 }}>
                        {formatDate(campaign.date)} • {campaign.count} lead{campaign.count > 1 ? 's' : ''}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.name)}
                      style={{
                        padding: '8px 12px', borderRadius: 6, border: `1px solid ${C.red}`,
                        background: '#fff', color: C.red, fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = C.red;
                        (e.currentTarget as HTMLElement).style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = '#fff';
                        (e.currentTarget as HTMLElement).style.color = C.red;
                      }}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>

                  {/* Statistiques détaillées */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 12 }}>
                    {/* Email Stats */}
                    <div style={{ 
                      background: C.surface2, borderRadius: 6, padding: '12px',
                      border: `1px solid ${C.border}`
                    }}>
                      <div style={{ fontSize: 11, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>📧 Emails</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ color: C.tx2 }}>{stats.emailStats.without} sans</span>
                        <span style={{ color: C.green }}>{stats.emailStats.with} avec</span>
                      </div>
                    </div>

                    {/* Website Stats */}
                    <div style={{ 
                      background: C.surface2, borderRadius: 6, padding: '12px',
                      border: `1px solid ${C.border}`
                    }}>
                      <div style={{ fontSize: 11, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>🌐 Sites Web</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ color: C.tx2 }}>{stats.websiteStats.without} sans</span>
                        <span style={{ color: C.blue }}>{stats.websiteStats.with} avec</span>
                      </div>
                    </div>

                    {/* Keywords */}
                    <div style={{ 
                      background: C.surface2, borderRadius: 6, padding: '12px',
                      border: `1px solid ${C.border}`
                    }}>
                      <div style={{ fontSize: 11, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>🏷️ Mots-clés</div>
                      <div style={{ fontSize: 12, color: C.tx2 }}>
                        {stats.keywords.length > 0 ? stats.keywords.join(', ') : 'Aucun'}
                      </div>
                    </div>
                  </div>

                  {/* Badge de statut */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      padding: '4px 8px', borderRadius: 12, background: C.accent2,
                      fontSize: 11, fontWeight: 600, color: C.accent
                    }}>
                      {campaign.count} leads
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <>
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 9998,
          }} onClick={() => setDeleteModalOpen(false)} />
          <div style={{
            position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
            background: C.surface, borderRadius: 12, padding: 32,
            width: 420, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            zIndex: 9999,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: 20, fontWeight: 700, color: C.tx }}>
                Supprimer la campagne
              </h2>
              <p style={{ margin: '0 0 16px 0', fontSize: 14, color: C.tx2, lineHeight: 1.5 }}>
                Êtes-vous sûr de vouloir supprimer la campagne <strong>"{campaignToDelete}"</strong> ?
              </p>
              <p style={{ margin: '0 0 16px 0', fontSize: 13, color: C.red, fontWeight: 500 }}>
                🚨 Cette action supprimera définitivement tous les leads de cette campagne.
              </p>
              <div style={{ fontSize: 12, color: C.tx3 }}>
                {campaigns.find(c => c.name === campaignToDelete)?.count || 0} lead(s) seront supprimés
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setDeleteModalOpen(false)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 6,
                  border: `1px solid ${C.border}`, background: C.surface,
                  color: C.tx2, fontWeight: 500, fontSize: 14, cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteCampaign}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 6,
                  border: 'none', background: C.red,
                  color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}
              >
                🗑️ Supprimer tout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
