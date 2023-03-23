const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoutes = require("../routes/countryRoutes");
const activityRoutes = require('./activityRouter');

const routes = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
routes.use("/countries", countryRoutes)
routes.use("/activity", activityRoutes)

module.exports = routes;
