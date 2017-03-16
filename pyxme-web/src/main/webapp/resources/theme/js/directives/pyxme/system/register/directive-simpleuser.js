angular.module('app').directive('uiSimpleUser', ['restCompanyService','$q','$timeout','$http','blockUI','$modal', 'Alertify', 'catalogService', 
                                     function(RestCompanyService,$q,$timeout,$http,blockUI,$modal, Alertify, catalogService) {
        return {
            restrict: 'AE',
            scope: {
                userDirective: '=tagUser',
                validator : '=tagValidator'
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/invoice/directive-simpleuser.html',
            controller: ['$scope','restCompanyService','restUserService', 
                 function($scope,RestCompanyService,RestUserService) {
                var ctrl = this;
                $scope.phoneDto = undefined;
                $scope.edition =  ($scope.edition ? $scope.edition :false);
                $scope.userDirective = undefined;
                
                
                
                ctrl.validacionUsuario =function (userName){
                	if (userName != undefined){
	                	var respuesta =  RestUserService.findUserByName(userName);
	            		respuesta.then (function(responce){
	            			if (responce.id == null){
	            				ctrl.validate = true;
	            				return ctrl.validate;
	            			}else{
	            				ctrl.validate = false;
	            				return ctrl.validate;
	            			}
	            		},function (error){
	            			console.log (error);
	            		});
                	} else {
                		console.log ('');
                	}
                };	
                
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
                
                
                
                ctrl.procesoValidacion = function (cedula){
                	if (cedula.length==13){
                		ctrl.validacionCedula(cedula);
                	}else{
                		ctrl.rucValidado	 = false;
                	}
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