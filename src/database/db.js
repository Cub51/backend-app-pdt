const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect("mongodb://localhost/appDT", {
        }).then(() => console.log('Database connected')).catch(err => console.log(err));
        //console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;