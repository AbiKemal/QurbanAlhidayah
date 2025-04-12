// Fungsi untuk mendapatkan opsi nama dari Google Sheets
async function loadNamaOptions() {
    try {
        const data = await fetchData('getNamaOptions');
        const select = document.getElementById('nama');
        
        if (data && data.nama) {
            select.innerHTML = '<option value="">Pilih Nama</option>' + 
                data.nama.map(name => `<option value="${name}">${name}</option>`).join('');
        }
    } catch (error) {
        console.error('Error loading nama options:', error);
        showErrorToast('Gagal memuat daftar nama');
    }
}

// Fungsi untuk mendapatkan opsi bulan dari Google Sheets
async function loadBulanOptions() {
    try {
        const data = await fetchData('getBulanOptions');
        const select = document.getElementById('bulan');
        
        if (data && data.bulan) {
            select.innerHTML = '<option value="">Pilih Bulan</option>' + 
                data.bulan.map(month => `<option value="${month}">${month}</option>`).join('');
        }
    } catch (error) {
        console.error('Error loading bulan options:', error);
        showErrorToast('Gagal memuat daftar bulan');
    }
}

// Fungsi untuk menyimpan data form ke Google Sheets
async function saveFormData(formData) {
    try {
        const result = await postData('saveData', formData);
        
        if (result && result.success) {
            showSuccessToast('Data berhasil disimpan!');
            return true;
        } else {
            showErrorToast('Gagal menyimpan data');
            return false;
        }
    } catch (error) {
        console.error('Error saving form data:', error);
        showErrorToast('Terjadi kesalahan saat menyimpan');
        return false;
    }
}
