var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = require('../db.js');

var dbURI = 'mongodb://localhost/hunt'

var clearDB = function(done) {
  mongoose.connection.collections['hunts'].remove(done);
}
describe('Hunt Model', function() {
  //Connect to database first
  before(function(done) {
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

});
