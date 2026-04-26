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
function initHamburger() {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  // When the hamburger button is clicked...
  hamburger.addEventListener('click', function () {
    // Toggle the "open" class on the mobile nav list
    // "open" class makes it visible (see styles.css .mobile-nav.open)
    mobileNav.classList.toggle('open');
  });
}
/*info*/
function closeMobileNav() {
  var mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.remove('open');
}

/*info*/
function toggleAccordion(itemId) {
  // Find the clicked accordion item by its id
  var clickedItem = document.getElementById(itemId);

  // Check if this item is already open
  var isOpen = clickedItem.classList.contains('open');

  // Close ALL accordion items first
  // (this ensures only one is open at a time)
  var allItems = document.querySelectorAll('.accordion-item');
  allItems.forEach(function (item) {
    item.classList.remove('open');

    // Update the aria-expanded attribute for accessibility
    // (screen readers use this to know if the dropdown is open)
    var header = item.querySelector('.accordion-header');
    if (header) {
      header.setAttribute('aria-expanded', 'false');
    }
  });

  // If the item was NOT already open, open it now
  // (If it WAS open, it's now closed — clicking an open item closes it)
  if (!isOpen) {
    clickedItem.classList.add('open');

    // Update accessibility attribute
    var header = clickedItem.querySelector('.accordion-header');
    if (header) {
      header.setAttribute('aria-expanded', 'true');
    }

    // Smooth scroll so the opened item is visible in the viewport
    // with a short delay to let the animation start first
    setTimeout(function () {
      clickedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

/*info*/
function handleFormSubmit(event) {
  // Prevent the page from reloading (default form behavior)
  event.preventDefault();

  // Get references to the form and success message elements
  var form = document.getElementById('contactForm');
  var successMessage = document.getElementById('formSuccess');
  var submitButton = form.querySelector('button[type="submit"]');

  // Show a loading state on the button while "sending"
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Simulate a brief delay (as if sending to a server)
  // In a real app, you would make an API call here
  setTimeout(function () {

    // Show the success message
    successMessage.classList.add('visible');

    // Reset the form fields back to empty
    form.reset();

    // Reset the button back to its original text
    submitButton.textContent = 'Send Message';
    submitButton.disabled = false;

    // Hide the success message after 6 seconds
    setTimeout(function () {
      successMessage.classList.remove('visible');
    }, 6000);

  }, 1200); // 1.2 second simulated delay
}
/**/