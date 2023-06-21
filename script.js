'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/original";
const CONTAINER = document.querySelector(".container");
const genresContainer = document.querySelector(".genres-container");
const MODIFYBAR = document.querySelector(".modifybar");
const BACKARROW = document.querySelector(".backarrow");
const BANNER = document.querySelector(".banner");
const header = document.querySelector(".background");
const loader = document.querySelector(".loader");
const SearchInput = document.querySelector(".searchTerm");
const pageDes = document.querySelector(".page-des");


const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// Fetching movies

const autorun = async (name) => {
  const movies = await fetchMovies(name);
  renderMovies(movies.results);
  // slideshow(movies.results);
};

const runslideshow = async (name) => {
  const movies = await fetchMovies(name);
  slideshow(movies.results);
};

const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

const fetchMovies = async (name) => {
  const url = constructUrl(`movie/${name}`);
  const res = await fetch(url);
  return res.json();
};

const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const renderMovies = (movies) => {
  const moviesContainer = document.createElement("div");
  moviesContainer.className = "movies-container";

  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "movie-card";

    movieDiv.innerHTML = `
    <div>
        <img class="movie-poster" src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${movie.title} poster">

    <div class="overlay">
    <p class="img-description">${movie.title} <br> ${movie.vote_average}</p>
    </div>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
      window.scrollTo(0,0);
    }); 
    moviesContainer.appendChild(movieDiv);
  });
  CONTAINER.appendChild(moviesContainer);
};

// const slideshow = (movies) => {
//   const imageslideshow = document.createElement("div");
//   imageslideshow.className = "image-slideshow";

//   movies.map((movie) => {
//     const movieslide = document.createElement("div");
//     movieslide.className = "Slideimage";
//     movieslide.classList.add("fade");

//     movieslide.innerHTML = `
//     <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title}" style="width: 100%;">

//     `;
//     movieslide.addEventListener("click", () => {
//       movieDetails(movie);
//       displayMoviePage();
//     }); 
//     imageslideshow.appendChild(movieslide);
//   });
//   header.appendChild(imageslideshow);
//   displayImages();
// };

// let index = 0;
// function displayImages() {
//   let i;
//   const images = document.getElementsByClassName("Slideimage");
//   for (i = 0; i < images.length; i++) {
//     images[i].style.display = "none";
//   }
//   index++;
//   if (index > images.length) {
//     index = 1;
//   }
//   images[index-1].style.display = "block";
//   setTimeout(displayImages, 4000); 
// }


const renderMovie = (movie) => {
  CONTAINER.classList.add("container2");

  CONTAINER.innerHTML = `
  <div class="test" style = "background-image: url(${BACKDROP_BASE_URL + movie.backdrop_path})" >
    <div class="selectedmovie" >
        <div class="movieposter">
        <a target ="_blank" href ="${movie.homepage}">
             <img id="movie-poster" src=${
               BACKDROP_BASE_URL + movie.poster_path
             }>
             </a>
        </div>
        <div class="moviedetails">

            <div class="detailscol">
            <h2 id="movie-title">${movie.title}</h2>
            <div class="detailsrow">
            <p id="movie-release-date"><b></b> ${(movie.release_date).slice(0, 4)}</p>
            <p id="movie-runtime"><b></b> ${movie.runtime} Minutes</p>
            <p id="movie-language"><b></b> ${movie.original_language}</p>
            <p id="movie-rating"><a style="text-decoration: none; color: yellow;" target="_blank" href="https://www.imdb.com/title/${movie.imdb_id}/"<b>IMDB</b> ${(movie.vote_average).toFixed(1)}</a></p>
            </div>
            <p id="movie-genre" class="movie-genre">${movie.genres[0].name}</p>
            <h3 id="movieoverview">Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
            </div>

            <div>
            <img id="company-logo" src=${BACKDROP_BASE_URL + movie.production_companies[0].logo_path}>
            </div>
            
        </div>
      </div></div>`;

    runTrailer(movie);
    excute(movie);
    
};



const delay = ms => new Promise(res => setTimeout(res, ms));

const excute = async (movie) => {
  await delay(100);
  displayMoviePage();

  await delay(100);
  runCast(movie);

  await delay(1000);
  runRelatedMovies(movie);
};

// document.addEventListener("DOMContentLoaded", autorun("now_playing"));

if (document.readyState === "loading") {
  
  loader.style.display = "block";

} else {
  autorun("now_playing");
}

document.addEventListener("DOMContentLoaded", runslideshow("now_playing"));


// fetching related movies

const fetchRelatedMovies = async (movie) => {
  const url = constructUrl(`movie/${movie.id}/similar`);
  const res = await fetch(url);
  return res.json();
}

const runRelatedMovies = async (movie) => {
  const relMovies = await fetchRelatedMovies(movie);
  renderRelatedMovies(relMovies.results);
};

const renderRelatedMovies = (movies) => {
  const moviesContainer = document.createElement("div");
  const moviesContainerdiv = document.createElement("div");
  moviesContainerdiv.className = "moviescontainerdiv";
  const moviesContainerh3 = document.createElement("h3");
  moviesContainerh3.innerHTML = `You May Also Like`
  moviesContainerh3.classList.add("moviesContainerh3")
  moviesContainer.className = "movies-container";

  moviesContainerdiv.appendChild(moviesContainerh3);

  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "movie-card";

    movieDiv.innerHTML = `
    <div>
        <img class="movie-poster" src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${movie.title} poster">

    <div class="overlay">
    <p class="img-description">${movie.title} <br> ${movie.vote_average}</p>
    </div>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
      displayMoviePage();
      window.scrollTo(0,0);
    }); 
    moviesContainer.appendChild(movieDiv);
  });
  moviesContainerdiv.appendChild(moviesContainer);
  CONTAINER.appendChild(moviesContainerdiv);
};


// fetch movie trailer

const fetchTrailer = async (movie) => {
  const url = constructUrl(`movie/${movie.id}/videos`);
  const res = await fetch(url);
  return res.json();
}

const runTrailer = async (movie) => {
  const relMovies = await fetchTrailer(movie);
  renderTrailer(relMovies.results[0].key);
};

const renderTrailer = (key) =>{
  const trailerDiv = document.createElement("div");
  trailerDiv.classList.add("trailer-container")

  trailerDiv.innerHTML = 
  `<h3 class="movie-trailer">Watch the Trailer<h3>
  <iframe src="https://www.youtube.com/embed/${key}"></iframe>`

  CONTAINER.appendChild(trailerDiv);

}


//FETCH ACTORS OF A CERTAIN MOVIE

const runCast = async (movie) => {
    const CastRes = await fetchCast(movie.id);
    renderCast(CastRes);
  };

const fetchCast= async (movieId) => {
    const url = constructUrl(`movie/${movieId}/credits`);
    const res = await fetch(url);
    return res.json();
  }


const renderCast = (movie) => {
    const CastSection = document.createElement("section");
    CastSection.classList.add("castSection");
    const CastSectionh3 = document.createElement("h3");
    CastSectionh3.className = "cast-sectionh3"
    const CastSectiondiv1 = document.createElement("div");
    CastSectiondiv1.classList.add("actors-container");

    CastSectionh3.innerHTML = `CAST`;
    CastSection.appendChild(CastSectionh3);
    
    for(let i=0; i<10; i++){
      if(movie.cast[i].profile_path != null){
      const actorCard = document.createElement("div");
      actorCard.classList.add("actor-card");
        actorCard.innerHTML = `
        <img class="actor-poster" src="${PROFILE_BASE_URL + movie.cast[i].profile_path}" alt="Actor poster">
        <h3 class = "actor-name">${movie.cast[i].name}</h3>
        <h3 class = "actor-name">${movie.cast[i].character}</h3>
        `;
        CastSectiondiv1.appendChild(actorCard);
      }
      
    }
    CastSection.appendChild(CastSectiondiv1);

    CONTAINER.appendChild(CastSection);
   };

  

if(BACKARROW){
  BACKARROW.addEventListener("click", function (e) {
    e.preventDefault();
      CONTAINER.replaceChildren();
      autorun("now_playing");
        BACKARROW.style.display = "none";
        genresContainer.style.display = "flex";
        pageDes.style.display = "block";
    });
}

const displayMoviePage = () =>{
  BACKARROW.style.display = "flex";
  genresContainer.style.display = "none";
  pageDes.style.display = "none";
}

//loading genres

const runGenres = async () => {
  const genres = await fetchGenres();
  renderGenres(genres.genres);
};

const fetchGenres = async () => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};

const renderGenres = (genres) => {

  genres.map((genre) => {
    const genresBox = document.createElement("div");
    genresBox.classList.add(genre.id);
    genresBox.classList.add("genre-box");
    genresBox.innerHTML = `<h3>${genre.name}</h3>`;
    genresContainer.appendChild(genresBox);
    genresBox.addEventListener("click", function(genreID){
      genreID = genre.id;
      CONTAINER.replaceChildren();
      changePageDes(genre.name);
      runMoviesByGenre(genreID);
    });
  });
  
};

document.addEventListener("DOMContentLoaded", runGenres);

// fetching movies with genres

const runMoviesByGenre = async (genreID) => {
  const movies = await fetchMoviesByGenre(genreID);
  renderMovies(movies.results);
};

const fetchMoviesByGenre = async (genreID) => {
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=542003918769df50083a13c415bbc602&with_genres=${genreID}`
  const res = await fetch(url);
  return res.json();
};


// fetching movies by filter

const filters = [
  {id: 1, name: "popular", name2:"Popular"},
  {id: 2, name: "top_rated", name2: "Top Rated"},
  {id: 3, name: "now_playing", name2: "Now Playing"},
  {id:4, name: "upcoming", name2: "Upcoming"}
]

const filtering = () => {
  filters.map((filter) => {
    const f= document.querySelector(`#filter${filter.id}`);
    f.addEventListener("click", function(e){
      e.preventDefault();
      CONTAINER.replaceChildren();
      changePageDes(filter.name2);
      autorun(filter.name);
    });
  });
}


document.addEventListener("DOMContentLoaded", filtering);


// searching for movies 

SearchInput.addEventListener('input', function(e){
  e.preventDefault();
  BACKARROW.style.display = "none";
  CONTAINER.replaceChildren();
  pageDes.style.display = "none";
  genresContainer.style.display = "none";
  runSearchMovies(SearchInput.value);
})

const runSearchMovies = async (keyword) => {
  const movies = await fetchMoviesBySearch(keyword);
  renderMovies(movies.results);
};

const fetchMoviesBySearch = async (keyword) => {
  const url = `${TMDB_BASE_URL}/search/movie?api_key=542003918769df50083a13c415bbc602&query=${keyword}`
  const res = await fetch(url);
  return res.json();
};

const changePageDes = (des) =>{
  pageDes.innerHTML =  `<h1>Browse ${des} movies</h1><hr>`
}

changePageDes("now playing");

