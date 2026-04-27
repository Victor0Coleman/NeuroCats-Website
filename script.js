/* Adds CSS style to the website by linking to index.html
    * @author Victor Coleman
============================================================================
    SCRIPT.JS- All the interactive elements behavior for the website.
============================================================================
   What this file controls:
        1. The sticky navbar (shrinks when you scroll)
        2. The hamburger menu (mobile navigation toggle)
        3. The photo slideshow (arrows, dots, auto-advance)
        4. The accordion dropdowns in the Support section
        5. The contact form submission handling
        6. Scroll-based fade-in animations for sections
============================================================================
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
/*
 Horizontal slide animation:
    Move the slides-row left by (newSlide * 100%)
*/
function initSlideshow() {
  /* Creates dot indicators dynamically to match each slide */
  buildSlideshowDots();
  /* Start the auto-shifter: moves to next slide every 4 seconds */
  startSlideshowTimer();
}

/* Creates one dot button per slide inside #slideshowDots */
function buildSlideshowDots() {
  var dotsContainer = document.getElementById('slideshowDots');
  if (!dotsContainer) return; // Safety check

  dotsContainer.innerHTML = ''; // Clear any existing dots

  for (var i = 0; i < SLIDE_COUNT; i++) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' dot-active' : ''); // First dot is active
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ': ' + SLIDE_LABELS[i]);

    /* Each dot captures its own index (i) via closure */
    (function(index) {
      dot.addEventListener('click', function () {
        goToSlide(index);
      });
    })(i);

    dotsContainer.appendChild(dot);
  }
}

/* Moves the slideshow to a specific slide index */
function goToSlide(index) {
  /* Wrap around: if index < 0 go to last; if index >= count go to first */
  var newSlide = (index + SLIDE_COUNT) % SLIDE_COUNT;

  /*
    Horizontal slide animation:
    Move the slides-row left by (newSlide * 100%).
    Because each slide is 100% wide, this puts the correct slide in view.
    The CSS transition property on .slides-row makes the movement smooth.
  */
  var slidesRow = document.getElementById('slidesRow');
  if (slidesRow) {
    slidesRow.style.transform = 'translateX(-' + (newSlide * 100) + '%)';
  }

  /* Update the dot indicators — active dot gets the dot-active class */
  var dots = document.querySelectorAll('.dot');
  dots.forEach(function(dot, i) {
    dot.classList.toggle('dot-active', i === newSlide);
  });

  /* Update the slide label text below the dots */
  var label = document.getElementById('slideLabel');
  if (label) label.textContent = SLIDE_LABELS[newSlide];

  /* Save the new current index */
  currentSlide = newSlide;
}

/* Goes to the previous slide (wraps from first to last) */
function slideshowPrev() {
  goToSlide(currentSlide - 1);
  /* Reset timer so manual navigation doesn't immediately auto-advance */
  restartSlideshowTimer();
}

/* Goes to the next slide (wraps from last to first) */
function slideshowNext() {
  goToSlide(currentSlide + 1);
  /* Reset timer so manual navigation doesn't immediately auto-advance */
  restartSlideshowTimer();
}

/* Starts the repeating auto-advance timer (every 4 seconds) */
function startSlideshowTimer() {
  slideshowTimer = setInterval(function () {
    goToSlide(currentSlide + 1);
  }, 4000);
}

/* Clears and restarts the auto-advance timer */
function restartSlideshowTimer() {
  clearInterval(slideshowTimer);
  startSlideshowTimer();
}
/*============================================================================
 FEATURE 1: NAVBAR SCROLL BEHAVIOR
   Adds a "scrolled" class to the navbar when the user
   scrolls down more than 50 pixels from the top.
============================================================================*/
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
/*============================================================================
FEATURE 2: HAMBURGER MOBILE MENU
   Toggles the mobile navigation open/closed when the
   hamburger icon (3 lines) is clicked on small screens.
============================================================================*/
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

/*============================================================================
Closes the mobile nav
    - This prevents the menu from staying open after navigation.
============================================================================*/
function closeMobileNav() {
  var mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.remove('open');
}

/*============================================================================
   FEATURE 3: ACCORDION DROPDOWNS (Support Section)
   Toggles a support type open or closed when its header is clicked.
        - itemId: the id of the accordion-item to toggle (e.g. "support-1")
============================================================================*/
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

/*============================================================================
   FEATURE 4: CONTACT FORM SUBMISSION
   Handles the contact form when the user clicks "Send Message."
        - event: the form submit event (used to prevent page reload)
============================================================================*/
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
/*============================================================================
   FEATURE 5: SCROLL FADE-IN ANIMATIONS
   Sections and cards fade in smoothly as the user scrolls
   down the page, instead of appearing all at once.
============================================================================*/
function initScrollAnimations() {
  // List of elements to animate as they appear
  var animatedElements = document.querySelectorAll(
    '.about-card, .benefit-item, .gallery-item, .accordion-item, .contact-item'
  );

  // Set initial hidden state for all animated elements
  animatedElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Create the Intersection Observer
  // It watches when elements enter the visible area of the screen
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        // If the element is now visible in the viewport...
        if (entry.isIntersecting) {
          // Make it visible with a slight delay based on position
          // so sibling elements stagger their appearance
          var el = entry.target;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';

          // Stop watching this element — it only needs to animate once
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,       // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -40px 0px'  // Trigger 40px before it fully enters
    }
  );

  // Start observing each animated element
  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
}
