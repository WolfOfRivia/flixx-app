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

// Display Movie Details
async function displayMovieDetails() {

  // When you click a movie and go to the movie details page, the movie ID is passed into the URL
  // Get the movie ID from the URL
  // There's probably other ways to do this, is just one way getting what I needed from the URL
  // However data you want to keep private should never be put in the URL (like an API key for example)
  const movieID = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieID}`);
  // console.log(movie);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
      <div>
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
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
          ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>, `).join('')}</div>
    </div>
  `;

  document.querySelector('#movie-details').appendChild(div);

}

// Display Show Details
async function displayShowDetails() {

  const showID = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showID}`);
  // console.log(show);

  // Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
      <div>
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
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">First Air Date: ${show.first_air_date}</p>
        <p>
          ${show.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number Of Episodes</span> ${show.number_of_episodes}</li>
        <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
        <li><span class="text-secondary">Episode Runtime:</span> ${show.episode_run_time} minutes</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>, `).join('')}</div>
    </div>
  `;

  document.querySelector('#show-details').appendChild(div);

}

// Diplay Backdrop On Details Pages
function displayBackgroundImage(type, bgPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bgPath})`;
  overlayDiv.classList.add('details-backdrop');
  if(type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
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

// Add commas
function addCommasToNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      displayMovieDetails();
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      displayShowDetails();
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);