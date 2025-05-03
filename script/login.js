import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const adminSheet = config.sheets.Admin;
      const csvUrl = config.getCsvUrl(adminSheet.gid);
      const response = await fetch(csvUrl);
      const csvText = await response.text();

      const rows = csvText.trim().split('\n').slice(1); // Skip header
      const credentials = rows.map(row => {
        const cols = row.split(',');
        return {
          id: cols[1]?.trim(),
          password: cols[3]?.trim()
        };
      });

      const user = credentials.find(user => user.id === username && user.password === password);

      if (user) {
        window.location.href = 'admin.html';
      } else {
        loginError.textContent = 'ID atau Password salah.';
      }
    } catch (error) {
      console.error('Login error:', error);
      loginError.textContent = 'Terjadi kesalahan saat memproses login.';
    }
  });
});
