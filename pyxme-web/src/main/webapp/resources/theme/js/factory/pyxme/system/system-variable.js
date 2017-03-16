
angular.module('app').factory("system_variable",SystemVariable,['$http','$q', function ($http,$q){
	
}]);

function SystemVariable($http, $q) {
    var descargasRealizadas = ["Manual de Javascript", "Manual de jQuery", "Manual de AngularJS"];
    
    var invoiceVariable = undefined;
    
    var interfaz = {
        
        getInvoiceVariable:function(){
            return invoiceVariable;
        },
        
        validarVariable:function(valueToSearch,stringValue){
          valueToSearch = valueToSearch.toString();
          //var lstfilter = valueToSearch.split("");
       	  var lstString = stringValue.split(",");    	  
    	  var index = lstString.indexOf(valueToSearch);
    	  if (index <0  ){
    		  return false;
    	  }else {
    		  return true;
    	  }
        },
        
        invoiceVariableLoader:function(){
        var deferedVariable = $q.defer();
        var responce = this.getVariable('getInvoiceVariable/');
        	responce.then(function(data) 
            	   {
         			  invoiceVariable = data;
         			  deferedVariable.resolve(data);
        	  	   }, function(error) {
        	   	    	console.log ( error );
        	   	       deferedVariable.reject(error);
        	   	    	
        	   	    });
         return deferedVariable.promise;
        },
        
        getVariable : function (restName){
      	  var defered = $q.defer();
      	  var promise = defered.promise;
    	  var response = $http.get(restName);
      	  response.success(function (data, status, headers, config) {
      		  	defered.resolve(data);
      	          
      	     });
      	  response.error(function (data, status, headers, config) {
      	    	defered.reject(data);
      	      });

      	  return promise;
        }
        
    }
    return interfaz;
    
     
  
} 



