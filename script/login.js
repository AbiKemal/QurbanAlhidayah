import config from './config.js';

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const adminId = document.getElementById('adminId').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  try {
    const response = await fetch(config.sheets.Admin.id);
    const text = await response.text();
    const rows = text
                .trim()
                .split(/\r?\n/)
                .slice(1)
                .map(row => row.split(',').map(cell => cell.trim()));

    const found = rows.find(([_, id, __, pass]) => id === adminId && pass === password);



    if (found) {
      // Simpan status login
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('adminId', adminId);
      // Arahkan ke halaman admin
      window.location.href = 'admin.html';
    } else {
      errorMessage.textContent = 'ID atau Password salah!';
    }
  } catch (error) {
    console.error('Gagal mengambil data admin:', error);
    errorMessage.textContent = 'Terjadi kesalahan saat login.';
  }
});
