document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Selecciona todos los enlaces de la navbar

    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const targetId = scrollLink.getAttribute('href'); // Obtiene el ID de la sección objetivo
            const targetElement = document.querySelector(targetId); // Selecciona el elemento objetivo
            
            if (targetElement) {
                smoothScrollTo(targetElement); // Inicia el desplazamiento suave
            }
        });
    });

    const smoothScrollTo = (targetElement) => {
        const startPosition = window.scrollY; // Posición de inicio
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition; // Posición objetivo
        const distance = targetPosition - startPosition; // Distancia a recorrer
        const duration = 1000; // Duración total en ms (ajusta este valor para cambiar la velocidad)
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime; // Establece el tiempo de inicio
            const timeElapsed = currentTime - startTime; // Tiempo transcurrido
            const progress = Math.min(timeElapsed / duration, 1); // Proporción del tiempo transcurrido
            
            // Usamos una función de easing más suave para el desplazamiento
            const ease = easeOutCubic(progress); // Cambiado a easeOutCubic
            
            // Realiza el desplazamiento
            window.scrollTo(0, startPosition + (distance * ease)); 

            // Detener la animación de forma limpia
            if (progress < 1) {
                requestAnimationFrame(animation); // Solicita el siguiente cuadro de animación
            }
        };

        // Función de desaceleración cúbica
        const easeOutCubic = (t) => {
            return 1 - Math.pow(1 - t, 3); // Desaceleración suave
        };

        requestAnimationFrame(animation); // Inicia la animación
    };
});
