// Russian Final Boss - Interactive JavaScript

// Copy token address functionality
function copyAddress() {
    const addressInput = document.getElementById('tokenAddress');
    const copyBtn = document.querySelector('.copy-btn');
    
    // Select and copy the address
    addressInput.select();
    addressInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        // Try using the modern clipboard API
        navigator.clipboard.writeText(addressInput.value).then(() => {
            showCopySuccess(copyBtn);
        }).catch(() => {
            // Fallback to older method
            document.execCommand('copy');
            showCopySuccess(copyBtn);
        });
    } catch (err) {
        // Final fallback
        document.execCommand('copy');
        showCopySuccess(copyBtn);
    }
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = 'linear-gradient(45deg, #00ff00, #32cd32)';
    
    // Create floating notification
    const notification = document.createElement('div');
    notification.textContent = 'Address Copied! 💎';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.5);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Roboto', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
    
    // Reset button after 1 second
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
    }, 1000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for money rain
function updateMoneyRain() {
    const moneyBills = document.querySelectorAll('.money-bill');
    const scrollY = window.scrollY;
    
    moneyBills.forEach((bill, index) => {
        const speed = 0.5 + (index * 0.1);
        bill.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
    });
}

// Boss image interaction
function initBossInteraction() {
    const bossImage = document.querySelector('.boss-image');
    const bossLogo = document.querySelector('.boss-logo');
    
    bossImage.addEventListener('mouseenter', () => {
        bossLogo.style.transform = 'scale(1.1) rotate(5deg)';
        bossLogo.style.filter = 'brightness(1.2) saturate(1.3)';
    });
    
    bossImage.addEventListener('mouseleave', () => {
        bossLogo.style.transform = 'scale(1) rotate(0deg)';
        bossLogo.style.filter = 'brightness(1) saturate(1)';
    });
    
    bossImage.addEventListener('click', () => {
        // Boss roar effect
        bossLogo.style.animation = 'none';
        setTimeout(() => {
            bossLogo.style.animation = 'pulse-glow 2s ease-in-out infinite, shake 0.5s ease-in-out';
        }, 10);
        
        // Add shake animation
        const shakeStyles = document.createElement('style');
        shakeStyles.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0) scale(1); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) scale(1.05); }
                20%, 40%, 60%, 80% { transform: translateX(5px) scale(1.05); }
            }
        `;
        document.head.appendChild(shakeStyles);
        
        setTimeout(() => {
            bossLogo.style.animation = 'pulse-glow 2s ease-in-out infinite';
            document.head.removeChild(shakeStyles);
        }, 500);
    });
}

// Social button enhanced effects
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            // Add click ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                button.removeChild(ripple);
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);
}

// Rule cards hover effects
function initRuleCards() {
    const ruleCards = document.querySelectorAll('.rule-card');
    
    ruleCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect to icon
            const icon = card.querySelector('.rule-icon');
            icon.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';
            icon.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.rule-icon');
            icon.style.filter = 'none';
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Random float animation
        setTimeout(() => {
            card.style.animation = `float 3s ease-in-out infinite`;
            card.style.animationDelay = `${index * 0.5}s`;
        }, 1000);
    });
    
    // Add float animation
    const floatStyles = document.createElement('style');
    floatStyles.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(floatStyles);
}

// Roadmap level interactions
function initRoadmapLevels() {
    const levels = document.querySelectorAll('.level');
    
    levels.forEach((level, index) => {
        level.addEventListener('click', () => {
            // Pulse effect on click
            level.style.animation = 'none';
            setTimeout(() => {
                level.style.animation = 'levelPulse 0.6s ease-in-out';
            }, 10);
            
            // Show level details (could be expanded to show modal)
            const levelContent = level.querySelector('.level-content h3').textContent;
            showLevelMessage(`Level activated: ${levelContent}! 🚀`);
        });
    });
    
    // Add level pulse animation
    const levelPulseStyles = document.createElement('style');
    levelPulseStyles.textContent = `
        @keyframes levelPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(levelPulseStyles);
}

