/* ✅ login.js - smart login handler with session tracking + greeting + logging */

const webhookURL = "https://script.google.com/macros/s/AKfycby4XTQaWdDtuccnop3GxZE9xfgGFzi207DPlDoaYzd0qbmpp2T6qWLXcQNfELRggaHI/exec";

// ✅ All users now have `name` field
const users = [
  { email: "cowley@phillys.com", password: "1234", name: "Cowley", business: ["phillys-cowley"] },
  { email: "stclements@phillys.com", password: "1234", name: "St Clements", business: ["phillys-stclements"] },
  { email: "rick@diner.com", password: "1234", name: "Rick", business: ["ricks-diner"] },
  { email: "valentine@stclaire.com", password: "1234", name: "Valentine", business: ["stclaire-valentine"] },
  { email: "bantu.maruthi990@gmail.com", password: "1234", name: "Bantu", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
  { email: "sbenbakhti@gmail.com", password: "1234", name: "Sami", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
];

// ✅ Rotating motivational messages
const quotes = [
  "You're unstoppable today!",
  "Crushing it as always!",
  "Your energy is contagious!",
  "Keep making magic happen!",
  "You're a star in the kitchen and beyond!",
  "Today’s your day to shine!",
  "Greatness looks good on you!",
  "You're making a real impact today!",
  "Excellence suits you!",
  "You’re leading with passion – keep going!"
];

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    errorMsg.innerText = "Invalid credentials.";
    errorMsg.classList.add("shake");
    setTimeout(() => errorMsg.classList.remove("shake"), 400);
    return false;
  }

  // ✅ Save login flag
  sessionStorage.setItem("loggedIn", true);

  // ✅ Log login to Google Sheet
  const firstBusiness = user.business.length > 1 ? "MULTI (choice shown)" : user.business[0];
  fetch(webhookURL, {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      business: firstBusiness
    }),
    headers: { "Content-Type": "application/json" }
  });

  // ✅ Show personal greeting popup
  showGreeting(user);

  return false;
}

function showGreeting(user) {
  const loginBox = document.querySelector(".login-box");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  loginBox.innerHTML = `
    <div class="popup">
      <h2>Hey ${user.name} 👋</h2>
      <p class="quote">"${randomQuote}"</p>
      <button class="ok-btn">Okay</button>
    </div>
  `;

  document.querySelector(".ok-btn").onclick = () => {
    showLocationButtons(user);
  };
}

function showLocationButtons(user) {
  const loginBox = document.querySelector(".login-box");
  loginBox.innerHTML = `<h3>Select Location</h3>`;

  const container = document.createElement("div");
  container.className = "location-buttons";

  user.business.forEach(loc => {
    const btn = document.createElement("button");
    btn.innerText = loc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    btn.onclick = () => {
      // ✅ Log which location they clicked (if multiple)
      fetch(webhookURL, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          business: loc
        }),
        headers: { "Content-Type": "application/json" }
      });

      sessionStorage.setItem("loggedIn", true);
      window.location.href = `${loc}.html`;
    };
    container.appendChild(btn);
  });

  loginBox.appendChild(container);
}

function showError() {
  const errorBox = document.getElementById('error-msg');
  errorBox.textContent = 'Invalid credentials';
  errorBox.classList.add('shake');

  setTimeout(() => {
    errorBox.classList.remove('shake');
  }, 400);
}
