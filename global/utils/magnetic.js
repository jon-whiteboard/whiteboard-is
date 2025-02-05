function magnetic(defaultForce = 10) {
    return {
        force: defaultForce,
        duration: 0.3,
        ease: "power1.out",

        init() {
            this.force = defaultForce;
            this.initElements();
        },

        initElements() {
            // Find all elements with data-magnetic attribute
            document.querySelectorAll('[data-magnetic]').forEach(element => {
                const target = element.dataset.magneticTarget ? 
                    element.querySelector(element.dataset.magneticTarget) : 
                    element;
                
                const intensity = element.dataset.magneticIntensity || this.force;

                element.addEventListener('mousemove', (e) => {
                    this.magnetize(e, element, target, intensity);
                });

                element.addEventListener('mouseleave', () => {
                    this.demagnetize(target);
                });
            });
        },

        magnetize(event, element, target, customForce) {
            // Skip if touch device (you can add touch detection if needed)
            const bounds = element.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            if (customForce) {
                this.force = customForce;
            }

            gsap.to(target, {
                x: (x - bounds.width / 2) / bounds.width * this.force,
                y: (y - bounds.height / 2) / bounds.height * this.force,
                duration: this.duration,
                transformOrigin: "center",
                ease: this.ease
            });
        },

        demagnetize(target) {
            gsap.to(target, {
                x: 0,
                y: 0,
                duration: this.duration,
                ease: this.ease
            });
        }
    }
}

// Initialize magnetic effect
const magneticEffect = magnetic();
magneticEffect.init();