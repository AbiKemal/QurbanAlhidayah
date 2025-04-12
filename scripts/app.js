// Konfigurasi Google Apps Script Web App
const GAS_URL = "https://script.google.com/macros/s/AKfycbwNZM3eOm_5kHUAlNQOYjL9qIuBbs-WfIRsVdInb8Ppgl-U8ozh4mK0jqPwZQQs62Ih/exec";

// Fungsi untuk memuat data dari Google Sheets
async function fetchData(endpoint, params = {}) {
    try {
        const url = new URL(GAS_URL);
        url.searchParams.append('endpoint', endpoint);
        
        // Tambahkan parameter lainnya
        for (const key in params) {
            url.searchParams.append(key, params[key]);
        }
        
        const response = await fetch(url.toString());
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        showErrorToast('Gagal memuat data');
        return null;
    }
}

// Fungsi untuk mengirim data ke Google Sheets
async function postData(endpoint, data = {}) {
    try {
        const url = new URL(GAS_URL);
        url.searchParams.append('endpoint', endpoint);
        
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        showErrorToast('Gagal mengirim data');
        return null;
    }
}

// Fungsi untuk menampilkan pesan error
function showErrorToast(message) {
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Fungsi untuk menampilkan pesan sukses
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
