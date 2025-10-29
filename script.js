// Age verification moved from inline to external script.
// A small blocking <style id="__age_block_style"> is added in the head of index.html
// so the page stays hidden until this runs and removes that style on success.
(function(){
    var minAge = 17;
    var blk = document.getElementById('__age_block_style');
    // prompt immediately when script loads
    try {
        var raw = window.prompt('Verifikasi umur: Silakan masukkan usia Anda (tahun).');
    } catch(e) { raw = null; }
    if (raw === null) {
        var denyMsg = 'Verifikasi dibatalkan. Anda harus berusia setidaknya '+minAge+' tahun untuk melihat situs ini.';
        var denyHtml = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Akses Ditolak</title>' +
            '<style>html,body{height:100vh;overflow:hidden;margin:0}body{background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial,Helvetica,sans-serif;text-align:center;padding:2rem} .deny-card{max-width:640px} .deny-actions{margin-top:1.25rem;display:flex;gap:0.5rem;justify-content:center} .btn{background:#fff;color:#000;padding:0.5rem 1rem;border-radius:6px;border:none;cursor:pointer} .btn.secondary{background:transparent;border:1px solid #fff;color:#fff}</style>' +
            '</head><body><div class="deny-card"><h2>Akses Ditolak</h2><p>'+denyMsg+'</p><div class="deny-actions"><button class="btn" onclick="location.reload()">Coba Lagi</button><button class="btn secondary" onclick="window.location.href=\'about:blank\'">Keluar</button></div></div></body></html>';
        document.open(); document.write(denyHtml); document.close();
        return;
    }
    var age = parseInt(raw, 10);
    if (isNaN(age) || age < minAge) {
        alert('Maaf, Anda tidak memenuhi batas usia untuk mengakses situs ini.');
        var denyMsg2 = 'Umur Anda tidak cukup untuk mengakses situs ini. Batas minimal adalah '+minAge+' tahun.';
        var denyHtml2 = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Akses Ditolak</title>' +
            '<style>html,body{height:100vh;overflow:hidden;margin:0}body{background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial,Helvetica,sans-serif;text-align:center;padding:2rem}.deny-card{max-width:640px}.deny-actions{margin-top:1.25rem;display:flex;gap:0.5rem;justify-content:center}.btn{background:#fff;color:#000;padding:0.5rem 1rem;border-radius:6px;border:none;cursor:pointer}.btn.secondary{background:transparent;border:1px solid #fff;color:#fff}</style>' +
            '</head><body><div class="deny-card"><h2>Akses Ditolak</h2><p>'+denyMsg2+'</p><div class="deny-actions"><button class="btn" onclick="location.reload()">Coba Lagi</button><button class="btn secondary" onclick="window.location.href=\'about:blank\'">Keluar</button></div></div></body></html>';
        document.open(); document.write(denyHtml2); document.close();
        return;
    }
    // success -> remove blocking style to reveal page
    if (blk && blk.parentNode) blk.parentNode.removeChild(blk);
})();

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

    const fadeInElements = document.querySelectorAll('.glass-effect, .portfolio-card');
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
