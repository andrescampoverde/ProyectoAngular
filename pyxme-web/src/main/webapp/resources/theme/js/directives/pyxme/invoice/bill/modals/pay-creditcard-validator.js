angular.module('app').directive('uiPagoTargeta', ['$timeout','$http','blockUI','$modal', function($timeout,$http,blockUI,$modal) {

        return {
            restrict: 'AE',
            scope: {
                valorPago: '=valorPago',
                valorValidador : '=valorValidador' 
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/invoice/bill/modals/pay-creditcard-validator.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
                
            }],
            controllerAs: 'vm'
        };
    }]);