// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 50,
    once: true
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#419D78', '#2D3047', '#E0A458']  // Theme colors
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.6,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#419D78',  // Using the green color for connections
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
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // If it's a "Learn More" link scrolling to hero
                if (this.classList.contains('learn-more') && targetId === '#hero') {
                    const mainCTA = document.querySelector('.main-cta');
                    if (mainCTA) {
                        // Scroll to the hero section with offset
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        
                        // Add attention animation to the CTA button
                        mainCTA.classList.add('attention');
                        setTimeout(() => {
                            mainCTA.classList.remove('attention');
                        }, 1000);
                    }
                } else {
                    // Normal smooth scroll for other links
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Terms of Service Modal
const termsOverlay = document.getElementById('terms-overlay');
const acceptTerms = document.getElementById('accept-terms');
const declineTerms = document.getElementById('decline-terms');

function showTerms() {
    termsOverlay.style.display = 'flex';
}

acceptTerms.addEventListener('click', () => {
    termsOverlay.style.display = 'none';
});

declineTerms.addEventListener('click', () => {
    termsOverlay.style.display = 'none';
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add notification to page
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
