const {Router} = require("express");

const { 
    getCountryById, 
    getCountry, 
    postCountry
} = require("../controllers/controllerCountry");


const countryRoutes = Router()


countryRoutes.get("/", getCountry)

countryRoutes.get("/:idPais", getCountryById);

countryRoutes.post("/", postCountry);


module.exports = countryRoutes