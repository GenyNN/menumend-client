'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _asyncFs = require('./asyncFs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolver = function _callee(resource, scalings) {
    var fileData, suffixes, result, i, suffix, filePath, stats;
    return _regenerator2.default.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    fileData = _path2.default.parse(resource);
                    suffixes = (0, _keys2.default)(scalings);
                    result = {};
                    i = 0;

                case 4:
                    if (!(i < suffixes.length)) {
                        _context.next = 19;
                        break;
                    }

                    suffix = suffixes[i];
                    _context.prev = 6;
                    filePath = _path2.default.join(fileData.dir, '' + fileData.name + suffix + fileData.ext);
                    _context.next = 10;
                    return _regenerator2.default.awrap((0, _asyncFs.statAsync)(filePath));

                case 10:
                    stats = _context.sent;


                    if (stats.isFile()) {
                        result[suffix] = filePath;
                    }
                    _context.next = 16;
                    break;

                case 14:
                    _context.prev = 14;
                    _context.t0 = _context['catch'](6);

                case 16:
                    i++;
                    _context.next = 4;
                    break;

                case 19:
                    return _context.abrupt('return', result);

                case 20:
                case 'end':
                    return _context.stop();
            }
        }
    }, null, this, [[6, 14]]);
};

module.exports = resolver;