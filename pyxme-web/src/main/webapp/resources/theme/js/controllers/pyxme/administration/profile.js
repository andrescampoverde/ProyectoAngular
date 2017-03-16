/*
 * Copyright (c) 2015. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * Created by esyacelga
 */


app.controller('ProfileController', ['$scope','$q','restUserService','SessionData','$cookies','catalogService','ngNotify','restPersonService', '$http', 'ngNotify', 'blockUI', 'ngTableParams', '$modal', 
                           function ($scope  ,  $q,  restUserService, SessionData,  $cookies , catalogService,   ngNotify,	  restPersonService ,  $http, ngNotify, blockUI, ngTableParams, $modal) {
        controller = this;
        controller.lstPersons;
        controller.phoneDto = undefined;
        controller.personObjeto = undefined;
        controller.lstPhones;
        var address = {};
        var indexValue = undefined;
        
        controller.openPhoneModel = function (){
        	controller.phoneDto = undefined;
        	openModal('modal-select-phone', 'sm');
        };
        
        function openModal (modal_id, modal_size, modal_backdrop) {
        	$scope.currentModal = $modal.open({
                templateUrl: modal_id,
                scope:$scope
            });
        };
        
        controller.submit=function(phone){
        	if (controller.actionStatus){
        		controller.personDto.lstPhones[indexValue] = phone; 
        	} else {
              	if(controller.personDto.lstPhones  == undefined){
              		controller.personDto.lstPhones  = [];
              		controller.personDto.lstPhones.push(phone);
            	}else{
            		controller.personDto.lstPhones.push(phone);	
            	}
        		
        	}
        	controller.actionStatus = false;
        	$scope.currentModal.dismiss();
        };
        
        controller.editPhone= function (index){
        	ctrl.actionStatus = true;
        	ctrl.indexValue = index;
        	controller.phoneDto = controller.personDto.lstPhones [index];
        	controller.openModal('modal-select-phone', 'sm');
        };
        
        controller.removeItem = function(phone){
        	controller.personDto.lstPhones.splice(phone, 1);
        };
        
        controller.validatePassword = function (key, confirmedKey){
        	if (key == undefined || confirmedKey == undefined ){
        		
        	} else {
        		if (key == confirmedKey){
        			controller.passValidate = true;
        		}else{
        			controller.passValidate = false;
        			ngNotify.set('La contraseña no coincide', 'error');

            	}	
        	}
        };

        
        
        controller.searchType = function ($select) {
            if ($select.search != "") {
            	var response = buscarGeoLocations('TLGPARR', $select.search);
            	response.then (function(data){
            		controller.lstGeoLoc = data;
            	},function(error){
            		ngNotify.set('Error al cargar el lugar geográfico', 'error');
            	});
            }else {
            	
            };
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
        
        
        
        controller.savePerson = function (person) {
            blockUI.start();
            var response = $http.post('createPerson_json.json', person);
            response.success(function (data, status, headers, config) {
                blockUI.stop();
                $cookies.userUpdated = true;
                ngNotify.set('Sus datos personales se han actualizado exitósamente', 'grimace');
            });
            
            response.error(function (data, status, headers, config) {
            	ngNotify.set('Ocurrio un error al actualizar su perfil', 'error');
                blockUI.stop();
            });
        };

        controller.editPerson = function (person) {
            blockUI.start();
            var response = $http.post('editUser_json.json', person);
            response.success(function (data, status, headers, config) {
                blockUI.stop();
                ngNotify.set('Su contraseña se ha actualizado exitósamente', 'grimace');
            });

            response.error(function (data, status, headers, config) {
            	ngNotify.set('Ocurrio un error al actualizar su perfil', 'error');
                blockUI.stop();
            });
        };

        
        
        controller.alertRequiredFields = function(){
        	ngNotify.set('Llene los campos obligatorios marcados en rojo', 'error');
        };

        controller.userRequiredFields = function(){
        	ngNotify.set('La información ingresada es inválida', 'error');
        };

        
        function retrieveSexCatalog(){
            catalogService.loadSimpleCatalog('CAT_SEX').then(function(data){
            	controller.catalogSexList = data;
            }, function(){
            	ngNotify.set('Ocurrio un error al cargar el catálogo de sexo', 'error');                    	
            });
        };
        
        
        function retrieveMaritalStatus(){
            catalogService.loadSimpleCatalog('CAT_ESTCIV').then(function(data){
            	controller.catalogMStatusList = data;
            }, function(){
            	ngNotify.set('Ocurrio un error al cargar el catalogo de estado civil', 'error');
            });
        };
        
        
        function retrievePhoneByPerson(){
            if(controller.personDto){
                if (controller.personDto.id== undefined){
                	var idPhone = 0;
                }else {
                	var idPhone = controller.personDto.id;
                }
                var response = $http.get('findPhoneByPerson/' + idPhone );
                response.success(function (data,status) {
                    controller.personDto.lstPhones  = data;
                });

                response.error(function (data, status, headers, config) {
                	ngNotify.set('Ocurrio un error al cargar los telefonos de la persona', 'error');
                });
            }
        };
        
        function retrieveAddressByPerson(){
            if(controller.personDto){
                if (controller.personDto.id== undefined){
                	var id = 0;
                }else {
                	var id = controller.personDto.id;
                	var response = $http.get('findAddressByPerson/'+id);
                    response.success(function (data,status) {
                    	if(data==""){
                    		controller.personDto.lstAddress= [];
                    		controller.personDto.lstAddress.push(address);
                    	} else
                    	{
                    		controller.personDto.lstAddress  = data;		
                    	};
                        
                    });
                    response.error(function (data, status, headers, config) {
                    	ngNotify.set('Ocurrio un error al cargar las direcciones de la persona', 'error');
                    });

                }
           }
        };
        
        function loadUser(){
            var response = $http.get('restoreSession/' +$cookies.logedUser);
            response.success(function (data, status) {
            	var resp = restUserService.findUserByName(data.userName);
            	resp.then (function(value){
            		controller.userDto = value;
            		controller.personDto = value.person;
            		obtenerInformacion ();
            	},function(error){
                 	ngNotify.set('Ocurrio un error al cargar los datos de persona', 'error');
            	});
            });

            response.error(function (data, status, headers, booconfig) {
             	ngNotify.set('Ocurrio un error al cargar al retaurar la sección', 'error');
            });
    	 };
        
    	function obtenerInformacion (){
        	retrieveAddressByPerson();
        	retrievePhoneByPerson();
        	retrieveMaritalStatus();
        	retrieveSexCatalog();

    	};
    	 
        function initProfile(){
        	loadUser();
        	if ($cookies.userUpdated!= "true")
        		ngNotify.set('Por favor actualize sus datos personales, para continuar', 'warn');
        	
        };
        
        initProfile();


    }]);