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


app.controller('HeaderReportController',['$scope', '$timeout', '$http', 'Alertify','blockUI', 'ngTableParams', '$q',  
                                 function($scope, $timeout, $http, Alertify, blockUI, ngTableParams, $q) {
        controller = this;
        controller.reportHeaderObj= undefined;
        controller.disableStepOne = true;
        controller.initTable = function(){
        
        	
        	controller.tableParams = new ngTableParams({
            page: 1,            		// show first page
            count: 4,          		// count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        	}, 
        	{
            total: 0,           		// length of data
            getData: function ($defer, params) {

                var paramFilter = {
                    "firstResult": (params.page() - 1) * params.count(),
                    "itemsPerPage": params.count(),
                    "filterByFields": params.filter(),
                    "orderBy": params.sorting()
                };
                blockUI.start();

                var response = $http.post('retrieveReportHeader_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstReportHeader = data;
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
    };
    
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

    controller.retrieveAllReportHeaderGroup = function(){
        blockUI.start();
        var response =  $http.get('retrieveCatGroupnp_json');
        response.success(function (data,status) {
        	controller.lstGroupReportHeader = data;
            blockUI.stop();
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
            blockUI.stop();
        });
    };
    
    controller.retrieveAllReportHeaderGroup();
    
    
    controller.retrieveReportHeaderGroup = function () {
        var diferir = $q.defer();
        var response = $http.get('retrieveCatGroupnp_json');
        response.success(function (data, status, headers, config) {
            controller.lstGroupReportHeaders = data;
            
            blockUI.stop();
        });

        diferir.promise.then(function(data){
            controller.initTable();
        });

        diferir.resolve(response);

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al retornar valores!');
            blockUI.stop();
        });
    };

    controller.retrieveReportHeaderGroup();
   
    controller.initReportHeader = function () {
        controller.reportHeaderObj = undefined;
    };
    
    controller.newReportHeader = function () {
        controller.reportHeaderObj = {
            status: true
        };
    }
   
    
    controller.saveReportHeader = function (objeto, status) {
        blockUI.start();
        objeto.status= status;
        var response = $http.post('createHeaderReport_json.json', objeto);
        response.success(function (data, status, headers, config) {
            Alertify.success('Registro guardado!');
            blockUI.stop();
            controller.initReportHeader();
            return data;
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al guardar!');
            blockUI.stop();
            return undefined;
        });
    };

    controller.editReportHeader = function (currentReportHeader) {
        controller.reportHeaderObj = currentReportHeader;
    }

    controller.cancelReportHeader = function () {
        controller.initReportHeader();
    }

    
    controller.retrieveModules ();
    controller.initReportHeader();
}]);