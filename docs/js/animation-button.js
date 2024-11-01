document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.navbar-nav .nav-link, .scroll-link');

    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = scrollLink.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Usar scrollIntoView con comportamiento suave para todos los dispositivos
                smoothScrollTo(targetElement, 1000); // Ajusta el tiempo según necesites
            }
        });
    });

    // Función de desplazamiento suave
    const smoothScrollTo = (targetElement, duration) => {
        const startPosition = window.scrollY;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
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
