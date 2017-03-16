angular.module('app').directive('uiSignUp', ['catalogService','$q','$timeout','$http','blockUI','$modal', 'Alertify', 'catalogService', 
                                     function(catalogService, $q,$timeout,$http,blockUI,$modal, Alertify, catalogService) {

        return {
            restrict: 'AE',
            scope: {
                personDirective: '=tagPersonDirective',
                valorValidador : '=tagValidador'
            },
            link: function(scope, el, attr) {
            },
            templateUrl: 'js/directives/pyxme/system/modal.signup.access.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
                $scope.phoneDto = undefined;
                try {
                    $scope.personDirective.lstPhones  = [];
                }catch(e){
                    console.log("error");
                }

                $scope.tempLstPhones = [];
                $scope.auxtPhones = [];
                $scope.alerts = [];
                ctrl.actionStatus = false;
                ctrl.indexValue = undefined;
                
                
                            
                ctrl.restTipoIdentificacion = function (tipoCedula){
                	var deferedValidacion = $q.defer();
                    var response = $http.get('findCatalogByInternalCode/' + tipoCedula );
                    response.success(function (data,status) {
                        deferedValidacion.resolve(data);
                    });

                    response.error(function (data, status, headers, config) {
                    	deferedValidacion.reject(data);
                    });

                    return deferedValidacion.promise;
                };
                
                
                
                $scope.openModal = function(modal_id, modal_size, modal_backdrop) {
                    $scope.currentModal = $modal.open({
                        templateUrl: modal_id,
                        scope:$scope
                    });
                };
                
                $scope.close=function(){
                	ctrl.actionStatus = false;
                    $scope.currentModal.dismiss();//$scope.modalInstance.close() also works I think
                };

                ctrl.closeMessageValidaciones = function(){
              	  $timeout(function() {
              		$scope.alerts.splice(0, 1);
              	      }, 3000);
              	  
                };
                
                ctrl.retrieveTipoIDCatalog = function(){
                    blockUI.start();
                    catalogService.loadSimpleCatalog('CAT_TIDENT').then(function(data){
                        $scope.catalogTIdList = data;
                        blockUI.stop();
                    }, function(){
                        Alertify.error('Ocurrio un error al obtener catalogo Tipo Identificacion');
                        blockUI.stop();
                    });
                };
                
                             
                ctrl.retrieveSexCatalog = function(){
                    blockUI.start();
                    catalogService.loadSimpleCatalog('CAT_SEX').then(function(data){
                        $scope.catalogSexList = data;
                        blockUI.stop();
                    }, function(){
                        Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
                        blockUI.stop();
                    });
                };
                
                $scope.openPhoneModel = function (){
                	$scope.phoneDto = undefined;
                	$scope.openModal('modal-select-phone', 'sm');
                };
                
                ctrl.retrieveIndentType = function(){
                    blockUI.start();
                    catalogService.loadSimpleCatalog('CAT_TIDENT').then(function(data){
                        $scope.catalogIdTypeList = data;
                        blockUI.stop();
                    }, function(){
                        Alertify.error('Ocurrio un error al cargar el catalogo de identidad!');
                        blockUI.stop();
                    });
                };
                
                $scope.submit=function(phone){
                	if (ctrl.actionStatus){
                		$scope.personDirective.lstPhones [ctrl.indexValue] = phone; 
	            
                	} else {
                      	if($scope.personDirective.lstPhones  == undefined){
                    		$scope.personDirective.lstPhones  = [];
                    		$scope.personDirective.lstPhones .push(phone);
                    	}else{
                    		$scope.personDirective.lstPhones .push(phone);	
                    	}
                	}
                	ctrl.actionStatus = false;
                    $scope.currentModal.dismiss();
                };
                
                
               
                $scope.editPhone= function (index){
                	ctrl.actionStatus = true;
                	ctrl.indexValue = index;
                	$scope.phoneDto = $scope.personDirective.lstPhones [index];
                	$scope.openModal('modal-select-phone', 'sm');
                };
                
                $scope.removeItem = function(phone){
                    $scope.personDirective.lstPhones.splice(phone, 1);
                };

                ctrl.retrieveMaritalStatus = function(){
                    blockUI.start();
                    catalogService.loadSimpleCatalog('CAT_ESTCIV').then(function(data){
                        $scope.catalogMStatusList = data;
                        blockUI.stop();
                    }, function(){
                        Alertify.error('Ocurrio un error al cargar el catalogo de estado civil!');
                        blockUI.stop();
                    });
                };

                ctrl.initCatalogs = function(){
                	ctrl.retrieveTipoIDCatalog();
                    ctrl.retrieveSexCatalog();
                    ctrl.retrieveMaritalStatus();
                };
                ctrl.initCatalogs();
            }],
            controllerAs: 'vm'
        };
    }]);