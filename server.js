const express = require('express');
const cors = require('cors');
const exp = require('constants');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// set static folder
app.use(express.static('public'));

// Routes 
app.use('/api', require('./routes/index')); 

// enable cors 
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})