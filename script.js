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

function createMovieCard(title, genre) {
    // 1. Create the outer <li>
    const card = document.createElement("li");
    card.classList.add("movie-card");
    card.setAttribute("data-genre", genre);

    // 2. Create the info section
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("movie-info");

    const titleSpan = document.createElement("span");
    titleSpan.classList.add("movie-title");
    titleSpan.textContent = title;

    const genreSpan = document.createElement("span");
    genreSpan.classList.add("movie-genre");
    genreSpan.textContent = genre || "No genre";

    infoDiv.append(titleSpan, genreSpan)

    // 3. Create the actions section
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("movie-actions");

    const watchBtn = document.createElement("button");
    watchBtn.classList.add("watch-btn");
    watchBtn.textContent = "Mark Watched";

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";

    actionsDiv.append(watchBtn, removeBtn)

    // 4. Append the info and actions divs into the <li>
    card.append(infoDiv, actionsDiv);

    // 5. return the card
    return card;
}

movieForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = titleInput.value;
    const genre = genreInput.value;

    const movieCard = createMovieCard(title, genre);
    movieList.appendChild(movieCard);

    movieForm.reset();
});


