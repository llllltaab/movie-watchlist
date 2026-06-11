const appTitle = document.getElementById("app-title");
const movieCount = document.getElementById("movie-count");
const movieForm = document.getElementById("movie-form");
const titleInput = document.getElementById("title-input");
const genreInput = document.getElementById("genre-input");
const movieList = document.getElementById("movie-list");
const clearWatchBtn = document.getElementById("clear-watched-btn");

const filterBtns = [...document.querySelectorAll(".filter-btn")];

let currentFilter = "all";


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

    updateCount();

    movieForm.reset();
});

// Why do we attach the listener to #movie-list instead of to each button?
// Answer: The buttons are created dynamically after the page loads, so they
// don't exist yet when we'd normally attach listeners. Listeners on #movie-list
// catch clicks on any button inside it (event delegation), including ones added later.
//
// What does event.target.closest("li") do?
// Answer: It starts at the clicked element (event.target) and walks up through
// its ancestors, returning the first one that matches "li" — giving us the
// whole movie card the button belongs to.

movieList.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;

    const card = event.target.closest("li");

    if (event.target.classList.contains("remove-btn")) {
        card.remove();
        updateCount();
        applyFilter(currentFilter);
    }

    if (event.target.classList.contains("watch-btn")) {
        card.classList.toggle("watched");

        if (card.classList.contains("watched")) {
            event.target.textContent = "Unmark Watched";
        } else {
            event.target.textContent = "Mark Watched";
        }

        applyFilter(currentFilter);
    }
});

function updateCount() {
    const count = movieList.querySelectorAll(".movie-card").length;
    movieCount.textContent = count === 1 ? "1 movie" : `${count} movies`;
}

function updateFilterButtons(activeFilter) {
    filterBtns.forEach((btn) => {
        btn.classList.remove("active-filter");
        if (btn.id === "filter-" + activeFilter) {
            btn.classList.add("active-filter");
        }
    });
}

function applyFilter(filter) {
    currentFilter = filter;
    updateFilterButtons(filter);

    const cards = movieList.querySelectorAll(".movie-card");

    cards.forEach((card) => {
        if (filter === "all") {
            card.classList.remove("filtered-out");
        } else if (filter === "watched") {
            if (card.classList.contains("watched")) {
                card.classList.remove("filtered-out");
            } else {
                card.classList.add("filtered-out");
            }
        } else if (filter === "unwatched") {
            if (!card.classList.contains("watched")) {
                card.classList.remove("filtered-out");
            } else {
                card.classList.add("filtered-out");
            }
        }
    });
}

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const filter = btn.id.replace("filter-", "");
        applyFilter(filter);
    });
});

clearWatchBtn.addEventListener("click", () => {
    const watchedCards = movieList.querySelectorAll(".watched");
    watchedCards.forEach((card) => card.remove());

    updateCount();
    applyFilter(currentFilter);
});


