(function() {
  "use strict";

  angular
    .module('clean-code.layout')
    .controller('Shell', Shell);

  Shell.$inject = ['config', 'logger'];

  function Shell(config, logger) {
    var vm = this;
    vm.title = config.appTitle;

    _init();

    function _init() {
      logger.success(config.appTitle + 'loaded!', null);
    }
  }
})();