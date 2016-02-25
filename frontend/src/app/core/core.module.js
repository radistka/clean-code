(function() {
  "use strict";

  angular.module('clean-code.core', [
    /*
     * Angular modules
     */
    'ngAnimate', 'ui.router',
    /*
     Our reusable cross app code modules
     */
    'blocks.exception', 'blocks.logger'
  ])
})();