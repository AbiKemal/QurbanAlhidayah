import config from './config.js';

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const adminId = document.getElementById('adminId').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch(config.sheets.Admin.id);
    const csv = await response.text();

    const lines = csv.trim().split('\n').slice(1); // Hapus header
    const admins = lines.map(line => {
      const [no, id, name, pass] = line.split(',');
      return { id: id.trim(), name: name.trim(), password: pass.trim() };
    });

    const match = admins.find(admin => admin.id === adminId && admin.password === password);
    
    if (match) {
      // Simpan sesi admin (bisa diubah sesuai kebutuhan)
      localStorage.setItem('adminLogin', JSON.stringify({ id: match.id, name: match.name }));
      window.location.href = 'master.html'; // Redirect ke halaman master
    } else {
      errorMessage.textContent = 'ID atau Password salah.';
    }
  } catch (err) {
    console.error('Login error:', err);
    errorMessage.textContent = 'Gagal memuat data login.';
  }
});
