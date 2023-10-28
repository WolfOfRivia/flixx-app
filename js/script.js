const global = {
  currentPage: window.location.pathname
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular'); 
  // destructuring, I know we named the variable results, but in the object we get back there actually is a property called results so we are extracting that
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
          ? 
          `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />
          ` : 
          `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `;
    document.querySelector('#popular-movies').appendChild(div);
  })
  // console.log(results);
}

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular'); 
  results.forEach(show => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
          ? 
          `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />
          ` : 
          `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Aired: ${show.first_air_date}</small>
        </p>
      </div>
    `;
    document.querySelector('#popular-shows').appendChild(div);
  })
  console.log(results);
}


// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // IMPORTANT NOTE: In a REAL production we would not put the API Key here, because anyone could get your key
  // In a real production the key would be stored in your own backend server, and request would be made to the API from your own server.
  // Also the API Key will be in your repo if it's public and someone could grab it from there too.
  // Ideally in your own server your API Key would be in a .env file on and you'd get it from there.
  const API_KEY = '40d28d3ebff3b39c108915a24b1b2002';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

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
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('TV Shows');
      displayPopularShows();
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