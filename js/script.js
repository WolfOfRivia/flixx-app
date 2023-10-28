const global = {
  currentPage: window.location.pathname
}

// console.log(global.currentPage);

// Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    if(link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  })
}

// Init App
function init() {
  // Check which page we are on 
  // This system is called a router it's to determine what functions will run on what pages
  // Typically frameworks like React, or Vue have these built in, but in Vanilla we must create them ourselves
  switch(global.currentPage) {
    case '/':
    case '/index.html': // Will run if we are on / OR index.html
      console.log('Home');
      break;
    case '/shows.html':
      console.log('TV Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);