const { Activity, Country } = require('../db');

const getActivities = async(req, res) => {
try {
    const search = await Activity.findAll({
            
            include: {
                model: Country,
            }
        });
        res.status(200).json(search)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const createdAc = async (nombre, dificultad, duracion, temporada) => {
    try{
        const activity = {nombre, dificultad, duracion, temporada}
      
        return Activity.create(activity)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
};
   
module.exports = {
    createdAc,
    getActivities
}