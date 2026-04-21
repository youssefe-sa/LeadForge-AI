import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Bounce {
  id: string;
  email: string;
  type: 'hard' | 'soft' | 'complaint' | 'timeout';
  reason: string;
  lead_id: string | null;
  message_id: string | null;
  created_at: string;
}

interface BounceStats {
  total_bounces: number;
  hard_bounces: number;
  soft_bounces: number;
  complaints: number;
  timeouts: number;
  unique_emails_bounced: number;
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export default function BounceManagement() {
  const [bounces, setBounces] = useState<Bounce[]>([]);
  const [stats, setStats] = useState<BounceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchBounces();
    fetchStats();
  }, [filter]);

  const fetchBounces = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('email_bounces')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (filter !== 'all') {
        query = query.eq('type', filter);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setBounces(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('bounce_stats')
        .select('*')
        .order('bounce_date', { ascending: false })
        .limit(1);

      if (error) throw error;
      setStats(data?.[0] || null);
    } catch (err: any) {
      console.error('Error fetching stats:', err);
    }
  };

  const getBounceTypeColor = (type: string) => {
    switch (type) {
      case 'hard': return 'text-red-600 bg-red-50';
      case 'soft': return 'text-yellow-600 bg-yellow-50';
      case 'complaint': return 'text-red-700 bg-red-100';
      case 'timeout': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getBounceTypeLabel = (type: string) => {
    switch (type) {
      case 'hard': return 'Email invalide';
      case 'soft': return 'Erreur temporaire';
      case 'complaint': return 'Spam signalé';
      case 'timeout': return 'Délai dépassé';
      default: return 'Inconnu';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Emails en Erreur</h1>
        <p className="text-gray-600">Suivi des bounces et erreurs de livraison d'emails</p>
      </div>

      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{stats.total_bounces}</div>
            <div className="text-sm text-gray-600">Total bounces</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">{stats.hard_bounces}</div>
            <div className="text-sm text-red-600">Emails invalides</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">{stats.soft_bounces}</div>
            <div className="text-sm text-yellow-600">Erreurs temporaires</div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg border border-red-300">
            <div className="text-2xl font-bold text-red-700">{stats.complaints}</div>
            <div className="text-sm text-red-700">Spam signalés</div>
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filtrer par type:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">Tous</option>
            <option value="hard">Emails invalides</option>
            <option value="soft">Erreurs temporaires</option>
            <option value="complaint">Spam signalés</option>
            <option value="timeout">D&eacute;lai d&eacute;pass&eacute;</option>
          </select>
          <button
            onClick={fetchBounces}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Actualiser
          </button>
        </div>
      </div>

      {/* Liste des bounces */}
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Erreur: {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {bounces.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun email en erreur trouvé
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Raison
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bounces.map((bounce) => (
                    <tr key={bounce.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bounce.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBounceTypeColor(bounce.type)}`}>
                          {getBounceTypeLabel(bounce.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {bounce.reason || 'Non spécifiée'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(bounce.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Actions recommandées */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Actions recommandées:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Supprimer les leads avec des emails invalides (hard bounces)</li>
          <li>• R&eacute;essayer l&apos;envoi aux soft bounces apr&egrave;s 24-48h</li>
          <li>• Désinscrire les leads ayant signalé spam (complaints)</li>
          <li>• Nettoyer r&eacute;guli&egrave;rement les anciens bounces (&gt; 90 jours)</li>
        </ul>
      </div>
    </div>
  );
}
