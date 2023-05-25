const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const { Donor } = require('./models/donor');
const { initializePayment, verifyPayment } = require('./config/paystack')(request);

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));

app.post('/paystack/pay', (req, res) => {
  const form = req.body;

  // Additional form validation and processing if needed

  initializePayment(form, (error, body) => {
    if (error) {
      console.log(error);
      return res.redirect('/error');
    }

    const response = JSON.parse(body);
    const authorizationUrl = response.data.authorization_url;
    res.redirect(authorizationUrl);
  });
});



app.get('/paystack/callback', (req, res) => {
  const ref = req.query.reference;

  verifyPayment(ref, (error, body) => {
    if (error) {
      console.log(error);
      return res.redirect('/error');
    }

    const response = JSON.parse(body);
    const data = response.data;

    // Extract required data from the response

    const newDonor = {
      reference: data.reference,
      amount: data.amount,
      email: data.customer.email,
      full_name: data.metadata.full_name,
      regno: data.metadata.regno,
      phone: data.metadata.phone,
      course: data.metadata.course,
      level: data.metadata.level
    };

    const donor = new Donor(newDonor);

    donor
      .save()
      .then((donor) => {
        if (!donor) {
          return res.redirect('/error');
        }

        res.json({ donor }); // Send a JSON response with the donor data
      })
      .catch((e) => {
        res.redirect('/error');
      });
  });
});

app.get('/error', (req, res) => {
  res.send('Error occurred');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
