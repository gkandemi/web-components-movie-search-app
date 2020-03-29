let movies = [
  {
    title: "The Man From Earth 1",
    description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
    poster:
      "https://unutulmazfilmler.pw/wp-content/uploads/2016/07/The-Man-from-Earth.jpg",
    isFavourite: true
  },
  {
    title: "The Man From Earth 2",
    description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
    poster:
      "https://unutulmazfilmler.pw/wp-content/uploads/2016/07/The-Man-from-Earth.jpg",
    isFavourite: false
  },
  {
    title: "The Man From Earth 3",
    description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
    poster:
      "https://unutulmazfilmler.pw/wp-content/uploads/2016/07/The-Man-from-Earth.jpg",
    isFavourite: true
  }
];

// prepareMovies(movies);
const search_text = document.querySelector(".search_text");

search_text.addEventListener("keydown", event => {
  if (event.keyCode == 13) {
    searchMovie();
  }
});

// Sorgu Atalım...
async function searchMovie() {
  const request = await fetch(
    `http://www.omdbapi.com/?apikey=5a96bbee&s=${search_text.value}`
  );
  const data = await request.json();
  let movies = data.Search.map(m => {
    return {
      title: m.Title,
      description: `${m.Year}/${m.Type}`,
      imdbID: m.imdbID,
      poster: m.Poster === "N/A" ? "/assets/images/default.png" : m.Poster,
      isFavourite: false
    };
  });

  console.log("movies", movies);

  prepareMovies(movies);
  // Title: "Captain Marvel"
  // Year: "2019"
  // imdbID: "tt4154664"
  // Type: "movie"
  // Poster: "https://m.media-amazon.com/images/M/MV5BMTE0YW
}

// filmleri hazırla...
function prepareMovies(movies) {
  document.querySelector("#movies").innerHTML = "";
  movies.forEach(movie => {
    let movie_card = document.createElement("movie-card");
    movie_card.setAttribute("title", movie.title);
    movie_card.setAttribute("poster", movie.poster);
    movie_card.setAttribute("isFavourite", movie.isFavourite);
    movie_card.setAttribute("imdbID", movie.imdbID);
    movie_card.innerHTML = movie.description;

    document.querySelector("#movies").append(movie_card);
  });
}
