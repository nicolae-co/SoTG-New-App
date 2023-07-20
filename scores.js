// Get the current team from localStorage
const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const currentTeam = currentAccount.team;
// Get the array of match objects from localStorage
const matches = JSON.parse(localStorage.getItem("roundRobinResults"));
const teamReceivedScores = document.getElementById("scores-container");

if (matches !== null) {
  // Function to filter matches where the current team is a team or an opponent
  function filterMatchesForCurrentTeam(matches, currentTeam) {
    console.log(matches);

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
          <p>Rules: ${rules}</p>
          <p>Contact: ${contact}</p>
          <p>Fair-mindness: ${fairMinddness}</p>
          <p>Self-control: ${selfControl}</p>
          <p>Communication: ${communication}</p>
          </div>
          `;

          teamReceivedScores.insertAdjacentHTML("beforeend", markup);
        }
      }
    }
  }

  displayMatches(filteredMatches, currentTeam);
} else {
  // Display a message indicating that there are no matches with the same game variable
  const noMatchesMarkup = `
  <div>
  <h1 class='error-scores'>No scores yet!</h1>
  </div>
  `;
  teamReceivedScores.insertAdjacentHTML("beforeend", noMatchesMarkup);
}
