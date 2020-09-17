'use strict';

require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');

const PORT = 8080;

const smooch = new Smooch({
    keyId: process.env.SMOOCH_KEY_ID,
    secret: process.env.SMOOCH_KEY_SECRET,
    scope: 'app'
});

const app = express();

app.use(bodyParser.json());

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#webhooks-payload
app.post('/', function(req, res) {

    console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

    const appUserId = req.body.appUser._id;

    // Call REST API to send message https://docs.smooch.io/rest/#post-message
    if (req.body.trigger === 'message:appUser') {

        let messages = [
            'That\'s very interesting. Please tell me more.',
            'Wow!',
            'Have you tried turning it off and back on?',
            'I think it\'s supposed to do that.',
            'I\'ll ask my manager...',
            'Just a moment...'
        ];

        smooch.appUsers.sendMessage(appUserId, {
            type: 'text',
            text: messages[Math.floor(Math.random()*messages.length)],
            role: 'appMaker'
        })
            .then((response) => {
                console.log('API RESPONSE:\n', response);
                res.end();
            })
            .catch((err) => {
                console.log('API ERROR:\n', err);
                res.end();
            });

        setTimeout(() => {
            smooch.appUsers.sendMessage(appUserId, {
                type: 'text',
                text: "Are you listening?",
                role: 'appMaker'
            })
                .then((response) => {
                    console.log('API RESPONSE:\n', response);
                })
                .catch((err) => {
                    console.log('API ERROR:\n', err);
                });
        }, 60000);

    }


});

// Listen on port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

