angular.module('app').directive('uiPersona', ['ngNotify','$q','$timeout','$http','blockUI','$modal', 'Alertify', 'catalogService', 
                                     function(ngNotify,$q,$timeout,$http,blockUI,$modal, Alertify, catalogService) {

        return {
            restrict: 'AE',
            scope: {
                
                personDirective: '=personDirective',
                activeDirective: '=activeDirective',
                edition: '=tagEdition',
                valorValidador : '=valorValidador'
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/administration/form-person-validator.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
                $scope.phoneDto = undefined;
                $scope.edition =  ($scope.edition ? $scope.edition :false);
                try {
                    if(!$scope.personDirective){
                        $scope.personDirective ={
                            catalogIdentificationType:{},
                            catalogSexList:{}

                        };
                    }
                    $scope.personDirective.lstPhones  = [];
                }catch(e){
                    console.log("error");
                }
                
                var address = {};
                $scope.personDirective.lstAddress=[];
                $scope.tempLstPhones = [];
                $scope.auxtPhones = [];
                $scope.alerts = [];
                ctrl.actionStatus = false;
                ctrl.indexValue = undefined;
                
                $scope.setearMask = function(mask){
                	$scope.varMask = mask;	
                }	

                $scope.alertRequiredFields = function(){
                	ngNotify.set('Debe completar los campos obligatorios', 'error');
                };
                
                function buscarGeoLocations(filter,type){
               	 var deferedRespuesta = $q.defer();
                    var response = $http.get('findGeographicLocation/'+filter+'/'+type);
                    response.success(function (data, status, headers, config) {
                   	 deferedRespuesta.resolve(data);
                    });
                    response.error(function (data, status, headers, config) {
                   	 deferedRespuesta.reject(data);
                    });
                    return deferedRespuesta.promise;
                };
                
                $scope.searchType = function ($select) {
                    if ($select.search != "") {
                    	var response = buscarGeoLocations('TLGPARR', $select.search);
                    	response.then (function(data){
                    		$scope.lstGeoLoc = data;
                    	},function(error){
                    		Alertify.error("Error al filtrar los transportistas");
                    	});
                    }else {
                    	
                    };
                };
                
                $scope.procesoValidacion = function (cedula){
                	if (cedula.length==13){
                		var respuestaServidor = ctrl.restTipoIdentificacion ('ID_RUC');
                		respuestaServidor.then (function(respuesta){
                		$scope.personDirective.catalogIdentificationType = respuesta;
               			ctrl.validacionCedula(cedula);
               			ctrl.retrieveIndentType();
                			
                		},function(error){
                			console.log (error);
                		});
                		
                	}if (cedula.length==10){
                		var respuestaServidor = ctrl.restTipoIdentificacion ('ID_CED');
                		respuestaServidor.then (function(respuesta){
                		$scope.personDirective.catalogIdentificationType = respuesta;
                		ctrl.validacionCedula(cedula);
                		ctrl.retrieveIndentType();
                			
                		},function(error){
                			console.log (error);
                		});
                		
                	}else {
                		var respuestaServidor = ctrl.restTipoIdentificacion ('ID_PAS');
                		respuestaServidor.then (function(respuesta){
                		$scope.personDirective.catalogIdentificationType = respuesta;
               			ctrl.validacionCedula(cedula);
               			ctrl.retrieveIndentType();
                			
                		},function(error){
                			console.log (error);
                		});
                	
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
                
                $scope.cancel = function (){
                	$scope.personDirective = undefined;
                	ngNotify.set('Esta opción fue cancelada por el usuario', 'info');
                }
                
                $scope.savePerson = function (person) {
                    blockUI.start();
                    var response = $http.post('createPerson_json.json', person);
                    response.success(function (data, status, headers, config) {
                    	$scope.personDirective = undefined;
                    	ngNotify.set('Registro guardado exitosamente', 'grimace');
                    	blockUI.stop();
                    });

                    response.error(function (data, status, headers, config) {
                    	ngNotify.set('Ocurrio un error al guarda el registro', 'error');
                        blockUI.stop();
                    });
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
                
                ctrl.mostrarAlertas = function (mensaje){
        		    var str = mensaje; 
        		    var index = str.search("Error");
        		    $scope.validadorIDPersona = false;
        		    if (index>=0 ){
        		    	if ($scope.alerts.length < 1){
        		    		$scope.alerts.push ({ type: 'danger', msg: mensaje });
        		    		$scope.validadorIDPersona = false;
        		    	}
        		    	ctrl.closeMessageValidaciones ();
        		    	return false;
        		    }else {
        		    	if ($scope.alerts.length < 1){
        		    		$scope.alerts.push ({ type: 'success', msg: 'Exito: Validacion de numero de identificacion realizada correctamente' });
        		    		$scope.validadorIDPersona = true;
        		    	}
        		    	ctrl.closeMessageValidaciones ();
        		    	return true;
        		    }
                };
                
                ctrl.validacionCedula =function (cedula){
                	ctrl.numeroIdentificacion = cedula ;
                	var respuestaServidor = ctrl.restValidacionCedula(cedula);
                	respuestaServidor.then (function (respuesta){
                		ctrl.mostrarAlertas (respuesta);
                		
                	}, function (error){
                		console.log(error);
                	})
                };	
                
                ctrl.restValidacionCedula = function (cedula){
                	var deferedValidacion = $q.defer();
                    var response = $http.get('validarCedulaPersona/' + cedula );
                    response.success(function (data,status) {
                        deferedValidacion.resolve(data);
                    });

                    response.error(function (data, status, headers, config) {
                    	deferedValidacion.reject(data);
                    });

                    return deferedValidacion.promise;
                };
               
                ctrl.retrievePhoneByPerson = function(){
                    if($scope.personDirective){
                        if ($scope.personDirective.id== undefined){
                        	var idPhone = 0;
                        }else {
                        	var idPhone = $scope.personDirective.id;
                        }
                        var response = $http.get('findPhoneByPerson/' + idPhone );
                        response.success(function (data,status) {
                            $scope.personDirective.lstPhones  = data;
                        });

                        response.error(function (data, status, headers, config) {
                        	ngNotify.set('Ocurrio un error al cargar los telefonos de la persona', 'error');
                        });
                    }
                };
                
                
                ctrl.retrieveAddressByPerson = function(){
                    if($scope.personDirective){
                        if ($scope.personDirective.id== undefined){
                        	var id = 0;
                        }else {
                        	var id = $scope.personDirective.id;
                        	var response = $http.get('findAddressByPerson/'+id);
                            response.success(function (data,status) {
                            	if(data==""){
                            		$scope.personDirective.lstAddress.push(address);
                            	} else
                            	{
                            		$scope.personDirective.lstAddress  = data;		
                            	};
                                
                            });
                            response.error(function (data, status, headers, config) {
                            	ngNotify.set('Ocurrio un error al cargar las direcciones de la persona', 'error');
                            });

                        }
                   };
                };

                
                
                ctrl.retrieveSexCatalog = function(){
                    catalogService.loadSimpleCatalog('CAT_SEX').then(function(data){
                        $scope.catalogSexList = data;
                    }, function(){
                    	ngNotify.set('Ocurrio un error al cargar el catálogo de sexo', 'error');                    	
                    });
                };
                
                $scope.openPhoneModel = function (){
                	$scope.phoneDto = undefined;
                	$scope.openModal('modal-select-phone', 'sm');
                };
                
                ctrl.retrieveIndentType = function(){
                    catalogService.loadSimpleCatalog('CAT_TIDENT').then(function(data){
                        $scope.catalogIdTypeList = data;
                    }, function(){
                    	ngNotify.set('Ocurrio un error al cargar el catálogo de tipo de identificación', 'error');
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
                    catalogService.loadSimpleCatalog('CAT_ESTCIV').then(function(data){
                        $scope.catalogMStatusList = data;
                    }, function(){
                    	ngNotify.set('Ocurrio un error al cargar el catalogo de estado civil', 'error');
                    });
                };

                ctrl.initCatalogs = function(){
                	ctrl.retrieveAddressByPerson();
                	ctrl.retrieveSexCatalog();
                    ctrl.retrieveIndentType();
                    ctrl.retrieveMaritalStatus();
                    ctrl.retrievePhoneByPerson();
                };
                ctrl.initCatalogs();
            }],
            controllerAs: 'vm'
        };
    }]);