// Retrieve the currentAccount object from the localStorage
import accounts from "./accounts.js";
const games = [];
for (let i = 0; i < accounts.length; i++) {
  const team1 = accounts[i].team;

  // Iterate over the remaining objects to create combinations
  for (let j = i + 1; j < accounts.length; j++) {
    const team2 = accounts[j].team;

    // Create a new object with the combination and add it to the new array
    const combination = [team1, team2];
    games.push(combination);
  }
}

const itemValue = localStorage.getItem("roundRobinResults");

let roundRobinResults = [];

if (itemValue !== null) {
  roundRobinResults = JSON.parse(itemValue);
}

const dashboardMatches = document.querySelector(".dashboard__matches");
const dashboardTeamLogo = document.querySelector(".dashboard__team--logo");

const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const currentTeam = currentAccount.team;
console.log(currentAccount);

function updateUI() {
  updateTeamLogo();
  for (let game of games) {
    if (game.includes(currentTeam)) {
      displayGames(currentTeam, game);
      displayForms();
    }
  }
  submitForms();
}

const displayGames = function (key, game) {
  const opponent = game[game.findIndex((el) => el !== key)];
  const curGame = currentTeam + opponent;
  // Check if the game combination already exists in roundRobinResults and is submitted
  const gameExistsAndSubmitted = roundRobinResults.some(
    (entry) => entry.team === currentTeam && entry.opponent === opponent
  );

  if (!gameExistsAndSubmitted) {
    const match = document.createElement("h1");
    match.dataset.currentTeam = currentTeam;
    match.dataset.opponent = opponent;
    match.dataset.curGame = curGame;
    match.textContent = `${currentTeam} - ${opponent}`;
    match.className = "match";
    dashboardMatches.appendChild(match);

    const markup = `
                        <form class='spirit__form hidden' data-game=${curGame} data-team=${currentTeam} data-opponent= ${match.dataset.opponent}>
                          <label for="${currentTeam}-rules">Knowledge of the Rules</label>
                          <p id="score-${currentTeam}-rules">2</p>
                          <input type="range" id="${currentTeam}-rules" min="0" max="4" /> 
                          <label for="${currentTeam}-contact">Fouls and Body Contact</label>
                          <p id="score-${currentTeam}-contact">2</p>
                          <input type="range" id="${currentTeam}-contact" min="0" max="4" />   
                          <label for="${currentTeam}-fair-minddness">Fair-Mindeness</label>
                          <p id="score-${currentTeam}-fair-minddness">2</p>
                          <input type="range" id="${currentTeam}-fair-minddness" min="0" max="4" />
                          <label for="${currentTeam}-self-control">Positive Attitude and Self Control</label>
                          <p id="score-${currentTeam}-self-control">2</p>  
                          <input type="range" id="${currentTeam}-self-control" min="0" max="4" />
                          <label for="${currentTeam}-communication">Communications</label>
                          <p id="score-${currentTeam}-communication">2</p>
                          <input type="range" id="${currentTeam}-communication" min="0" max="4" />
                          <button class='submitBtn' type="submit">Submit</button>
                        </form>`;
    dashboardMatches.insertAdjacentHTML("beforeend", markup);
    // Event listeners to update <p> tags live
    document
      .getElementById(`${currentTeam}-rules`)
      .addEventListener("input", () => {
        updateScore(`${currentTeam}-rules`, `score-${currentTeam}-rules`);
      });

    document
      .getElementById(`${currentTeam}-contact`)
      .addEventListener("input", () => {
        updateScore(`${currentTeam}-contact`, `score-${currentTeam}-contact`);
      });

    document
      .getElementById(`${currentTeam}-fair-minddness`)
      .addEventListener("input", () => {
        updateScore(
          `${currentTeam}-fair-minddness`,
          `score-${currentTeam}-fair-minddness`
        );
      });

    document
      .getElementById(`${currentTeam}-self-control`)
      .addEventListener("input", () => {
        updateScore(
          `${currentTeam}-self-control`,
          `score-${currentTeam}-self-control`
        );
      });

    document
      .getElementById(`${currentTeam}-communication`)
      .addEventListener("input", () => {
        updateScore(
          `${currentTeam}-communication`,
          `score-${currentTeam}-communication`
        );
      });
  }
};

// Event listener for form submission
function submitForms() {
  const forms = document.querySelectorAll(".spirit__form");
  if (forms) {
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Access form data
        let rules = +document.getElementById(`${form.dataset.team}-rules`)
          .value;
        let contact = +document.getElementById(`${form.dataset.team}-contact`)
          .value;
        let fairMinddness = +document.getElementById(
          `${form.dataset.team}-fair-minddness`
        ).value;
        let selfControl = +document.getElementById(
          `${form.dataset.team}-self-control`
        ).value;
        let communication = +document.getElementById(
          `${form.dataset.team}-communication`
        ).value;

        const total =
          rules + contact + selfControl + fairMinddness + communication;

        const scores = {
          game: form.dataset.game.split("").sort().join(""),
          team: currentTeam,
          opponent: form.dataset.opponent,
          rules,
          contact,
          fairMinddness,
          selfControl,
          communication,
          total,
        };
        console.log(scores);
        // Check if the same team and opponent combination already exists in roundRobinResults
        const combinationExists = roundRobinResults.some(
          (entry) =>
            entry.team === currentTeam &&
            entry.opponent === form.dataset.opponent
        );

        if (!combinationExists) {
          roundRobinResults.push(scores);
          localStorage.setItem(
            "roundRobinResults",
            JSON.stringify(roundRobinResults)
          );
        }

        form.remove();
        const matchingH1 = document.querySelector(
          `h1[data-cur-game="${form.dataset.game}"][data-current-team="${currentTeam}"][data-opponent="${form.dataset.opponent}"]`
        );
        console.group();
        console.log(form.dataset.game);
        console.log(currentTeam);
        console.log(form.dataset.opponent);
        console.log(
          `h1[data-cur-game="${form.dataset.game}"][data-current-team="${currentTeam}"][data-opponent="${form.dataset.opponent}"]`
        );
        console.groupEnd();
        console.log(matchingH1);
        if (matchingH1) {
          matchingH1.remove();
        }
      });
    });
  }
}

function toggleForms(dataGame) {
  const forms = document.querySelectorAll(".spirit__form");
  if (forms) {
    forms.forEach((form) => {
      if (form.getAttribute("data-game") === dataGame) {
        form.classList.toggle("hidden");
      }
    });
  }
}

function handleClick(event) {
  const h1 = event.currentTarget; // Get the clicked h1 element
  const dataGame = h1.getAttribute("data-cur-game");
  toggleForms(dataGame);
}

function displayForms() {
  const h1Elements = document.querySelectorAll(".match");

  // Remove previous event listeners before adding new ones
  h1Elements.forEach((h1) => {
    h1.removeEventListener("click", handleClick); // Remove previous listener
    h1.addEventListener("click", handleClick); // Add new listener
  });
}

function updateScore(inputId, pId) {
  const inputElement = document.getElementById(inputId);
  const pElement = document.getElementById(pId);
  pElement.textContent = inputElement.value; // Update the <p> tag with the input value
}

function updateTeamLogo() {
  dashboardTeamLogo.src = currentAccount.logo;
}

updateUI();
