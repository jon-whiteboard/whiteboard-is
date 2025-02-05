document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.home-work_track');
    const block = document.querySelector('.section_home-work');
    const items = block.querySelectorAll('[data-bento-item]');
    const triggers = track.querySelectorAll('[data-trigger]');

    // Create ScrollTrigger for pinning
    ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        pin: block,
        pinSpacing: true,
    });

    // Set initial states - start on opposite side of movement direction
    items.forEach(item => {
        const element = item.querySelector('[data-bento-element]');
        const direction = item.getAttribute('data-bento-direction');
        
        if (element) {
            gsap.set(item, {
                overflow: 'hidden'
            });
            
            // Start position based on movement direction
            gsap.set(element, { 
                autoAlpha: 1,
                xPercent: direction === 'left' ? 100 : 
                         direction === 'right' ? -100 : 0,
                yPercent: direction === 'up' ? 100 : 
                         direction === 'down' ? -100 : 0
            });
        }

        // Set initial cover positions
        const cover = item.querySelector('[data-bento-cover]');
        if (cover) {
            gsap.set(cover, {
                xPercent: direction === 'left' ? 100 : 
                         direction === 'right' ? -100 : 0,
                yPercent: direction === 'up' ? 100 : 
                         direction === 'down' ? -100 : 0
            });
        }
    });

    // Create cover reveal timeline
    const coverTl = gsap.timeline({
        scrollTrigger: {
            trigger: block,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    // Add cover animations
    items.forEach((item) => {
        const cover = item.querySelector('[data-bento-cover]');
        const direction = item.getAttribute('data-bento-direction');
        const delay = item.getAttribute('data-bento-delay');

        if (cover) {
            // Step 1: Start position (already set in initial states)
            // Step 2: Move to view
            coverTl.to(cover, {
                xPercent: 0,
                yPercent: 0,
                duration: 0.3,
                ease: 'power2.out'
            }, delay)
            // Step 3: Pause
            .to(cover, {
                duration: 0.1
            }, `${delay}+=0.3`)
            // Step 4: Move out of view
            .to(cover, {
                xPercent: direction === 'left' ? -100 : 
                         direction === 'right' ? 100 : 0,
                yPercent: direction === 'up' ? -100 : 
                         direction === 'down' ? 100 : 0,
                duration: 0.3,
                ease: 'power2.in'
            }, `${delay}+=0.4`);
        }
    });

    // Create individual element animations
    items.forEach((item) => {
        const element = item.querySelector('[data-bento-element]');
        const direction = item.getAttribute('data-bento-direction');
        
        // Find all triggers that come after and including this item's trigger
        const itemTriggers = Array.from(triggers).filter((_, index) => {
            const currentTrigger = triggers[index];
            return currentTrigger.getAttribute('data-trigger') === item.getAttribute('data-bento-item') ||
                   index > Array.from(triggers).findIndex(t => 
                       t.getAttribute('data-trigger') === item.getAttribute('data-bento-item')
                   );
        });

        if (!element || !itemTriggers.length) return;

        // Create a timeline for sequential animations
        const tl = gsap.timeline({ paused: true });

        // Force initial state
        gsap.set(element, {
            xPercent: direction === 'left' ? 100 : 
                     direction === 'right' ? -100 : 0,
            yPercent: direction === 'up' ? 100 : 
                     direction === 'down' ? -100 : 0
        });

        // Create animations for each relevant trigger
        itemTriggers.forEach((trigger, index) => {
            const moveAmount = index * 100;  // 0, 100, 200, 300...

            tl.to(element, {
                xPercent: direction === 'left' ? -moveAmount : 
                         direction === 'right' ? moveAmount : 0,
                yPercent: direction === 'up' ? -moveAmount : 
                         direction === 'down' ? moveAmount : 0,
                duration: 1,
                ease: 'power4.inOut',
            });

            // Create ScrollTrigger for this part of the timeline
            ScrollTrigger.create({
                trigger: trigger,
                start: 'top center',
                end: 'bottom center',
                animation: tl.tweenFromTo(index, index + 1),
                toggleActions: 'play none none reverse'
            });
        });
    });
});