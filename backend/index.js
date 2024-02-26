require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
//Connect To MongoDB
try {
    connectToMongo();
} catch (error) {
    console.error(error.message);
}


//Creating Node APP at Port 5000
const app = express();
const port = process.env.PORT || 8000;

//Middleware
app.use(cors());
app.use(express.json());



//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

//Listen App At port 5000
app.listen(port, () => {
    console.log(`Notebook backend listening at ${port}`);
})