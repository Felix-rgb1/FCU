// FC Unterensingen - Interactive Features

// ============================================
// FUSSBALL.DE INTEGRATION
// ============================================
const FUSSBALL_DE_TEAMS = {
    'herren': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219170', // Herrenmannschaft
    'frauen': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219171', // Frauenmannschaft
    'c-jugend': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219172', // C-Jugend
    'd-jugend': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219173', // D-Jugend
    'e1-jugend': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219174', // E1-Jugend
    'e2-jugend': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219175', // E2-Jugend
    'f-jugend': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219176', // F-Jugend
    'c-jugend-juniorinnen': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219177',
    'd-jugend-juniorinnen': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219178',
    'e-jugend-juniorinnen': 'https://www.fussball.de/verein/fc-unterensingen-1993-ev/5219179',
};

// ============================================
// 0. SCHEDULE TOGGLE FUNCTION
// ============================================
function toggleSchedule(scheduleId) {
    const scheduleElement = document.getElementById(`schedule-${scheduleId}`);
    if (scheduleElement) {
        scheduleElement.classList.toggle('hidden');
        // Smooth scroll to it
        setTimeout(() => {
            scheduleElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// ============================================
// UPDATE SCHEDULE FILTER
// ============================================
function updateScheduleFilter() {
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const teamSelect = document.getElementById('teamSelect').value;
    
    if (!dateFrom || !dateTo) {
        alert('Bitte beide Daten auswählen!');
        return;
    }

    // Baue die neue Fussball.de URL mit den Filtern
    const baseUrl = 'https://www.fussball.de/widget/verein/vereinsspielplan/fc-unterensingen-1993-ev';
    let newUrl = `${baseUrl}?datum_von=${dateFrom}&datum_bis=${dateTo}`;
    
    // Optional: Team Filter hinzufügen (wenn Fussball.de das unterstützt)
    if (teamSelect) {
        // Team-IDs könnten hier hinzugefügt werden wenn verfügbar
    }
    
    // Update the iframe src
    const iframe = document.getElementById('fussball-de-embed');
    if (iframe) {
        iframe.src = newUrl;
    }

    // Scrolle zur Schedule Section
    setTimeout(() => {
        document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Animate icon
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ============================================
// 2. ACTIVE NAVIGATION LINK
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            navLinks.forEach(link => link.classList.remove('text-fcu-neon'));
            const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('text-fcu-neon');
            }
        }
    });
});

// ============================================
// 3. FORM SUBMISSION HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Bitte fülle alle Felder aus!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Bitte gib eine gültige E-Mail-Adresse ein!');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Gesendet!';
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#10b981';

        // Reset after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}

// ============================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 5. HERO BUTTON CLICK EVENT
// ============================================
const ctaButton = document.querySelector('section button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const scheduleSection = document.getElementById('schedule');
        if (scheduleSection) {
            scheduleSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// 6. NEWS CARD ANIMATION ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to news cards
document.querySelectorAll('[class*="news"] > div > div').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add CSS animation if not already present
if (!document.querySelector('style[data-custom-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-custom-animation', 'true');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// 7. MATCH TICKER LIVE UPDATE (SIMULATION)
// ============================================
function updateMatchTicker() {
    // This simulates a live update - in production, 
    // this would fetch from an API
    const now = new Date();
    const lastUpdate = document.createElement('div');
    lastUpdate.textContent = `Aktualisiert: ${now.toLocaleTimeString('de-DE')}`;
    lastUpdate.style.fontSize = '0.75rem';
    lastUpdate.style.color = 'rgba(234, 179, 8, 0.7)';
    lastUpdate.style.marginTop = '0.5rem';
}

// Call update on page load
document.addEventListener('DOMContentLoaded', updateMatchTicker);

// ============================================
// 8. SPONSOR SLIDER AUTO-SCROLL (Optional)
// ============================================
const sponsorSlider = document.querySelector('.sponsor-slider');

if (sponsorSlider) {
    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame

    function autoScroll() {
        scrollPosition += scrollSpeed;

        // Reset if reached end
        if (scrollPosition >= sponsorSlider.scrollWidth - sponsorSlider.clientWidth) {
            scrollPosition = 0;
        }

        sponsorSlider.scrollLeft = scrollPosition;
    }

    // Optional: Enable auto-scroll
    // setInterval(autoScroll, 30);

    // Or keep manual scroll with mouse
    let isDown = false;
    let startX;
    let scrollLeft;

    sponsorSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - sponsorSlider.offsetLeft;
        scrollLeft = sponsorSlider.scrollLeft;
    });

    sponsorSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    sponsorSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    sponsorSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sponsorSlider.offsetLeft;
        const walk = (x - startX) * 1; // scroll speed
        sponsorSlider.scrollLeft = scrollLeft - walk;
    });
}

// ============================================
// 9. NAVBAR BACKGROUND ON SCROLL
// ============================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// ============================================
// 10. BUTTON RIPPLE EFFECT
// ============================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect styles if not present
if (!document.querySelector('style[data-ripple]')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.setAttribute('data-ripple', 'true');
    rippleStyle.textContent = `
        button {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Attach ripple to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ============================================
// 11. SCROLL-TO-TOP BUTTON (Optional)
// ============================================
function createScrollTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #eab308;
        color: #0f172a;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 40;
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
        scrollTopBtn.style.backgroundColor = '#ca8a04';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
        scrollTopBtn.style.backgroundColor = '#eab308';
    });
}

// Initialize scroll-to-top button
createScrollTopButton();

// ============================================
// 12. PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// Add fade-in animation
if (!document.querySelector('style[data-fade-in]')) {
    const fadeInStyle = document.createElement('style');
    fadeInStyle.setAttribute('data-fade-in', 'true');
    fadeInStyle.textContent = `
        body {
            opacity: 0;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(fadeInStyle);
}

// ============================================
// 13. CONSOLE MESSAGE
// ============================================
console.log('%cFC Unterensingen - Ein Dorf. Ein Team.', 
    'font-size: 20px; font-weight: bold; color: #eab308; text-shadow: 0 0 10px rgba(234,179,8,0.5);');
console.log('%cWillkommen! 🏟️', 'font-size: 16px; color: #1e3a8a;');
console.log('Website erstellt mit HTML5, Tailwind CSS & JavaScript');
