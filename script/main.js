import config from './config.js';

google.charts.load('current', { packages: ['table'] });
google.charts.setOnLoadCallback(loadPesertaList);

function loadPesertaList() {
  const sheetInfo = config.sheets.PESERTA_QURBAN;
  const queryString = encodeURIComponent("SELECT A, B");

  const dataSourceUrl = `https://docs.google.com/spreadsheets/d/${config.gsheet}/gviz/tq?sheet=${sheetInfo.sheet_name}&headers=1&tq=${queryString}`;

  const query = new google.visualization.Query(dataSourceUrl);
  query.send((response) => {
    if (response.isError()) {
      document.getElementById("peserta_list").innerHTML = "Gagal memuat data peserta.";
      return;
    }

    const data = response.getDataTable();
    let html = '<ul>';
    for (let i = 0; i < data.getNumberOfRows(); i++) {
      const nama = data.getValue(i, 1); // Kolom B
      html += `<li><a href="view.html?nama=${encodeURIComponent(nama)}">${data.getValue(i, 0)} - ${nama}</a></li>`;
    }
    html += '</ul>';
    document.getElementById("peserta_list").innerHTML = html;
  });
}
