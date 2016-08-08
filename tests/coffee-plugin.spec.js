'use strict';

var fl = require('node-fl');

var Superjoin = require('../modules/superjoin');
var CoTasks = require('co-tasks');
var inspect = require('inspect.js');
var sinon = require('sinon');
inspect.useSinon(sinon);

describe('Superjoin', function() {
  describe('grepSubmodules', function() {
    let superjoin;
    let addModuleStub;

    beforeEach(function() {
      superjoin = new Superjoin();
      addModuleStub = sinon.stub(superjoin, 'addModule');
    });

    afterEach(function() {
      addModuleStub.restore();
    });

    it('Should grep a js require statement using coffee syntax', function() {
      superjoin.grepSubmodules({
        ext: 'coffee',
        source: 'var foo = require \'./foo/bar.coffee\'',
        path: 'test.coffee'
      });

      inspect(addModuleStub).wasCalledOnce();
      inspect(addModuleStub).wasCalledWith('test.coffee', './foo/bar.coffee');
    });
  });
});
