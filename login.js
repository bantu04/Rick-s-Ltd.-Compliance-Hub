/* ✅ login.js - full smart login with name logging and validation */

const webhookURL = "https://script.google.com/macros/s/AKfycbzdB6oglQvB5MNBy_5OdsYmkDWI9f74Vo5XzvtixvbUNA7FjgQuVZv1ex16Bxay78z_/exec";

// ✅ All users with names
const users = [
  { email: "India.chambers11@gmail.com", password: "2004", name: "India", business: ["stclaire-valentine"] },
  { email: "yashikar653@gmail.com", password: "2002", name: "Ritu", business: ["stclaire-valentine"] },
  { email: "mdaullah86@gmail.com", password: "1986", name: "Ahsan", business: ["stclaire-valentine"] },
  { email: "abtshahed@gmail.com", password: "1998", name: "Shahed", business: ["stclaire-valentine"] },
  { email: "oliviarr08@gmail.com", password: "2008", name: "Olivia", business: ["stclaire-valentine"] },
  { email: "stclements@phillys.com", password: "1234", name: "St Clements", business: ["phillys-stclements"] },
  { email: "rick@diner.com", password: "1234", name: "Rick", business: ["ricks-diner"] },
  { email: "dejejus14@yahoo.com", password: "1990", name: "Abito", business: ["ricks-diner"] },
  { email: "Constantio", password: "1992", name: "Soares", business: ["ricks-diner"] },
  { email: "toprakcideniz@gmail.com", password: "1995", name: "Deniz", business: ["ricks-diner"] },
  { email: "sonaruksha97@gmail.com", password: "1997", name: "Sona", business: ["ricks-diner", "stclaire-valentine"] },
  { email: "valentine@stclaire.com", password: "1234", name: "Valentine", business: ["stclaire-valentine"] },
  { email: "bantu.maruthi990@gmail.com", password: "1999", name: "Bantu", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
  { email: "sbenbakhti@gmail.com", password: "1234", name: "Sami", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
];

// ✅ Quotes
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

// ✅ Login handler
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  const user = users.find(u =>
  (u.email.toLowerCase() === email || u.name.toLowerCase() === email) && u.password === password);
  
  if (!user) {
    errorMsg.innerText = "Invalid credentials.";
    errorMsg.classList.add("shake");
    setTimeout(() => errorMsg.classList.remove("shake"), 400);
    return false;
  }

  sessionStorage.setItem("loggedIn", true);
  showGreeting(user);
  return false;
}

// ✅ Greeting popup
function showGreeting(user) {
  const loginBox = document.querySelector(".login-box");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  loginBox.innerHTML = `
    <div class="popup">
      <h2>Hey ${user.name} 👋</h2>
      <p class="quote">"${randomQuote}"</p>
      <button class="ok-btn">Proceed</button>
    </div>
  `;

  document.querySelector(".ok-btn").onclick = () => showLocationButtons(user);
}

// ✅ Show business locations
function showLocationButtons(user) {
  const loginBox = document.querySelector(".login-box");
  loginBox.innerHTML = `<h3>Select Location</h3>`;

  const container = document.createElement("div");
  container.className = "location-buttons";

  if (user.business.length === 1) {
    const loc = user.business[0];
    logToSheet(user.email, user.name, loc);
    window.location.href = `${loc}.html`;
    return;
  }

  user.business.forEach(loc => {
    const btn = document.createElement("button");
    btn.innerText = loc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    btn.onclick = () => {
      logToSheet(user.email, user.name, loc);
      sessionStorage.setItem("loggedIn", true);
      window.location.href = `${loc}.html`;
    };

    container.appendChild(btn);
  });

  loginBox.appendChild(container);
}

// ✅ Logging function (prevents "Unknown")
function logToSheet(email, name, business) {
  if (!email || !name || !business) {
    console.warn("Missing data, not logging:", { email, name, business });
    return;
  }

  const url = `${webhookURL}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&business=${encodeURIComponent(business)}`;

  fetch(url)
    .then(res => res.text())
    .then(data => console.log("Logged:", data))
    .catch(err => console.error("Log failed:", err));
}
