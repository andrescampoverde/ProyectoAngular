angular.module('app').directive('uiAdditional', ['$timeout','$http','blockUI','$modal', function($timeout,$http,blockUI,$modal) {

        return {
            restrict: 'AE',
            scope: {
            	additional: '=objAdditional',
            	totalValue: '=objTotalValue',
                validator : '=objValidator' 
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/invoice/bill/modals/additional-invoice-validator.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
                var data= 0;
                var porecentage= 0;
                
                $scope.calcularPorcentage = function (value){
                	data = $scope.totalValue * (value/100);
                	ctrl.setValue(data);
                	console.log(data);
                };
                
                ctrl.setValue = function (value){
                	$scope.additional.value = value;	
                	//$scope.additional.value = $scope.additional.value.toFixed(2);
                };
                
                ctrl.setPorcentage = function (value){
                	$scope.additional.quantity = value;	
                	//$scope.additional.quantity = $scope.additional.quantity.toFixed(2);
                };
                
                $scope.calcularValor = function (value){
                	data = $scope.totalValue - value;
                	porecentage= (data * 100 )/$scope.totalValue; 
                	ctrl.setPorcentage(100 - porecentage );
                };
                
            }],
            controllerAs: 'vm'
        };
    }]);