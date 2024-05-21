const {Router} = require('express');
const router = Router();
const login = require('../controllers/login');

// Ruta para iniciar sesión
router.route('/').post(login);

module.exports = router;
