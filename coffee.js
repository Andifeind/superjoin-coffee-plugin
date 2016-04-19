'use strict';

let CoffeeScript = require('coffee-script').compile;

let collectSubModules = function(source) {
  module = [];


};

module.exports = function(superjoin, log) {
  superjoin.registerTask('precompile', function* (pipe) {
    let opts = {
      bare: true
    };

    for (let script of pipe.scripts) {
      if (!script.hasPrecompilation && script.ext === 'coffee') {
        script.source = CoffeeScript(script.source, opts);
      }
    }

    return pipe;
  });

  superjoin.registerTask('collect', function* (pipe) {
    console.log('COLLECT', pipe);
    for (let script of pipe.scripts) {
      if (script.ext === 'coffee') {

        let subModules = superjoin.grepSubmodules(script, /require\s*\(?(\'|".+?\'|")?\)/g);
        console.log('Submodules', subModules);
      }
    }

    return pipe;
  });
};
