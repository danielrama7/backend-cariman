const connection = require('../connection/CarimanConnection');
const Format = require('../tools/format');

module.exports.getCariman = async(req, res)=>{
        try{
            console.log("function starting")
            // Query data dari repo
            let cariman = await connection.getCariman(req.query);

            if(!cariman.bindings.length){
                return res.status(200).json({
                    data:[],
                    message: "Data tidak ditemukan"
                });
            }

            cariman = cariman.bindings.map((tanaman)=>Format(tanaman));

            if(req.params.id){
                let tanaman = cariman.filter((tanaman)=>{
                    return tanaman.id == req.params.id
                });
                res.status(200).json({
                    data:tanaman[0],
                    message: tanaman.length ? 'Data tanaman berhasil didapatkan' : 'Tidak ada hasil dari pencarian'
                })
            }else{
                res.status(200).json({
                    data: cariman,
                    message: "Menampilkan semua tanaman"
                })
            }
        }catch(err){
            res.status(400).json(err);
        }
    }