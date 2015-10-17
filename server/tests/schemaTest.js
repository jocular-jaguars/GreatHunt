var expect = require('chai').expect;
var mongoose = require('mongoose');
var Hunt = require('../db/huntModel.js');
var Challenge = require('../db/challengeModel.js');

describe('Mongoose models', function() {

  it('huntModel should be a Mongoose model', function() {
    expect(new Hunt()).to.be.instanceOf(mongoose.Model);
  });

  it('challengeModel should be a Mongoose model', function() {
    expect(new Challenge()).to.be.instanceOf(mongoose.Model);
  });
});
