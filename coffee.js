'use strict';

let CoffeeScript = require('coffee-script').compile;

let collectSubModules = function(source) {
  module = [];


};

module.exports = function(superjoin, log) {
  superjoin.registerTask('precompile', function* () {
    let opts = {
      bare: true
    };

    for (let script of this.scripts) {
      if (!script.hasPrecompilation && script.ext === 'coffee') {
        script.source = CoffeeScript(script.source, opts);
      }
    }
  });

  superjoin.registerTask('collect', function* () {
    for (let script of this.scripts) {
      console.log(script);
      if (script.ext === 'coffee') {
        let match = script.source.match(/require\s*\(?(\'|".+?\'|")?\)/g);
        console.log('Submodules', match);
      }
    }
  });
};
