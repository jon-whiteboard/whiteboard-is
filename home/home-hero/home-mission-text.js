(() => {
    const container = document.querySelector('.container-large.is-home-mission');
    if (!container) return;
    
    // Create a single timeline for all animations
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top bottom"
        }
    });
    
    // Get all spans across all text elements at once
    const spans = container.querySelectorAll('.home-mission_text span');
    
    spans.forEach((span, index) => {
        const originalText = span.innerText;
        
        const chars = [...originalText].map(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            if (char === ' ') {
                charSpan.style.whiteSpace = 'pre';
            }
            return charSpan;
        });
        
        span.innerHTML = '';
        chars.forEach(char => {
            char.style.display = 'inline-block';
            span.appendChild(char);
        });
        
        gsap.set(chars, {
            yPercent: -101,
            opacity: 0
        });
        
        // Now each span's characters will animate in sequence
        tl.to(chars, {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "quad.out"
        }, index * 0.3);
    });
})();