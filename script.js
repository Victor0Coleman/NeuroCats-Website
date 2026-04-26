/* Adds CSS style to the website by linking to index.html
    * @author Victor Coleman
***************************************************************************
    SCRIPT.JS- All the interactive elements behavior for the website.
***************************************************************************   
   What this file controls:
        1. The sticky navbar (shrinks when you scroll)
        2. The hamburger menu (mobile navigation toggle)
        3. The photo slideshow (arrows, dots, auto-advance)
        4. The accordion dropdowns in the Support section
        5. The contact form submission handling
        6. Scroll-based fade-in animations for sections
***************************************************************************
    How this Script.js file works:
        • It listens for user interactions (scrolling, clicking) and 
            updates the DOM accordingly.
        • It uses event listeners to trigger animations and transitions,
             enhancing the user experience.
        • It runs after the HTML has fully loaded which can be found in
             the DomContentLoaded event.
        • Functions called by HTML elements via onclick = "functionName()".
    */
document.addEventListener('DOMContentLoaded', function () {

  // Start all features (Sets up all event listeners and observers)
  initNavbarScroll();     // Makes the navbar shrink when scrolled
  initHamburger();        // Sets up the mobile menu toggle
  initSlideshow();        // Sets up the photo slideshow
  initScrollAnimations(); // Fades in sections as user scrolls down
});   

/* Total number of slides — update if you add/remove slides */
var SLIDE_COUNT = 6;

/* Labels shown below the dots for each slide (index must match HTML) */
var SLIDE_LABELS = [
  'Community Event',
  'Individual Support',
  'Group Support',
  'Social Engagement',
  'Work shops',
  'Professional Development'
];

/* Track current showing Slide (starts at 0) */
var currentSlide = 0;

/* Holds reference to auto-shift timer */
var slideshowTimer = null;
/*info*/
function initSlideshow() {
  /* Creates dot indicators dynamically to match each slide */
  buildSlideshowDots();
  /* Start the auto-shifter: moves to next slide every 4 seconds */
  startSlideshowTimer();
}
/*info*/
function initNavbarScroll() {
  var navbar = document.getElementById('navbar');

  // Listen for scroll events on the window
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      // User has scrolled down — add the "scrolled" style class
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
    } else {
      // User is at the top — remove extra shadow
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    }
  });
}
/*info*/
/*info*/
/*info*/
/*info*/