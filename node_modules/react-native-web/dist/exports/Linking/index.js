'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var initialURL = _ExecutionEnvironment.canUseDOM ? window.location.href : ''; /**
                                                                               * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                               * Copyright (c) 2015-present, Facebook, Inc.
                                                                               *
                                                                               * This source code is licensed under the MIT license found in the
                                                                               * LICENSE file in the root directory of this source tree.
                                                                               *
                                                                               * @providesModule Linking
                                                                               * 
                                                                               */

var Linking = {
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  canOpenURL: function canOpenURL() {
    return Promise.resolve(true);
  },
  getInitialURL: function getInitialURL() {
    return Promise.resolve(initialURL);
  },
  openURL: function openURL(url) {
    try {
      open(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

var open = function open(url) {
  var anchor = document.createElement('a');
  anchor.target = '_blank'; // :(
  anchor.rel = 'noopener';
  anchor.href = url;
  anchor.click();
};

exports.default = Linking;