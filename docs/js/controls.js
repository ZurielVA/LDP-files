document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#carousel-test');
    const videos = carousel.querySelectorAll('video');
    const indicators = carousel.querySelectorAll('.carousel-indicators button');

    function updateActiveIndicator(index) {
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }

    carousel.addEventListener('slid.bs.carousel', () => {
        videos.forEach((video) => video.pause());
        
        const activeVideo = carousel.querySelector('.carousel-item.active video');
        if (activeVideo) {
            activeVideo.currentTime = 0;
            activeVideo.play();
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            carousel.querySelector('.carousel-item.active').classList.remove('active'); 
            const targetSlide = carousel.querySelector(`.carousel-item:nth-child(${index + 1})`);
            targetSlide.classList.add('active');
            updateActiveIndicator(index);

            videos.forEach((video) => video.pause());
            const activeVideo = targetSlide.querySelector('video');
            if (activeVideo) {
                activeVideo.currentTime = 0; 
                activeVideo.play(); 
            }
        });
    });

    if (window.innerWidth <= 768) { 
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                videos.forEach((video) => video.pause());
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (video) {
                if (!entry.isIntersecting) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.5 
    });

    const videoContainers = carousel.querySelectorAll('.carousel-item');
    videoContainers.forEach(container => observer.observe(container));
});
