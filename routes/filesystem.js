'use strict';

var express = require('express');
var router = express.Router();
var fsCtrl = require('../controllers/filesystem.js');
//var auth = require('../middlewares/authentication');

router.get('/userFile', fsCtrl.ReadUserfile);
router.get('/userFile/:userId', fsCtrl.ReadUserfileWithId);
router.post('/userFile', fsCtrl.WriteUserfile);

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
router.get('/publicFiles', fsCtrl.ReadAllPublicFiles);

router.delete('/userFiles', fsCtrl.DeleteAllUserFiles);
router.delete('/publicFiles', fsCtrl.DeleteAllPublicFiles);

module.exports = router;
