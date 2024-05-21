const {Router} = require('express');
const router = Router();
const register = require('../controllers/register');

router.route('/').post(register);
//app.get("/user/:id", getUserById);
//app.post("/register", register);
//app.post("/login", login);

module.exports = router;
