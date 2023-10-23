const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
//Connect To MongoDB
try {
    connectToMongo();
    console.log("Connect to MongoDB Successfully");
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}


//Creating Node APP at Port 5000
const app = express();
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json());



//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

//Listen App At port 5000
app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
})