/**
 * 
 */
angular.module('app').service('dispatcherService', ['$q','$http','Alertify','$timeout', 'blockUI', 
                                         function($q,$http,Alertify,$timeout,blockUI) {      
      
	this.findDispacherById = function (id) {
  	  var deferedDispatcher = $q.defer();
        var response = $http.get('findDispatcherById/' + id);
        response.success(function (data, status) {
        	deferedDispatcher.resolve(data);
        });
        response.error(function (data, status, headers, config) {
        	deferedDispatcher.reject (data);
        });
        return deferedDispatcher.promise;
    };
	
      this.createDispatcher = function(dispatcher){
      	var deferedDispatcher = $q.defer();
          var response = $http.post('createDispatcher_json.json', dispatcher);
          response.success(function (data, status, headers, config) {
        	  deferedDispatcher.resolve(data);
          });
          response.error(function (data, status, headers, config) {
        	  deferedDispatcher.resolve(data);
          });
          return deferedDispatcher.promise;
      };
	  
    
}]);