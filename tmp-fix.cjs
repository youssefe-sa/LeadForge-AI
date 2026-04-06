const fs = require('fs');
const path = 'c:/Users/hp/Documents/GitHub/LeadForge-AI/src/lib/siteTemplate.ts';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove "Nos réalisations" from Navbar
content = content.replace('<li class="nav-item"><a class="nav-link" href="#gallery">Réalisations</a></li>', '');

// 2. Remove "Nos réalisations" from Footer
content = content.replace('<li><a href="#gallery" class="footer-link">Nos Réalisations</a></li>', '');

// 3. Remove "Nos réalisations" Section Content
const gallerySectionRegex = /<!--\s*Gallery Section\s*-->\s*<section class="section" id="gallery">.*?<\/section>\s*/s;
content = content.replace(gallerySectionRegex, '');

// 4. Remove all background gradients and replace with flat colors
// Replace gradients in CSS, e.g., background: linear-gradient(...);
content = content.replace(/background:\s*linear-gradient\([^)]+\)/g, 'background: var(--primary)');
content = content.replace(/background-image:\s*linear-gradient\([^)]+\)/g, 'background-image: none; background-color: var(--primary)');

// Fix specific gradients that were using #D4500A or other things directly instead of var(--primary)
content = content.replace(/linear-gradient\([^)]+\)/g, 'var(--primary)'); 

// 5. Add space between line 1 and 2 of Testimonials header
// Before: <div class="google-badge mx-auto">
// After: <div class="google-badge mx-auto mt-4">
content = content.replace('<div class="google-badge mx-auto">', '<div class="google-badge mx-auto mt-4">');

// 6. Fix syntax error at the end of the script: duplicated "});"
const endOfScript = `
        // Animation au chargement
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
            
        });
        });
    </script>
</body>
</html>\`;
}`;

const modifiedEndOfScript = `
        // Animation au chargement
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    </script>
</body>
</html>\`;
}`;
content = content.replace(endOfScript, modifiedEndOfScript);

fs.writeFileSync(path, content, 'utf8');
console.log('Template fixed successfully!');
