document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section[id]');
    const revealItems = document.querySelectorAll('.fade-in');
    const heroTitle = document.querySelector('.hero-copy h1');

    const setHeaderState = () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 24);
    };

    setHeaderState();
    window.addEventListener('scroll', setHeaderState);

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active', isOpen);
            mobileMenu.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        });

        navAnchors.forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    if (revealItems.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16 });

        revealItems.forEach((item) => revealObserver.observe(item));
    }

    if (sections.length && navAnchors.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navAnchors.forEach((link) => {
                    const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                    link.classList.toggle('active', isActive);
                });
            });
        }, {
            rootMargin: '-35% 0px -45% 0px',
            threshold: 0
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    if (heroTitle && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        const originalText = heroTitle.textContent.trim();
        heroTitle.textContent = '';

        [...originalText].forEach((char, index) => {
            window.setTimeout(() => {
                heroTitle.textContent += char;
            }, 18 * index);
        });
    }
});
