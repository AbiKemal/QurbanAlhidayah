// Initialize Google Charts
function initGoogleCharts(callback) {
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(callback);
}

// Load data from Google Sheets
function loadSheetData(sheetConfig, elementId) {
  const queryString = encodeURIComponent(sheetConfig.default_query);
  const dataSourceUrl = `${config.API.BASE_URL}${sheetConfig.gsheet_id}${config.API.GVIZ_ENDPOINT}?sheet=${sheetConfig.sheet_name}&headers=1&tq=${queryString}`;

  const query = new google.visualization.Query(dataSourceUrl);
  query.send((response) => handleQueryResponse(response, elementId));
}

// Handle query response
function handleQueryResponse(response, elementId) {
  if (response.isError()) {
    document.getElementById(elementId).innerHTML = "Gagal memuat data peserta.";
    console.error(response.getMessage());
    return;
  }

  const data = response.getDataTable();
  renderParticipantList(data, elementId);
}

// Render participant list
function renderParticipantList(data, elementId) {
  let html = '<ul>';
  for (let i = 0; i < data.getNumberOfRows(); i++) {
    const nama = data.getValue(i, 1); // Kolom B
    html += `<li><a href="view.html?nama=${encodeURIComponent(nama)}">${data.getValue(i, 0)} - ${nama}</a></li>`;
  }
  html += '</ul>';
  document.getElementById(elementId).innerHTML = html;
}

// Error handler
function handleError(error, elementId = "peserta_list") {
  console.error(error);
  document.getElementById(elementId).innerHTML = "Terjadi kesalahan saat memuat data.";
}
