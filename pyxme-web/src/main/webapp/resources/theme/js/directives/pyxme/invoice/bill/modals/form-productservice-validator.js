angular.module('app').directive('uiProduct', ['$q','$timeout','$http','blockUI','$modal', 'Alertify', 'catalogService', 
                                     function($q,$timeout,$http,blockUI,$modal, Alertify, catalogService) {

        return {
            restrict: 'AE',
            scope: {
                produto: '=objetoProducto',
                validador : '=objetoValidador'
            },
            link: function(scope, el, attr) {
            },
            templateUrl: 'js/directives/pyxme/invoice/form-productservice-validator.html',
            controller: ['$scope', function($scope) {
            	var ctrl = this;
            }],
            controllerAs: 'vm'
        };
    }]);