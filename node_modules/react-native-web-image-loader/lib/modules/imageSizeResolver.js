'use strict';

var _imageSize = require('image-size');

var _imageSize2 = _interopRequireDefault(_imageSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (path) {
    return (0, _imageSize2.default)(path);
};