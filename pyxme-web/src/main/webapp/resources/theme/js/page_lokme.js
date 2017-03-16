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

app.controller("LokmeController",['$state','userSessionFactory','utilStringService',"$scope", '$http','blockUI', '$q',
                         function($state  ,userSessionFactory,   utilStringService,   $scope,	 http, 	 blockUI, $q) {
	  controller = this;
	  controller.userDto = {};
	  
	  $scope.login = function (user){
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
      };
      
	  function cargarSession(){
		  userSessionFactory.getState();
      }
	  
      
	}]);
