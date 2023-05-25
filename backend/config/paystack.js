const axios = require('axios');

const paystack = (request) => {
  const MySecretKey = 'Bearer sk_live_f169be3d3e2a074033cb34c6c9c92a1f64b0117d';

  const initializePayment = (form, mycallback) => {
    const options = {
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        Authorization: MySecretKey,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      data: form,
      params: {
        subaccount: 'ACCT_3org68z257h2yhu',
        transaction_charge: 15000,
      },
    };

    axios
      .post(options.url, options.data, {
        headers: options.headers,
        params: options.params,
      })
      .then((response) => {
        mycallback(null, response.data);
      })
      .catch((error) => {
        mycallback(error);
      });
  };

  const verifyPayment = (ref, mycallback) => {
    const options = {
      url: `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
      headers: {
        Authorization: MySecretKey,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    };

    axios
      .get(options.url, {
        headers: options.headers,
      })
      .then((response) => {
        mycallback(null, response.data);
      })
      .catch((error) => {
        mycallback(error);
      });
  };

  return { initializePayment, verifyPayment };
};

module.exports = paystack;
