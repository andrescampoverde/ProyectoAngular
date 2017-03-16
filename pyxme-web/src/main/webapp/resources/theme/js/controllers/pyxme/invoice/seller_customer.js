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


app.controller('SellerCustomerController',['$scope', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', function($scope, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.lstSellerCustomers;

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

                var response = $http.post('retrieveSellerCustomer_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstSellerCustomers = data;
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
        controller.initSellerCustomer = function(){
            controller.sellercustomerObj = undefined;
        }
        controller.newSellerCustomer = function(){
            controller.sellercustomerObj = {
            		 status:true	
            						};
        }
        controller.saveSellerCustomer = function(){
            blockUI.start();

            var response = $http.post('createSellerCustomer_json.json', controller.sellercustomerObj);
            response.success(function (data, status, headers, config) {
                Alertify.success('Registro guardado!');
                blockUI.stop();
                controller.initSellerCustomer();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }

        controller.editSellerCustomer = function(currentSellerCustomer){
            controller.sellercustomerObj = currentSellerCustomer;
        }

        controller.cancelSellerCustomer = function(){
            controller.initSellerCustomer();
        }

        controller.initSellerCustomer();

    }]);