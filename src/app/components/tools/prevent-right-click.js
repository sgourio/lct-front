/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

function preventRightClick() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind("contextmenu", function(e) {
        e.preventDefault();
      });
    }
  };
}
angular.module('lct')
  .directive('preventRightClick', preventRightClick);
