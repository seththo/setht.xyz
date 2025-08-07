// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .skill-category, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const project = formData.get('project');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !project || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // For Netlify Forms - let the form submit naturally
        showNotification('Sending message...', 'info');
        
        // Remove preventDefault to let Netlify handle the form
        // The form will submit to Netlify automatically
        return true;
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add hover effects to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    // Check if the target is a number
    if (isNaN(target)) {
        // For non-numeric values, just keep the original text
        return;
    }
    
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const targetText = counter.textContent;
            
            // Extract numeric value from text (remove '+' and other non-numeric chars)
            const numericValue = parseInt(targetText.replace(/[^0-9]/g, ''));
            
            if (!isNaN(numericValue)) {
                animateCounter(counter, numericValue);
            }
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe stat counters
document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Add cool dark mode effects
document.addEventListener('DOMContentLoaded', () => {
    // Add particle effect to hero section
    createParticles();
    
    // Add glow effect to logo on hover
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 30px rgba(96, 165, 250, 0.8)';
            setTimeout(() => {
                this.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
            }, 300);
        });
    }
    
    // Add enhanced hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3), 0 0 30px rgba(59, 130, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add enhanced hover effects to testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3), 0 0 30px rgba(59, 130, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add button click effect with particles
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createButtonParticles(e, this);
        });
    });
    
    // Add floating elements animation
    animateFloatingElements();
    
    // Initialize progress bars
    initializeProgressBars();
    
    // Initialize tab functionality
    initializeTabs();
    
    // Initialize 3D card effects
    initialize3DCards();
    
    // Initialize mobile-specific features
    initializeMobileFeatures();
});

// Initialize mobile-specific features
function initializeMobileFeatures() {
    // Mobile Floating Action Button
    const mobileFab = document.getElementById('mobileFab');
    if (mobileFab) {
        mobileFab.addEventListener('click', function() {
            // Add haptic feedback simulation
            this.classList.add('haptic-feedback');
            setTimeout(() => {
                this.classList.remove('haptic-feedback');
            }, 100);
            
            // Scroll to top with smooth animation
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Create particle burst
            createMobileParticleBurst(this);
        });
    }
    
    // Mobile pull-to-refresh
    initializePullToRefresh();
    
    // Mobile shake detection
    initializeShakeDetection();
    
    // Mobile tilt effects
    initializeMobileTiltEffects();
    
    // Mobile card stack effects
    initializeCardStackEffects();
}

// Mobile pull-to-refresh
function initializePullToRefresh() {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    const threshold = 100;
    
    document.addEventListener('touchstart', function(e) {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (window.scrollY === 0 && startY > 0) {
            currentY = e.touches[0].clientY;
            pullDistance = currentY - startY;
            
            if (pullDistance > 0) {
                const indicator = document.getElementById('pullRefreshIndicator');
                if (indicator) {
                    indicator.style.opacity = Math.min(pullDistance / threshold, 1);
                }
            }
        }
    });
    
    document.addEventListener('touchend', function() {
        if (pullDistance > threshold) {
            // Trigger refresh
            const indicator = document.getElementById('pullRefreshIndicator');
            if (indicator) {
                indicator.classList.add('active');
                setTimeout(() => {
                    indicator.classList.remove('active');
                    location.reload();
                }, 1000);
            }
        }
        
        startY = 0;
        pullDistance = 0;
    });
}

// Mobile shake detection
function initializeShakeDetection() {
    let lastUpdate = 0;
    let lastX, lastY, lastZ;
    const threshold = 15;
    
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function(event) {
            const current = event.accelerationIncludingGravity;
            const currentTime = new Date().getTime();
            
            if ((currentTime - lastUpdate) > 100) {
                const diffTime = currentTime - lastUpdate;
                lastUpdate = currentTime;
                
                const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;
                
                if (speed > threshold) {
                    // Shake detected
                    showNotification('Shake Detected!', 'info');
                    document.body.classList.add('shake-to-refresh');
                    setTimeout(() => {
                        document.body.classList.remove('shake-to-refresh');
                    }, 500);
                }
                
                lastX = current.x;
                lastY = current.y;
                lastZ = current.z;
            }
        });
    }
}

// Mobile tilt effects
function initializeMobileTiltEffects() {
    const cards = document.querySelectorAll('.card-3d, .service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('touchmove', function(e) {
            const touch = e.touches[0];
            const rect = this.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const touchX = touch.clientX - rect.left;
            const touchY = touch.clientY - rect.top;
            
            const rotateX = (touchY - centerY) / 20;
            const rotateY = (centerX - touchX) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Mobile card stack effects
function initializeCardStackEffects() {
    const cardStacks = document.querySelectorAll('.card-stack');
    
    cardStacks.forEach(stack => {
        const items = stack.querySelectorAll('.card-stack-item');
        
        items.forEach((item, index) => {
            item.addEventListener('touchstart', function() {
                // Bring clicked card to front
                items.forEach((otherItem, otherIndex) => {
                    if (otherIndex <= index) {
                        otherItem.style.zIndex = items.length - index + otherIndex;
                    }
                });
            });
        });
    });
}

// Create mobile particle burst
function createMobileParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 6px;
            height: 6px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: mobileParticleBurst 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Set particle trajectory
        const endX = centerX + Math.cos(angle) * velocity;
        const endY = centerY + Math.sin(angle) * velocity;
        
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Initialize progress bars with animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Initialize 3D card effects
function initialize3DCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Create particle effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}

// Create button particles
function createButtonParticles(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: buttonParticle 0.8s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        button.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

// Animate floating elements
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
}

// Add CSS for particle animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes buttonParticle {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0) translateY(-20px);
            opacity: 0;
        }
    }
    
    @keyframes mobileParticleBurst {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(0);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .floating-element {
        animation: float 8s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.6;
        }
    }
    
    /* Additional animations for new features */
    .skill-showcase-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    .skill-showcase-card:nth-child(1) { animation-delay: 0.1s; }
    .skill-showcase-card:nth-child(2) { animation-delay: 0.2s; }
    .skill-showcase-card:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .card-3d {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .animation-item {
        animation: slideInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    .animation-item:nth-child(1) { animation-delay: 0.1s; }
    .animation-item:nth-child(2) { animation-delay: 0.2s; }
    .animation-item:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Mobile-specific animations */
    .mobile-floating-elements {
        display: none;
    }
    
    @media (max-width: 768px) {
        .mobile-floating-elements {
            display: block;
        }
        
        .mobile-swipe-hint {
            display: block;
        }
        
        .mobile-fab {
            display: flex;
        }
    }
`;
document.head.appendChild(style); 