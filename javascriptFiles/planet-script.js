// Planet-specific JavaScript functionality

class PlanetExplorer {
    constructor() {
        this.currentSection = 0;
        this.sections = [];
        this.soundEnabled = true;
        this.audioContext = null;
        this.init();
    }

    init() {
        this.initAudioContext();
        this.setupPlanetSpecific();
        this.setupEventListeners();
        this.showDoorsAnimation();
        this.createStarfield();
    }

    // Initialize audio context
    initAudioContext() {
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    // Setup planet-specific functionality
    setupPlanetSpecific() {
        // Check if we're on the About page with sections
        const contentSections = document.querySelectorAll('.content-section');
        if (contentSections.length > 0) {
            this.sections = Array.from(contentSections);
            this.setupSectionNavigation();
        }

        // Setup contact form if present
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            this.setupContactForm();
        }

        // Check audio toggle state
        const audioToggle = document.getElementById('audio-toggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => this.toggleSound());
        }
    }

    // Setup section navigation for About page
    setupSectionNavigation() {
        const sectionData = [
            { title: 'PERSONAL INFO', subtitle: 'Mission Commander Details' },
            { title: 'EDUCATION & TRAINING', subtitle: 'Academic Mission Parameters' },
            { title: 'INTERESTS & HOBBIES', subtitle: 'Off-Duty Activities' },
            { title: 'MISSION STATEMENT', subtitle: 'Primary Objectives' }
        ];

        // Update section display
        this.updateSectionDisplay(sectionData);

        // Setup section indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.currentSection = index;
                this.updateSectionDisplay(sectionData);
                this.playSound('click');
            });
        });
    }

    // Update section display
    updateSectionDisplay(sectionData) {
        // Update sections
        this.sections.forEach((section, index) => {
            section.classList.toggle('active', index === this.currentSection);
        });

        // Update indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSection);
        });

        // Update title and subtitle
        const titleElement = document.getElementById('section-title');
        const subtitleElement = document.getElementById('section-subtitle');
        
        if (titleElement && subtitleElement && sectionData[this.currentSection]) {
            titleElement.textContent = sectionData[this.currentSection].title;
            subtitleElement.textContent = sectionData[this.currentSection].subtitle;
        }
    }

    // Navigate between sections
    navigateSection(direction) {
        if (this.sections.length === 0) return;

        this.playSound('click');
        
        if (direction === 'left') {
            this.currentSection = this.currentSection > 0 ? this.currentSection - 1 : this.sections.length - 1;
        } else {
            this.currentSection = this.currentSection < this.sections.length - 1 ? this.currentSection + 1 : 0;
        }

        const sectionData = [
            { title: 'PERSONAL INFO', subtitle: 'Mission Commander Details' },
            { title: 'EDUCATION & TRAINING', subtitle: 'Academic Mission Parameters' },
            { title: 'INTERESTS & HOBBIES', subtitle: 'Off-Duty Activities' },
            { title: 'MISSION STATEMENT', subtitle: 'Primary Objectives' }
        ];

        this.updateSectionDisplay(sectionData);
    }

    // Setup contact form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        const transmitBtn = document.getElementById('transmit-btn');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    // Handle contact form submission
    handleFormSubmit() {
        const transmitBtn = document.getElementById('transmit-btn');
        const btnText = transmitBtn.querySelector('.btn-text');
        const btnIcon = transmitBtn.querySelector('.btn-icon');
        
        // Show transmitting state
        transmitBtn.classList.add('transmitting');
        transmitBtn.disabled = true;
        btnIcon.textContent = '📡';
        btnText.textContent = 'TRANSMITTING...';
        
        this.playSound('planet-entry');
        
        // Simulate transmission
        setTimeout(() => {
            // Show success
            btnIcon.textContent = '✅';
            btnText.textContent = 'TRANSMISSION SUCCESSFUL';
            
            setTimeout(() => {
                // Reset form
                document.getElementById('contact-form').reset();
                transmitBtn.classList.remove('transmitting');
                transmitBtn.disabled = false;
                btnIcon.textContent = '📤';
                btnText.textContent = 'SEND TRANSMISSION';
                
                // Show success message
                this.showTransmissionSuccess();
            }, 2000);
        }, 3000);
    }

    // Show transmission success message
    showTransmissionSuccess() {
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--secondary), var(--primary));
            color: var(--primary-foreground);
            padding: 16px 24px;
            border-radius: 8px;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
            animation: slideInFromRight 0.5s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span>📡</span>
                <div>
                    <div>TRANSMISSION SUCCESSFUL</div>
                    <div style="font-size: 0.75rem; opacity: 0.8;">Message received by Mission Control</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutToRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
        
        // Add animation styles
        if (!document.getElementById('notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideInFromRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutToRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Return to hub button
        const returnBtn = document.getElementById('return-hub');
        if (returnBtn) {
            returnBtn.addEventListener('click', () => this.returnToHub());
        }

        // Section navigation arrows (for About page)
        const exploreLeft = document.getElementById('explore-left');
        const exploreRight = document.getElementById('explore-right');
        
        if (exploreLeft) {
            exploreLeft.addEventListener('click', () => this.navigateSection('left'));
        }
        
        if (exploreRight) {
            exploreRight.addEventListener('click', () => this.navigateSection('right'));
        }

        // Add hover sound effects
        const buttons = document.querySelectorAll('button, .project-link');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => this.playSound('hover'));
        });
    }

    // Return to hub
    returnToHub() {
        this.playSound('door-open');
        this.showSlidingDoors();
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    }

    // Show sliding door animation
    showSlidingDoors() {
        const doors = document.getElementById('sliding-doors');
        doors.classList.remove('open');
        doors.classList.add('active');
        
        setTimeout(() => {
            doors.classList.add('open');
        }, 100);
    }

    // Show doors animation on page load
    showDoorsAnimation() {
        const doors = document.getElementById('sliding-doors');
        
        // Start with doors closed
        setTimeout(() => {
            doors.classList.remove('open');
        }, 100);
        
        // Open doors after a short delay
        setTimeout(() => {
            doors.classList.remove('active');
        }, 1000);
    }

    // Create animated starfield
    createStarfield() {
        const layers = [
            { id: 'starfield-1', count: 100, sizeRange: { min: 1, max: 2 } },
            { id: 'starfield-2', count: 150, sizeRange: { min: 0.5, max: 1.5 } },
            { id: 'starfield-3', count: 200, sizeRange: { min: 0.3, max: 1 } }
        ];

        layers.forEach(layer => {
            const container = document.getElementById(layer.id);
            if (!container) return;
            
            container.innerHTML = '';

            for (let i = 0; i < layer.count; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                
                const size = Math.random() * (layer.sizeRange.max - layer.sizeRange.min) + layer.sizeRange.min;
                star.style.width = size + 'px';
                star.style.height = size + 'px';
                
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 2 + 2) + 's';
                
                container.appendChild(star);
            }
        });
    }

    // Sound effects
    generateTone(frequency, duration, type = 'sine') {
        if (!this.soundEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.warn('Sound generation failed:', error);
        }
    }

    playSound(soundType) {
        if (!this.soundEnabled) return;

        switch (soundType) {
            case 'click':
                this.generateTone(800, 0.1, 'square');
                break;
            case 'door-open':
                this.generateTone(400, 0.3, 'sawtooth');
                setTimeout(() => this.generateTone(600, 0.2, 'sawtooth'), 200);
                break;
            case 'hover':
                this.generateTone(1000, 0.05, 'sine');
                break;
            case 'planet-entry':
                this.generateTone(200, 0.5, 'sine');
                setTimeout(() => this.generateTone(400, 0.3, 'sine'), 300);
                setTimeout(() => this.generateTone(800, 0.2, 'sine'), 600);
                break;
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const audioIcon = document.getElementById('audio-icon');
        if (audioIcon) {
            audioIcon.textContent = this.soundEnabled ? '🔊' : '🔇';
        }
        this.playSound('click');
    }
}

// Initialize planet explorer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PlanetExplorer();
});

// Add additional functionality for skill bars animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    // Reset width
                    progressBar.style.width = '0%';
                    
                    // Animate to target width
                    setTimeout(() => {
                        const targetWidth = progressBar.style.width || progressBar.getAttribute('style').match(/width:\s*(\d+%)/)?.[1] || '0%';
                        progressBar.style.transition = 'width 1.5s ease-out';
                        progressBar.style.width = targetWidth;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe all skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });
});