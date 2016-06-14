Incorporate Checkout into site
<script src="https://checkout.stripe.com/checkout.js"></script>

<button id="customButton">Rent</button>

<script>
  var handler = StripeCheckout.configure({
    key: 'pk_test_g30q1NSYR71zAPQs8yu4LVGS',
    image: '/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
    }
  });

  $('#customButton').on('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'share-anything',
      description: '2 widgets',
      amount: 2000
    });
    e.preventDefault();
  });

  // Close Checkout on page navigation:
  $(window).on('popstate', function() {
    handler.close();
  });
</script>
https://stripe.com/docs/checkout/tutorial
returned element gets stored in a hidden element called stripeToken
checkout submits form to server
Note-creating token does not constitute payment, server makes actual payment request
Page containging checkout must start with https://
======================================================================
panelLabel  The label of the payment button in the Checkout form (e.g. Subscribe, Pay {{amount}}, etc.). If you include {{amount}} in the label value, it will be replaced by a localized version of data-amount. Otherwise, a localized data-amount will be appended to the end of your label. Checkout does not translate custom labels to the user's preferred language.
============================================================================================
SERVER SIDE
// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_mOcnZGfWiOqaZ3oygDXWEUSH");

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
var stripeToken = request.body.stripeToken;

var charge = stripe.charges.create({
  amount: 1000, // amount in cents, again
  currency: "usd",
  source: stripeToken,
  description: "Example charge"
  metadata: {'order_id': '6735'}//this line is optional, will submit info to stripe dashboard about transaction
                                //not visible to customer
}, function(err, charge) {
  if (err && err.type === 'StripeCardError') {
    // The card has been declined
  }
});
