
'use strict';

var _ = require('lodash');

var hal = require('express-hal');

// Get list of things
exports.index = function(req, res) {
  res.hal({
    links: {
      self: req.originalUrl,
      'thing-collection': '/api/things/'
    }
  });
};

