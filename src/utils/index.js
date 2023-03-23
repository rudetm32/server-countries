const axios = require("axios");


const getApiData= async(req, res)=>{

    try{
        const getApi = await axios.get("https://restcountries.com/v3/all");
        const response = getApi.data;
        const mapResponse= response.map((country)=>{
            return{                
                    id : country.cca3,
                    name : country.translations.spa.common,
                    capital : country.capital ?
                    country.capital[0]
                    : "Empty field",
                    continents : country.continents[0],
                    subregion : country.subregion?
                    country.subregion
                    :"Empty field",
                    population : country.population,
                    area : country.area,
                    image : country.flags[1] 
            }
        });
        return mapResponse 
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
}

module.exports={
    getApiData,
 }
