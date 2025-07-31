document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax scroll effect
    const parallaxElements = document.querySelectorAll('.parallax-section');
    const floatingLogo = document.querySelector('.floating-logo');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateParallax() {
        parallaxElements.forEach(section => {
            const speed = 0.5;
            const rect = section.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (visible) {
                const yOffset = (window.scrollY - rect.top) * speed;
                section.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            }
        });

        // Update floating logo rotation based on scroll
        if (floatingLogo) {
            const rotation = window.scrollY * 0.1;
            floatingLogo.style.transform = `
                rotate3d(1, 1, 1, ${rotation}deg)
                translateY(${Math.sin(window.scrollY * 0.01) * 20}px)
            `;
        }

        // Reveal sections on scroll
        const revealSections = document.querySelectorAll('.section-content, .story-text');
        revealSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visible = rect.top < window.innerHeight * 0.8;
            
            if (visible) {
                section.classList.add('visible');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateParallax();

    // Add scroll indicator
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M6 11l6 6 6-6"/>
            </svg>
        `;
        hero.appendChild(scrollIndicator);
    }

    // Handle navigation opacity
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.opacity = '0.8';
        } else {
            nav.style.opacity = '1';
        }
        lastScroll = currentScroll;
    });
});