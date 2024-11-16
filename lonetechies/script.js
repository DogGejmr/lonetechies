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
const body = document.body;

// Create and append modal
function createTOSModal() {
    const modalHTML = `
        <div class="modal-overlay" id="tosModal">
            <div class="modal-content">
                <h2>Terms of Service Agreement</h2>
                <p>Before using our website, please read and accept our <a href="tos.html" target="_blank">Terms of Service</a>.</p>
                <div class="modal-buttons">
                    <button class="modal-button accept-button">Accept</button>
                    <button class="modal-button decline-button">Decline</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// TOS Modal Handler
function handleTOSModal() {
    const modal = document.getElementById('tosModal');
    if (!modal) {
        console.log('Creating modal...');
        createTOSModal();
    }

    const modal2 = document.getElementById('tosModal');
    const acceptButton = modal2.querySelector('.accept-button');
    const declineButton = modal2.querySelector('.decline-button');

    console.log('Modal found:', modal2);

    // Show modal with a slight delay
    setTimeout(() => {
        console.log('Showing modal');
        modal2.style.display = 'flex';
        // Add show class after a brief moment to trigger animation
        requestAnimationFrame(() => {
            modal2.classList.add('show');
        });
    }, 1000);

    // Handle accept click
    acceptButton.addEventListener('click', () => {
        console.log('TOS accepted');
        modal2.classList.remove('show');
        setTimeout(() => {
            modal2.style.display = 'none';
        }, 300);
    });

    // Handle decline click
    declineButton.addEventListener('click', () => {
        console.log('TOS declined');
        window.location.href = 'https://www.google.com';
    });

    // Close modal when clicking outside
    modal2.addEventListener('click', (e) => {
        if (e.target === modal2) {
            modal2.classList.remove('show');
            setTimeout(() => {
                modal2.style.display = 'none';
            }, 300);
        }
    });
}

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
});

// Disable hover effects on touch devices
function updateTouchCapability() {
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
}

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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing TOS modal');
    handleTOSModal();
    updateTouchCapability();
    setMobileViewportHeight();
    window.addEventListener('resize', setMobileViewportHeight);
});
