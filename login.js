/* ✅ login.js - smart login handler with session tracking */

const users = [
  { email: "cowley@phillys.com", password: "1234", business: ["phillys-cowley"] },
  { email: "stclements@phillys.com", password: "1234", business: ["phillys-stclements"] },
  { email: "rick@diner.com", password: "1234", business: ["ricks-diner"] },
  { email: "valentine@stclaire.com", password: "1234", business: ["stclaire-valentine"] },
  { email: "bantu.maruthi990@gmail.com", password: "1234", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
  { email: "sbenbakhti@gmail.com", password: "1234", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
];

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    errorMsg.innerText = "Invalid credentials.";
    errorMsg.classList.add("shake");
    setTimeout(() => errorMsg.classList.remove("shake"), 400);
    return false;
  }

  // Set session login flag
  sessionStorage.setItem("loggedIn", true);

  // Admin with multiple locations
  if (user.business.length > 1) {
    document.querySelector("form").style.display = "none";
    const loginBox = document.querySelector(".login-box");
    const locationDiv = document.createElement("div");
    locationDiv.className = "location-buttons";
    locationDiv.innerHTML = `<h3>Select Location</h3>`;

    user.business.forEach(loc => {
      const btn = document.createElement("button");
      btn.innerText = loc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      btn.onclick = () => {
        sessionStorage.setItem("loggedIn", true);
        window.location.href = `${loc}.html`;
        return false;
      };
      locationDiv.appendChild(btn);
    });

    loginBox.appendChild(locationDiv);
  } else {
    window.location.href = `${user.business[0]}.html`;
    return false;
  }

  return false;
}

function showError() {
  const errorBox = document.getElementById('error-msg');
  errorBox.textContent = 'Invalid credentials';
  errorBox.classList.add('shake');

  setTimeout(() => {
    errorBox.classList.remove('shake');
  }, 400);
}
