// ============================================
// Theme Toggle Functionality
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

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
    const moonIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(270)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#000000"></path> </g></svg>`;
    const sunIcon = `<svg width="24" height="24" viewBox="0 -1 47 50" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>sun-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Q3_icons" data-name="Q3 icons"> <g> <path d="M24,10a2,2,0,0,0,2-2V4a2,2,0,0,0-4,0V8A2,2,0,0,0,24,10Z"></path> <path d="M24,38a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V40A2,2,0,0,0,24,38Z"></path> <path d="M36.7,14.1l2.9-2.8a2.3,2.3,0,0,0,0-2.9,2.3,2.3,0,0,0-2.9,0l-2.8,2.9a2,2,0,1,0,2.8,2.8Z"></path> <path d="M11.3,33.9,8.4,36.7a2.3,2.3,0,0,0,0,2.9,2.3,2.3,0,0,0,2.9,0l2.8-2.9a2,2,0,1,0-2.8-2.8Z"></path> <path d="M44,22H40a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z"></path> <path d="M10,24a2,2,0,0,0-2-2H4a2,2,0,0,0,0,4H8A2,2,0,0,0,10,24Z"></path> <path d="M36.7,33.9a2,2,0,1,0-2.8,2.8l2.8,2.9a2.1,2.1,0,1,0,2.9-2.9Z"></path> <path d="M11.3,14.1a2,2,0,0,0,2.8-2.8L11.3,8.4a2.3,2.3,0,0,0-2.9,0,2.3,2.3,0,0,0,0,2.9Z"></path> <path d="M24,14A10,10,0,1,0,34,24,10,10,0,0,0,24,14Z"></path> </g> </g> </g> </g></svg>`;
    themeIcon.style.animation = 'none';
    themeIcon.offsetHeight;
    themeIcon.style.animation = 'iconRotateDown 0.45s ease-in-out';

    setTimeout(() => {
        themeIcon.innerHTML = theme === 'light' ? moonIcon : sunIcon;
    }, 225);
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
            navbar.classList.add('hidden');
        } else {
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
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contactForm');

function showCustomNotification(message, isError = false) {
    const existingNotif = document.getElementById('customNotification');
    if (existingNotif) existingNotif.remove();

    const notification = document.createElement('div');
    notification.id = 'customNotification';
    notification.style.cssText = `
        position: fixed;
        top: 80px; /* Sedikit lebih ke atas */
        left: 50%;
        transform: translateX(-50%);
        background-color: ${isError ? '#fe1818' : 'var(--accent)'};
        color: ${isError ? '#fff' : 'var(--bg-primary)'};
        /* Padding dikecilkan */
        padding: 0.8rem 1.2rem; 
        border-radius: 8px;
        /* Ukuran font dikecilkan dan dibatasi 2 baris */
        font-size: 14px; 
        font-weight: 600;
        line-height: 1.4;
        letter-spacing: 0.3px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: cardFlipPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        
        /* Bikin sejajar & batasi ukuran popup */
        display: flex;
        align-items: center; /* Ikon dan teks sejajar di tengah */
        gap: 10px; /* Jarak antara SVG dan Teks */
        width: max-content;
        max-width: 320px; /* Lebar maksimal agar otomatis turun jadi 2 baris di HP */
    `;
    notification.innerHTML = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'cardSideFlipOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 3500);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;

    for (const field of requiredFields) {
        if (!field.value.trim()) {
            isValid = false;
            field.focus();
            break;
        }
    }

    if (!isValid) {
        showCustomNotification('<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_949_22799)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.82664 2.22902C10.7938 0.590326 13.2063 0.590325 14.1735 2.22902L23.6599 18.3024C24.6578 19.9933 23.3638 22 21.4865 22H2.51362C0.63634 22 -0.657696 19.9933 0.340215 18.3024L9.82664 2.22902ZM10.0586 7.05547C10.0268 6.48227 10.483 6 11.0571 6H12.9429C13.517 6 13.9732 6.48227 13.9414 7.05547L13.5525 14.0555C13.523 14.5854 13.0847 15 12.554 15H11.446C10.9153 15 10.477 14.5854 10.4475 14.0555L10.0586 7.05547ZM14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="#fff000"></path> </g> <defs> <clipPath id="clip0_949_22799"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg> Harap isi semua form yang kosong terlebih dahulu!', true);
        return;
    }
    // ==============================================

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
    }

    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            contactForm.reset();
            showCustomNotification('Thx! Pesan kamu berhasil terkirim.', false);
        } else {
            showCustomNotification('<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#000000"> <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg> Gagal mengirim pesan. Silakan coba beberapa saat lagi.', true);
        }
    } catch (error) {
        showCustomNotification('<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#000000"> <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg> Terjadi kesalahan jaringan. Periksa koneksi internet Anda.', true);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
});

if (!document.getElementById('contact-animations')) {
    const style = document.createElement('style');
    style.id = 'contact-animations';
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

        #customNotification svg {
            width: 1.4em;
            height: 1.4em;
            flex-shrink: 0;
            display: block;
        }
    `;
    document.head.appendChild(style);
}

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
// Back to Top Button Functionality
// ============================================

const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTopBtn';
backToTopBtn.innerHTML = `<i class="fa-solid fa-arrow-up-long"></i>`;
backToTopBtn.setAttribute('aria-label', 'Kembali ke atas');
document.body.appendChild(backToTopBtn);

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
// Falling Letters Background Effect
// ============================================

const fallingContainer = document.createElement('div');
fallingContainer.id = 'fallingLettersContainer';
document.body.appendChild(fallingContainer);

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

function createFallingChar() {
    const charSpan = document.createElement('span');
    charSpan.className = 'falling-char';
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>":.,?|()&^%@!-+=/{}[];*#$_';
    charSpan.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
    
    const randomLeft = Math.random() * 100;
    const randomSize = Math.floor(Math.random() * 12) + 12;
    const randomDuration = Math.random() * 5 + 3;
    const randomDelay = Math.random() * 5;

    charSpan.style.left = `${randomLeft}%`;
    charSpan.style.fontSize = `${randomSize}px`;
    charSpan.style.animationDuration = `${randomDuration}s`;
    charSpan.style.animationDelay = `${randomDelay}s`;

    fallingContainer.appendChild(charSpan);

    setTimeout(() => {
        charSpan.remove();
    }, (randomDuration + randomDelay) * 1000);
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});

setInterval(createFallingChar, 300);