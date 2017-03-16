angular.module('app').directive('uiParameter', ['$timeout','$http','blockUI','$modal', function($timeout,$http,blockUI,$modal) {

        return {
            restrict: 'AE',
            scope: {
                parametro: '=objetoParametro',
                validador : '=objetoValidador' 
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/system/modal.report-parameter.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
              
                
            }],
            controllerAs: 'vm'
        };
    }]);