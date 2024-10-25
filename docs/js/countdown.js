document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    const updateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const current = Number(counter.getAttribute('data-current'));
        const increment = target / 200;

        if (current < target) {
            const newValue = current + increment;
            counter.setAttribute('data-current', newValue);
            counter.innerText = Math.ceil(newValue).toLocaleString('en-US'); 
            setTimeout(() => updateCounter(counter), 10);
        } else {
            counter.innerText = target.toLocaleString('en-US');
        }
    };

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-current', 0); 
                updateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
