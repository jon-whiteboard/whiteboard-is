const mediaBoard = document.querySelector(".home-mission_media_board");
const mediaItems = document.querySelectorAll(".home-mission_media_item");
const order = [2, 4, 3, 5, 1];
const mediaDelays = [0, 0.1, 0.2, 0.3, 0.4];

const directions = {
  5: { from: "-102%", to: "102%", property: "--after-x" },    // left to right
  3: { from: "-102%", to: "102%", property: "--after-y" },    // top to bottom
  1: { from: "-102%", to: "102%", property: "--after-x" },    // left to right
  2: { from: "102%", to: "-102%", property: "--after-x" },    // right to left
  4: { from: "102%", to: "-102%", property: "--after-y" }     // bottom to top
};

// Set initial states for all items
mediaItems.forEach((item, index) => {
  const itemNumber = order[index];
  const direction = directions[itemNumber];
  
  gsap.set(item, {
    "--before-opacity": "1",
    [direction.property]: direction.from,
    "--after-x": direction.property === "--after-x" ? direction.from : "0%",
    "--after-y": direction.property === "--after-y" ? direction.from : "0%"
  });
});

// Single ScrollTrigger for all animations
ScrollTrigger.create({
  trigger: mediaBoard,
  start: "top 80%",
  once: true,
  onEnter: () => {
    mediaItems.forEach((item, index) => {
      const itemNumber = order[index];
      const direction = directions[itemNumber];
      
      const tl = gsap.timeline();
      
      tl.to(item, {
        duration: 0.4,
        [direction.property]: "0%",
        ease: "power4.in",
        delay: mediaDelays[index]
      })
      .to(item, {
        duration: 0.1,
        "--before-opacity": "0"
      })
      .to(item, {
        duration: 0.4,
        [direction.property]: direction.to,
        ease: "power4.in"
      });
    });
  }
});
