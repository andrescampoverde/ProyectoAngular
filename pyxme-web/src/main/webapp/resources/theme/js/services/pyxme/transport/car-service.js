/**
 * 
 */
angular.module('app').service('carService', ['$q','$http','Alertify','$timeout', 'blockUI', 
                                         function($q,$http,Alertify,$timeout,blockUI) {

	  this.createCar = function(carDto){
	      	var deferedCar = $q.defer();
	          var response = $http.post('createCar_json.json', carDto);
	          response.success(function (data, status, headers, config) {
	        	  deferedCar.resolve(data);
	          });
	          response.error(function (data, status, headers, config) {
	        	  deferedCar.resolve(data);
	          });
	          return deferedCar.promise;
	   };
	   
	   	
     
      
}]);