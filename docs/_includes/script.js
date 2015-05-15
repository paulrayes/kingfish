// Determine whether child DOM element is a descendant of parent element
function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

// Adds a CSS class to an element if it does not already exist
function addClass(element, className) {
  if (element.className.indexOf(' ' + className) < 0) {
    element.className += ' ' + className;
  }
}

// Removes a CSS class from an element if it exists
function removeClass(element, className) {
  if (element.className.indexOf(' ' + className) >= 0) {
    element.className = element.className.replace(' ' + className, '');
  }
}

// Grow/shrink the top header on scroll
window.addEventListener('scroll', function(e){
  var distanceY = window.pageYOffset || document.documentElement.scrollTop;
  if (distanceY > 120) {
    addClass(document.body, 'smaller');
  } else {
    removeClass(document.body, 'smaller');
  }
});

var siteHeader = document.getElementsByClassName('site-header')[0];

// Listen to clicks on the mobile hamburger menu
// On touch devices we can use hover but if we're using a keyboard+mouse and the
// window is just really small, this is needed
window.addEventListener('click', function(e) {
  var el = e.target;
  if (isDescendant(siteHeader, el)) {
    addClass(siteHeader, 'active');
  } else {
    removeClass(siteHeader, 'active');
  }
}, false);

// Start the smooth scrolling script
smoothScroll.init({});

// Start the scroll spy script
gumshoe.init({
  offset: 40
});
