import accounts from "./accounts.js";

let currentAccount;

const form = document.querySelector(".login__form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;
  const authenticated = isValidCredentials(username, password);

  if (authenticated) {
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
    window.location.href = "./dashboard.html";
  } else {
    alert("no spirit for you");
  }
});
// Function to check if the username and password are valid
function isValidCredentials(username, password) {
  // Loop through the accounts array
  for (const account of accounts) {
    // Check if the provided username and password match any account in the array
    if (account.username === username && account.password === password) {
      // If the credentials are valid, return true
      console.log(account);
      currentAccount = account;
      return true;
    }
  }
  // If the loop completes without finding a valid account, return false
  return false;
}
