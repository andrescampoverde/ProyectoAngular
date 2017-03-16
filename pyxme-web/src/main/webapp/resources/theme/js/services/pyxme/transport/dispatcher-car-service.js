/**
 * 
 */
angular.module('app').service('dispatcherCarService', ['$q','$http','$timeout',
                                              function($q,   $http,  $timeout) {

	this.findSelftSharedById = function (filter) {
        var defered = $q.defer();
        var response = $http.get('findSelftShared/' + filter);
        response.success(function (data, status, headers, config) {
        	defered.resolve(data);
        });
        response.error(function (data, status, headers, config) {
        	defered.reject(data);
        });
        return defered.promise;
    };
	
	this.findUnitsByFilter = function (filter) {
        var deferedDispatcher = $q.defer();
        var response = $http.get('findUnits/' + filter);
        response.success(function (data, status, headers, config) {
        	deferedDispatcher.resolve(data);
        });
        response.error(function (data, status, headers, config) {
        	deferedDispatcher.reject(data);
        });
        return deferedDispatcher.promise;
    };

	
    this.editSharedService = function(sharedService){
      	var defered = $q.defer();
          var response = $http.post('editSelftShared_json.json', sharedService);
          response.success(function (data, status, headers, config) {
        	  defered.resolve(data);
          });
          response.error(function (data, status, headers, config) {
        	  defered.resolve(data);
          });
          return defered.promise;
   };
    
	
	this.obtenerServicios = function (filter){
	  	var defered = $q.defer();
        var response = $http.post('filtrarServicios.json', filter);
        response.success(function (data, status, headers, config) {
      	  defered.resolve(data);
        });
        response.error(function (data, status, headers, config) {
      	  defered.resolve(data);
        });
        return defered.promise;
	};
	
	
	this.createSharedService = function(sharedService){
      	var defered = $q.defer();
          var response = $http.post('createSelftShared_json.json', sharedService);
          response.success(function (data, status, headers, config) {
        	  defered.resolve(data);
          });
          response.error(function (data, status, headers, config) {
        	  defered.resolve(data);
          });
          return defered.promise;
   };  
	
	
	this.createUnit = function(unit){
	      	var deferedUnit = $q.defer();
	          var response = $http.post('createUnit_json.json', unit);
	          response.success(function (data, status, headers, config) {
	        	  deferedUnit.resolve(data);
	          });
	          response.error(function (data, status, headers, config) {
	        	  deferedUnit.resolve(data);
	          });
	          return deferedUnit.promise;
	   };

	   this.findDispatcherByFilter = function (filter) {
	        var deferedDispatcher = $q.defer();
	        var response = $http.get('findDispatchers/' + filter);
	        response.success(function (data, status, headers, config) {
	        	deferedDispatcher.resolve(data);
	        });
	        response.error(function (data, status, headers, config) {
	        	deferedDispatcher.reject(data);
	        });
	        return deferedDispatcher.promise;
	    };
	   
	   this.findCarsByFilter = function (filter) {
	        var deferedCar = $q.defer();
	        var response = $http.get('findCars/' + filter);
	        response.success(function (data, status, headers, config) {
	        	deferedCar.resolve(data);
	        });
	        response.error(function (data, status, headers, config) {
	        	deferedCar.reject(data);
	        });
	        return deferedCar.promise;
	    }
	   
      
}]);