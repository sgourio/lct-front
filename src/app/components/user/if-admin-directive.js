/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('ifAdmin', [ '$auth', function ($auth) {
    return {
      restrict: 'A',
      scope: {
      },
      link: function(scope, element){
        if( $auth.getPayload().isAdmin ){
          element.css('display', '');
        }else{
          element.css( 'display', 'none' );
        }
      }
    };
  }]);
