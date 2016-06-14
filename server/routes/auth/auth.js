var User = require('../../db/user/user.js');
var express = require('express');
var router = express.Router();
var utils = require('../../utils/utils.js');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET || 'sleepingpuppies';
//Added this line for stripe payment
var stripe = require("stripe")("sk_test_mOcnZGfWiOqaZ3oygDXWEUSH");

/**
 *  Request Handler for POST Method
 *  @expected data with Req - Login credentials (username, password)
 *  @return {Object} - contains user data object (username, displayName, email) and JWT token string
 */
router.post('/login', function(req, res){
  var user = req.body;
  User.findOne({username: user.username})
    .then(function(found){
      if(found){
        found.comparePassword(user.password)
          .then(function(result){
            if(result){
              found = utils.getCleanUser(found);
              var token = utils.generateToken(found);
              res.json({
                user: found,
                token: token
              });
            } else {
              res.status(401).send('Username or password incorrect');
            }
          })
          .catch(function(err){
            res.status(404).send(err);
          });
      } else {
        res.status(401).send('Username or password incorrect');
      }
    })
    .catch(function(err){
      res.status(404).send(err);
    });
});

/**
 *  Request Handler for POST(create) Method
 *  @expected data with Req - Complete user data(username, password, displayName, email)
 *  @return {Object} - contains user data object (username, displayName, email) and JWT token string
 */
router.post('/signup', function(req, res){
  var user = req.body;
  console.log(user)
  User.findOne({username: user.username})
    .then(function(found){
      if(!found){
        var newUser = new User({
          username: user.username,
          password: user.password,
          displayName: user.displayName ? user.displayName : user.username,
          email: user.email
        });
        newUser.save()
          .then(function(newUser){
            console.log('Account created!');
            newUser = utils.getCleanUser(newUser);
            var token = utils.generateToken(newUser);
            res.json({
              user: newUser,
              token: token
            });
          })
          .catch(function(err){
            res.status(500).send(err);
          });
      } else {
        console.log('Account already exists');
        res.status(500).end();
      }
    })
    .catch(function(err){
      res.status(404).send(err);
    });
});

/**
 *  Request Handler for Verification Request
 *  @expected Header with Req - User's Token data should be included
 *  @return {Object} - contains user data object (username, displayName, email) and JWT token string
 */
router.get('/verify', function(req, res) {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secret, function(err, user) {
    if(err) {
      console.log(err);
      return res.status(401).end();
    }
    User.findOne({username: user.username})
      .then(function(user) {
        if(user) {
          user = utils.getCleanUser(user);
          res.json({
            user: user,
            token: token
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).end();
      });
  });
});
//========================================================
router.post('/payment', function(req, res){

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
  var stripeToken = req.body.id;
  var amount = req.body.amount;
  console.log(req.body);
  // var stripeToken = req.body.stripeToken;


  var charge = stripe.charges.create({
    amount: amount, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      console.log(err);
    } else {
      console.log("Payment accepted Thank you")
    }
  });
})
//==========================================================

module.exports = router;
