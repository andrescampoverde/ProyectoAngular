angular.module('app').directive('uiCredit', ['$timeout','$http','blockUI','$modal', function($timeout,$http,blockUI,$modal) {

        return {
            restrict: 'AE',
            scope: {
            	wayPay: '=creditForm',
                valorValidador : '=valorValidador' 
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/invoice/config-invoice/modals/pay-credit-validator.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
                ctrl.name = undefined;
                ctrl.nameRange = undefined;
                ctrl.initRange = undefined;
                ctrl.finRange = undefined;
                ctrl.lstDayRange = [];
                ctrl.DayRange= undefined;
                
                ctrl.wayPayLoader = function () {
                	ctrl.DayRange = {
                			name : ctrl.nameRange,
                			since : ctrl.initRange,
                			until :ctrl.finRange
                	}
                	
                	if ( ctrl.lstDayRange.length>0){
                		ctrl.lstDayRange[0]= ctrl.DayRange; 
                		console.log(ctrl.lstDayRange.length);
                	}else{
                		
                		ctrl.lstDayRange.push(ctrl.DayRange);
                	}
                	
                	$scope.wayPay={
                		name : ctrl.name,
                		lstDayRange:ctrl.lstDayRange
                	}
                };
              
                
            }],
            controllerAs: 'vm'
        };
    }]);