/**
 * 
 */
app.constant("REST_NAMES",{
  INVOICE_VARIABLE:'getInvoiceVariable/',
});
angular.module('app').service("system_variable",SystemVariable,['$http','$q',"REST_NAMES", function ($http,$q, REST_NAMES){
	
}]);

function SystemVariable($http, $q, REST_NAMES) {
  var result = this;
  this.getValue = undefined;
  
  result.setLocalInvoiceVariable = function (invoiceVariable){
	  this.setinvoiceVariable(invoiceVariable);
	  
  }
  
  this.getVariable = function (restName){
	  var defered = $q.defer();
	  var promise = defered.promise;
	     var response = $http.get(restName);
	     response.success(function (data, status, headers, config) {
	    	  defered.resolve(response);
	     });
	      response.error(function (data, status, headers, config) {
		      defered.reject(e);
	      });
	  return promise;
  }
 
  
  this.loadInvoceVariable = function (){
	  var defered = $q.defer();
	  var promise = this.getVariable(REST_NAMES.INVOICE_VARIABLE);
  	   promise.then(function(response) {
	  	   result.setLocalInvoiceVariable(response.data);
	  	   defered.resolve(response.data);
  	   }, function(error) {
  		  defered.reject(e);
  	   });
  	 
	  return defered.promise;	
  }
  this.loadInvoceVariable ();
  
  this.setinvoiceVariable = function (invoiceVariable){
	  this.invoiceVariable = invoiceVariable; 
  }
  
  this.loadArea = function (){
	  return 2+2;
  }
} 