// Show level activation message
function showLevelMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #DC143C, #B22222);
        color: #FFD700;
        padding: 20px 30px;
        border-radius: 15px;
        font-weight: bold;
        font-size: 1.2rem;
        box-shadow: 0 10px 30px rgba(220, 20, 60, 0.5);
        z-index: 10001;
        animation: levelMessageIn 0.5s ease-out;
        text-align: center;
        border: 2px solid #FFD700;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'levelMessageOut 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 2000);
}

// Add level message animations
const levelMessageStyles = document.createElement('style');
levelMessageStyles.textContent = `
    @keyframes levelMessageIn {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes levelMessageOut {
        from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(levelMessageStyles);

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.rule-card, .level, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add slide in animation
    const slideInStyles = document.createElement('style');
    slideInStyles.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(slideInStyles);
}

// Konami code easter egg
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateBossMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Boss mode activation
function activateBossMode() {
    // Add boss mode overlay
    const bossOverlay = document.createElement('div');
    bossOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(220, 20, 60, 0.9), rgba(255, 215, 0, 0.9));
        z-index: 10002;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: bossMode 3s ease-in-out;
        pointer-events: none;
    `;
    
    const bossText = document.createElement('div');
    bossText.innerHTML = `
        <h1 style="font-size: 4rem; color: #000; text-shadow: 2px 2px 0px #FFD700; font-family: 'Oswald', sans-serif; text-align: center;">
            👑 BOSS MODE ACTIVATED 👑<br>
            <span style="font-size: 2rem;">Ultimate Final Boss Power!</span>
        </h1>
    `;
    
    bossOverlay.appendChild(bossText);
    document.body.appendChild(bossOverlay);
    
    // Add boss mode styles
    const bossModeStyles = document.createElement('style');
    bossModeStyles.textContent = `
        @keyframes bossMode {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0; transform: scale(1); }
        }
    `;
    document.head.appendChild(bossModeStyles);
    
    // Remove overlay after animation
    setTimeout(() => {
        document.body.removeChild(bossOverlay);
        document.head.removeChild(bossModeStyles);
        
        // Apply temporary boss effects
        applyBossEffects();
    }, 3000);
}

// Apply boss effects
function applyBossEffects() {
    const bossEffectsStyles = document.createElement('style');
    bossEffectsStyles.id = 'boss-effects';
    bossEffectsStyles.textContent = `
        .boss-logo {
            animation: mega-pulse 1s ease-in-out infinite !important;
            filter: hue-rotate(180deg) saturate(2) !important;
        }
        
        @keyframes mega-pulse {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(360deg); }
        }
        
        .title-line.gold {
            animation: rainbow-text 2s linear infinite !important;
        }
        
        @keyframes rainbow-text {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .money-bill {
            animation-duration: 2s !important;
            font-size: 3rem !important;
        }
    `;
    
    document.head.appendChild(bossEffectsStyles);
    
    // Remove boss effects after 10 seconds
    setTimeout(() => {
        const effectsStyle = document.getElementById('boss-effects');
        if (effectsStyle) {
            document.head.removeChild(effectsStyle);
        }
    }, 10000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBossInteraction();
    initSocialButtons();
    initRuleCards();
    initRoadmapLevels();
    initScrollAnimations();
    initKonamiCode();
    
    // Add scroll listener for parallax
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateMoneyRain();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log('🚀 Russian Final Boss website loaded! The boss is ready! 👑');
});

// Disable right-click context menu for a more polished feel
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Add loading screen effect
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 10003;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeOut 1s ease-in-out 0.5s forwards;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">👑</div>
            <div style="color: #FFD700; font-size: 2rem; font-weight: bold;">Loading Boss...</div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    const fadeOutStyles = document.createElement('style');
    fadeOutStyles.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
    `;
    document.head.appendChild(fadeOutStyles);
});
