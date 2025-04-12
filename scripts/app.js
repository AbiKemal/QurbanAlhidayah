// Konfigurasi Google Apps Script Web App
const GAS_URL = "https://script.google.com/macros/s/AKfycbwNZM3eOm_5kHUAlNQOYjL9qIuBbs-WfIRsVdInb8Ppgl-U8ozh4mK0jqPwZQQs62Ih/exec";

// Fungsi untuk memuat data dari Google Sheets
async function fetchData(endpoint, params = {}) {
    const url = new URL(GAS_URL);
    url.searchParams.append('endpoint', endpoint);
    
    // Tambahkan parameter lainnya
    for (const key in params) {
        url.searchParams.append(key, params[key]);
    }
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors', // Penting untuk GitHub Pages
            cache: 'no-cache'
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Fungsi untuk mengirim data ke Google Sheets
async function postData(endpoint, data = {}) {
    const url = new URL(GAS_URL);
    url.searchParams.append('endpoint', endpoint);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        return null;
    }
}
