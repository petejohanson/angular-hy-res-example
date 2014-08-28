'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/things', function() {

  it('should respond with redirect to first page', function(done) {
    request(app)
      .get('/api/things')
      .expect(302)
      .expect('Location', '/api/things/page/1')
      .end(function(err, res) {
        done();
      });
  });
});
