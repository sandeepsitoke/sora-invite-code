// Quick Indexing Helper Script
// This script helps with rapid search engine indexing

document.addEventListener('DOMContentLoaded', function() {
    // Send ping to search engines for faster indexing
    if (typeof fetch !== 'undefined') {
        // Ping Google for indexing (this is just a placeholder - actual submission requires Search Console)
        setTimeout(() => {
            // Create invisible iframe for potential crawling triggers
            const frame = document.createElement('iframe');
            frame.style.display = 'none';
            frame.src = 'about:blank';
            document.body.appendChild(frame);
            
            // Send analytics ping
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load', {
                    'page_title': document.title,
                    'page_location': window.location.href
                });
            }
        }, 1000);
    }
    
    // Create JSON-LD for immediate structured data availability
    const jsonLD = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": document.title,
        "description": document.querySelector('meta[name="description"]').content,
        "url": window.location.href,
        "dateModified": new Date().toISOString(),
        "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Sora 2 Invite Code Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any"
        }
    };
    
    // Add to page if not already present
    if (!document.querySelector('script[type="application/ld+json"]')) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLD);
        document.head.appendChild(script);
    }
});

// Enhanced service worker registration for better caching
if ('serviceWorker' in navigator && 'caches' in window) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}