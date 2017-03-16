/**
 * 
 */
angular.module('app').service('articleService', ['$q','$http','$timeout', 
                                         function($q,$http,$timeout) {

	
	  this.findArticlesByFilter = function (filter) {
		  var defered = $q.defer();
		  var promise = defered.promise;
		  var respuesta = $http.get('findArticleByFilter/'+filter);
		  	  respuesta.success(function (data, status, headers, config){
		  		 defered.resolve(data);
		  	  });
		  	  
		  	  respuesta.error(function (data, status, headers, config){
		  		 defered.reject(data);
		  	  });
		  	 return promise;
      };
      
	  this.findArticlesByInvoice = function (invoiceId) {
		  var defered = $q.defer();
		  var promise = defered.promise;
		  var respuesta = $http.get('findArticleByInvoice/'+invoiceId);
		  	  respuesta.success(function (data, status, headers, config){
		  		 defered.resolve(data);
		  	  });
		  	  
		  	  respuesta.error(function (data, status, headers, config){
		  		 defered.reject(data);
		  	  });
		 return promise;
      };

      
      
     // var
      
    
}]);