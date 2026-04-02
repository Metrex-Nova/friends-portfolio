// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// Handles dark/light mode, interactions, and animations
// ============================================

// ============================================
// 1. THEME TOGGLE (Dark/Light Mode)
// ============================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

function setTheme(theme) {
    const body = document.body;
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌞';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const body = document.body;
    const isLightMode = body.classList.contains('light-mode');
    setTheme(isLightMode ? 'dark' : 'light');
});

// ============================================
// 2. MOBILE MENU TOGGLE
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// 3. SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's the theme toggle button
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 4. LOADING ANIMATION
// ============================================

function removeLoadingScreen() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => loading.remove(), 500);
    }, 500);
}

// Remove loading screen when page fully loads
document.addEventListener('DOMContentLoaded', removeLoadingScreen);

// ============================================
// 5. CONTACT FORM
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// ============================================
// 6. COPY EMAIL TO CLIPBOARD
// ============================================

const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailCode = document.getElementById('emailCode');

copyEmailBtn.addEventListener('click', () => {
    const email = emailCode.textContent;
    
    // Use modern clipboard API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showCopiedFeedback();
        }).catch(() => {
            fallbackCopy(email);
        });
    } else {
        fallbackCopy(email);
    }
});

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopiedFeedback();
}

function showCopiedFeedback() {
    const originalText = copyEmailBtn.textContent;
    copyEmailBtn.textContent = '✅';
    copyEmailBtn.classList.add('copied');
    
    setTimeout(() => {
        copyEmailBtn.textContent = originalText;
        copyEmailBtn.classList.remove('copied');
    }, 2000);
}

// ============================================
// 7. SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate cards and sections on scroll
document.querySelectorAll('.book-card, .research-card, .project-card, .skill-card, .playlist-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// ============================================
// 8. ACTIVE NAV LINK
// ============================================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.style.color = 'inherit';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--primary)';
        }
    });
});

// ============================================
// 9. PARALLAX EFFECT (Optional)
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0px ${scrolled * 0.5}px`;
    }
});

// ============================================
// 10. ENHANCED HOVER EFFECTS
// ============================================

// Add glow effect on hover for cards
const hoverElements = document.querySelectorAll('.skill-card, .book-card, .research-card, .project-card, .playlist-card, .social-link');

hoverElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ============================================
// 11. KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Theme toggle with T key
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            themeToggle.click();
        }
    }
});

// ============================================
// 12. PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 13. ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// ============================================
// 14. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Log initialization
    console.log('%c🚀 Portfolio loaded successfully!', 'color: var(--primary); font-size: 16px; font-weight: bold;');
    console.log('%cPress "T" to toggle theme 🌓', 'color: var(--text-secondary);');
});

// ============================================
// 15. SERVICE WORKER REGISTRATION (Optional)
// ============================================

// Uncomment to enable offline support
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(error => console.log('Service Worker registration failed:', error));
    });
}
*/

// ============================================
// 16. ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-normal', '0.1s ease');
    document.documentElement.style.setProperty('--transition-slow', '0.1s ease');
}

// Get current year for dynamic copyright
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer p');
if (copyrightElement) {
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear.toString());
}
