/**
 * 
 */
angular.module('app').service('genericService', ['$http','Alertify','$timeout', 'blockUI','$q','$timeout', function($http,Alertify,$timeout,blockUI,$q,$timeout) {

	this.saveObject = function(object){
		var defered = $q.defer();
		var promise = defered.promise;
		
		
		try {
        blockUI.start();
        var response = $http.post('createStorage_json.json', object);
        response.success(function (data, status, headers, config) {
            Alertify.success('Registro guardado!');
            blockUI.stop();
            
        });
        
        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al guardar!');
            blockUI.stop();
        });

        defered.resolve(response);
        
		} catch (e) {
	          defered.reject(e);
	    }
		
		return promise;
        
    }
    
    
}]);