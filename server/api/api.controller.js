
'use strict';

var _ = require('lodash');

var hal = require('express-hal');

// Get list of things
exports.index = function(req, res) {
  res.type('application/hal+json').hal({
    links: {
      self: req.originalUrl,
      'things': [
        { href: '/api/things', type: 'application/hal+json', title: 'HAL Embedded' },
        { href: '/api/things', type: 'application/vnd.siren+json', title: 'Siren' },
        { href: '/api/things', type: 'application/json', title: 'Link Headers' }
      ]
    }
  });
};

