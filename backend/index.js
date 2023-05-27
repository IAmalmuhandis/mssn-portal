require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const monnifService = require('./config/MonifyService');
const database = require('./models/donor');
const PaymentService = require('./config/PaymentService');

// initialise the express app
const app = express();

// use helmet
app.use(helmet());

// use the body parser
app.use(bodyParser.json());

// next enable cors for all requests
app.use(cors());

app.get('/api/student', async (request, response) => {
    const { Donor } = database;
    response.send(Donor).status(200);
});

app.post('/api/student/process-payment', async (request, response) => {
    const { amount, name, regNo, paymentDescription, department, level, phone } = request.body;

    const checkoutUrl = await PaymentService.initialiseTransaction(amount, name, regNo, paymentDescription, department, level, phone);

    if (checkoutUrl === null) {
        response.send('Error processing payment. Try again').status(400);
    }

    response.send(checkoutUrl).status(200);
});

app.post('/api/monnify/webhook', async (request, response) => {
    response.status(200);

    const webhookResponse = await monnifService.handleWebhook(request.body);
    response.send(webhookResponse);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
