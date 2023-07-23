const express = require('express');
const router = express.Router();
const needle = require('needle');
const url = require('url');

const API_URL = process.env.API_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY = process.env.API_KEY;
// const URL = "https://api.openweathermap.org/data/2.5/weather";

router.get('/', async (req, res) => {
    console.log(url.parse(req.url, true).query)

    const unit_name = "&units=";
    const unit_value = "metric";
    const unit = unit_name + unit_value;

    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY,
            ...url.parse(req.url, true).query,
        })
        const apiResponse = await needle('get', `${API_URL}?${params}` + unit)
        console.log(apiResponse);
        const data = apiResponse.body;
        console.log(data);
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_URL}?${params}`)
        }
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({err})

    }

})
module.exports = router