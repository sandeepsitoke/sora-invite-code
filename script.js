// Global variables
let generatedCodes = [];
let stats = {
    totalCodes: 12847,
    activeUsers: 3291,
    videosCreated: 89632
};

// Code generation function
function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    // Generate 6-character code like "7ZDCNP"
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Display the code
    const codeElement = document.getElementById('generated-code');
    const copyBtn = document.getElementById('copy-btn');
    
    // Add loading animation
    codeElement.textContent = 'Generating...';
    codeElement.classList.add('loading');
    copyBtn.disabled = true;
    
    setTimeout(() => {
        codeElement.textContent = result;
        codeElement.classList.remove('loading');
        codeElement.classList.add('fade-in-up');
        copyBtn.disabled = false;
        
        // Update hero code as well
        document.getElementById('hero-code').textContent = result;
        
        // Add to recent codes
        addToRecentCodes(result);
        
        // Update stats
        updateStats();
        
        setTimeout(() => {
            codeElement.classList.remove('fade-in-up');
        }, 600);
    }, 1000);
}

// Copy code to clipboard
function copyCode() {
    const code = document.getElementById('generated-code').textContent;
    
    if (code === 'Click Generate' || code === 'Generating...') {
        return;
    }
    
    navigator.clipboard.writeText(code).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        const copyText = document.getElementById('copy-text');
        
        copyText.textContent = 'Copied! ✓';
        copyBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyText.textContent = 'Copy Code';
            copyBtn.style.background = '#10b981';
        }, 2000);
    });
}

// Add code to recent codes list
function addToRecentCodes(code) {
    const timestamp = new Date();
    generatedCodes.unshift({
        code: code,
        time: timestamp
    });
    
    // Keep only last 12 codes
    if (generatedCodes.length > 12) {
        generatedCodes = generatedCodes.slice(0, 12);
    }
    
    updateRecentCodes();
}

// Update recent codes display
function updateRecentCodes() {
    const container = document.getElementById('recent-codes');
    
    container.innerHTML = generatedCodes.map(item => {
        const timeAgo = getTimeAgo(item.time);
        return `
            <div class="recent-code-item" onclick="copyRecentCode('${item.code}')">
                <div class="recent-code-value">${item.code}</div>
                <div class="recent-code-time">${timeAgo}</div>
            </div>
        `;
    }).join('');
}

// Copy recent code
function copyRecentCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        // Show temporary feedback
        const event = document.querySelector(`[onclick="copyRecentCode('${code}')"]`);
        const originalHTML = event.innerHTML;
        event.innerHTML = '<div class="recent-code-value">Copied! ✓</div><div class="recent-code-time">Success</div>';
        event.style.background = '#10b981';
        event.style.color = 'white';
        
        setTimeout(() => {
            event.innerHTML = originalHTML;
            event.style.background = '';
            event.style.color = '';
        }, 1500);
    });
}

// Get time ago string
function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d ago`;
    }
}

// Update stats with animation
function updateStats() {
    stats.totalCodes += 1;
    stats.activeUsers += Math.floor(Math.random() * 3);
    stats.videosCreated += Math.floor(Math.random() * 10) + 5;
    
    animateNumber('total-codes', stats.totalCodes);
    animateNumber('active-users', stats.activeUsers);
    animateNumber('videos-created', stats.videosCreated);
}

// Animate number changes
function animateNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    const currentNumber = parseInt(element.textContent.replace(/,/g, ''));
    const increment = Math.ceil((targetNumber - currentNumber) / 20);
    
    let current = currentNumber;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
    }, 50);
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize recent codes with some sample data
function initializeRecentCodes() {
    const sampleCodes = ['7ZDCNP', 'M9K2XR', 'P4L8QT', 'N7V3YS', 'R2C9WX', 'K5D8ZM'];
    const now = new Date();
    
    sampleCodes.forEach((code, index) => {
        const codeTime = new Date(now.getTime() - (index * 15 * 60 * 1000)); // 15 minutes apart
        generatedCodes.push({
            code: code,
            time: codeTime
        });
    });
    
    updateRecentCodes();
}

// Auto-refresh recent codes timestamps
function refreshTimestamps() {
    updateRecentCodes();
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-card, .feature-item, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Add floating animation to cards
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.about-card, .recent-code-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sample data
    initializeRecentCodes();
    
    // Setup animations
    setupAnimations();
    addFloatingAnimation();
    
    // Start auto-refresh for timestamps
    setInterval(refreshTimestamps, 60000); // Update every minute
    
    // Auto-update stats occasionally
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 10 seconds
            stats.activeUsers += Math.floor(Math.random() * 2);
            stats.videosCreated += Math.floor(Math.random() * 5) + 1;
            animateNumber('active-users', stats.activeUsers);
            animateNumber('videos-created', stats.videosCreated);
        }
    }, 10000);
    
    // Add keyboard shortcut for code generation
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            generateCode();
        }
    });
    
    // Add some initial animation to the hero
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('fade-in-up');
        document.querySelector('.floating-card').classList.add('fade-in-up');
    }, 500);
});

// Add particle effect (optional)
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add error handling for clipboard API
function copyCodeSafe() {
    const code = document.getElementById('generated-code').textContent;
    
    if (code === 'Click Generate' || code === 'Generating...') {
        return;
    }
    
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        copyCode();
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            const copyText = document.getElementById('copy-text');
            copyText.textContent = 'Copied! ✓';
            setTimeout(() => {
                copyText.textContent = 'Copy Code';
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
            alert('Code: ' + code + '\n\nPlease copy manually.');
        }
        
        textArea.remove();
    }
}

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any dynamic layouts if needed
        addFloatingAnimation();
    }, 250);
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.registerServiceWorker('./sw.js'); // Uncomment if you create a service worker
    });
}