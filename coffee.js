'use strict';

let CoffeeScript = require('coffee-script').compile;

module.exports = function(superjoin, log) {
  superjoin.registerImportPattern('coffee', /require\s+\'(.+?)\'/);

  superjoin.registerTask('precompile', function* () {
    let opts = {
      bare: true
    };

    for (let script of this.scripts) {
      if (!script.hasPrecompilation && script.ext === 'coffee') {
        try {
          script.source = CoffeeScript(script.source, opts);
        }
        catch (err) {
          throw new Error('CoffeeScript compilation error', err);
        }

        script.hasPrecompilation = true;
        script.orig = {
          name: script.name,
          ext: 'coffee'
        };

        script.name = script.name += '.js';
        script.ext = 'js';
      }

      if (!script.hasPrecompilation && script.ext === 'cson') {
        try {
          script.source = CoffeeScript('module.exports =\n' + script.source, opts);
        }
        catch (err) {
          throw new Error('CoffeeScript compilation error', err);
        }

        script.hasPrecompilation = true;
        script.orig = {
          name: script.name,
          ext: 'cson'
        };

        script.name = script.name += '.js';
        script.ext = 'js';
      }
    }
  });

  superjoin.registerTask('collect', function* CoffeeCollectTask() {
    for (let script of this.scripts) {
      if (script.ext === 'coffee' || script.ext === 'cson') {
        let match = script.source.match(/require\s*\(?(\'|".+?\'|")?\)/g);
      }
    }
  });
};
