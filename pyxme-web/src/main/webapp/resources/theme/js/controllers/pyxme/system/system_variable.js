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


app.controller('SystemVariableController',['system_variable','$scope', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', function(system_variable,$scope, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.lstSystemVariables;

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

                var response = $http.post('retrieveSystemVariable_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstSystemVariables = data;
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
        
    
      	 controller.cargarVariables = function(){
    		 controller.respConfiguracionFactura = undefined;
   			 var repuesta = system_variable.invoiceVariableLoader();
    			 repuesta.then (function (data){
    			 	controller.invoiceVariable =  data;
    			 	},function (error){
    			 		Alertify.success('Ocurrio un error al cargar las variables');
    			 	});
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
      
        
        
        controller.initSystemVariable = function(){
            controller.systemvariableObj = undefined;
        }
        controller.newSystemVariable = function(){
            controller.systemvariableObj = {
            		 status:true	
            						};
        }
        controller.saveSystemVariable = function(){
            blockUI.start();

            var response = $http.post('createSystemVariable_json.json', controller.systemvariableObj);
            response.success(function (data, status, headers, config) {
                Alertify.success('Registro guardado!');
                blockUI.stop();
                controller.initSystemVariable();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }

        controller.editSystemVariable = function(currentSystemVariable){
            controller.systemvariableObj = currentSystemVariable;
        }

        controller.cancelSystemVariable = function(){
            controller.initSystemVariable();
        }

        controller.initSystemVariable();
        controller.retrieveModules();

    }]);