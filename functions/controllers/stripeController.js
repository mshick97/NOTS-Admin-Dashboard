require('dotenv').config();
const Stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.STRIPE_TEST_KEY : process.STRIPE_KEY);

const stripeController = {};

stripeController.getTotalRevenue = async (req, res, next) => {
  // Stripe.products
  //   .create({
  //     name: 'Testing Subscription',
  //     description: 'A testing subscription for $10/month',
  //   })
  //   .then((product) => {
  //     Stripe.prices
  //       .create({
  //         unit_amount: 1000,
  //         currency: 'usd',
  //         recurring: {
  //           interval: 'month',
  //         },
  //         product: product.id,
  //       })
  //       .then((price) => {
  //         console.log(product);
  //         console.log(price);
  //         res.locals.item = { product, price };
  //       });
  //   });
  return next();
};

module.exports = stripeController;
