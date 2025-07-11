
const flowerCost = 10;
const flowerReward = 15;
const growTime = 3000; 
const harvestTime = 4000; 

let growTimers = Array(16).fill(null);
let harvestTimers = Array(16).fill(null);

function login() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Kullanıcı adı girin");

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[username]) {
    users[username] = {
      balance: 100,
      garden: Array(16).fill("empty")
    };
    localStorage.setItem("users", JSON.stringify(users));
  }

  localStorage.setItem("currentUser", username);
  loadGame();
}

function loadGame() {
  const username = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users[username];

  document.getElementById("login-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("balance").textContent = Bakiye: ${user.balance} TL;

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let i = 0; i < 16; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (user.garden[i] === "planted") {
      cell.classList.add("growing");
    } else if (user.garden[i] === "grown") {
      cell.classList.add("grown");
    }

    cell.onclick = () => handleClick(i);
    grid.appendChild(cell);
  }
}

function handleClick(index) {
  const username = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users[username];
  const state = user.garden[index];

  if (state === "empty") {
    if (user.balance < flowerCost) return alert("Yetersiz bakiye!");

    user.balance -= flowerCost;
    user.garden[index] = "planted";
    localStorage.setItem("users", JSON.stringify(users));
    loadGame();

    growTimers[index] = setTimeout(() => {
      user.garden[index] = "grown";
      localStorage.setItem("users", JSON.stringify(users));
      loadGame();

      harvestTimers[index] = setTimeout(() => {
        if (user.garden[index] === "grown") {
          user.garden[index] = "empty";
          localStorage.setItem("users", JSON.stringify(users));
          loadGame();
        }
      }, harvestTime);
    }, growTime);

  } else if (state === "grown") {
    user.garden[index] = "empty";
    user.balance += flowerReward;
    clearTimeout(harvestTimers[index]);
    localStorage.setItem("users", JSON.stringify(users));
    loadGame();
  }
}

function signOut() {
  localStorage.removeItem("currentUser");
  location.reload();
}

window.onload = function () {
  if (localStorage.getItem("currentUser")) {
    loadGame();
  }
};
