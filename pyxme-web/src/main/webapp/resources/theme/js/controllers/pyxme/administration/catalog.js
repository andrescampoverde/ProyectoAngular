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


app.controller('CatalogController',['$scope', '$timeout', '$http', 'Alertify',
    'blockUI', 'ngTableParams', '$q', 'downloadFactory', function($scope, $timeout, $http, Alertify, blockUI, ngTableParams, $q, downloadFactory) {
        controller = this;
        controller.catalgGroupDto= undefined;
        controller.disableStepOne = true;

        controller.downloadManager = new downloadFactory();
        controller.initTable = function(){
        controller.tableParams = new ngTableParams({
            page: 1,            		// show first page
            count: 4,          		// count per page
            filter: {
                "catalogGroup.id": 5
            },
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: 0,           		// length of data
            getData: function ($defer, params) {

                var paramFilter = {
                    "firstResult": (params.page() - 1) * params.count(),
                    "itemsPerPage": params.count(),
                    "filterByFields": params.filter(),
                    "orderBy": params.sorting()
                };
                blockUI.start();

                var response = $http.post('retrieveCatalog_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstCatalogs = data;
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
    }
    
    
    controller.selectGroup = function (groupCatalog){
    	if (groupCatalog.id == undefined){
    		controller.disableStepOne = true;
    	}else{
    		controller.disableStepOne = false;
    	}
    	
    }
    controller.retrieveAllCatalogGroup = function(){
        blockUI.start();
        var response =  $http.get('retrieveCatGroupnp_json');
        response.success(function (data,status) {
        	controller.lstGroupCatalog = data;
            blockUI.stop();
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
            blockUI.stop();
        });
    }
    
    controller.retrieveAllCatalogGroup();
    
    
    controller.retrieveCatalogGroup = function () {
        var diferir = $q.defer();
        var response = $http.get('retrieveCatGroupnp_json');
        response.success(function (data, status, headers, config) {
            controller.lstGroupCatalogs = data;
            
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

    controller.retrieveCatalogGroup();
    controller.initCatalog = function () {
        controller.catalogObj = undefined;
    }
    controller.newCatalog = function () {
    	controller.disableStepOne = true;
        controller.catalogObj = {
            status: true
        };
    }
    controller.saveCatalog = function () {
        blockUI.start();

        var response = $http.post('createCatalog_json.json', controller.catalogObj);
        response.success(function (data, status, headers, config) {
            Alertify.success('Registro guardado!');
            blockUI.stop();
            controller.initCatalog();
            return data;
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al guardar!');
            blockUI.stop();
            return undefined;
        });
    }

    controller.editCatalog = function (currentCatalog) {
        controller.catalogObj = currentCatalog;
    }

    controller.cancelCatalog = function () {
        controller.initCatalog();
    }

    controller.downloadReport = function(){
        //blockUI.start();
        var response = $http.get('downloadCatalogXls.json', {responseType: 'arraybuffer'});
        response.success(function (data, status, headers, config) {
            controller.downloadManager.getData(data);
        }).error(function(reason){
        	Alertify.error('Ocurrio un error al procesar el reporte');
        });
    };


    controller.initCatalog();
}]);