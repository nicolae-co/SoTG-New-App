// Get the current team from localStorage
const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const currentTeam = currentAccount.team;
// Get the array of match objects from localStorage
const matches = JSON.parse(localStorage.getItem("roundRobinResults"));

// Function to filter matches where the current team is a team or an opponent
function filterMatchesForCurrentTeam(matches, currentTeam) {
  return matches.filter(
    (match) => match.team === currentTeam || match.opponent === currentTeam
  );
}

// Function to check if there are 2 matches with the same game variable
function checkIfTwoMatchesWithSameGame(matches) {
  const gameCounts = {};
  for (const match of matches) {
    const { game } = match;
    gameCounts[game] = (gameCounts[game] || 0) + 1;
    if (gameCounts[game] === 2) {
      return true;
    }
  }
  return false;
}
// Filter matches based on the given conditions
const filteredMatches = filterMatchesForCurrentTeam(matches, currentTeam);

// Check if there are 2 matches with the same game variable
const hasTwoMatchesWithSameGame =
  checkIfTwoMatchesWithSameGame(filteredMatches);

function displayMatches(matches, currentTeam) {
  const teamReceivedScores = document.getElementById("scores-container");

  if (hasTwoMatchesWithSameGame) {
    for (const match of matches) {
      const {
        team,
        opponent,
        rules,
        contact,
        fairMinddness,
        selfControl,
        communication,
      } = match;
      if (team !== currentTeam) {
        const markup = `
          <div class="scores-division">
            <h2>Opponent: ${team}</h2>
            <p>Total Rules: ${rules}</p>
            <p>Total Contact: ${contact}</p>
            <p>Total Fair-mindness: ${fairMinddness}</p>
            <p>Total Self-control: ${selfControl}</p>
            <p>Total Communication: ${communication}</p>
          </div>
        `;

        teamReceivedScores.insertAdjacentHTML("beforeend", markup);
      }
    }
  } else {
    // Display a message indicating that there are no matches with the same game variable
    const noMatchesMarkup = `
        <div>
          <p>No matches with the same game variable found.</p>
        </div>
      `;
    teamReceivedScores.insertAdjacentHTML("beforeend", noMatchesMarkup);
  }
}

displayMatches(filteredMatches, currentTeam);
