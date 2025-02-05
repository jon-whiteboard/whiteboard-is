// Constants for animation settings
const ANIMATION = {
    EASING: {
        ENTER: 'cubic-bezier(0.19, 1, 0.22, 1)',
        EXIT: 'cubic-bezier(0.6, 0, 0.4, 1)'
    },
    DURATION: {
        ENTER: 1000,
        EXIT: 500
    },
    TRANSFORM: {
        INITIAL: 'translateX(-80vw)',
        SHOW: 'translateX(-40vw)',
        EXIT: 'translateX(-20vw)'
    }
};

function createBlurredLinkBackground(link) {
    const navLink = link;
    const linkText = navLink.querySelector('.nav_link-text');
    
    // Ensure nav link has an ID for reference
    if (!navLink.id) {
        navLink.id = 'nav-link-' + Math.random().toString(36).substr(2, 9);
    }

    // Remove any existing blur background
    const existingBg = document.querySelector(`[data-blur-for="${navLink.id}"]`);
    if (existingBg) existingBg.remove();

    const blurContainer = createBlurContainer(navLink.id);
    addBlurredCopies(blurContainer, linkText);

    // Add the blur container as a sibling of .nav_link
    const listItem = navLink.parentElement;
    listItem.style.position = 'relative';
    listItem.insertBefore(blurContainer, navLink);

    // Trigger the animation
    requestAnimationFrame(() => {
        blurContainer.style.transform = ANIMATION.TRANSFORM.SHOW;
        blurContainer.style.opacity = '1';
    });
}

function createBlurContainer(id) {
    const container = document.createElement('div');
    container.className = 'blur-background';
    container.setAttribute('data-blur-for', id);
    container.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        display: flex;
        align-items: center;
        white-space: nowrap;
        TEXT-TRANSFORM: UPPERCASE;
        transform: ${ANIMATION.TRANSFORM.INITIAL};
        opacity: 0;
        transition: transform ${ANIMATION.DURATION.ENTER}ms ${ANIMATION.EASING.ENTER},
                    opacity ${ANIMATION.DURATION.ENTER}ms ${ANIMATION.EASING.ENTER};
    `;
    return container;
}

function addBlurredCopies(container, linkText) {
    const text = linkText.textContent;
    const computedStyle = window.getComputedStyle(linkText);
    
    for (let i = 0; i < 60; i++) {
        const textCopy = document.createElement('div');
        textCopy.textContent = text;
        textCopy.style.cssText = `
            color: rgb(227 224 215);
            filter: blur(4px);
            opacity: 1;
            margin: 0 4px;
            font-size: ${computedStyle.fontSize};
        `;
        container.appendChild(textCopy);
    }
}

function handleMouseLeave(blurBg) {
    if (!blurBg) return;
    
    blurBg.style.transition = `
        transform ${ANIMATION.DURATION.EXIT}ms ${ANIMATION.EASING.EXIT}, 
        opacity ${ANIMATION.DURATION.EXIT}ms ${ANIMATION.EASING.EXIT}
    `;
    blurBg.style.transform = ANIMATION.TRANSFORM.EXIT;
    blurBg.style.opacity = '0';
    
    blurBg.addEventListener('transitionend', () => blurBg.remove(), { once: true });
}

// Initialize nav link hover effects
document.querySelectorAll('.nav_link').forEach(link => {
    link.addEventListener('mouseenter', () => createBlurredLinkBackground(link));
    link.addEventListener('mouseleave', () => {
        const blurBg = document.querySelector(`[data-blur-for="${link.id}"]`);
        handleMouseLeave(blurBg);
    });
});
console.log('link-bg.js loaded');