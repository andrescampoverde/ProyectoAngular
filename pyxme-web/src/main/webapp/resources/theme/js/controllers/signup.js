'use strict';

// signup controller
app.controller('SignupFormController', ['ngNotify','restUserService','utilStringService','blockUI','$modal','$scope', '$http', '$state', 
                               function(ngNotify,restUserService,utilStringService,blockUI,$modal,$scope, $http, $state) {
    $scope.user = {};
    $scope.person = undefined;
    $scope.authError = null;

    $scope.idValidate = false;
    
    $scope.validarCedula = function (cedula){
    	$scope.idValidate = utilStringService.validarCedulaEcuatoriana ($scope,cedula);
    };
    
    $scope.comprobarUserName = function (userName){
    	if (userName==undefined){
    		ngNotify.set('Debe ingresar un dato válido', 'warn');
    		return false;
    	}else {
	    	var respuesta = restUserService.findUserByName(userName);
	    	respuesta.then(function(data){
	    		if (data.id == null){
	    			ngNotify.set('Éxito validación de nombre usuario completado', 'success');
	    			$scope.varlidarUserName = true;
	    			return $scope.varlidarUserName;
	    		}else {
	    			ngNotify.set('Error el nombre de usuario ya existe', 'error');
	    			return false;
	    		}
	    	},function(error){
	    		return false;
	    	});
    	}
    };
    
    
    $scope.cargarUsuario = function (usuario) {
    usuario.updated = false;
    usuario.userSubsidiary = obtenerUsuarioSucursal(1,6);
    	var responce = restUserService.crearAutoRegistro(usuario);
    	responce.then(function(data){
    		ngNotify.set('Éxito: el usuario ingresado ya se encuentra registrado', 'success');
    		$scope.userDto=undefined;
    		$scope.agree=undefined;
    		$scope.confirmPass = undefined;
    	},function(error){
    		ngNotify.set('Error: Hubo un problema al guardar su usuario', 'error');
    	});
    };
    

    function obtenerUsuarioSucursal (idUser,idSubsidiary){
    	var UserSubsidiaryDto ={
    			subsidiary:{
    				id:idSubsidiary
    			},
    			user:{
    				id:idUser
    			}
    	}	
    	return UserSubsidiaryDto;
    };
   
    
    $scope.mensajeError = function (){
    	utilStringService.crearMensaje($scope, 3, "Debe ingresar todos los datos obligatorios");
    };
    
    
    

    $scope.validatePassword = function (key, confirmedKey){
    	if (key == undefined || confirmedKey == undefined ){
    		
    	} else {
    		if (key == confirmedKey){
        		return true;
        	}else{
        		utilStringService.crearMensaje($scope, 3, "La contraseña no coincide")
        		return false;
        	}	
    	}
    };
   
    $scope.abrirPanelUsuario = function () {
    	$scope.openModal('modal-user-information', 'md');
    };
    
    $scope.abrirPanelPersona = function () {
    	$scope.openModal('modal-person-information', 'lg');
    };
    
    
    $scope.abrirPanelCompania = function () {
    	$scope.openModal('modal-company-information', 'md');
    };
    
    $scope.setPerson = function (person){
    	$scope.person = person;	
    }
   
    $scope.setUser = function (user){
    	$scope.user = user;	
    }
    
    $scope.setCompany = function (company){
    	$scope.company = company;	
    }

    
    $scope.openModal = function (modal_id, modal_size, modal_backdrop) {
        $scope.currentModal = $modal.open({
            templateUrl: modal_id,
            size: modal_size,
            scope: $scope
        });
    };
    
    $scope.signup = function() {
	    $scope.authError = null;
	        var response = $http.post('singinUser_json.json', $scope.user);
	        response.success(function (data, status, headers, config) {
	            $state.go('app.dashboard-v1');
	        });
	
	        response.error(function (data, status, headers, config) {
	            alert(data);
	
	        });
    };
  }])
 ;