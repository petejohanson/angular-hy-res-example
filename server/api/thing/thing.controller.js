
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

exports.item = function(req, res) {
  var n = parseInt(req.params.num);
  if (n < 0 || n > things.length) {
    res.status(404).send('');
    return;
  }

  var t = things[n];

  res.json(t);
};

exports.page = function(req, res) {
  var pageNum = parseInt(req.params.num);
  var start = (pageNum - 1) * 2;
  var end = pageNum * 2;
  var thingsSubset = [];
  var embed = '';
  if (req.query.embed) {
    embed = '?embed=true';
  }

  for (var i = start; i < things.length && i < end; ++i) {
    thingsSubset.push(things[i]);
  }

  var next = null,
    prev = null;

  if (pageNum > 1) {
    prev = '/api/things/page/' + (pageNum - 1) + embed;
  }

  if (pageNum < 3) {
    next = '/api/things/page/' + (pageNum + 1) + embed;
  }

  var sections = [];

  for(i = 1; i <= 3; i++) {
    sections.push({
      href: '/api/things/page/' + i + embed,
      title: i+''
    });
  }

  var SIREN_TYPE = 'application/vnd.siren+json';
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

        res.set('Link', lh + sections.map(function(s) {
          return '<' + s.href + '>; rel="section"; title="' + s.title + '"';
        }).join(', '));
      }

      for(var j = 0; j < thingsSubset.length; j++) {
        var l = res.get('Link') + ', ';
	res.set('Link', l + '</api/things/thing/' + (start + j) + '>; rel="item"');
      }

      res.status(204).send('');
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

      var embeds = {};

      if (req.query.embed) {
        embeds.item = thingsSubset;
      } else {
        links.item = [];
        for(var j = 0; j < thingsSubset.length; j++) {
          links.item.push({
            href: '/api/things/thing/' + (start + j)
          });
        }
      }

      res.type('application/hal+json').hal({
        links: links,
        embeds: embeds
      });
    },
    'application/vnd.siren+json': function() {
      var links = [
        { rel: ['self'], href: req.originalUrl, type: SIREN_TYPE }
      ];
      if (next) {
        links.push({ rel: ['next'], href: next, type: SIREN_TYPE });
      }

      if (prev) {
        links.push({ rel: ['prev'], href: prev, type: SIREN_TYPE });
      }

      res.type('application/vnd.siren+json').send({
        links: links,
        entities: thingsSubset.map(function(t, i) {
          var href = '/api/things/thing/' + (start + i);
          var ret = {
            rel: ['item']
          };

          if (req.query.embed) {
            ret.links = [ { rel: 'self', href: href } ];
            ret.properties = {
              name: t.name,
                info: t.info
            };
          } else {
            ret.href = href;
          }

          return ret;
        })
      });
    }
  });
};

// Get list of things
exports.index = function(req, res) {
  var page1 = '/api/things/page/1';
  if (req.query.embed) {
    page1 += '?embed=true';
  }
  res.redirect(page1);
};


