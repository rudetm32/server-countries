const { Op } = require("sequelize")

const { Country , Activity} = require('../db');
const { getApiData}= require("../utils/index")


const postCountry = async(req, res)=>{
    const backUp= await getApiData();
    try {
       backUp.map(async(detail)=>{
            await Country.findOrCreate({
                where : {
                    id : detail.id,
                    name : detail.name,
                    capital : detail.capital,
                    continent : detail.continents,
                    subregion : detail.subregion,
                    population : detail.population,
                    area : detail.area,
                    image: detail.image,
                }
            })
        })
        res.status(200).json("The data was loaded into the DB")
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
};
const getCountry = async(req, res) => {
    const{ name }  = req.query;    
    try {
        if(!name){
            const search = await Country.findAll({
                include: {
                    model: Activity
                  }
            });      
            search.length===0 ?
            res.status(400).json({Error: "Something is wrong!"}) :
            res.status(200).json(search);
        }else{
            const string  = name.toLowerCase().split(" ").map((Mayus)=>{
                return Mayus[0].toUpperCase() + Mayus.substring(1);
             });
             const fixName= string.join(" ");
            
             const search = await Country.findAll({
                where:{
                    name: {[Op.iLike]: `%${fixName}%`},          
                },
            })
            search.length===0 ?
            res.status(400).json({Message: `No matches with the name ${name}`}) :
            res.status(200).json(search);
        }
    }catch (error) {
        res.status(400).json({ error: error.message })
    };
};

const getCountryById = async(req, res) => {
    const { idPais }= req.params;
    try {
        const search = await Country.findByPk(idPais, {include: {
            model: Activity
          }});
        if(!search){
            res.status(400).json({Message: (`No matches with the id ${idPais}`)}); 
        }else{
            res.status(200).json(search);
        };
    }catch (error) {
        res.status(400).json({ error: error.message })
    };
};


module.exports = {
    postCountry,
    getCountry,
    getCountryById
}
