// Space Portfolio JavaScript

class SpacePortfolio {
    constructor() {
        this.soundEnabled = true;
        this.audioContext = null;
        this.init();
    }

    init() {
        this.createStarfield();
        this.setupEventListeners();
        this.initAudioContext();
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

    // Setup event listeners
    setupEventListeners() {
        // Audio toggle
        const audioToggle = document.getElementById('audio-toggle');
        audioToggle.addEventListener('click', () => this.toggleSound());

        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const planet = e.currentTarget.dataset.planet;
                this.navigateToPlanet(planet);
            });
        });

        // Side navigation arrows
        document.getElementById('look-left').addEventListener('click', () => this.handleSideAction('lookLeft'));
        document.getElementById('look-right').addEventListener('click', () => this.handleSideAction('lookRight'));
        document.getElementById('return-hub').addEventListener('click', () => this.handleSideAction('returnToHub'));
        document.getElementById('scan-planet').addEventListener('click', () => this.handleSideAction('scanPlanet'));

        // Mobile controls
        document.getElementById('mobile-left').addEventListener('click', () => this.handleSideAction('lookLeft'));
        document.getElementById('mobile-right').addEventListener('click', () => this.handleSideAction('lookRight'));
        document.getElementById('mobile-hub').addEventListener('click', () => this.handleSideAction('returnToHub'));
        document.getElementById('mobile-scan').addEventListener('click', () => this.handleSideAction('scanPlanet'));

        // Add ripple effect to navigation buttons
        navButtons.forEach(button => {
            button.addEventListener('click', this.createRipple);
        });
    }

    // Initialize audio context for sound effects
    initAudioContext() {
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    // Generate sound effects
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

    // Play different sound effects
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

    // Toggle sound on/off
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const audioIcon = document.getElementById('audio-icon');
        audioIcon.textContent = this.soundEnabled ? '🔊' : '🔇';
        this.playSound('click');
    }

    // Navigate to different planets
    navigateToPlanet(planet) {
        this.playSound('click');
        console.log(`Navigating to ${planet} planet...`);
        
        // Show sliding doors
        this.showSlidingDoors();
        
        // After door animation, navigate to the planet page
        setTimeout(() => {
            window.location.href = `${planet}.html`;
        }, 800);
    }

    // Show sliding door animation
    showSlidingDoors() {
        const doors = document.getElementById('sliding-doors');
        doors.classList.add('active');
        
        setTimeout(() => {
            doors.classList.add('open');
            this.playSound('door-open');
        }, 100);
        
        // Hide doors after animation
        setTimeout(() => {
            doors.classList.remove('active', 'open');
        }, 1500);
    }

    // Handle side navigation actions
    handleSideAction(action) {
        this.playSound('click');
        console.log(`Side action: ${action}`);
        
        switch (action) {
            case 'lookLeft':
                console.log('Looking left...');
                break;
            case 'lookRight':
                console.log('Looking right...');
                break;
            case 'returnToHub':
                console.log('Returning to hub...');
                // Could add logic to return to main view
                break;
            case 'scanPlanet':
                console.log('Scanning planet...');
                break;
        }
    }

    // Create ripple effect on button click
    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.1)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the space portfolio when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SpacePortfolio();
});

// Add hover sound effects
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new SpacePortfolio();
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.nav-button, .side-arrow, .audio-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            portfolio.playSound('hover');
        });
    });
});