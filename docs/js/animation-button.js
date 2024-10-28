document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.navbar-nav .nav-link, .scroll-link');

    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = scrollLink.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                
                if (window.innerWidth > 991) {
                    smoothScrollTo(targetElement);
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const smoothScrollTo = (targetElement) => {
        const startPosition = window.scrollY;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeOutCubic(progress);
            window.scrollTo(0, startPosition + (distance * ease));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        const easeOutCubic = (t) => {
            return 1 - Math.pow(1 - t, 3);
        };

        requestAnimationFrame(animation);
    };
});
