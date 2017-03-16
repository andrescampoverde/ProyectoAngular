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

app.controller("SpotRoute",['ngNotify','$state','$modal','utilStringService','dispatcherCarService','NgMap','$geolocation',"$scope", 'Alertify', 'blockUI','$q',
                   function( ngNotify ,$state,$modal,utilStringService,   dispatcherCarService,   NgMap,   $geolocation,   $scope,  Alertify,   blockUI,  $q) {
	controller = this;
	controller.cls = "btn btn-primary btn-lg col-xs-3";
	controller.puesto= {};
	controller.currentDate = new Date();
	controller.mlocate = true;
	controller.stateService = true;
	
	var filters = [];
	function filtroStatus (){
    	var field = {
    			key:"filtro.status",
				value:controller.stateService
		};	
		filters.push(field);
    };
	
    
    function filtroRuta (nombre){
    	var field = {
    			key:"routeName",
				value:nombre
		};	
		filters.push(field);
    };
    
	function filtroMiLocalidad (){
	    	var field = {
	    			key:"filtro.geoLoc",
					value:controller.mlocate
			};	
			filters.push(field);
	    };
	
	function cargarPuesto(){
		var puesto = {
				passengers:controller.puesto.pasageros,
				latitude:controller.puesto.latitude,
				longitude:controller.puesto.longitude,
				isorigin:false
		};
		return puesto;
	};
	
    function filtroFecha (){
    	var field = {
    			key:"filtro.fecha",
				value:controller.currentDate
		};	
		filters.push(field);
    };

	
	function modificarRuta (puesto){
		var lstPlace = [];
		for (var i=0;i<puesto.lstPlace.length;i++){
			if (puesto.lstPlace[i].id != undefined)
				lstPlace.push(puesto.lstPlace[i]);
		
		}
		lstPlace.push(cargarPuesto());
		puesto.lstPlace = lstPlace;
		return puesto;
	};
	
	controller.mensageValidacion = function (){
		utilStringService.crearMensaje($scope, 3, "Número de puestos ingresado no válido");
	}
	
	controller.gurdarRuta = function (ruta){
		ruta = modificarRuta(ruta);
		blockUI.start();
		var respuesta = dispatcherCarService.createSharedService(ruta);
		respuesta.then(function (data){
			controller.obtenerServicios();
			blockUI.stop();
			if(data.id == 0){
				ngNotify.set('El o los asientos ya fueron ocupados', 'error');
			}else {
				$scope.currentModal.dismiss();
				ngNotify.set('Éxito: Se ha unido correctamente a esta ruta', 'success');
			}
		},function(error){
			blockUI.stop();
			controller.obtenerServicios();
			$scope.currentModal.dismiss();
			ngNotify.set('Hubo un error al realizar esta operación', 'error');
		});
	};
	
	


	 controller.abrirConfirmacion = function (ruta) {
	    	controller.ruta = ruta;
	    	if (!comprobarHora (ruta)){
	    		 inactivarRuta(ruta);
	    		 ngNotify.set('Error: esta ruta ha expirado', 'error');
	    	}else {
	    		if(controller.puesto.longitude==undefined){
		    		
		    		blockUI.start();
		    		$geolocation.getCurrentPosition({
		            }).then(function(position) 
		            		{
		        
		            		 blockUI.stop();
		            		 controller.activarMapa =true;
		    		       	 controller.myPosition = position;
		    		     	 controller.puesto.latitude  = controller.myPosition.coords.latitude;
		    		    	 controller.puesto.longitude  = controller.myPosition.coords.longitude;
		    		    	 showLatLong(controller.puesto.latitude,controller.puesto.longitude);
		            },function(error){
		       		 blockUI.stop();
		            });
		    		
		    	}else {
		       	 showLatLong(controller.puesto.latitude,controller.puesto.longitude);
		    	}
	    		
	    	}
	    	
	    	
	};     	   
    
    controller.pedirUbicacion = function (){
    	if (controller.puesto.latitude ==undefined)
    		$geolocation.getCurrentPosition({
            }).then(function(position) 
            		{
            		 blockUI.stop();
    		       	 controller.myPosition = position;
    		     	 controller.puesto.latitude  = controller.myPosition.coords.latitude;
    		    	 controller.puesto.longitude  = controller.myPosition.coords.longitude;
            },function(error){
       		 blockUI.stop();
            });	
    	
    	
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
		openModal('modal-confirmar-solicitud', 'lg');

    	} else {
    	error('Google no retorno resultado alguno.');
    	}
    	} else {
    	error("Geocoding fallo debido a : " + status);
    	}
    	}
    
    
    function openModal (modal_id, modal_size, modal_backdrop) {
        $scope.currentModal = $modal.open({
            templateUrl: modal_id,
            size: modal_size,
            scope: $scope
        });
    };
    
	function inactivarRuta (ruta){
		ruta.status=false;
		var respuesta = dispatcherCarService.editSharedService(ruta);
		respuesta.then(function (data){
		controller.obtenerServicios();
			blockUI.stop();
		},function(error){
			ngNotify.set('Error: no se pudo realizar la operación de actualización', 'error');
		});
	};
    
	controller.obtenerServicios = function (){
		filters=[];
		if (controller.selected!=undefined && controller.selected != '')
			filtroRuta(controller.selected);
			filtroStatus();	
			filtroFecha ();
			filtroMiLocalidad();
		
		var paramFilter = {
                firstResult: 1,
                itemsPerPage: 1,
                lstFilter:filters,
                filterByFields: undefined,
                orderBy: undefined
            };
		
		var respuesta =  dispatcherCarService.obtenerServicios(paramFilter);
		respuesta.then(function(data){
			controller.lstServicios =data;
			controller.currentDate = new Date();
			modificarPuesto(controller.lstServicios);
    	 	
    	 	for (var i=0;i< data.length; i++ )
    			{
		//    				if (!comprobarHora(data[i]))
		//    					dispatcherCarService.editSharedService(data[i]).then(function (data){
		//    						ngNotify.set('Error: no se pudo realizar la operación de actualización', 'success');
		////    					controller.obtenerServicios();
		//    					blockUI.stop();
		//    				},function(error){
		//    					blockUI.stop();
		//    					ngNotify.set('Error: no se pudo realizar la operación de actualización', 'error');
		//    				});
    					//inactivarRuta(data[i]);
    			}

		},function(error){
			utilStringService.crearMensaje($scope, 3, "Error: al filtrar los datos")
		});
		
	}


	function comprobarHora (data){
		var currentDate = new Date();
		var fechaInicio = new Date (currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),data.hour,data.minutes,00);
		var fechaFin = new Date (currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),data.hour,data.minutes + 30,00);
		
		if (fechaInicio <= currentDate && fechaFin >= currentDate )
			{
				return true;
			} else {
				return false;
			}

	};
	

	
	
	function modificarPuesto (lstServicios){
		if (lstServicios != ""){
			for(var i=0;i<lstServicios.length; i++ ){
			for(var j= 0; j<lstServicios[i].lstPlace.length; j++ ){
				lstServicios[i].lstPlace[j].disable = false;
				lstServicios[i].lstPlace[j].clss ="btn btn-info btn-lg col-xs-3";
			}
			
				if ( lstServicios[i].lstPlace.length < 4){
					var num = 4- lstServicios[i].lstPlace.length;
					for(var j= 0; j<num; j++ ){
						var puesto ={
								disable:false,
								clss:"btn btn-info btn-lg col-xs-3"
						}
						lstServicios[i].lstPlace.push(puesto);
					}
				}
		};
		
		controller.lstServicios = pintarNoDisponibles(lstServicios);	
		}else {
			
		}
		
		
	};
	
	
	function pintarNoDisponibles (lstServicios){
		for(var i=0;i<lstServicios.length; i++ ){
		
				for(var j= 0; j<lstServicios[i].totalPlaces; j++ ){
					if (lstServicios[i].lstPlace[j]!=undefined){
					lstServicios[i].lstPlace[j].disable = true;
					lstServicios[i].lstPlace[j].clss ="btn btn-primary btn-lg col-xs-3";
					}else {

					}
				}
		};
		return lstServicios;
	};
	
	controller.obtenerServicios();
	

}]);
