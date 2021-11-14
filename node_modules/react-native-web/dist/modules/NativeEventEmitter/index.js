/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule NativeEventEmitter
 * @noflow
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NativeEventEmitter = function () {
  function NativeEventEmitter() {
    _classCallCheck(this, NativeEventEmitter);
  }

  NativeEventEmitter.prototype.addListener = function addListener() {};

  NativeEventEmitter.prototype.emit = function emit() {};

  NativeEventEmitter.prototype.listeners = function listeners() {};

  NativeEventEmitter.prototype.once = function once() {};

  NativeEventEmitter.prototype.removeAllListeners = function removeAllListeners() {};

  NativeEventEmitter.prototype.removeCurrentListener = function removeCurrentListener() {};

  NativeEventEmitter.prototype.removeListener = function removeListener() {};

  NativeEventEmitter.prototype.removeSubscription = function removeSubscription() {};

  return NativeEventEmitter;
}();

module.exports = NativeEventEmitter;