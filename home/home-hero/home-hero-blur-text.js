// Select the elements with the class "home-hero_blur-text"
const blurTextElements = document.querySelectorAll(".home-hero_blur-text p");

// Function to split text into individual characters wrapped in span elements
function splitText(element) {
    const text = element.textContent;
    const chars = text.split('');
    element.innerHTML = ''; // Clear the original text
    chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        element.appendChild(span);
    });
}

// Apply the splitTextIntoSpans function to each selected element
blurTextElements.forEach(splitText);

// Select all the newly created span elements
const chars = document.querySelectorAll(".home-hero_blur-text span");

// Animate each character using GSAP
chars.forEach(char => {
    gsap.from(char, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        delay: Math.random() * 0.75
    });
});