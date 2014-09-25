
'use strict';

var _ = require('lodash');

var things = [
  {
  name : 'Development Tools',
  info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
  name : 'Server and Client integration',
  info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
  name : 'Smart Build System',
  info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
  name : 'Modular Structure',
  info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
  name : 'Optimized Build',
  info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
  name : 'Deployment Ready',
  info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  }
];

exports.page = function(req, res) {
  var pageNum = parseInt(req.params.num);
  var start = (pageNum - 1) * 2;
  var end = pageNum * 2;
  var thingsSubset = [];

  for (var i = start; i < things.length && i < end; ++i) {
    thingsSubset.push(things[i]);
  }

  var next = null,
    prev = null;

  if (pageNum > 1) {
    prev = '/api/things/page/' + (pageNum - 1);
  }

  if (pageNum < 3) {
    next = '/api/things/page/' + (pageNum + 1);
  }

  var sections = [];

  for(i = 1; i <= 3; i++) {
    sections.push({
      href: '/api/things/page/' + i,
      title: i+''
    });
  }
  res.format({
    'application/json': function() {
      var links = {
        self: req.originalUrl
      };
      if (next) {
        links.next = next;
      }
      if (prev) {
        links.prev = prev;
      }

      res.links(links);

      if (sections.length > 0) {
        var lh = res.get('Link') + ', ';
        var s = sections[i];

        res.set('Link', lh + sections.map(function(s) {
          return '<' + s.href + '>; rel="section"; title="' + s.title + '"';
        }).join(', '));
      }

      res.json({
        things: thingsSubset
      });
    },
    'application/hal+json': function() {
      for (var i = 0; i < sections.length; i++) {
        sections[i].type = 'application/hal+json';
      }
      var links = {
        self: req.originalUrl,
        section: sections
      };

      if (next) {
        links.next = { href: next, type: 'application/hal+json' };
      }

      if (prev) {
        links.prev = { href: prev, type: 'application/hal+json' };
      }

      res.type('application/hal+json').hal({
        links: links,
        data: {
          things: thingsSubset
        }
      });
    }
  });
};

// Get list of things
exports.index = function(req, res) {
  res.redirect('/api/things/page/1');
};

