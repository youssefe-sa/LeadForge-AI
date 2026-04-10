// ── PROFESSIONAL TEMPLATE ──
// Template professionnel simple et robuste pour fallback

import { safeStr } from './supabase-store';

export interface ProfessionalContent {
  companyName: string;
  sector: string;
  city: string;
  description: string;
  phone?: string;
  email?: string;
  address?: string;
}

export function generateProfessionalSite(lead: any): string {
  const companyName = safeStr(lead.name);
  const sector = safeStr(lead.sector) || 'Professionnel';
  const city = safeStr(lead.city);
  const description = safeStr(lead.description) || `Professionnel ${sector} de confiance${city ? ' à ' + city : ''}.`;
  const phone = safeStr(lead.phone);
  const email = safeStr(lead.email);
  const address = safeStr(lead.address);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${sector}${city ? ' à ' + city : ''}</title>
    <meta name="description" content="${description.substring(0, 160)}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; text-align: center; }
        .hero h1 { font-size: 3rem; font-weight: 700; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
        .btn-primary { background: #ff6b6b; border: none; padding: 15px 30px; border-radius: 50px; font-weight: 600; text-decoration: none; display: inline-block; transition: all 0.3s; }
        .btn-primary:hover { background: #ff5252; transform: translateY(-2px); }
        .section { padding: 80px 0; }
        .info-card { background: #f8f9fa; border-radius: 15px; padding: 30px; margin: 20px 0; border: 1px solid #e9ecef; }
        .contact-info { background: #ffffff; border-radius: 15px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .footer { background: #2c3e50; color: white; padding: 40px 0; text-align: center; }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .hero { padding: 60px 0; }
            .section { padding: 40px 0; }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>${companyName}</h1>
            <p class="lead">${sector}${city ? ' à ' + city : ''}</p>
            <p>${description}</p>
            ${phone ? `<a href="tel:${phone}" class="btn-primary me-3">Appeler maintenant</a>` : ''}
            ${email ? `<a href="mailto:${email}" class="btn-primary">Envoyer un email</a>` : ''}
        </div>
    </section>

    <!-- About Section -->
    <section class="section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="info-card">
                        <h2 class="text-center mb-4">À propos</h2>
                        <p>${description}</p>
                        ${address ? `<p><strong>Adresse :</strong> ${address}</p>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Nos Services</h2>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="info-card text-center h-100">
                        <div class="mb-3">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-size: 24px;">⚡</span>
                            </div>
                        </div>
                        <h4>Service Rapide</h4>
                        <p>Intervention rapide et efficace pour répondre à vos besoins urgents.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="info-card text-center h-100">
                        <div class="mb-3">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-size: 24px;">🏆</span>
                            </div>
                        </div>
                        <h4>Qualité Garantie</h4>
                        <p>Travail professionnel avec garantie de satisfaction.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="info-card text-center h-100">
                        <div class="mb-3">
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-size: 24px;">💎</span>
                            </div>
                        </div>
                        <h4>Expertise</h4>
                        <p>Années d'expérience dans le domaine ${sector.toLowerCase()}.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="contact-info">
                        <h2 class="text-center mb-4">Contactez-nous</h2>
                        <div class="row">
                            ${phone ? `
                            <div class="col-md-6 mb-3">
                                <h5><i class="fas fa-phone"></i> Téléphone</h5>
                                <p><a href="tel:${phone}">${phone}</a></p>
                            </div>` : ''}
                            ${email ? `
                            <div class="col-md-6 mb-3">
                                <h5><i class="fas fa-envelope"></i> Email</h5>
                                <p><a href="mailto:${email}">${email}</a></p>
                            </div>` : ''}
                            ${address ? `
                            <div class="col-12 mb-3">
                                <h5><i class="fas fa-map-marker-alt"></i> Adresse</h5>
                                <p>${address}</p>
                            </div>` : ''}
                        </div>
                        <div class="text-center mt-4">
                            ${phone ? `<a href="tel:${phone}" class="btn-primary me-3">Appeler maintenant</a>` : ''}
                            ${email ? `<a href="mailto:${email}" class="btn-primary">Envoyer un email</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${companyName}. Tous droits réservés.</p>
            <p>${sector}${city ? ' - ' + city : ''}</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://kit.fontawesome.com/your-fontawesome-key.js" crossorigin="anonymous"></script>
</body>
</html>`;
}
