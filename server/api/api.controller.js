
'use strict';

var _ = require('lodash');

var hal = require('express-hal');

// Get list of things
exports.index = function(req, res) {
  res.type('application/hal+json').hal({
    links: {
      self: req.originalUrl,
      'things': [
        { href: '/api/things', type: 'application/hal+json', title: 'HAL Linked' },
        { href: '/api/things?embed=true', type: 'application/hal+json', title: 'HAL Embedded' },
        { href: '/api/things', type: 'application/vnd.siren+json', title: 'Siren Linked' },
        { href: '/api/things?embed=true', type: 'application/vnd.siren+json', title: 'Siren Embedded' },
        { href: '/api/things', type: 'application/json', title: 'Link Headers' }
      ]
    }
  });
};

