import config from './config.js';

google.charts.load('current', { 'packages': ['table'] });
google.charts.setOnLoadCallback(drawTable);

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function drawTable() {
  const nama = getQueryParam("nama");
  if (!nama) {
    document.getElementById("table_div").innerHTML = "Nama peserta tidak ditemukan di URL.";
    return;
  }

  document.getElementById("judul").innerHTML = `
    <div class="header">
      <h2>KARTU TABUNGAN QURBAN TAHUN 2026</h2>
      <p>Kp. Pasar Senen Desa Ciasihan Kec. Pamijahan</p>
    </div>
    <div class="info">
      <div><strong>NAMA:</strong> ${nama}</div>
      <div style="text-align:right;">
        <strong>Jumlah Dana Qurban</strong><br>
        RP 3.000.000
      </div>
    </div>
  `;

  const sheetId = config.gsheet;
  const sheetName = config.sheets.DATABASE.sheet_name;
  const queryString = encodeURIComponent(`SELECT C, D, E WHERE B = '${nama}'`);
  const dataSourceUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&headers=1&tq=${queryString}`;

  const query = new google.visualization.Query(dataSourceUrl);
  query.send(function (response) {
    if (response.isError()) {
      document.getElementById("table_div").innerHTML = 'Gagal memuat data: ' + response.getMessage();
      return;
    }

    const rawData = response.getDataTable();
    const numRows = rawData.getNumberOfRows();

    const formattedData = new google.visualization.DataTable();
    formattedData.addColumn('number', 'NO');
    formattedData.addColumn('string', 'BULAN');
    formattedData.addColumn('number', 'JUMLAH');
    formattedData.addColumn('string', 'TGL INPUT');

    let total = 0;
    for (let i = 0; i < numRows; i++) {
      const bulan = rawData.getValue(i, 0);
      const jumlah = rawData.getValue(i, 1);
      const tgl = rawData.getFormattedValue(i, 2);
      if (typeof jumlah === 'number') {
        total += jumlah;
      }
      formattedData.addRow([i + 1, bulan, jumlah, tgl]);
    }

    const table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(formattedData, { showRowNumber: false, width: '100%', height: 'auto' });

    document.getElementById("total_tabungan").innerHTML =
      `TOTAL TABUNGAN: Rp ${total.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;
  });
}
