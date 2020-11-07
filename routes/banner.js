var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('banner', {
    index:4
  });
});

module.exports = router;
