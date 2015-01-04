(function() {
  var main;

  main = require('../');

  exports['test main'] = function(assert) {
    return assert.pass('Unit test running!');
  };

  exports['test main async'] = function(assert, done) {
    assert.pass('async Unit test running!');
    return done();
  };

  exports['test dummy'] = function(assert, done) {
    return main.dummy('foo', function(text) {
      assert.ok(text === 'foo', 'Is the text actually `foo`');
      return done;
    });
  };

  require('sdk/test').run(exports);


  /*
  var main = require("../");
  
  exports["test main"] = function(assert) {
    assert.pass("Unit test running!");
  };
  
  exports["test main async"] = function(assert, done) {
    assert.pass("async Unit test running!");
    done();
  };
  
  exports["test dummy"] = function(assert, done) {
    main.dummy("foo", function(text) {
      assert.ok((text === "foo"), "Is the text actually 'foo'");
      done();
    });
  };
  
  require("sdk/test").run(exports);
   */

}).call(this);
