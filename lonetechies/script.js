// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 50,
    once: true,
    disable: window.innerWidth < 768
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const termsOverlay = document.getElementById('terms-overlay');
const acceptTerms = document.getElementById('accept-terms');
const declineTerms = document.getElementById('decline-terms');
const body = document.body;

// Navbar Scroll Effect
let lastScrollTop = 0;
const navbarHeight = navbar.getBoundingClientRect().height;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = `translateY(-${navbarHeight}px)`;
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Set initial height for smooth transitions
    if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = null;
            }
        });

        // Toggle current item
        item.classList.toggle('active');
        
        if (!isActive) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = null;
        }
    });

    // Handle touch events
    question.addEventListener('touchstart', function(e) {
        this.classList.add('touch-active');
    }, { passive: true });

    question.addEventListener('touchend', function(e) {
        this.classList.remove('touch-active');
    }, { passive: true });
});

// Disable hover effects on touch devices
function updateTouchCapability() {
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
}
updateTouchCapability();

// Handle service card interactions
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    }, { passive: true });

    card.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    }, { passive: true });
});

// Ensure proper viewport height on mobile
function setMobileViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setMobileViewportHeight();
window.addEventListener('resize', setMobileViewportHeight);

// Handle form submissions on mobile
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
        }
        // Add your form submission logic here
        setTimeout(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }
        }, 2000);
    });
});

// Prevent zoom on input focus for iOS
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        document.documentElement.classList.add('input-focused');
    });
    input.addEventListener('blur', function() {
        document.documentElement.classList.remove('input-focused');
    });
});

// Handle scroll performance
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Add your scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#419D78', '#2D3047', '#E0A458'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#419D78',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

// Terms of Service Modal
function showTerms() {
    termsOverlay.style.display = 'flex';
}

acceptTerms.addEventListener('click', () => {
    termsOverlay.style.display = 'none';
});

declineTerms.addEventListener('click', () => {
    termsOverlay.style.display = 'none';
});

// Notification system
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Image loading animation
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => img.classList.add('loaded'));
});
