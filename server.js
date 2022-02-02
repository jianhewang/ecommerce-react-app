// express is a lib to allow us to build an API server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const req = require('express/lib/request');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// process the request body and convert to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

if(process.env.NODE_ENV === 'production'){
    // serve all static files(html, css, js) in the build
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if (error) throw error;
});

app.get('/service-worker.js', (req, res)=> {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
})

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }

    stripe.charges.create(body, (stripeErr, stripRes) => {
        if (stripeErr){
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripRes });
        }
    })
})