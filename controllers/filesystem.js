'use strict';

/**
 *  Module dependencies
 */

//var _ = require('lodash');
//var mongoose = require('mongoose');
//var User = mongoose.model('User');
//var ObjectId = mongoose.Types.ObjectId;

/**
 *  Module exports
 */
 module.exports.ReadUserfile = ReadUserfile;
 module.exports.ReadUserfileWithId = ReadUserfileWithId;
 module.exports.WriteUserfile = WriteUserfile;
 module.exports.DeleteUserFileWithId = DeleteUserFileWithId;
 module.exports.DeleteUserFile = DeleteUserFile;
 module.exports.ReadAllUserFiles = ReadAllUserFiles;
 module.exports.DeleteAllUserFiles = DeleteAllUserFiles;

function ReadUserfileWithId(req, res, next) {
  var readstream = gridfsstream.createReadStream({
    _id: req.params.fileId
  });
  req.on('error', function(err) {
    res.send(500, err);
  });
  readstream.on('error', function (err) {
    res.send(500, err);
  });
  readstream.pipe(res);
};

function ReadUserfile(req, res, next) {
  var readstream = gridfsstream.createReadStream({ filename: req.param('filename') });
  req.on('error', function(err) {
    res.send(500, err);
  });
  readstream.on('error', function (err) {
    res.send(500, err);
  });
  readstream.pipe(res);
};

function WriteUserfile(req, res, next) {
  var fileEncoding = req.params.Encoding;
  if( fileEncoding == "Base64"){
    var encodedFile = req.params.Data;
    var decodedFile = new Buffer(encodedFile, 'base64');
    var writestream = gridfsstream.createWriteStream({
      filename: req.params.Filename
    });
    fs.createReadStream(req.files.file.path).pipe(writestream);

    writestream.on('close', function (file) {
      //TODO send a properly formatted response!
      //Maybe send back fileId?!?
      res.send("Success!");
      fs.unlink(req.files.file.path, function (err) {
        if (err) console.error("Error: " + err);
        console.log('successfully deleted : '+ req.files.file.path );
      });
    });
  }else{
    var writestream = gridfsstream.createWriteStream({
      filename: req.files.file.name
    });
    fs.createReadStream(req.files.file.path).pipe(writestream);

    writestream.on('close', function (file) {
      //TODO send a properly formatted response!
      //Maybe send back fileId?!?
      res.send("Success!");
      fs.unlink(req.files.file.path, function (err) {
        if (err) console.error("Error: " + err);
        console.log('successfully deleted : '+ req.files.file.path );
      });
    });
  }
};

function DeleteUserFile(req, res, next) {
  gridfsstream.remove(({
    filename: req.params.Filename
    }), function (err) {
    if (err) return handleError(err);
    console.log('success');
    res.send("OK!");
  });
};

function DeleteUserFileWithId(req, res, next) {
  gridfsstream.remove(({
    _id: req.params.fileId
    }), function (err) {
    if (err) return handleError(err);
    console.log('success');
    res.send("OK!");
  });
};

function ReadAllUserFiles(req, res, next) {
  gridfs.list(function(err, list){
      if(err){
          console.log(err);
      }else{
          list.forEach(function(filename){
              console.log(filename);
          });
          res.send(list);
      }
  });
};

function DeleteAllUserFiles(req, res, next) {
  //TODO no op for now
  res.send("OK!");
};
