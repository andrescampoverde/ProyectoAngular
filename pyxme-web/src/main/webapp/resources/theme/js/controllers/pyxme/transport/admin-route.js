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

app.controller("AdminRoute",['ngNotify','$state','$modal','utilStringService','dispatcherCarService','NgMap','$geolocation',"$scope", 'Alertify', 'blockUI','$q',
                     function(ngNotify,$state,$modal,utilStringService,   dispatcherCarService,   NgMap,   $geolocation,   $scope,  Alertify,   blockUI,  $q) {
	controller = this;
	controller.cls = "btn btn-primary btn-lg col-xs-3";
	controller.puesto= {};
	controller.currentDate = new Date();
	controller.format = 'yyyy-MM-dd';
	controller.estado = true;
	
	controller.procesados = false;
	var filters = [];
	
	
	
	controller.searchUnits = function ($select) {
        if ($select.search != "") {
        	var response = dispatcherCarService.findUnitsByFilter($select.search);
        	response.then (function(data){
        		controller.lstUnits	= data;
        	},function(error){
        		Alertify.error("Error al filtrar los transportistas");
        	});
        }else {
        	
        }
    };
	
	
	controller.mensageValidacion = function (){
		utilStringService.crearMensaje($scope, 3, "Número de invalido");
	}
	
	controller.editarRuta = function(ruta,unidad){
		ruta.unitPartner= unidad;
		guardarRuta(ruta);
	}
	
	
	controller.lstCoordenadas = [];
	
	controller.visualizarMapa = function (ruta){
		controller.mapa = false;
		
	  var respuesta = dispatcherCarService.findSelftSharedById (ruta.id);
	  	  respuesta.then(function(data){
	  		
	  		cargarRutas(data); 
	  		controller.mapa = true;
	  		//openModal('modal-mapa', 'lg');
	  	  },function(error){
	  		utilStringService.crearMensaje($scope, 3, "Hubo un error al cargar las coordenadas");
	  	  });
	};
	
	function cargarRutas(puesto){
		controller.coordenada = undefined;
		controller.lstCoordenadas= [];
		for (var i=0;i<puesto.lstPlace.length;i++){
				var coordenada = {
						latitude:puesto.lstPlace[i].latitude,
						longitude:puesto.lstPlace[i].longitude,
						isorigin:puesto.lstPlace[i].isorigin,
						familia:puesto.lstPlace[i].creatingUser.person.fullName
				}
				
				if (puesto.lstPlace[i].isorigin)
					controller.coordenada = coordenada;
				
					controller.lstCoordenadas.push(coordenada);
		}
		controller.lstCoordenadas;
	};
	
	controller.editarEstado = function (ruta){
			editarRuta(ruta);
	}
	
	
	function editarRuta (ruta){
		blockUI.start();
		var respuesta = dispatcherCarService.editSharedService(ruta);
		respuesta.then(function (data){
			controller.obtenerServicios();
			blockUI.stop();
			ngNotify.set('Éxito la ruta ha sido editada', 'success');
		},function(error){
			blockUI.stop();
			controller.obtenerServicios();
			$scope.currentModal.dismiss();
			ngNotify.set('Error: no se pudo guardar los cambios realizados', 'error');
		});
	}

	
	function guardarRuta(ruta){
		ruta.allowed = true;
		editarRuta(ruta);
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
		openModal('modal-asignar-unidad', 'lg');

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
    
    
    function filtroProcesados (){
    	var field = {
				key:"allowed",
				value:controller.procesados == undefined ? false:controller.procesados
		};	
		filters.push(field);
    };
    
    function filtroMiLocalidad (){
    	var field = {
    			key:"filtro.geoLoc",
				value:'true'
		};	
		filters.push(field);
    };
    
    function filtroEstado (){
    	var field = {
    			key:"filtro.estado",
				value:controller.estado == undefined ? false:controller.estado
		};	
		filters.push(field);
    };
    
    function filtroFecha (){
    	var field = {
    			key:"filtro.fecha",
				value:controller.filterDate == undefined ? controller.currentDate:controller.filterDate
		};	
		filters.push(field);
    };
    
    function filtroEstado (){
    	var field = {
    			key:"filtro.status",
				value:controller.estado == undefined ? true:controller.estado
		};	
		filters.push(field);
    };
    
    function filtroPrivado (){
    	var field = {
    			key:"filtro.privado",
				value:controller.privado == undefined ? false:controller.privado
		};	
		filters.push(field);
    };
    
    function filtroFrecuente (){
    	var field = {
    			key:"filtro.frecuente",
				value:controller.frecuente == undefined ? false:controller.privado
		};	
		filters.push(field);
    };
    
    
	controller.obtenerServicios = function (){
		filtroProcesados();
//		filtroMiLocalidad();
		filtroFecha();
		filtroEstado ();
				
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
		},function(error){
			ngNotify.set('Error: no se pudo retornar los valores', 'error');
		});
		
	}

	controller.obtenerServicios();

}]);
