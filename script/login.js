import config from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const adminId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch(config.sheets.Admin.id, {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      });

      const text = await response.text();
      const rows = parseCSV(text);

      const found = rows.some(row => {
        const id = clean(row[1]);
        const pass = clean(row[3]);
        return id === adminId && pass === password;
      });

      if (found) {
        
        localStorage.setItem("loggedIn", "true"); 

        window.location.href = "admin.html";
      } else {
        errorMessage.textContent = "ID atau Password salah!";
      }

    } catch (err) {
      console.error("Login Error:", err);
      errorMessage.textContent = "Terjadi kesalahan koneksi.";
    }
  });
});

function parseCSV(data) {
  return data
    .split(/\r?\n/)
    .slice(1) // skip header
    .map(row => row.split(',').map(cell => clean(cell)));
}

function clean(text) {
  return text.replace(/^\uFEFF/, '').trim().replace(/"/g, '');
}
