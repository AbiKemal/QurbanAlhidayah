// script/admin.js
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  if (isLoggedIn !== "true") {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // Fungsi logout
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
});
