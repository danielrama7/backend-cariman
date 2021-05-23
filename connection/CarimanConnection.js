const axios = require('axios');
const qs = require('qs');

const DATA_URL = "http://localhost:3030";

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

exports.getCariman = async(param)=>{
    // Query
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
        SELECT ?id ?nama ?kategori ?nama_ilmiah ?urlFoto ?deskripsi
        WHERE{
            ?sub rdf:type data:tanaman
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:nama ?nama.}
            OPTIONAL {?sub data:kategori ?kategori.}
            OPTIONAL {?sub data:nama_ilmiah ?nama_ilmiah.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:deskripsi ?deskripsi.}
            FILTER regex(?nama, "${param.nama ? param.nama : ''}", "i")
            FILTER regex(?id, "${param.id ? param.id : ''}", "i")
            FILTER regex(?kategori, "${param.kategori ? param.kategori : ''}", "i")
            FILTER regex(?nama_ilmiah, "${param.nama_ilmiah ? param.nama_ilmiah : ''}", "i")
            FILTER regex(?nama_ilmiah, "${param.deskripsi ? param.deskripsi : ''}", "i")
        }`
    
    };
    try{
        const {data} = await axios(`${DATA_URL}/Cariman/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        console.log(data.results);
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports = exports;
