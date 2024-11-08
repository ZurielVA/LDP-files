window.addEventListener('load', () => {
    const body = document.querySelector('body');
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
        body.classList.add('no-scroll'); 

        setTimeout(() => {
            body.classList.add('loaded');
            body.classList.remove('no-scroll'); 
            localStorage.setItem('hasVisited', 'true');
        }, 2000); 
    } else {
        body.classList.add('loaded');
    }
});