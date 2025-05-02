let globalTable, globalData;

google.charts.load('current', { packages: ['table'] });
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  const sheetId = '1aNWfGYIqARaSmDXl0eqJ5Sy6htOgBgMTIZC1SlZA0vA';
  const sheetName = 'DATABASE';
  const queryString = encodeURIComponent("SELECT B, C, D, E, G, H");
  const dataSourceUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&headers=1&tq=${queryString}`;

  const query = new google.visualization.Query(dataSourceUrl);
  query.send(function (response) {
    if (response.isError()) {
      document.getElementById("table_div").innerHTML =
        'Gagal memuat data: ' + response.getMessage();
      return;
    }

    const data = response.getDataTable();
    const newData = new google.visualization.DataTable();

    newData.addColumn('number', 'NO');
    newData.addColumn('string', 'NAMA');
    newData.addColumn('string', 'BULAN');
    newData.addColumn('number', 'JUMLAH');
    newData.addColumn('string', 'TGL INPUT');
    newData.addColumn('string', 'BUKTI TRANSFER');
    newData.addColumn('string', 'KETERANGAN');

    let totalJumlah = 0;

    for (let i = 0; i < data.getNumberOfRows(); i++) {
      const no = i + 1;
      const nama = data.getValue(i, 0);
      const bulan = data.getValue(i, 1);
      const jumlah = data.getValue(i, 2) || 0;
      const tgl = data.getFormattedValue(i, 3);
      const buktiLink = data.getValue(i, 4);
      const keterangan = data.getValue(i, 5);

      const buktiHTML = `<a href="${buktiLink}" target="_blank">Lihat Bukti</a>`;
      totalJumlah += jumlah;

      newData.addRow([no, nama, bulan, jumlah, tgl, buktiHTML, keterangan]);
    }

    globalData = newData;
    globalTable = new google.visualization.Table(document.getElementById('table_div'));
    globalTable.draw(newData, {
      showRowNumber: false,
      width: '100%',
      allowHtml: true
    });

    document.getElementById('total_div').innerHTML =
      `TOTAL TABUNGAN: Rp ${totalJumlah.toLocaleString()}`;
  });
}

function filterData() {
  const input = document.getElementById('filterNama').value.toLowerCase();

  const view = new google.visualization.DataView(globalData);
  view.setRows(globalData.getFilteredRows([{
    column: 1,
    test: function (value) {
      return value.toLowerCase().includes(input);
    }
  }]));

  globalTable.draw(view, {
    showRowNumber: false,
    width: '100%',
    allowHtml: true
  });
}

function exportToExcel() {
  const table = document.querySelector('#table_div table');
  if (!table) {
    alert("Tabel belum tersedia.");
    return;
  }

  let tableHTML = table.outerHTML;
  tableHTML = tableHTML.replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '');

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Tabungan Qurban</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
    </head>
    <body>
      ${tableHTML}
    </body>
    </html>`;

  const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'tabungan_qurban.xls';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
