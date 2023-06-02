const express = require('express');

const axios = require('axios');

const { v4: uuidv4 } = require('uuid');

const { body } = require('express-validator');

const router = express.Router();

const dotenv = require('dotenv');
const { json, text } = require('body-parser');
const e = require('express');
dotenv.config({ path: __dirname + '/../config/.env' }); // go to config folder from the parent directory ../

router.post('/text', (req, res, next) => {
    let key = process.env.AZURE_KEY;
    let endpoint = "https://api.cognitive.microsofttranslator.com";

    const texts = req.body.texts;
    // console.log(texts);


    // location, also known as region.
    // required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
    let location = process.env.AZURE_RESOURCE_LOCATION;

    let parsedTexts;

    if (Array.isArray(texts)) {
        if (texts.length > 0) {
            texts.forEach((text) => {
                if (typeof text !== 'string') {
                    return res.status(400).json({
                        message: 'Please provide an array of strings'
                    });
                }
            });
        } else {
            return res.status(400).json({
                message: 'Array is empty. Please provide an array of strings'
            });
        }

        parsedTexts = texts.map((text) => { return { 'text': text } })

    } else {
        if (typeof texts == 'string') {
            parsedTexts = [{ 'text': texts }];
        } else {
            return res.status(400).json({
                message: 'Please provide a string'
            });
        }
    }


    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            // location required if you're using a multi-service or regional (not global) resource.
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            // 'from': 'fil',
            'to': ['en']
        },
        data: parsedTexts,
        responseType: 'json'
    }).then(function (response) {
        // console.log(JSON.stringify(response.data, null, 4));
        res.status(200).json(response.data);
        console.log("Translation successful");
    })
    .catch(function (error) {
        console.log(error);
    });

});

module.exports = router;