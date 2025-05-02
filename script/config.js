const gsheet = "1aNWfGYIqARaSmDXl0eqJ5Sy6htOgBgMTIZC1SlZA0vA";

const rawSheetsConfig = {
  DATABASE: {
    sheet_name: "DATABASE",
    id: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm/pub?gid=2142822523&single=true&output=csv"
  },
  PESERTA_QURBAN: {
    sheet_name: "PESERTA_QURBAN",
    id: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm/pub?gid=2033279411&single=true&output=csv"
  },
  LIST_BULAN: {
    sheet_name: "LIST_BULAN",
    id: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm/pub?gid=2028680504&single=true&output=csv"
  },
  Admin: {
    sheet_name: "list_Admin",
    id: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUl5hfyzjnnT1H-bN9Q5U5s4OXqnbWN0mDflynJnyA76bp8bMOYEMDvwnBY1UqwDJ8_P10jfOM0uOm/pub?gid=400129141&single=true&output=csv"
  }
};

// Fungsi untuk ekstrak GID dari URL
function extractGidFromUrl(url) {
  const match = url.match(/gid=(\d+)/);
  return match ? match[1] : null;
}

// Konversi ke config dengan gid terpisah
const sheetsConfig = {};
for (const key in rawSheetsConfig) {
  sheetsConfig[key] = {
    ...rawSheetsConfig[key],
    gid: extractGidFromUrl(rawSheetsConfig[key].id)
  };
}
