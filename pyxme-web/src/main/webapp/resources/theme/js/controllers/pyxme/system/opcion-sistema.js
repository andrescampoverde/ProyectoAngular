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

app.controller("OpcionController",['genericService','system_variable',"$scope","genericService",'$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams','$q',
                           function(genericService,system_variable,$scope,genericService, $timeout, $http, Alertify, blockUI, ngTableParams,$q) {
	 
	  controller = this;
      controller.lstOpcions;
      controller.alerts = genericService.alerts;
      controller.variablesFacturacion=system_variable.getInvoiceVariable();
      
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

              var response = $http.post('retrieveOpcion_json.json', paramFilter);
              response.success(function (data, status, headers, config) {
                  controller.lstOpcions = data;
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
      
      controller.initOpcion = function(){
          controller.opcionObj = undefined;
      }
      controller.newOpcion = function(){
    	  controller.opcionObj = {
          		 status:true	
          						};
      }
      
      controller.closeMessage = function(){
    	  $timeout(function() {
    		  controller.alerts.splice(0, 1);
    	      }, 4000);
    	  
      }
      
      
      controller.retrieveModules = function () {            
          var response = $http.get('retrieveModuleNotPaged_json');
          response.success(function (data, status, headers, config) {
              controller.lstModules = data;
              blockUI.stop();
          });

          response.error(function (data, status, headers, config) {
              Alertify.error('Ocurrio un error al retornar valores!');
              blockUI.stop();
          });
      }

      
      controller.saveOpcion = function(){
    	  var promise = genericService.saveObject('Opcion',controller.opcionObj);
    	  promise.then(function(response) {
    	      controller.initOpcion();
    	      controller.alerts.push(genericService.succesAlert);
    	      controller.closeMessage();
    	    }, function(error) {
    	      $scope.mensaje = "Se ha producido un error al obtener el dato:" + error;
    	    });
    	  
      }

      controller.editOpcion = function(currentOpcion){
          controller.opcionObj = currentOpcion;
      }
      
      controller.removeOpcion = function(currentOpcion){
    	  currentOpcion = {
        		  id: currentOpcion.id,
        		  status:false
          }
          OpcionService.saveOpcion(currentOpcion);
      }

      controller.cancelOpcion = function(){
          controller.initOpcion();
      }
      
      controller.retrieveModules ();
      controller.initOpcion();
	  
	}]);
