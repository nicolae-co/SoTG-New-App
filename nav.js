const home = document.querySelector("#home");
const scores = document.querySelector("#scores");
const results = document.querySelector("#results");
const admin = document.querySelector("#admin");
const signOut = document.querySelector("#signOut");

signOut.addEventListener("click", function () {
  window.location.href = "./index.html";
});

const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const currentTeam = currentAccount.team;
