// Proteksi halaman
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'login.html';
}

// Logout
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
});
