/**
 * 
 */
angular.module('app').service('geoLocationService', ['$q','$http','$timeout', 
                                         function($q,$http,$timeout) {

	this.retrieveGeoLocationParents = function () {
		  var defered = $q.defer();
		  var promise = defered.promise;
		  var response = $http.get('retrieveGeoLocationParents_json');
		  		response.success(function (data, status, headers, config){
		  		 defered.resolve(data);
		  	  });
		  		response.error(function (data, status, headers, config){
		  		 defered.reject(data);
		  	  });
		  	 return promise;
  };
	
	
	this.findGeographicLocationByName = function (filter) {
		  var defered = $q.defer();
		  var promise = defered.promise;
		  var respuesta = $http.get('findGeographicLocationByName/'+filter);
		  	  respuesta.success(function (data, status, headers, config){
		  		 defered.resolve(data);
		  	  });
		  	  respuesta.error(function (data, status, headers, config){
		  		 defered.reject(data);
		  	  });
		  	 return promise;
    };
	
	  this.findGeographicLocationById = function (filter) {
		  var defered = $q.defer();
		  var promise = defered.promise;
		  var respuesta = $http.get('findGeographicLocationById/'+filter);
		  	  respuesta.success(function (data, status, headers, config){
		  		 defered.resolve(data);
		  	  });
		  	  respuesta.error(function (data, status, headers, config){
		  		 defered.reject(data);
		  	  });
		  	 return promise;
      };
      

      this.editGeoLocation = function(geoLocation){
        	var defered = $q.defer();
            var response = $http.post('editGeoLocation_json.json', geoLocation);
            response.success(function (data, status, headers, config) {
          	  defered.resolve(data);
            });
            response.error(function (data, status, headers, config) {
          	  defered.resolve(data);
            });
            return defered.promise;
     };
    
     this.createGeoLocation = function(geoLocation){
     	var defered = $q.defer();
         var response = $http.post('createGeoLocation_json.json', geoLocation);
         response.success(function (data, status, headers, config) {
       	  defered.resolve(data);
         });
         response.error(function (data, status, headers, config) {
       	  defered.resolve(data);
         });
         return defered.promise;
  };
      
      
    
}]);