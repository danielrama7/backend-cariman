module.exports = fn = data => {
    return {
        "id": data.id ? data.id.value : '',
        "nama": data.nama ? data.nama.value : '',
        "kategori": data.kategoriName ? data.kategoriName.value : '',
        "nama_ilmiah": data.nama_ilmiah ? data.nama_ilmiah.value : '',
        "urlFoto": data.urlFoto ? data.urlFoto.value : '',
        "deskripsi": data.deskripsi ? data.deskripsi.value : ''
    }
}