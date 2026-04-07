# LeadForge AI - Rapport d'Audit & État des Lieux (Phase Cloud & Production)

Ce rapport documente l'état complet du projet **LeadForge AI** à l'issue de l'importante refonte structurelle. Le système est passé d'une application locale potentiellement lourde à une architecture Cloud-native décentralisée (Next/Vite sur Vercel + Base de données PostgreSQL sur Supabase).

---

## 🟢 1. Ce qui fonctionne parfaitement (Les Succès de l'Architecture)

### 🏗️ L'Architecture Supabase & Vercel
- **Base de données Temps Réel :** Le remplacement de SQLite par PostgreSQL sur Supabase garantit que l'application ne plantera plus lorsque de lourds volumes de données s'ajouteront. 
- **Stockage CDN pour les Sites :** L'une de nos majeures victoires est d'avoir retiré tous les codes HTML pesants de la base de données. Tous les sites sont désormais poussés et hébergés silencieusement dans le bucket Cloud `websites` de Supabase Storage. La base de données pèse désormais quelques Kilooctets à peine par lead.
- **Le Proxy Custom (/api/sites/[id]) :** Cet endpoint Vercel masque superbement la technologie derrière votre plateforme en allant chercher la page HTML stockée dans Supabase pour la redistribuer discrètement au format `services-siteup.online/api/sites/id-du-client`.

### 🤖 Les Agents IA ("WebsiteGen" et "Scraper")
- **Cascade LLM Résiliente :** Votre code gère intelligemment les bascules. Si l'API par défaut tombe en panne, le système passe silencieusement au moteur secondaire configuré (ex: NVIDIA NIM -> Gemini -> Groq -> OpenRouter).
- **Le Web Scraper de précision :** Le scraping dynamique avec Serper API explore le web, va chercher le vrai Logo du plombier cible, examine les mentions légales existantes, et scanne son nom pour y attacher ses Notes et Avis Google.
- **Appel natif et rapide pour LLM :** Depuis peu, le retrait de votre propre endpoint local au profit d'un appel API HTTPS en direct vers le Cloud NVIDIA NIM permet de soulager vos limites Vercel Hobby.

### 📧 L'automatisation CRM (Pipeline Asynchrone)
- **Le Script de Tracking temps réel :** Le comportement des prospects s'enregistre et se reflète sur l'interface (Ouvertures du site, clics sur les formulaires de devis).
- **Relances Durables (Le CRON Jobs Supabase) :** Les anciens compteurs (`setTimeout` de React) ont été puremement et simplement évincés. Un déclencheur natif du Cloud SQL `pg_cron` vérifie toutes les 30 minutes les courriels "Programmés" dans la table `scheduled_emails` et appuie lui-même sur la gachette en frappant le endpoint `/api/cron-emails`. Vos relances continueront même si votre PC est éteint.

---

## 🟡 2. Points d'attention et Limites identifiées

### 💳 Épuisement de l'API (Crédits API)
- Pendant la génération automatique, le système s'est arrêté brusquement pour la raison suivante : **`Not enough credits (400)` sur l'API Serper**. Vous dépendez intégralement de ce fournisseur (Googler search proxy) pour enrichir vos sites. **Solution :** Mettre une nouvelle clé ou injecter du crédit.
- Vous aviez également une erreur **`401 Unauthorized` de la part de Groq**. Signifiant que votre clé est expirée ou incorrectement copiée.

### 🖼️ Restrictions de Sécurité Externes (CORS PagesJaunes)
- Lorsque l'agent trouve une image stockée sur un serveur très protecteur (ex: *PagesJaunes.fr*), l'intégration de leur image sur votre tableau de bord vous vaudra occasionnellement une alerte bénigne de type `net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin`. Les sites refuseront de fournir une image à un nom de domaine étranger (le vôtre). Ce n'est pas bloquant et le site généré inclut bien d'autres images génériques pertinentes.

---

## 🔴 3. Les Failles de Sécurité (VULNÉRABILITÉS MAJEURES)

### ⚠️ Faille n°1 : API Keys exposées dans le Frontend (Risque de vol)
- **Le Fait :** Votre application LeadForge appelle Groq, Gemini et Serper **directement depuis Google Chrome** (Frontend React Client-Side). Par conséquent, ce code extrait la clé de Supabase, puis l'utilise "à la vue" du navigateur client.
- **Risque Pratique :** Si vous déployiez ce logiciel tel quel pour un client, il n'aurait qu'à faire un simple clic droit -> "Inspecter l'élément -> Réseau" pour afficher toutes vos clés privées (clés qui peuvent vous coûter cher si volées).
- **Notre conseil :** LeadForge AI tel qu'il a été conçu ici est **impérativement réservé à un usage strictement interne ou privé**.

### ⚠️ Faille n°2 : Absence de verrou DB (RLS)
- **Le Fait :** Pour l'instant, toutes les opérations menées contre la base de données Supabase utilisent une clé `anon key` non sécurisée (c.à.d. que la BDD suppose que tout appel vient "d'un client légitime", sans imposer de JWT token / Session).
- **Risque Pratique :** Quiconque analyse la signature de votre site Vercel pourrait virtuellement créer un mini script pour vider l'ensemble de la table de Leads car aucune **`Row Level Security (RLS)`** conditionnelle stricte n'a été implémentée sur les requêtes Supabase.
- **Notre conseil :** Verrouiller l'accès au domaine LeadForge AI sur un chemin protégé ou activer l'authentification Supabase `Auth` sur les tables stratégiques si votre domaine est public.

---

## 🚀 4. API Restantes (Inventaire des fonctions serveur Vercel sous limite HOBBY)

Seules **QUATRE** fonctions stratégiques occupent votre back-end Vercel Actuellement :

1. ▶️ `/api/track.ts` (Edge API) : Le pilier de votre espionnage de Leads (qui traque les clics).
2. ▶️ `/api/cron-emails.ts` (Serveless) : La gachette interne connectée à la base de données qui envoie les e-mails différés.
3. ▶️ `/api/email.ts` (Serverless) : Le relai SMTP qui dialogue au nom de votre compte Gmail de façon hautement protégée.
4. ▶️ `/api/sites/[id].ts` (Serverless) : Le pont proxy transparent reliant le Visiteur (lien propre) à votre fichier HTML Supabase.

*=> Bilan : 4 sur 12 Maximum autorisés par le compte Gratuit de Vercel (Hobby). Ratio Excellent.*
