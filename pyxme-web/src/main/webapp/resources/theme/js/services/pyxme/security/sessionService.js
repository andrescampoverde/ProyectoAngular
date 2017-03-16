/*
 * Copyright (c) 2016.
 *  maniac787@gmail.com
 */

/**
 * Created by Roberto Chasipanta on 8/5/16.
 */


app.service('SessionService',['$q', '$http', function ($q, $http) {

    /**
     *
     * @param logedData
     * @returns {Promise}
     */
    this.storeSessionData = function(logedData){
        var deferred = $q.defer();
        $http.post('token_json', logedData).success(function(dataResult, status){
            deferred.resolve(dataResult);
        }).error(function(reason){
            deferred.reject(reason);
        });

        return deferred.promise;
    };

}]);