// ============================================
// Theme Toggle Functionality
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    // Simpan kode HTML ikon ke dalam variabel menggunakan backtick (`)
    const moonIcon = `<i class="fa-solid fa-moon fa-rotate-by" style="--fa-rotate-angle: 250deg;"></i>`;
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="4" stroke="none"/>
                        <path d="M12 2v2" stroke="#fff"/>
                        <path d="M12 20v2" stroke="#fff"/>
                        <path d="M4.93 4.93l1.41 1.41" stroke="#fff"/>
                        <path d="M17.66 17.66l1.41 1.41" stroke="#fff"/>
                        <path d="M2 12h2" stroke="#fff"/>
                        <path d="M20 12h2" stroke="#fff"/>
                        <path d="M4.93 19.07l1.41-1.41" stroke="#fff"/>
                        <path d="M17.66 6.34l1.41-1.41" stroke="#fff"/>
                     </svg>`;
    // Restart animasi setiap kali tombol diklik
    themeIcon.style.animation = 'none';
    themeIcon.offsetHeight; // Trigger reflow
    themeIcon.style.animation = 'iconRotateDown 0.45s ease-in-out';

    // Ganti ikon di tengah-tengah putaran (saat ukurannya mengecil di 50%)
    setTimeout(() => {
        themeIcon.innerHTML = theme === 'light' ? moonIcon : sunIcon;
    }, 225); // Setengah dari total durasi 0.45s
}
// ============================================
// Mobile Menu Toggle
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
    document.addEventListener('click', (event) => {
        // Cek apakah menu sedang aktif/terbuka DAN yang diklik bukan bagian dari navMenu atau mobileMenuToggle
        if (navMenu.classList.contains('active') && !navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ============================================
// Smooth Scrolling with Offset
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Hide on Scroll Down, Show on Scroll Up
// ============================================

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
const sections = document.querySelectorAll('section');
const cards = document.querySelectorAll('.skill-card, .project-card, .stat-item');

sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

cards.forEach(card => {
    card.classList.add('fade-in-section');
    observer.observe(card);
});

// ============================================
// Contact Form Handling (Sideflip Exit Animation)
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--accent);
        color: var(--bg-primary);
        padding: 1.2rem 2.5rem;
        border-radius: 12px;
        font-weight: 600;
        letter-spacing: 0.5px;
        box-shadow: 0 10px 35px var(--shadow-hover);
        z-index: 1001;
        animation: cardFlipPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `;
    successMessage.textContent = '✨ Thx! Pesan kamu berhasil terkirim.';

    document.body.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove message after 3.5 seconds with Sideflip + Zoom Out animation
    setTimeout(() => {
        successMessage.style.animation = 'cardSideFlipOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500); // Waktu disesuaikan dengan durasi animasi keluar (0.5s)
    }, 3500);
});

// Add advanced animations stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes cardFlipPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50px) rotateX(90deg) scale(0.5);
        }
        60% {
            opacity: 1;
            transform: translate(-50%, 10px) rotateX(-15deg) scale(1.05);
        }
        80% {
            transform: translate(-50%, -5px) rotateX(5deg) scale(0.98);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, 0) rotateX(0deg) scale(1);
        }
    }
    
    @keyframes cardSideFlipOut {
        0% {
            opacity: 1;
            transform: translate(-50%, 0) rotateY(0deg) scale(1);
        }
        50% {
            opacity: 0.7;
            transform: translate(-50%, -15px) rotateY(180deg) scale(0.9);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -30px) rotateY(360deg) scale(0.4);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Active Navigation Link Highlighting
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 200;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Parallax Effect on Scroll
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// ============================================
// Add hover effect to project cards
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

// ============================================
// Initialize on page load
// ============================================

window.addEventListener('load', () => {
    // Add smooth entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

console.log('Portfolio website loaded successfully!');
console.log('Created by Azzaam - Web Developer');

const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}