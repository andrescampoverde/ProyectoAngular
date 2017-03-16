app.controller('CustomerController',['catalogService','$q','genericService','$rootScope','$scope','$state','$modal', '$log', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', 
                             function(catalogService,$q,genericService,$rootScope, $scope,$state, $modal, $log, $timeout, $http, Alertify, blockUI, ngTableParams) 
{		
        controller = this;
        controller.phoneDto;
        controller.validador;
        controller.filter= undefined;
        controller.lstCustomer;
        controller.alerts = genericService.alerts;
        controller.personDto = undefined;
        controller.idNumber;
        controller.edit;
        controller.items = ['item1', 'item2', 'item3'];
        controller.customerDto ={
        		person : undefined
        		} 

        controller.alertRequiredFields = function(){
            Alertify.error('Llene los campos obligatorios, marcados en rojo');
        };
        
        controller.RequiredFields = function(){
            Alertify.success('Llene los campos obligatorios, marcados en rojo');
        };
        
        controller.retrieveSexCatalog = function(){
            blockUI.start();
            catalogService.loadSimpleCatalog('CAT_SEX').then(function(data){
            	controller.catalogSexList = data;
                blockUI.stop();
            }, function(){
                Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
                blockUI.stop();
            });
        };
        
        
        controller.retrievePrnTypeCatalog = function(){
            blockUI.start();
            catalogService.loadSimpleCatalog('CAT_PRNTYPE').then(function(data){
            	controller.catalogLstPrnType = data;
                blockUI.stop();
            }, function(){
                Alertify.error('Error en: Catálogo tipo persona');
                blockUI.stop();
            });
        };
        
        controller.retrieveMaritalStatus = function(){
            blockUI.start();
            catalogService.loadSimpleCatalog('CAT_ESTCIV').then(function(data){
            	controller.catalogMStatusList = data;
                blockUI.stop();
            }, function(){
                Alertify.error('Ocurrio un error al cargar el catalogo de estado civil!');
                blockUI.stop();
            });
        };
        controller.retrieveMaritalStatus();
        controller.retrieveSexCatalog();
        controller.retrievePrnTypeCatalog();
        
        controller.save = function(customer,status){
        	customer.status = status;
            blockUI.start();
            var response = $http.post('createCustomer_json.json', customer);
            response.success(function (data, status, headers, config) {
            	controller.alerts.push(genericService.succesAlert);
            	controller.closeMessage();
                blockUI.stop();
                controller.cancel();   
                return data;
            });

            response.error(function (data, status, headers, config) {
            	controller.alerts.push(genericService.dangerAlert); 
            	controller.closeMessage();
                controller.filter= undefined;
                blockUI.stop();
                return false;
            });
            
            return true;
        }
        
        
        
        controller.obtenerPersona = function (filtro) {
      	  var deferedPersona = $q.defer();
      	  
      	  try {
      	      var responsePersona = $http.get('findPersonByIdNumber/'+ filtro);
      	      responsePersona.success(function (data, status, headers, config) {
      	      deferedPersona.resolve(data);
      	      });
      	      responsePersona.error(function (data, status, headers, config) {
      	      deferedPersona.reject(data);
      	      });
      	      
      	  } catch (e) {
      		  deferedPersona.reject(e);
      	  }
      	  
      	  return deferedPersona.promise;
            
        }
        
        controller.obtenerCliente = function (filtro) {
        	  var deferedPersona = $q.defer();
        	  
        	  try {
        	      var responsePersona = $http.get('findCustomerByNumberId/'+ filtro.person.identificationNumber );
        	      responsePersona.success(function (data, status, headers, config) {
	        	      if (controller.customerDto.id == undefined){
	        	    	  controller.customerDto = undefined;
	            	      controller.alerts.push(genericService.customerDuplicated );
	        	      }else {
	        	    	  controller.customerDto = undefined;
	            	      controller.alerts.push(genericService.customerDuplicated );  
	        	      }
        	      });
        	      responsePersona.error(function (data, status, headers, config) {
        	    	  controller.customerDto = undefined;
            	      controller.alerts.push(genericService.customerDuplicated );
        	      });
        	      
        	  } catch (e) {
        		  deferedPersona.reject(e);
        	  }
        	  return deferedPersona.promise;
          }
        
        controller.editCustomer = function(currentCustomer){
            var respuestaServidor = controller.obtenerPersona (currentCustomer.person.identificationNumber);
            respuestaServidor.then (function(respuesta){
            	currentCustomer.person =respuesta;
            	controller.customerDto = currentCustomer; 
            },function(error){
                Alertify.error('Ocurrio un error al editar la persona');
            } );
            
            
        }
        
        controller.findByFilter = function (filter) {
            blockUI.start();
            var deferedCustomer = $q.defer();
            try {
            var respuestaServidor = controller.obtenerCliente (filter);
            
            	respuestaServidor.then(function(response) {
	            	if (response.id == null) {
	            		var respuestaServidor = controller.obtenerPersona (filter);
	            		respuestaServidor.then (function (respuesta){
	            			
	            			if (respuesta.id==null) {
	            				controller.alerts.push(genericService.warningFind);
	                            controller.closeMessage();
	                            controller.customerDto ={
	                            		person :{
	                            				id:0
	                            			} 

	                            		} 
	            			}else {
	            				controller.alerts.push(genericService.succesFind);
	                            controller.closeMessage();
	            				controller.customerDto= {
	            						person:respuesta,
	            						ivaLoader:true,
	            						comercialName:respuesta.firstLastName +" "+respuesta.secondLastName +" " + respuesta.firstName +" " + respuesta.secondName,
	            						identificationNumber: respuesta.identificationNumber,
	            						email:respuesta.email,
	            						phone:respuesta.phone
	            						
	            				}
	            			}
	            			
	            		},function (error){
	            		 deferedCustomer.reject(error);
	            		} );
	            		
	            		
	            	}else {
	            		
	            		controller.alerts.push(genericService.succesFind);
	                    controller.closeMessage();
	            		controller.customerDto = response;
	            		
	            	}
	            	blockUI.stop();
            	deferedCustomer.resolve(response);

		  		 }, function(error) {
		  			 deferedCustomer.reject(error);
                     Alertify.error('Ocurrio un error al realizar la consulta');
		  		 });
            
            }catch (e){
                Alertify.error('Ocurrio un error al realizar la consulta');
            }
        };
        
        
        controller.redirige =function(){
        	$state.go('access.signup');
        }
        
        controller.openModal = function(modal_id, modal_size, modal_backdrop) {
            $scope.currentModal = $modal.open({
                templateUrl: modal_id,
                scope:$scope
            });
        }

        controller.close=function(){
            $scope.currentModal.dismiss();//$scope.modalInstance.close() also works I think
        };

        controller.submit=function(){
        	controller.loadCustomer();
            $scope.currentModal.dismiss();//$scope.modalInstance.close() also works I think
        };
        
        controller.loadCustomer =  function(){        	
        	controller.customer= {
        	"comercialName": controller.personDto.firstName +" "+  controller.personDto.secondName + " "+controller.personDto.firstLastName + " "+controller.personDto.secondLastName,
        	"address": controller.personDto.address,
        	"email":  controller.personDto.email,
        	"identificationNumber":  controller.personDto.identificationNumber,
        	"ivaLoader": true,        	
        	"person":controller.personDto,
        	"status":true
        	}
        	
        }
        
        controller.openModal = function(modal_id, modal_size, modal_backdrop) {
            $scope.currentModal = $modal.open({
                templateUrl: modal_id,
                scope:$scope
            });
        }

        controller.close=function(){
            $scope.currentModal.dismiss();//$scope.modalInstance.close() also works I think
        };
        
        controller.open = function (size) {
            var modalInstance = $modal.open({
              templateUrl: 'personModal.html',
              controller: 'ModalInstanceCtrl as vmx',
              size: size,
              resolve: {
                items: function () {
                  return $scope.items;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };
          


        controller.tableParams = new ngTableParams({
            page: 1,            		// show first page
            count: 4,          			// count per page
            sorting: {
                		name: 'asc'     // initial sorting
            		 }
        }, {
            
        	total: 0,           // length of data
            getData: function($defer, params) {

                var paramFilter = {
                    "firstResult": (params.page() - 1) * params.count(),
                    "itemsPerPage": params.count(),
                    "filterByFields": params.filter(),
                    "orderBy": params.sorting()
                };

                blockUI.start();

                var response = $http.post('retrieveCustomer_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstCustomers = data;
                    $scope.items = data.items;
                    params.total(data.totalCount);
                    $defer.resolve(data.items);
                    blockUI.stop();
                });

                response.error(function (data, status, headers, config) {
                    Alertify.error('Ocurrio un error al retornar valores!');
                    blockUI.stop();
                });
            }
        });
        controller.initCustomer = function(){
        	controller.customerDto = undefined;
        }
        controller.newCustomer = function(){
        	controller.customerDto = {};
        }	
        

        controller.closeMessage = function(){
      	  $timeout(function() {
      		  controller.alerts.splice(0, 1);
      	      }, 3000);
      	  
        }
        
        

        controller.cancel = function(){
        	controller.filter= undefined;
            controller.initCustomer();
        }

        controller.findCustomer = function(){
        	controller.findPerson();
        }
        controller.initCustomer();

    }]);