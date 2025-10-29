document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) navbarToggler.click();
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => { if (pageYOffset >= (section.offsetTop - 100)) current = section.getAttribute('id'); });
        navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${current}`) link.classList.add('active'); });
    });

    const skillBars = document.querySelectorAll('.progress-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const w = bar.style.width || bar.getAttribute('aria-valuenow') + '%';
                bar.style.width = '0';
                setTimeout(() => bar.style.width = w, 120);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
    skillBars.forEach(bar => skillObserver.observe(bar));

    const cards = document.querySelectorAll('.glass-effect, .portfolio-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 20; const rotateY = (rect.width / 2 - x) / 20;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', function() { this.style.transform = ''; });
    });

    const fadeInElements = document.querySelectorAll('.glass-effect, .portfolio-card, .service-item');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => { if (entry.isIntersecting) { setTimeout(() => { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }, index * 100); fadeInObserver.unobserve(entry.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    fadeInElements.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; fadeInObserver.observe(el); });

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        const heroContent = document.querySelector('.text-content');
        if (heroContent) { heroContent.style.opacity = '0'; setTimeout(() => { heroContent.style.transition = 'opacity 1s ease'; heroContent.style.opacity = '1'; }, 100); }
    });
});
