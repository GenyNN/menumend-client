describe('rip-out', function () {
  'use strict';

  var assume = require('assume');
  var rip = require('./');

  it('returns a clone of the object', function () {
    var obj = { foo: 'bar' };
    var clone = rip(obj);

    assume(obj).does.not.equal(clone);
    assume(obj).deep.equals(clone);
  });

  it('removes the unwanted properties from the object', function () {
    var obj = { foo: 'bar', baz: 'baz', bar: 'bar' };
    var clone = rip(obj, 'baz', 'bar');

    assume(clone).has.length(1);
    assume(clone.foo).equals('bar');
  });
});
