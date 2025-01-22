document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#carousel-test');
    const videos = carousel.querySelectorAll('video');

    // Detecta cuando se reproduce un video en el carrusel
    videos.forEach((video) => {
        video.addEventListener('ended', () => {
            // Después de que un video termine, mueve al siguiente slide con un retraso de 1 segundo
            const nextSlide = video.closest('.carousel-item').nextElementSibling;
            if (nextSlide) {
                const nextVideo = nextSlide.querySelector('video');
                if (nextVideo) {
                    // Usa setTimeout para esperar 1 segundo antes de iniciar el siguiente video
                    setTimeout(() => {
                        nextSlide.classList.add('active'); // Activa el siguiente slide
                        nextVideo.play(); // Reproduce el siguiente video
                    }, 1000); // 1000 ms = 1 segundo de retraso
                }
            }
        });
    });

    // Escucha el evento de cambio de slide
    carousel.addEventListener('slid.bs.carousel', () => {
        // Pausa todos los videos cuando cambia el slide
        videos.forEach((video) => video.pause());
        
        // Reinicia el video en el slide activo
        const activeVideo = carousel.querySelector('.carousel-item.active video');
        if (activeVideo) {
            activeVideo.currentTime = 0;
            activeVideo.play();
        }
    });

    // Solo ejecuta el código de visibilidad en dispositivos móviles (móviles y tabletas)
    if (window.innerWidth <= 768) { // Definimos 768px como límite para móviles y tabletas
        // Detecta cuando la visibilidad de la página cambia
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Si la página pierde visibilidad, pausa todos los videos
                videos.forEach((video) => video.pause());
            }
        });
    }

    // Configura IntersectionObserver para pausar los videos que no estén en el viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (video) {
                if (!entry.isIntersecting) {
                    // Si el video ya no está en el viewport, lo pausa
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.5 // Define que el 50% del video debe estar visible para que se reproduzca
    });

    // Observar todos los videos del carrusel
    const videoContainers = carousel.querySelectorAll('.carousel-item');
    videoContainers.forEach(container => observer.observe(container));
});
