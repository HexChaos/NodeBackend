var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //TODO redirect to something
  res.render('index', { title: 'Express' });
});

module.exports = router;
