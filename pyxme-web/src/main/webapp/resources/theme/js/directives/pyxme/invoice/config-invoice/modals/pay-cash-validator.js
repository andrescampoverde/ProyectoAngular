angular.module('app').directive('uiCounted', ['$timeout','$http','blockUI','$modal', function($timeout,$http,blockUI,$modal) {

        return {
            restrict: 'AE',
            scope: {
            	wayPay: '=countedForm',
                valorValidador : '=valorValidador' 
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/invoice/config-invoice/modals/pay-cash-validator.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
                ctrl.name = undefined;
                ctrl.wayPayLoader = function () {
                	$scope.wayPay={
                		name : ctrl.name
                	}
                };
            }],
            controllerAs: 'vm'
        };
    }]);