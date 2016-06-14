var User = require('../../db/user/user.js');
var express = require('express');
var expressJwt = require('express-jwt');
var router = express.Router();
var secret = process.env.JWT_SECRET || 'sleepingpuppies';

/**
 *  Request Handler for PUT(update) Method
 *  @expected data with Req - 1. ObjectId as parameter(req.params.id)
 *                            2. Complete user data including the field need to be updated(req.body)
 *  @expected Header with Req - { "Authorization": "Bearer <JWT_TOKEN>"}
 */
/*router.put('/:id', expressJwt({secret: secret}), function(req, res){
  var id = req.params.id;
  var user = req.body;
  User.findByIdAndUpdate(id, user).then(function () {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});*/

/*router.put('/resetpassword', expressJwt({secret: secret}), function(req, res){
  console.log(req.user);
  var username = req.user.username;
  var pass = req.body.newPass;
  User.findOneAndUpdate({username: username}, {password: pass}).then(function () {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});*/

router.put('/resetpassword', expressJwt({secret: secret}), function(req, res) {
  console.log(req.user)
  var username = req.user.username;
  var pass = req.body.newPass;
  User.findOne({username: username})
    .then(function(found) {
      if (found) {
        found.password = pass;
      }
      found.save()
        .then(function() {
          res.end()
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    })
    .catch(function(err) {
      res.status(404).send(err);
    })

});

/**
 *  Request Handler for Put(update) Method
 *  @expected data with Req - updated user information
 *  @expected Header with Req - { "Authorization": "Bearer <JWT_TOKEN>"}
 *  @expected Params in URL - User ID
 */
router.put('/rent/:id', expressJwt({secret: secret}), function(req, res){
  var id = req.params.id;
  var user = req.body;
  User.findByIdAndUpdate(id, user).then(function () {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});

module.exports = router;
