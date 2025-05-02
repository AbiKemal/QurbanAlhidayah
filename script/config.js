const BASE_GSHEET_EXPORT = "https://docs.google.com/spreadsheets/d/e/";
const BASE_GSHEET_VIEW = "https://docs.google.com/spreadsheets/d/";
const COMMON_EXPORT_SUFFIX = "&single=true&output=csv";

const config = {
  SHEETS: {
    DATABASE: {
      sheet_name: "DATABASE",
      gid: "2142822523",
      export_id: "2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm"
    },
    PESERTA_QURBAN: {
      sheet_name: "PESERTA_QURBAN",
      gid: "2033279411",
      export_id: "2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm",
      default_query: "SELECT A, B"
    },
    LIST_BULAN: {
      sheet_name: "LIST_BULAN",
      gid: "2028680504",
      export_id: "2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm"
    },
    Admin: {
      sheet_name: "list_Admin",
      gid: "400129141",
      export_id: "2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm"
    }
  },
  API: {
    BASE_URL: BASE_GSHEET_VIEW,
    GVIZ_ENDPOINT: "/gviz/tq"
  },
  getExportUrl(sheet) {
    const s = config.SHEETS[sheet];
    return `${BASE_GSHEET_EXPORT}${s.export_id}/pub?gid=${s.gid}${COMMON_EXPORT_SUFFIX}`;
  }
};

// GSheet ID khusus untuk akses langsung
const gsheet = "1aNWfGYIqARaSmDXl0eqJ5Sy6htOgBgMTIZC1SlZA0vA";
