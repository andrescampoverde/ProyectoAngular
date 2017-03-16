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

app.controller("StorageController",['system_variable',"$scope","genericService",'$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams','$q',function(system_variable,$scope,genericService, $timeout, $http, Alertify, blockUI, ngTableParams,$q) {
	 
	  controller = this;
      controller.lstStorages;
      controller.alerts = genericService.alerts;
      controller.variablesFacturacion=system_variable.getInvoiceVariable();
      
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

              var response = $http.post('retrieveStorage_json.json', paramFilter);
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
      
      controller.initStorage = function(){
          controller.storageObj = undefined;
      }
      controller.newStorage = function(){
    	  
    	  //controller.variablesFacturacion=system_variable.getInvoiceVariable();
          
    	  controller.storageObj = {
          		 status:true	
          						};

          
      }
      
      controller.closeMessage = function(){
    	  $timeout(function() {
    		  controller.alerts.splice(0, 1);
    	      }, 3000);
    	  
      }
      
      controller.saveStorage = function(){
    	  var promise = genericService.saveObject('Storage',controller.storageObj);
    	  promise.then(function(response) {
    	      controller.initStorage();
    	      controller.alerts.push(genericService.succesAlert);
    	      controller.closeMessage();
    	    }, function(error) {
    	      $scope.mensaje = "Se ha producido un error al obtener el dato:" + error;
    	    });
    	  
      }

      controller.editStorage = function(currentStorage){
          controller.storageObj = currentStorage;
      }
      
      controller.removeStorage = function(currentStorage){
    	  currentStorage = {
        		  id: currentStorage.id,
        		  status:false
          }
          StorageService.saveStorage(currentStorage);
      }

      controller.cancelStorage = function(){
          controller.initStorage();
      }

      controller.initStorage();
	  
	}]);
