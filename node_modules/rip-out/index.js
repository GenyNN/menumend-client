'use strict';

/**
 * Clone a given object and rip out the keys that we don't want.
 *
 * @param {Object} obj Object that needs to be cloned and cleaned.
 * @param {Arguments} ...args Keys that need to be ignored in cloning.
 * @returns {Object} Fresh object.
 * @public
 */
module.exports = function ripout(obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  var result = {};

  for (var key in obj) {
    if (~args.indexOf(key)) continue;

    result[key] = obj[key];
  }

  return result;
};
