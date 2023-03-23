const {Router} = require("express");

const { createdAc, getActivities } = require("../controllers/controllerActivity")

const activityRoutes = Router()

activityRoutes.get("/", getActivities)

activityRoutes.post('/', async (req,res)=>{
    const {
        nombre, 
        dificultad, 
        duracion,
        temporada,
        idCountry
    } = req.body;
    
    try{
        if(!nombre)
        return res.status(409).json({Message: "Nombre is required"});
        
        if(!dificultad)
        return res.status(409).json({Message: "Dificultad is required"});
        
        if(dificultad < 0 || dificultad > 6)
        return res.status(409).json({Message: "Enter a number from 1 to 5"});
        
        if(temporada !== "verano" && temporada !== "otoño" && temporada !== "invierno"&& temporada !== "primavera")
        return res.status(409).json({Message: "Enter a valid season: Verano, Otoño, Invierno o Primavera"});
    
        
        else{
            const newActivity = await createdAc(nombre, dificultad , duracion, temporada);
            await newActivity.setCountries(idCountry);
            res.status(200).json(newActivity)
        
        }
    }catch(error){
        res.status(400).json({ error: error.message })
    }
});

module.exports = activityRoutes