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

app.controller("CarController",['utilStringService','carService','catalogService',"$scope",'$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams','$q',
                       function(utilStringService,carService,catalogService,$scope,$timeout, $http, Alertify, blockUI, ngTableParams,$q) {
	  controller = this;

      controller.retrieveTipoMarca = function(){
          blockUI.start();
          catalogService.loadSimpleCatalog('CAT_TMARCA').then(function(data){
          	controller.lstTipoMarca = data;
              blockUI.stop();
          }, function(){
              Alertify.error('Ocurrio un error al cargar el catalogo de estado civil!');
              blockUI.stop();
          });
      };
      
      
      controller.retrieveTipoCoche = function(){
          blockUI.start();
          catalogService.loadSimpleCatalog('CAT_TCOCHE').then(function(data){
          	controller.lstCoche = data;
              blockUI.stop();
          }, function(){
              Alertify.error('Ocurrio un error al cargar el catalogo de estado civil!');
              blockUI.stop();
          });
      };
      
      
      controller.tableParams = new ngTableParams({
          page: 1,            		// show first page  mnnnbbb
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

              var response = $http.post('retrieveCar_json.json', paramFilter);
              response.success(function (data, status, headers, config) {
                  controller.lstStorages = data;
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
      
      
      controller.saveCar = function(carDto,status){
    	  carDto.status = status;
		var respuesta = carService.createCar(carDto);
		respuesta.then(function(data){
			controller.cancel();
			utilStringService.crearMensaje($scope, 1, "El registro se guardó exitosamente");
		},function(error){
			utilStringService.crearMensaje($scope, 1, "Error al guardar");
		});

    	  
      }

      controller.editCar = function(car){
          controller.carDto = car;
      }
      

      controller.newCar = function (){
    	  controller.carDto = {
    			  
    	  }
      }

      
      controller.cancel = function(){
          controller.carDto = undefined;
      }

      controller.retrieveTipoMarca();
      controller.retrieveTipoCoche();
      
      
	}]);
