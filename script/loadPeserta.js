import config from './config.js';

google.charts.load('current', { packages: ['table'] });
google.charts.setOnLoadCallback(loadPesertaList);

function loadPesertaList() {
  const sheetName = config.sheets.PESERTA_QURBAN.sheet_name;
  const sheetId = config.gsheet;

  const queryString = encodeURIComponent("SELECT A, B");
  const dataSourceUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&headers=1&tq=${queryString}`;

  const query = new google.visualization.Query(dataSourceUrl);
  query.send(function(response) {
    const pesertaList = document.getElementById("peserta_list");
    if (response.isError()) {
      pesertaList.innerHTML = "Gagal memuat data peserta.";
      return;
    }

    const data = response.getDataTable();
    let html = '<ul>';
    for (let i = 0; i < data.getNumberOfRows(); i++) {
      const nama = data.getValue(i, 1);
      html += `<li><a href="view.html?nama=${encodeURIComponent(nama)}">${data.getValue(i, 0)} - ${nama}</a></li>`;
    }
    html += '</ul>';
    pesertaList.innerHTML = html;
  });
}
