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
    successMessage.textContent = 'Thx! Pesan kamu berhasil terkirim.';

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

// ============================================
// Back to Top Button Functionality (Goyang-goyang Ajib 🕺)
// ============================================

// 1. Buat elemen tombol secara dinamis
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTopBtn';
backToTopBtn.innerHTML = `<i class="fa-solid fa-arrow-up-long"></i>`;
backToTopBtn.setAttribute('aria-label', 'Kembali ke atas');
document.body.appendChild(backToTopBtn);

// 2. Tambahkan styling CSS + Animasi Goyang (Bounce)
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    @keyframes bounceAjib {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-8px) scale(1.05);
        }
    }

    #backToTopBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 45px;
        height: 45px;
        background-color: var(--accent, #4f46e5);
        color: var(--bg-primary, #ffffff);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.8);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #backToTopBtn.show {
        opacity: 1;
        visibility: visible;
        /* Tombol aktif + goyang-goyang naik turun terus menerus */
        animation: bounceAjib 1.2s ease-in-out infinite, fadeInScale 0.3s forwards;
    }

    #backToTopBtn:hover {
        animation: none; /* Berhenti goyang pas di-hover biar fokus */
        transform: translateY(-6px) scale(1.1);
        filter: brightness(1.15);
    }
`;
document.head.appendChild(backToTopStyle);

// 3. Logika Muncul/Hilang saat Scroll & Fungsi Klik
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Falling Letters Background Effect (Hujan Huruf Ajib)
// ============================================

const fallingContainer = document.createElement('div');
fallingContainer.id = 'fallingLettersContainer';
document.body.appendChild(fallingContainer);

// Styling untuk container dan huruf yang jatuh
const fallingStyle = document.createElement('style');
fallingStyle.textContent = `
    #fallingLettersContainer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none; /* Biar nggak senggol-senggolan sama klik mouse user */
        z-index: 0; /* Di bawah konten utama, tapi di atas background biasa */
    }

    .falling-char {
        position: absolute;
        top: -50px;
        color: var(--accent, #4f46e5);
        font-family: monospace;
        font-weight: bold;
        opacity: 0.15; /* Bikin transparan biar nggak nutupin teks asli */
        user-select: none;
        animation: fallDown linear infinite;
    }

    @keyframes fallDown {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        20% {
            opacity: 0.2;
        }
        80% {
            opacity: 0.2;
        }
        100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallingStyle);

// Fungsi untuk membuat huruf jatuh satu per satu
function createFallingChar() {
    const charSpan = document.createElement('span');
    charSpan.className = 'falling-char';
    
    // Karakter yang mau dijatuhin (bisa huruf, angka, atau simbol coding)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>":.,?|()&^%@!-+=/{}[];*#$_';
    charSpan.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
    
    // Posisi horizontal acak (0% sampai 100% lebar layar)
    const randomLeft = Math.random() * 100;
    // Ukuran font acak biar bervariasi (12px - 24px)
    const randomSize = Math.floor(Math.random() * 12) + 12;
    // Durasi jatuh acak (kecepatan 3 detik - 8 detik)
    const randomDuration = Math.random() * 5 + 3;
    // Delay acak biar jatuhnya nggak barengan
    const randomDelay = Math.random() * 5;

    charSpan.style.left = `${randomLeft}%`;
    charSpan.style.fontSize = `${randomSize}px`;
    charSpan.style.animationDuration = `${randomDuration}s`;
    charSpan.style.animationDelay = `${randomDelay}s`;

    fallingContainer.appendChild(charSpan);

    // Hapus elemen dari DOM setelah animasinya selesai biar nggak numpuk bikin lag
    setTimeout(() => {
        charSpan.remove();
    }, (randomDuration + randomDelay) * 1000);
}

// Munculin huruf baru setiap 300 milidetik
setInterval(createFallingChar, 300);