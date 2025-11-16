// small helper funcs
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// mobile nav toggle
const navToggle = $('#nav-toggle');
const nav = $('#main-nav');
if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        nav.style.display = expanded ? 'none' : 'block';
    });
}

// set year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// simple form validation
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        const fields = ['name', 'email', 'message'];
        fields.forEach(id => {
            const el = document.getElementById(id);
            const err = el.nextElementSibling;
            if (!el.checkValidity()) {
                valid = false;
                err.textContent = el.validationMessage;
            } else {
                err.textContent = '';
            }
        });
        if (valid) {
            // demo success (replace with ajax/send endpoint in real world)
            form.classList.add('hidden');
            const success = document.getElementById('form-success');
            if (success) success.classList.remove('hidden');
        }
    });
}

// scroll reveal using IntersectionObserver
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('is-visible'));
}
