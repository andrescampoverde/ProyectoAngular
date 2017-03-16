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
app.controller('CatalogGroupFormController', ['$scope', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', function ($scope, $timeout, $http, Alertify, blockUI, ngTableParams) {
    var controller = this;
    controller.lsCatGroups;

    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {


    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    controller.tableParams = new ngTableParams({
        page: 1,            		// show first page
        count: 4,         			// count per page
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

            var response = $http.post('retrieveCatGroup_json.json', paramFilter);
            response.success(function (data, status, headers, config) {
                controller.lsCatGroups = data;
                $scope.items = data.items;
                params.total(data.totalCount);
                $defer.resolve(data.items);
                blockUI.stop();

                $scope.models.lists.A =$scope.items;
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
            });
        }
    });
    controller.initCatGroup = function () {
        controller.catGroupObj = undefined;
    }
    controller.newCatGroup = function () {
        controller.catGroupObj = {
            status: true
        };
    }
    controller.saveCatGroup = function () {
        blockUI.start();
        var response = $http.post('createCatalogGroup_json.json', controller.catGroupObj);
        response.success(function (data, status, headers, config) {
            Alertify.success('Registro guardado!');
            blockUI.stop();
            controller.initCatGroup();
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al guardar!');
            blockUI.stop();
        });
    }

    controller.editCatGroup = function (currentStorage) {
        controller.catGroupObj = currentStorage;
    }

    controller.cancelCatGroup = function () {
        controller.initCatGroup();
    }

    controller.initCatGroup();

}]);