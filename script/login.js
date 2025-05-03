import config from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const adminId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch(config.sheets.Admin.id);
      const text = await response.text();

      const rows = parseCSV(text);
      console.log("Data login:", rows); // Debug opsional

      const found = rows.find(([_, id, __, pass]) => id === adminId && pass === password);

      if (found) {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "admin.html";
      } else {
        errorMessage.textContent = "ID atau Password salah!";
      }
    } catch (error) {
      console.error("Gagal memuat data admin:", error);
      errorMessage.textContent = "Terjadi kesalahan saat mengakses data.";
    }
  });
});

function parseCSV(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .slice(1) // skip header
    .map(row =>
      row
        .split(',')
        .map(cell => cell.replace(/^\uFEFF/, '').trim()) // hapus BOM dan trim
    );
}
