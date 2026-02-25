function signup() {
  const user = document.getElementById("signupUser").value;
  const pass = document.getElementById("signupPass").value;

  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  alert("Signup successful!");
  window.location.href = "login.html";
}

function login() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  if (user === storedUser && pass === storedPass) {
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}