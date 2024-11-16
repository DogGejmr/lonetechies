// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 50,
    once: true
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const termsOverlay = document.getElementById('terms-overlay');
const acceptTerms = document.getElementById('accept-terms');
const declineTerms = document.getElementById('decline-terms');

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

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (this.classList.contains('learn-more') && targetId === '#hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    const mainCTA = document.querySelector('.main-cta');
                    if (mainCTA) {
                        mainCTA.classList.add('attention');
                        setTimeout(() => mainCTA.classList.remove('attention'), 1000);
                    }
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Image loading animation
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => img.classList.add('loaded'));
    });
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
