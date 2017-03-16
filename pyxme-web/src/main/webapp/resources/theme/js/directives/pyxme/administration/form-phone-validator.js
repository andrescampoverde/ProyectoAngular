angular.module('app').directive('uiPhone', ['$timeout','$http','blockUI', function($timeout,$http,blockUI) {
        return {
            restrict: 'AE',
            scope: {
                
                phoneDinamic: '=phone', 
                valorValidador : '=valorValidador'
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/administration/form-phone-validator.html',
            controller: ['$scope','catalogService', function($scope, catalogService) {
                var ctrl = this;
                ctrl.phoneNumber = undefined;
                ctrl.typeLocation =undefined;
                
                
                $scope.phoneLoader = function (obj){
                	//$scope.phoneDinamic = {};
                	ctrl.typeLocation = obj;
                	$scope.phoneDinamic = {
                			typeLocation:ctrl.typeLocation
                	}
                	
                }
                
                ctrl.selectPhone = function(currentPhone){
                    $scope.currentPhone = currentPhone;
                }
                
                ctrl.openPhoneModel = function(){
                    blockUI.start();
                    catalogService.loadSimpleCatalog('CAT_TPHONE').then(function(data){
                    	ctrl.phoneList= data;
                        blockUI.stop();
                    }, function(){
                        Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
                        blockUI.stop();
                    });
                };
                
                ctrl.openPhoneModel();
                
            }],
            controllerAs: 'vm'
        };
    }]);