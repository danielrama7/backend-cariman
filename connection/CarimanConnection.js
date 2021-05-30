const axios = require('axios');
const qs = require('qs');

const DATA_URL = "http://localhost:3030";
// const DATA_URL = "http://31.220.62.156:3030";

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

module.exports.getCariman = async(param)=>{
    // Query
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
        SELECT ?id ?nama ?kategoriName ?nama_ilmiah ?urlFoto ?deskripsi
        WHERE{
            ?sub rdf:type data:tanaman
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:nama ?nama.}
            OPTIONAL {?sub data:kategori ?kategoriID.}
            OPTIONAL {?sub data:nama_ilmiah ?nama_ilmiah.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:deskripsi ?deskripsi.}
            OPTIONAL {?kategoriID data:kategoriName ?kategoriName.}
            FILTER regex(?nama, "${param.nama ? param.nama : ''}", "i")
            FILTER regex(?id, "${param.id ? param.id : ''}", "i")
            FILTER regex(?kategoriName, "${param.kategori ? param.kategori : ''}", "i")
            FILTER regex(?nama_ilmiah, "${param.nama_ilmiah ? param.nama_ilmiah : ''}", "i")
            FILTER regex(?deskripsi, "${param.deskripsi ? param.deskripsi : ''}", "i")
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

module.exports.getSuggestion = async(param)=>{
    // Query
    const queryData = {
    query: `PREFIX data:<http://example.com/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    SELECT ?id ?nama ?kategoriName ?nama_ilmiah ?urlFoto ?deskripsi
    WHERE{
        ?sub rdf:type data:tanaman
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:nama ?nama.}
            OPTIONAL {?sub data:kategori ?kategoriID.}
            OPTIONAL {?sub data:nama_ilmiah ?nama_ilmiah.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:deskripsi ?deskripsi.}
            OPTIONAL {?kategoriID data:kategoriName ?kategoriName.}
        FILTER regex(?kategoriName, "${param.kategori ? param.kategori : ''}", "i")
    } ORDER BY RAND() LIMIT 5`
    };
    try{
        const {data} = await axios(`${DATA_URL}/Cariman/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};
