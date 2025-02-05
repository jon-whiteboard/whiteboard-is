class Cursor {
    constructor() {
        // Core elements
        this.cursor = document.querySelector('.cursor');
        this.dot = document.querySelector('.cursor-dot');
        this.bg = document.querySelector('.cursor-bg');
        this.clickBg = document.querySelector('.cursor-click-bg');

        // Position tracking
        this.mousePos = { x: 0, y: 0 };
        this.dotPos = { x: 0, y: 0 };
        this.bgPos = { x: 0, y: 0 };

        // Animation speeds
        this.speeds = {
            dot: 0.3,
            bg: 0.2
        };

        // Set initial opacity
        this.bg.style.opacity = '0.5';

        this.init();
    }

    init() {
        // Set up event listeners
        window.addEventListener('mousemove', (e) => this.updateMousePosition(e));
        
        // Add hover listeners for links and buttons
        const hoverElements = document.querySelectorAll('a, button');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.onElementEnter());
            element.addEventListener('mouseleave', () => this.onElementLeave());
        });

        // Add click handler
        document.addEventListener('click', (e) => this.handleClick(e));

        // Start animation loop
        this.animate();
    }

    updateMousePosition(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        // Update cursor and click background position immediately
        gsap.set([this.dot, this.clickBg], {
            x: this.mousePos.x,
            y: this.mousePos.y
        });
    }

    animate() {
        gsap.to({}, {
            duration: 0.01,
            repeat: -1,
            onRepeat: () => {
                // Update bg position with delay
                this.bgPos.x += (this.mousePos.x - this.bgPos.x) * this.speeds.bg;
                this.bgPos.y += (this.mousePos.y - this.bgPos.y) * this.speeds.bg;
                
                // Apply position
                gsap.set(this.bg, {
                    x: this.bgPos.x,
                    y: this.bgPos.y
                });
            }
        });
    }

    onElementEnter() {
        this.cursor.classList.add('active');
    }

    onElementLeave() {
        this.cursor.classList.remove('active');
    }

    handleClick(e) {
        if (e.target.matches('a, button')) {
            gsap.fromTo(
                this.clickBg,
                { scale: 0, opacity: 0.3 },
                { scale: 2.5, opacity: 0, duration: 0.5, ease: "quad.out" }
            );
        }
    }
}

// Initialize cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Cursor();
});
