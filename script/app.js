// Main application logic
document.addEventListener('DOMContentLoaded', () => {
  initGoogleCharts(() => {
    loadSheetData(config.SHEETS.PESERTA_QURBAN, "peserta_list");
  });
});
