document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('pesertaForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      nama: form.nama.value,
      jumlah: form.jumlah.value,
      jenis: form.jenis.value,
    };

    google.script.run
      .withSuccessHandler(function (res) {
        message.textContent = 'Data berhasil dikirim!';
        form.reset();
      })
      .withFailureHandler(function (err) {
        message.textContent = 'Gagal mengirim: ' + err.message;
      })
      .simpanPeserta(data);
  });
});
