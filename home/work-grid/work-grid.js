// Constants for animation
const TILT_RANGE = 15; // Maximum rotation degrees
const SCATTER_RANGE = 300; // Increased for better spread
const TRANSITION_DURATION = 400; // ms

class WorkGrid {
  constructor() {
    this.container = document.querySelector('.section_home-work-grid');
    this.items = document.querySelectorAll('.home-work-grid_item');
    this.sectionBounds = null;
    
    this.init();
  }

  init() {
    // Initial setup
    this.items.forEach(item => {
      const imageList = item.querySelector('.home-work-grid_image-list');
      const images = imageList.querySelectorAll('.home-work-grid_image');
      
      // Hide images initially
      imageList.style.opacity = '0';
      imageList.style.position = 'absolute';
      imageList.style.width = '100%';
      imageList.style.height = '100%';
      
      // Set up hover listeners
      item.addEventListener('mouseenter', () => this.showImages(item, images));
      item.addEventListener('mouseleave', () => this.hideImages(item, images));
    });

    // Update bounds on resize
    window.addEventListener('resize', () => {
      this.updateSectionBounds();
    });
    this.updateSectionBounds();
  }

  updateSectionBounds() {
    this.sectionBounds = this.container.getBoundingClientRect();
  }

  getRandomPosition(itemBounds, imageBounds) {
    const padding = 20; // Minimum distance from edges
    
    // Get section's position relative to viewport
    const sectionRect = this.container.getBoundingClientRect();
    
    // Calculate item's position relative to the section
    const itemRelativeLeft = itemBounds.left - sectionRect.left;
    const itemRelativeTop = itemBounds.top - sectionRect.top;
    
    // Generate random offset from center of item
    let x = (Math.random() - 0.5) * SCATTER_RANGE;
    let y = (Math.random() - 0.5) * SCATTER_RANGE;
    
    // Calculate center position relative to the section
    const centerX = itemRelativeLeft + (itemBounds.width / 2) - (imageBounds.width / 2);
    const centerY = itemRelativeTop + (itemBounds.height / 2) - (imageBounds.height / 2);
    
    // Add offset to center position
    x += centerX;
    y += centerY;
    
    // Clamp values to keep within section bounds
    x = Math.max(padding, Math.min(x, sectionRect.width - imageBounds.width - padding));
    y = Math.max(padding, Math.min(y, sectionRect.height - imageBounds.height - padding));
    
    return { x, y };
  }

  showImages(item, images) {
    const imageList = item.querySelector('.home-work-grid_image-list');
    const itemBounds = item.getBoundingClientRect();
    
    // Show the image container
    imageList.style.opacity = '1';
    
    // Position each image randomly with delay
    images.forEach((img, index) => {
      const imageBounds = img.getBoundingClientRect();
      const { x, y } = this.getRandomPosition(itemBounds, imageBounds);
      const rotation = (Math.random() - 0.5) * TILT_RANGE;
      
      // Add slight delay between each image
      const delay = index * 50;
      
      img.style.transition = `all ${TRANSITION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`;
      img.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      img.style.opacity = '1';
    });
  }

  hideImages(item, images) {
    const imageList = item.querySelector('.home-work-grid_image-list');
    
    images.forEach(img => {
      img.style.transition = `all ${TRANSITION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
      img.style.transform = 'translate(0, 0) rotate(0deg)';
      img.style.opacity = '0';
    });
    
    // Hide the container after transition
    setTimeout(() => {
      imageList.style.opacity = '0';
    }, TRANSITION_DURATION);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WorkGrid();
});
