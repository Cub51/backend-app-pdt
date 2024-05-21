const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();


//settings
app.set("port", process.env.PORT || 5000);

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/login", require("./routes/loginRoute"));
app.use("/register", require("./routes/registerRoute"));
app.use("/user", require("./routes/userIdRoute"));
app.use("/curso", require("./routes/courseRoute"));
app.use("/enroll", require("./routes/enrollRoute"));
app.use("/profile", require("./routes/profileRoute"));
app.use("/practica", require("./routes/practicaRoute"));
app.use("/practicaEstado", require("./routes/practicaEstadoRoute"));


module.exports = app;