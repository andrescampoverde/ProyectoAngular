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


app.controller('SellerController',['$scope', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', function($scope, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.lstSellers;
        controller.idNumber;
        controller.edit;
        
        controller.findPerson = function(){
            
            var response = $http.get('findPersonByIdNumber/'+controller.idNumber);
            response.success(function (data,status) {
            	if(data== ""){
            		Alertify.success('Objeto Nulo!');	
            	}else{
            		Alertify.success('Objeto No Nulo!');
            	}
            	controller.dispatcherObj.person = data;
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al obtener la persona!');
                blockUI.stop();
            });
        }
        
        
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

                var response = $http.post('retrieveSeller_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstSellers = data;
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
        controller.initSeller = function(){
            controller.sellerObj = undefined;
        }
        controller.newSeller = function(){
            controller.sellerObj = {
            		 status:true	
            						};
        }
        controller.saveSeller = function(){
            blockUI.start();
            var response = $http.post('createSeller_json.json', controller.sellerObj);
            response.success(function (data, status, headers, config) {
                Alertify.success('Registro guardado!');
                blockUI.stop();
                controller.initSeller();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }

        controller.editSeller = function(currentSeller){
            controller.sellerObj = currentSeller;
        }

        controller.cancelSeller = function(){
            controller.initSeller();
        }
        controller.findDispatcher = function(){
        	controller.findPerson();
        }


        controller.initSeller();
      
    }]);