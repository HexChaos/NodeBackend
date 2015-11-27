var express = require('express');
var router = express.Router();
var fsCtrl = require('../controllers/filesystem');

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()


//var auth = require('../middlewares/authentication');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Handling a filesystem request ', Date.now());
  next();
});

router.get('/userFile', fsCtrl.ReadUserfile);
router.get('/userFile/:userId', fsCtrl.ReadUserfileWithId);
router.post('/userFile', jsonParser, fsCtrl.WriteUserfile);

//TODO for now we just redirect to the same functions since files are written to the same root
router.get('/publicFile', fsCtrl.ReadUserfile);
router.get('/publicFile/:userId', fsCtrl.ReadUserfileWithId);
router.post('/publicFile', fsCtrl.WriteUserfile);

router.delete('/userFile/:fileId', fsCtrl.DeleteUserFileWithId);
router.post('/userFile/delete', fsCtrl.DeleteUserFile);

//TODO for now we just redirect to the same functions since files are written to the same root
router.delete('/publicFile/:fileId', fsCtrl.DeleteUserFileWithId);
router.post('/publicFile/delete', fsCtrl.DeleteUserFile);

router.get('/userFiles', fsCtrl.ReadAllUserFiles);
router.get('/publicFiles', fsCtrl.ReadAllUserFiles);

router.delete('/userFiles', fsCtrl.DeleteAllUserFiles);
router.delete('/publicFiles', fsCtrl.DeleteAllUserFiles);

module.exports = router;
