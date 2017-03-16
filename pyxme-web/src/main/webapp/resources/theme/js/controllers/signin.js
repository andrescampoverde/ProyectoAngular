'use strict';

app.controller('SigninFormController', ['utilStringService','restUserService','system_variable', 'SessionService', 'SessionData', '$cookies', '$scope','$timeout', '$http', '$state', 'blockUI', 'Alertify',
    function (utilStringService,restUserService,system_variable, SessionService, SessionData, $cookies, $scope, $timeout, $http, $state, blockUI, Alertify) {
		$scope.user = {};
        $scope.subsidiaryObj = {};
        $scope.userSubsidiaryObj = {};

        $scope.cancel = function () {
            $scope.lstSubsidiaries = undefined;
        };

        $scope.redireccionar = function (subsidiaryObj){
        	$scope.subsidiaryObj = subsidiaryObj;
        	var responce = restUserService.loginSubsidiary(subsidiaryObj);
        	responce.then(function(data){
        	      if (data) {
                      $scope.user = data;
                      system_variable.invoiceVariableLoader();
                      SessionService.storeSessionData($scope.subsidiaryObj).then(function(dataResult){
                          SessionData.updateSession(dataResult);
                          $cookies.logedUser = dataResult.id;
                          $cookies.logedUserName = dataResult.userName;
                          $state.go('app.form.carshared');
                          blockUI.stop();
                      }, function(reason){
                          blockUI.stop();
                      });
                  } else {
                  	  utilStringService.crearMensaje($scope, 3, "Hubo un error al validar el usuario");
                      blockUI.stop();
                  }
        		
        	},function(error){
            	utilStringService.crearMensaje($scope, 3, "Hubo un error al validar el usuario");
        	});
        };
        
        $scope.login = function (user){
        	if (user== undefined) {
        		$scope.loginDemo();
        	}else {
        		blockUI.start();
            	var respuesta = restUserService.verificarUsuario(user);
            	respuesta.then(function(data){
            		if (data) {
            			$cookies.userUpdated = data.updated;
            			var respSubsidiaries = restUserService.retrieveSubsidiaries(data.id);
            			respSubsidiaries.then(function(userSub){
                          loadUserSubsidiaries(userSub);
                          blockUI.stop();
            			},function(error){
            				utilStringService.crearMensaje($scope, 3, "Hubo un error al validar el usuario");
            			});
            			
                    } else {
                		utilStringService.crearMensaje($scope, 3, "Error: Usuario o contraseña inválida");
                        blockUI.stop();
                    }
            	
            	},function(data){
            		utilStringService.crearMensaje($scope, 3, "Hubo un error al validar el usuario");
            	});
        	}
        };
        
        
        
        $scope.loginDemo = function () {
            $scope.user.userName= 'root@democompany.com';
            $scope.user.password= 'admin';
            blockUI.start();
            var response = $http.post('loginUser_json.json', $scope.user);
            response.success(function (data, status, headers, config) {
                if (data) {
                    $scope.user = data;
                    var respSubsidiaries = restUserService.retrieveSubsidiaries(data.id);
        			respSubsidiaries.then(function(userSub){
                      loadUserSubsidiaries(userSub);
                      blockUI.stop();
        				
        			},function(error){
        				utilStringService.crearMensaje($scope, 3, "Hubo un error al validar el usuario");
        			});
                    
                    blockUI.stop();
                } else {
                	utilStringService.crearMensaje($scope, 3, "Hubo un error al validar el usuario");
                }
            });

            response.error(function (data, status, headers, config) {
            	utilStringService.crearMensaje($scope, 3, "Hubo un error al validar el usuario");
            });
        };	
        

        function loadUserSubsidiaries (lstUserSubsidiaries){
            var contador = lstUserSubsidiaries.length;

            if (contador > 1) {
                $scope.lstUserSubsidiaries = lstUserSubsidiaries;
            } else if (contador == 1) {
            	$scope.redireccionar(lstUserSubsidiaries[0]);
            } else if (contador == 0) {
        		utilStringService.crearMensaje($scope, 1, "Este usuario no posee una sucursal asignada");
            }
        };

    }])
;