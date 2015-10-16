var expect = require('chai').expect;
var mongoose = require('mongoose');
var Hunt = require('../huntModel.js');
var Challenge = require('../challengeModel.js');

describe('Mongoose models', function() {

  it('huntModel should be a Mongoose model', function() {
    expect(new Hunt()).to.be.instanceOf(mongoose.Model);
  });

  it('challengeModel should be a Mongoose model', function() {
    expect(new Challenge()).to.be.instanceOf(mongoose.Model); 
  });
});
