'use strict';

let config   = require('../config');

module.exports = require(`./${config.useDialect}`);

