const navTimeline = gsap.timeline({ paused: true });
const navCloseTimeline = gsap.timeline({ paused: true });

navTimeline
  .set(".nav-modal", { display: "flex", flexDirection: "column" })
  .to(".nav-modal", {
    opacity: 1,
    duration: 0.1,
    ease: "none",
  })
  .from(".nav_link-text", {
    yPercent: 103,
    duration: 0.5,
    ease: "quad.inOut",
    stagger: 0.08,
  })
  .fromTo(
    ".nav_cta",
    {
      y: window.innerHeight,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "expo.out", 
      stagger: 0.4,
    },
    "<0.2"
  )
  .from(
    ".nav_column",
    {
      x: -window.innerHeight / 1.5,
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
      stagger: 0.04,
    },
    "<0.2"
  );

navCloseTimeline
  .set(".nav_link-text", { yPercent: 0 })
  .to(".nav_link-text", {
    yPercent: -102,
    duration: 0.3,
    ease: "quint.in",
    stagger: 0.08,
  })
  .to(
    ".nav_cta",
    {
      x: window.innerWidth,
      duration: 0.5,
      ease: "quint.in",
      stagger: 0.2,
    },
    "<"
  )
  .to(
    ".nav_column",
    {
      y: window.innerHeight / 1.5,
      opacity: 0,
      duration: 0.4,
      ease: "quint.in",
      stagger: 0.1,
    },
    "<"
  )
  .to(".nav-modal", {
    opacity: 0,
    duration: 0.1,
    ease: "none",
  })
  .set(".nav-modal", { display: "none" });

// Open/close triggers
const menuButton = document.querySelector(".navbar_menu-button");
const closeButton = document.querySelector(".nav-modal_close");
let isNavOpen = false;

menuButton.addEventListener("click", () => {
  if (!isNavOpen) {
    navTimeline.play();
    isNavOpen = true;
  }
});

closeButton.addEventListener("click", () => {
  navCloseTimeline.play().then(() => {
    navTimeline.pause(0);
    navCloseTimeline.pause(0);

    // Reset to initial positions
    gsap.set(".nav_link-text", { yPercent: 103 });
    gsap.set(".nav_cta", { y: window.innerHeight, opacity: 0, x: 0 });
    gsap.set(".nav_column", {
      x: -window.innerHeight / 1.5,
      opacity: 0,
      y: 0,
    });
    gsap.set(".nav-modal", { display: "none", opacity: 0 });
  });
  isNavOpen = false;
});

// Set initial state of nav-modal
gsap.set(".nav-modal", { display: "none", opacity: 0 });
