const textItems = document.querySelectorAll(".home-hero_text-item");
const delays = [0, 0.2, 0.4, 0.4, 0.5, 0.7];

textItems.forEach((item, index) => {
  // Set initial states
  gsap.set(item.children, { opacity: 0 }); // Only hide the text content
  gsap.set(item, { "--before-x": "-102%" });

  // First animation - slide curtain in
  gsap.to(item, {
    duration: 0.4,
    "--before-x": "0%",
    delay: delays[index],
    ease: "power4.in",
    onComplete: () => {
      gsap.set(item.children, { opacity: 1 }); // Show the text content
    }
  });

  // Second animation - slide curtain out
  gsap.to(item, {
    duration: 0.4,
    "--before-x": "102%",
    delay: delays[index] + 0.5,
    ease: "power4.in"
  });
});

