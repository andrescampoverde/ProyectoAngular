/**
 * 
 */
angular.module('app').service('customerService', ['$q','$http','Alertify','$timeout', 'blockUI', 
                                         function($q,$http,Alertify,$timeout,blockUI) {

	  this.lstCustomers = [];
	  this.findCustomerByFilter = function (filter) {
		  blockUI.start();
		   $http.get('findCustomersByFilter/'+ filter).success(function (data, status, headers, config) {
			   this.lstCustomers = data;
			   blockUI.stop();
			   return this.lstCustomers;
        	  
          })
          .error(function (data, status, headers, config) {
        	  Alertify.error('Ocurrio un error al retornar valores!');
        	  blockUI.stop();
          });		    
      };
      
      
      this.findCustomersByFilter = function (filter) {
    	  var deferedCustomer = $q.defer();
		   $http.get('findCustomersByFilter/'+ filter).success(function (data, status, headers, config) {
			   deferedCustomer.resolve(data);        	  
          })
          .error(function (data, status, headers, config) {
        	  deferedCustomer.reject (data);
          });		 
		  return deferedCustomer.promise;
      };
      
	  
      this.findCustomerByNumberId = function (cedula, tipoIdentificacion) {
    	  var deferedCustomer = $q.defer();
          var response = $http.get('validarNuevoCliente/' + cedula +'/'+tipoIdentificacion);
          response.success(function (data, status) {
        	  deferedCustomer.resolve(data);
          });
          response.error(function (data, status, headers, config) {
        	  deferedCustomer.reject (data);
          });
          return deferedCustomer.promise;
      };
      
}]);