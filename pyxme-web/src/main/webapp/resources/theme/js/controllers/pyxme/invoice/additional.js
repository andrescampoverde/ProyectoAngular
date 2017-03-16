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

app.controller("AdditionalController",["$scope","genericService",'$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams','$q',function($scope,genericService, $timeout, $http, Alertify, blockUI, ngTableParams,$q) {

	 controller = this;
      controller.lstAdditionals;
      controller.alerts = genericService.alerts;
      
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
              var response = $http.post('retrieveAdditionalHeader_json.json', paramFilter);
              response.success(function (data, status, headers, config) {
                  controller.lstAdditionals = data;
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
      
      controller.initAdditional = function(){
          controller.additionalObj = undefined;
      }
      controller.newAdditional = function(){
          controller.additionalObj = {
          		 status:true	
          						};
      }
      
      controller.closeMessage = function(){
    	  $timeout(function() {
    		  controller.alerts.splice(0, 1);
    	      }, 3000);
    	  
      }
      
      controller.saveAdditional = function(object, status){
    	  object.status = status;
    	  var promise = genericService.saveObject('Additional',object);
    	  promise.then(function(response) {
    	      controller.initAdditional();
    	      controller.alerts.push(genericService.succesAlert);
    	      controller.closeMessage();
    	    }, function(error) {
    	      $scope.mensaje = "Se ha producido un error al obtener el dato:" + error;
    	    });
    	  
      }

      controller.editAdditional = function(currentAdditional){
          controller.additionalObj = currentAdditional;
      }
      
      controller.removeAdditional = function(currentAdditional){
    	  currentAdditional = {
        		  id: currentAdditional.id,
        		  status:false
          }
          AdditionalService.saveAdditional(currentAdditional);
      }

      controller.cancelAdditional = function(){
          controller.initAdditional();
      }

      controller.initAdditional();
	  
	}]);
