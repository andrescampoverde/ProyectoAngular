angular.module('app').directive('uiSimpleCompany', ['restCompanyService','$q','$timeout','$http','blockUI','$modal', 'Alertify', 'catalogService', 
                                     function(RestCompanyService,$q,$timeout,$http,blockUI,$modal, Alertify, catalogService) {
        return {
            restrict: 'AE',
            scope: {
                companyDirective: '=tagCompany',
                validator : '=tagValidator'
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/invoice/directive-simplecompany.html',
            controller: ['$scope','restCompanyService', function($scope,RestCompanyService) {
                var ctrl = this;
                $scope.phoneDto = undefined;
                $scope.edition =  ($scope.edition ? $scope.edition :false);
                $scope.companyDirective = undefined;
                
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
                
                
                ctrl.mostrarAlertas = function (mensaje){
        		    var str = mensaje; 
        		    var index = str.search("Error");
        		    if (index>=0 ){
        		    	ctrl.tipoMensaje = false;
        		    	ctrl.mensajeValidacionNumero = 'INCORRECTO';
        		    	ctrl.rucValidado = false;
        		    	
        		    }else {
        		    	ctrl.tipoMensaje = true;
        		    	ctrl.mensajeValidacionNumero = 'CORRECTO';
        		    	ctrl.rucValidado = true;
        		    }
                };
                
                ctrl.validacionCedula =function (cedula){
                	var respuesta =  RestCompanyService.validationIdNumber(cedula);
            		respuesta.then (function(responce){
            			ctrl.mostrarAlertas (responce);
            		},function (error){
            			ctrl.alerts.push(genericService.dangerAlert);
            			ctrl.closeMessage();
            		});
                };	
                
                ctrl.procesoValidacion = function (cedula){
                	if (cedula.length==13){
                		ctrl.validacionCedula(cedula);
                		
                	}else{
                		ctrl.rucValidado	 = false;
                	}
                }; 
                
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
                ctrl.numeroIdentificacion = "";
                
                ctrl.seleccionarTipoIdentificacion = function (){
                	ctrl.numeroIdentificacion;
                };
            
            }],
            controllerAs: 'vm'
        };
    }]);