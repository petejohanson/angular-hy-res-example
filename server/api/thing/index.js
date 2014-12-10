'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/page/:num', controller.page);
router.get('/thing/:num', controller.item);

module.exports = router;
