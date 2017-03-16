app.service('restPersonService', ['catalogService', '$http', '$q', RestPersonService]);

function RestPersonService(catalogService, $http, $q) {

     var that = this;

     this.buscarGeoLocations = function (filter,type){
    	 var deferedRespuesta = $q.defer();
         var response = $http.get('findGeographicLocation/' + filter+'/'+type);
         response.success(function (data, status, headers, config) {
        	 deferedRespuesta.resolve(data);
         });
         response.error(function (data, status, headers, config) {
        	 deferedRespuesta.reject(data);
         });
         return deferedRespuesta.promise;
     };

     
     
     this.buscarTranportista = function (filter,type){
    	 var deferedRespuesta = $q.defer();
         var response = $http.get('findDispatcherByNumberId/' + filter+'/'+type);
         response.success(function (data, status, headers, config) {
        	 deferedRespuesta.resolve(data);
         });
         response.error(function (data, status, headers, config) {
        	 deferedRespuesta.reject(data);
         });
         return deferedRespuesta.promise;
     };
     

     this.validationIdNumber = function (filter, type) {
         var deferedPerson = $q.defer();
         var response = $http.get('validateIdNumber/' + filter+'/'+type);
         response.success(function (data, status, headers, config) {
        	 deferedPerson.resolve(data);
         });
         response.error(function (data, status, headers, config) {
        	 deferedPerson.reject(data);
         });
         return deferedPerson.promise;
     }
     
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
     
     
     this.restValidacionCedula = function (cedula, tipoIdentificacion) {
         var deferedValidacion = $q.defer();
         var response = $http.get('validarCedulaPersona/' + cedula +'/'+tipoIdentificacion);
         response.success(function (data, status) {
             deferedValidacion.resolve(data);
         });

         response.error(function (data, status, headers, config) {
             deferedValidacion.reject(data);
         });

         return deferedValidacion.promise;
     };
     
     this.findPersonById = function (idPerson) {
         var deferedValidacion = $q.defer();
         var response = $http.get('validarCedulaPersona/' + cedula +'/'+tipoIdentificacion);
         response.success(function (data, status) {
             deferedValidacion.resolve(data);
         });

         response.error(function (data, status, headers, config) {
             deferedValidacion.reject(data);
         });

         return deferedValidacion.promise;
     };
     
 
}



