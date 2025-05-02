document.addEventListener("DOMContentLoaded", () => {
  console.log("Halaman index.html dimuat");

  fetch("config.json")
    .then(res => res.json())
    .then(config => {
      console.log("Data konfigurasi berhasil dimuat:", config);
    })
    .catch(err => console.error("Gagal memuat konfigurasi:", err));
});

