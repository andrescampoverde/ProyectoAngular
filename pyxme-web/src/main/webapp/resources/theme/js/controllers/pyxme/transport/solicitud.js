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

app.controller("RutaPuntual",['SessionData','userSessionFactory','$cookies','ngNotify','$state','$modal','utilStringService','dispatcherCarService','NgMap','$geolocation',"$scope", 'Alertify', 'blockUI','$q',
                     function(SessionData,userSessionFactory,   $cookies ,  ngNotify,  $state,$modal,utilStringService,   dispatcherCarService,   NgMap,   $geolocation,   $scope,  Alertify,   blockUI,  $q) {
    controller = this;
	controller.lstCoordenadas = [];
	controller.activarMapa = undefined;
	controller.serviceDto= { };
	
	function verificarSession (){
	    SessionData.loaderServerSession().then(function(data){
			if(data.id== null)
  			  $state.go('app.lokme');
  		},function(error){
  			ngNotify.set('Error: Hubo un error al cargar la sesión', 'error');
  		});
	};
	
	verificarSession();
	
	controller.cargarPuesto = function(){
		var puesto = {
				passengers:controller.serviceDto.totalPlaces == undefined ? 1: controller.serviceDto.totalPlaces,
				latitude:controller.serviceDto.latitude,
				longitude:controller.serviceDto.longitude,
				isorigin:true
		};
		return puesto;
	};
	
	controller.validarCampos = function(){
		if (controller.serviceDto.finalRoute == undefined)
			utilStringService.crearMensaje($scope, 3, "Error: debe ingresar un lugar de destino");
	
		if (controller.serviceDto.latitude == undefined)
			utilStringService.crearMensaje($scope, 3, "Error: debe ingresar una ruta");
	};
	
	controller.probar=function (){
		var f = new Date();
		utilStringService.obtenerIncrementoHora(f, 130);
	};

	controller.abrirConfirmacion = function () {
		controller.serviceDto.routeName = controller.origen +"   -   "+ controller.serviceDto.finalRoute;
		controller.serviceDto.lstPlace = [];
		controller.serviceDto.lstPlace.push(controller.cargarPuesto());
		controller.openModal('modal-confirmar-solicitud', 'lg');
    };
    
    controller.openModal = function (modal_id, modal_size, modal_backdrop) {
        $scope.currentModal = $modal.open({
            templateUrl: modal_id,
            size: modal_size,
            scope: $scope
        });
    };

    
    
    $scope.sliderHr = {
			  min: 0,
			  max: 23,
			  options: {
			    floor: 0,
			    ceil: 23
			  }
			};
    
    $scope.$watch(angular.bind(this, function () {
        return $scope.sliderHr;
    }), function (newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        controller.serviceDto.hour= $scope.sliderHr.min ;
    }, true);

    
    $scope.$watch(angular.bind(this, function () {
        return $scope.sliderMn;
    }), function (newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        controller.serviceDto.minutes= $scope.sliderMn.min ;
    }, true);
    
    
    
    $scope.sliderMn = {
			  min: 0,
			  max: 59,
			  options: {
			    floor: 0,
			    ceil: 59	
			  }
			};
    
    
	$scope.slider = {
			  min: 15,
			  max: 60,
			  options: {
			    floor: 15,
			    ceil: 60
			  }
			};

	$scope.sliderPersonas = {
			  min: 1,
			  max: 4,
			  options: {
			    floor: 1,
			    ceil: 4
			  }
			};
	
	function mostrarhora(){
		var f = new Date();
		var dato = utilStringService.obtenerIncrementoHora(f, $scope.slider.min);
		controller.serviceDto.hour= dato.hr;
		controller.serviceDto.minutes= dato.mn;
		controller.time = f.getHours()+":"+f.getMinutes();
	};
	

    $scope.$watch(angular.bind(this, function () {
        return $scope.sliderPersonas;
    }), function (newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        controller.serviceDto.totalPlaces= $scope.sliderPersonas.min ;
    }, true);

	
    controller.cancelar = function (){
        $state.go('app.form.carshared');
    };
	
	
    $scope.$watch(angular.bind(this, function () {
        return $scope.slider;
    }), function (newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        mostrarhora();
    }, true);

	
	controller.cargarCoordenadas = function (){
		var cordenada = {
				latitude:-0.3543251,
				longitude:-78.4375811,
				familia:'Vargas',
				origen:true
		};
		
		controller.lstCoordenadas.push(cordenada);
		
		cordenada = {
				latitude:-0.351998,
				longitude:-78.437389,
				familia:'Lopez',
				origen:false
		};
		controller.lstCoordenadas.push(cordenada);
		cordenada = {
				latitude:-0.349767,
				longitude:-78.437287,
				familia:'Salazar',
				origen:false
		};
		controller.lstCoordenadas.push(cordenada);
		cordenada = {
				latitude:-0.347149,
				longitude:-78.430223,
				familia:'Chicaiza',
				origen:false
		};
		controller.lstCoordenadas.push(cordenada);
	};
	 
	controller.guardarObjeto = function (objDto){
		SessionData.loaderServerSession().then(function(data){
			if(data.id== null){
				$scope.currentModal.dismiss();
				$state.go('app.lokme');
			}else{
				objDto.allowed = false;
				blockUI.start();
				var respuesta = dispatcherCarService.createSharedService(objDto);
				respuesta.then(function (data){
					blockUI.stop();
					$state.go('app.form.carshared');
					$scope.currentModal.dismiss();
					encerar ();
					ngNotify.set('Éxito: Su solicitud se ha guardado correctamente	', 'success');
				},function(error){
					blockUI.stop();
					encerar ();
					$scope.currentModal.dismiss();
					ngNotify.set('Error: Hubo un problema al guardar su solicitud', 'error');
				});
			}
  			  
  		},function(error){
  			ngNotify.set('Error: Hubo un error al cargar la sesión', 'error');
  		});
	};
    
	function encerar (){
		controller.serviceDto = undefined;
		controller.activarMapa = false;
	}
	
	controller.cargarCoordenadas ();
	var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};
    controller.obtenerPosision = function(){
    	blockUI.start();
    	$geolocation.getCurrentPosition({
        }).then(function(position) 
        		{
        		 blockUI.stop();
        		 $scope.currentModal.close();
        		 controller.activarMapa =true;
		       	 controller.myPosition = position;
		     	 controller.serviceDto.latitude  = controller.myPosition.coords.latitude;
		    	 controller.serviceDto.longitude  = controller.myPosition.coords.longitude;
		    	 showLatLong(controller.serviceDto.latitude,controller.serviceDto.longitude);
        },function(error){
        	blockUI.stop();
        	ngNotify.set('Error: Hubo un problema al obtener su posción, asegurese de usar de tener activo su GPS y estar usando OPERA como navegador', 'error');
        },options);
    };
    
    
    
    function showLatLong(lat, longi) {
    	var geocoder = new google.maps.Geocoder();
    	var yourLocation = new google.maps.LatLng(lat, longi);
    	geocoder.geocode({ 'latLng': yourLocation },processGeocoder);

    	};
    	
    function processGeocoder(results, status){
    	if (status == google.maps.GeocoderStatus.OK) {
    	if (results[0]) {
    	controller.origen =results[0].formatted_address;
    	} else {
    	error('Google no retorno resultado alguno.');
    	}
    	} else {
    	error("Geocoding fallo debido a : " + status);
    	}
    	}
    
	    mostrarhora();
	 function init (){
		 if ($cookies.userUpdated!= "true")
			 $state.go('app.form.profile');
	 }
	 
	 init ();

}]);
