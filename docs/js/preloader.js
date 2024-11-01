const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    
    const criticalResourcesLoaded = entries.every(entry => entry.duration < 3000);
    
    if (criticalResourcesLoaded) {
        document.body.classList.add('loaded');
        observer.disconnect();
    }
});

observer.observe({ entryTypes: ["resource"] });

