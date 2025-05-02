document.addEventListener("DOMContentLoaded", () => {
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(loadPesertaList);
});

function loadPesertaList() {
  // Ambil config JSON dari tag <script>
  const configScript = document.getElementById("config-data");
  const config = JSON.parse(configScript.textContent || '{}');
  const pesertaConfig = config["PESERTA_QURBAN"];

  if (!pesertaConfig || !gsheet) {
    document.getElementById("peserta_list").innerHTML = "Konfigurasi tidak ditemukan.";
    return;
  }

  const sheetName = pesertaConfig.sheet || "PESERTA_QURBAN";
  const queryString = encodeURIComponent("SELECT A, B");
  const dataSourceUrl = `https://docs.google.com/spreadsheets/d/${gsheet}/gviz/tq?sheet=${sheetName}&headers=1&tq=${queryString}`;

  const query = new google.visualization.Query(dataSourceUrl);
  query.send(function(response) {
    if (response.isError()) {
      document.getElementById("peserta_list").innerHTML = "Gagal memuat data peserta.";
      return;
    }

    const data = response.getDataTable();
    let html = '<ul>';
    for (let i = 0; i < data.getNumberOfRows(); i++) {
      const nama = data.getValue(i, 1);
      html += `<li><a href="view.html?nama=${encodeURIComponent(nama)}">${data.getValue(i, 0)} - ${nama}</a></li>`;
    }
    html += '</ul>';
    document.getElementById("peserta_list").innerHTML = html;
  });
}
