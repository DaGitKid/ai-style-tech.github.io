document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Parallax Effect
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateParallax() {
        const scrollSections = document.querySelectorAll('.scroll-section');
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        const viewportHeight = window.innerHeight;

        // Update scroll sections
        scrollSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visible = rect.top < viewportHeight * 0.8;
            
            if (visible) {
                section.classList.add('visible');
            }
        });

        // Update parallax backgrounds
        parallaxBgs.forEach(bg => {
            const section = bg.parentElement;
            const rect = section.getBoundingClientRect();
            const scrolled = window.scrollY;
            
            if (rect.top <= viewportHeight && rect.bottom >= 0) {
                const yPos = (rect.top - viewportHeight) * 0.5;
                bg.style.transform = `translate3d(0, ${yPos}px, -10px) scale(2)`;
            }
        });

        // Update story image parallax
        const storyImage = document.querySelector('.story-image-placeholder');
        if (storyImage) {
            const rect = storyImage.getBoundingClientRect();
            const scrolled = window.scrollY;
            const speed = 0.15;
            
            if (rect.top <= viewportHeight && rect.bottom >= 0) {
                const yPos = (rect.top - viewportHeight) * speed;
                const rotation = scrolled * 0.02;
                storyImage.style.transform = `translate3d(0, ${yPos}px, 50px) rotate3d(1, 1, 0, ${rotation}deg)`;
            }
        }

        ticking = false;
    }

    // Smooth scroll for anchor links
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

    // Handle scroll events
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

    // Handle navigation opacity
    const nav = document.querySelector('.sticky-header');
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

    // Initial update
    updateParallax();
});