/*
 * Copyright (c) 2016. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

'use strict';

/**
 * @ngdoc service
 * @name app.catalogService
 * @description
 * # myService
 * Service in the angularSeedApp.
 */
app.service('catalogService',['$q', '$http', function ($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.loadCatalogByFilter = function(grupo,nombre){
        var deferred = $q.defer();
        var response = $http.get('findCatalogoByFilters/'+grupo+'/'+nombre);
        response.success(function (data,status) {
            deferred.resolve(data)
        });
        response.error(function (reason, status, headers, config) {
            deferred.reject(reason);
        });

        return deferred.promise;
    }
	
    this.loadSimpleCatalog = function(groupCatalogName){
        var deferred = $q.defer();
        var response = $http.get('retrieve_simple_catalog/'+groupCatalogName);
        response.success(function (data,status) {
            deferred.resolve(data)
        });
        response.error(function (reason, status, headers, config) {
            deferred.reject(reason);
        });

        return deferred.promise;
    }
}]);