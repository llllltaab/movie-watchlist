const appTitle = document.getElementById("app-title");
const movieCount = document.getElementById("movie-count");
const movieForm = document.getElementById("movie-form");
const titleInput = document.getElementById("title-input");
const genreInput = document.getElementById("genre-input");
const movieList = document.getElementById("movie-list");
const clearWatchBtn = document.getElementById("clear-watched-btn");

const filterBtns = [...document.querySelectorAll(".filter-btn")];


titleInput.getAttribute("value")  // → null (the HTML never had a value attribute)
titleInput.value                  // → whatever you just typed

// What is the difference between getAttribute("value") and .value on an input?
// getAttribute("value") → gets the value from the HTML attribute, if it exists
// .value → gets the current live value inside the input, including what the user typed


movieForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = titleInput.value;
    const genre = genreInput.value;

    console.log(title);
    console.log(genre);
    movieForm.reset();
})