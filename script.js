/* ==========================================================
   ManiKanta Portfolio — script.js
   ========================================================== */

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
    }, 1200);
});

// ==================== CUSTOM CURSOR (desktop only) ====================
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top  = e.clientY + 'px';
        }, 80);
    });

    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
            follower.style.width   = '50px';
            follower.style.height  = '50px';
            follower.style.opacity = '0.25';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(1)';
            follower.style.width   = '30px';
            follower.style.height  = '30px';
            follower.style.opacity = '0.5';
        });
    });
}

// ==================== SCROLL PROGRESS BAR ====================
window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('scroll-progress').style.width = (scrollTop / scrollHeight * 100) + '%';
});

// ==================== NAVBAR BLUR ON SCROLL ====================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('main-nav');
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
});

// ==================== ACTIVE NAV LINK ON SCROLL (IntersectionObserver) ====================
const sections  = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observer.observe(sec));

// ==================== AOS (Scroll Reveal) ====================
AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });

// ==================== TYPED.JS ====================
new Typed('#typed-text', {
    strings: [
        'FullStack Developer',
        'React Developer',
        'Frontend Developer',
        'Data Engineer'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
});

// ==================== PARTICLES.JS ====================
particlesJS('particles-js', {
    particles: {
        number: { value: 48, density: { enable: true, value_area: 800 } },
        color:  { value: '#36a49c' },
        shape:  { type: 'circle' },
        opacity: { value: 0.28, random: true },
        size:    { value: 3, random: true },
        line_linked: {
            enable: true, distance: 150,
            color: '#36a49c', opacity: 0.18, width: 1
        },
        move: { enable: true, speed: 1.4, direction: 'none', random: true, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true,  mode: 'grab' },
            onclick: { enable: true,  mode: 'push' },
            resize:  true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 3 }
        }
    },
    retina_detect: true
});

// ==================== VANILLA TILT (Project Cards) ====================
VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
    max: 7, speed: 400, glare: true, 'max-glare': 0.12, scale: 1.02
});

// ==================== BACK TO TOP ====================
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
});
backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ==================== SMOOTH SCROLL (internal links) ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            // Close mobile navbar if open
            const navCollapse = document.getElementById('navbarNav');
            if (navCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    });
});

// ==================== TOAST ====================
function showToast() {
    const toast = document.getElementById('toast-notification');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ==================== CONTACT FORM (real-time validation + toast) ====================
const contactForm = document.getElementById('contact-form');

// Real-time validation on blur
['name', 'email', 'message'].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) validateField(input);
    });
});

function validateField(input) {
    if (input.type === 'email') {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        setValidity(input, valid);
    } else {
        setValidity(input, input.value.trim().length > 0);
    }
}

function setValidity(input, isValid) {
    input.classList.toggle('is-valid',   isValid);
    input.classList.toggle('is-invalid', !isValid);
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fields = ['name', 'email', 'message'].map(id => document.getElementById(id));
    fields.forEach(f => validateField(f));

    const allValid = fields.every(f => f.classList.contains('is-valid'));
    if (allValid) {
        showToast();
        this.reset();
        fields.forEach(f => { f.classList.remove('is-valid', 'is-invalid'); });
    }
});
