document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('is-open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // Selects elements that need to animate on scroll
    const animatedElements = document.querySelectorAll('.reveal-fade, .reveal-text, .reveal-image');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Triggers slightly before element enters viewport
        threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // Trigger hero animations immediately on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .reveal-fade, .hero .reveal-text, .hero .reveal-image');
        heroElements.forEach(el => el.classList.add('is-visible'));
    }, 100);

    // 3. FAQ ACCORDION LOGIC
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            const icon = trigger.querySelector('.accordion-icon');
            
            // Close other panels (Optional: remove if you want multiple open)
            document.querySelectorAll('.accordion-panel').forEach(p => {
                if (p !== panel) {
                    p.style.maxHeight = null;
                    p.previousElementSibling.querySelector('.accordion-icon').textContent = '+';
                }
            });

            // Toggle current panel
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                icon.textContent = '−'; // Minus sign
            }
        });
    });

    // 4. DEMO FORM VALIDATION
    const form = document.getElementById('demo-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');

            // Basic validation
            inputs.forEach(input => {
                const group = input.parentElement;
                if (!input.value.trim()) {
                    group.classList.add('invalid');
                    isValid = false;
                } else {
                    group.classList.remove('invalid');
                }
                
                // Email specific validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        group.classList.add('invalid');
                        isValid = false;
                    }
                }
            });

            // If valid, show demo success message
            if (isValid) {
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Reset after 6 seconds for demo purposes
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'flex';
                    successMessage.classList.add('hidden');
                }, 6000);
            }
        });

        // Remove error state on input
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('invalid');
            });
        });
    }
});