/* ============================================
   PORTOFOLIO TKJ — SCRIPT.JS
   SMK Plus Pelita Nusantara | XI TKJ 1
   ============================================ */

// ===== INITIALIZE LUCIDE ICONS =====
lucide.createIcons();

// ===== NAVBAR — SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.85)';
        navbar.style.backdropFilter = 'blur(24px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
    }
});

// ===== ACTIVE NAV LINK — SCROLL TRACKING =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMenuFn() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenuFn);
menuOverlay.addEventListener('click', closeMenuFn);
mobileLinks.forEach(link => link.addEventListener('click', closeMenuFn));

// ===== SKILL TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding tab content
        tabContents.forEach(content => {
            content.classList.add('hidden');
            if (content.id === 'tab-' + tab) {
                content.classList.remove('hidden');
                // Re-animate progress bars in newly visible tab
                setTimeout(() => animateProgressBars(content), 100);
            }
        });
    });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== PROGRESS BAR ANIMATION =====
function animateProgressBars(container) {
    // Default to document if no container specified
    container = container || document;

    const bars = container.querySelectorAll('.progress-bar[data-width]');
    bars.forEach(bar => {
        // Reset first
        bar.style.width = '0%';
        // Then animate after a small delay
        setTimeout(() => {
            bar.style.width = bar.dataset.width;
        }, 100);
    });
}

// Observe skills section for progress bar animation
const skillSection = document.getElementById('skills');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => animateProgressBars(), 300);
        }
    });
}, { threshold: 0.2 });

skillObserver.observe(skillSection);

// Observe about section for its own progress bar
const aboutSection = document.getElementById('about');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => animateProgressBars(aboutSection), 300);
        }
    });
}, { threshold: 0.3 });

aboutObserver.observe(aboutSection);

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const start = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            }

            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const subject = document.getElementById('subjectInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();

    // Validation
    if (!name || !email || !message) {
        formMessage.classList.remove('hidden');
        formMessage.className = 'text-center text-sm font-mono py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20';
        formMessage.textContent = 'Error: Nama, email, dan pesan wajib diisi!';
        return;
    }

    // Simulate sending
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span class="animate-pulse">Mengirim...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Success message
        formMessage.classList.remove('hidden');
        formMessage.className = 'text-center text-sm font-mono py-2 rounded-lg bg-tkjGreen/10 text-tkjGreen border border-tkjGreen/20';
        formMessage.textContent = '✓ Pesan berhasil dikirim! (simulasi)';

        // Reset button
        submitBtn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> KIRIM PESAN';
        submitBtn.disabled = false;
        lucide.createIcons();

        // Reset form
        contactForm.reset();

        // Show toast
        showToast('Pesan berhasil dikirim!');

        // Hide message after 4 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 4000);
    }, 1500);
});

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});