// Chatbot Externe - Sans erreurs TypeScript
(function() {
    'use strict';
    
    // Attendre que le DOM soit chargé
    document.addEventListener('DOMContentLoaded', function() {
        
        // Créer le HTML du chatbot
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-toggle" id="chatbotToggle">
                    <i class="bi bi-chat-dots-fill"></i>
                </button>
                
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-info">
                            <i class="bi bi-headset"></i>
                            <div>
                                <h6>Support Client</h6>
                                <small>En ligne</small>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbotClose">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-body" id="chatbotBody">
                        <div class="chat-message bot">
                            👋 Bonjour ! Comment puis-je vous aider ?
                        </div>
                        
                        <div class="chat-quick-actions">
                            <button onclick="chatbot.sendMessage('services')">🛠️ Services</button>
                            <button onclick="chatbot.sendMessage('devis')">📋 Devis</button>
                            <button onclick="chatbot.sendMessage('contact')">📞 Contact</button>
                            <button onclick="chatbot.sendMessage('horaires')">⏰ Horaires</button>
                        </div>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input type="text" id="chatInput" placeholder="Votre message...">
                        <button onclick="chatbot.sendUserMessage()">
                            <i class="bi bi-send"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Créer les styles CSS
        const chatbotCSS = `
            .chatbot-container {
                position: fixed;
                bottom: 100px;
                right: 30px;
                z-index: 1001;
            }
            
            .chatbot-toggle {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #D4500A 0%, #FF6B35 100%);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 12px 32px rgba(212, 80, 10, 0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .chatbot-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 16px 40px rgba(212, 80, 10, 0.4);
            }
            
            .chatbot-window {
                position: absolute;
                bottom: 70px;
                right: 0;
                width: 350px;
                height: 450px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
            }
            
            .chatbot-window.active {
                display: flex;
            }
            
            .chatbot-header {
                background: linear-gradient(135deg, #D4500A 0%, #FF6B35 100%);
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .chatbot-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .chatbot-info i {
                font-size: 1.2rem;
            }
            
            .chatbot-info h6 {
                margin: 0;
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .chatbot-info small {
                opacity: 0.9;
                font-size: 0.75rem;
            }
            
            .chatbot-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .chatbot-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .chatbot-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .chat-message {
                margin-bottom: 10px;
                padding: 10px 15px;
                border-radius: 15px;
                font-size: 0.9rem;
                line-height: 1.4;
                max-width: 80%;
            }
            
            .chat-message.bot {
                background: white;
                color: #333;
                border-bottom-left-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .chat-message.user {
                background: linear-gradient(135deg, #D4500A 0%, #FF6B35 100%);
                color: white;
                border-bottom-right-radius: 5px;
                margin-left: auto;
            }
            
            .chat-quick-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 15px;
            }
            
            .chat-quick-actions button {
                padding: 8px 12px;
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .chat-quick-actions button:hover {
                background: #D4500A;
                color: white;
                border-color: #D4500A;
            }
            
            .chatbot-input-area {
                padding: 15px;
                background: white;
                border-top: 1px solid #e9ecef;
                display: flex;
                gap: 10px;
            }
            
            .chatbot-input-area input {
                flex: 1;
                padding: 10px 15px;
                border: 2px solid #e9ecef;
                border-radius: 25px;
                font-size: 0.9rem;
                outline: none;
            }
            
            .chatbot-input-area input:focus {
                border-color: #D4500A;
            }
            
            .chatbot-input-area button {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #D4500A 0%, #FF6B35 100%);
                border: none;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .chatbot-input-area button:hover {
                transform: scale(1.1);
            }
            
            @media (max-width: 480px) {
                .chatbot-window {
                    width: calc(100vw - 40px);
                    height: 60vh;
                    right: -10px;
                }
            }
        `;
        
        // Ajouter les styles au head
        const style = document.createElement('style');
        style.textContent = chatbotCSS;
        document.head.appendChild(style);
        
        // Ajouter le HTML au body
        const chatbotDiv = document.createElement('div');
        chatbotDiv.innerHTML = chatbotHTML;
        document.body.appendChild(chatbotDiv);
        
        // Fonctionnalités du chatbot
        const chatbot = {
            toggle: document.getElementById('chatbotToggle'),
            window: document.getElementById('chatbotWindow'),
            close: document.getElementById('chatbotClose'),
            input: document.getElementById('chatInput'),
            body: document.getElementById('chatbotBody'),
            
            init: function() {
                // Toggle chatbot
                this.toggle.addEventListener('click', () => {
                    this.window.classList.toggle('active');
                    if (this.window.classList.contains('active')) {
                        this.input.focus();
                    }
                });
                
                // Close chatbot
                this.close.addEventListener('click', () => {
                    this.window.classList.remove('active');
                });
                
                // Enter key to send
                this.input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.sendUserMessage();
                    }
                });
            },
            
            addMessage: function(text, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'chat-message ' + (isUser ? 'user' : 'bot');
                messageDiv.textContent = text;
                this.body.appendChild(messageDiv);
                this.body.scrollTop = this.body.scrollHeight;
            },
            
            getBotResponse: function(message) {
                const msg = message.toLowerCase();
                
                if (msg.includes('service') || msg === 'services') {
                    return 'Nous proposons des services professionnels : installation, dépannage, maintenance, conseil. Contactez-nous pour plus de détails !';
                } else if (msg.includes('devis')) {
                    return 'Je peux vous préparer un devis gratuit ! Donnez-moi les détails de votre projet et je vous transmets à notre équipe.';
                } else if (msg.includes('contact')) {
                    return 'Vous pouvez nous contacter par téléphone ou via le formulaire de contact. Nous répondons rapidement !';
                } else if (msg.includes('horaire') || msg === 'horaires') {
                    return 'Nous sommes ouverts Lun-Ven: 8h-19h, Sam: 9h-17h. Urgence 24/7 disponible !';
                } else if (msg.includes('urgent') || msg.includes('urgence')) {
                    return 'URGENCE ! Appelez-nous maintenant. Intervention prioritaire activée.';
                } else if (msg.includes('merci')) {
                    return 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions.';
                } else if (msg.includes('bonjour') || msg.includes('salut')) {
                    return 'Bonjour ! Ravie de vous aider. Comment puis-je vous assister ?';
                } else {
                    return 'Je comprends. Pour plus d\'informations, utilisez les boutons rapides ou contactez-nous directement.';
                }
            },
            
            sendMessage: function(type) {
                this.addMessage(type, true);
                
                setTimeout(() => {
                    const response = this.getBotResponse(type);
                    this.addMessage(response);
                }, 1000);
            },
            
            sendUserMessage: function() {
                const message = this.input.value.trim();
                if (message) {
                    this.addMessage(message, true);
                    
                    setTimeout(() => {
                        const response = this.getBotResponse(message);
                        this.addMessage(response);
                    }, 1000);
                    
                    this.input.value = '';
                }
            }
        };
        
        // Initialiser le chatbot
        chatbot.init();
        
        // Rendre les fonctions accessibles globalement
        window.chatbot = chatbot;
        
    });
})();
