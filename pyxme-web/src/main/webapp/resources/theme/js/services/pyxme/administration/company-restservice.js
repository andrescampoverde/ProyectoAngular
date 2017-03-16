app.service('restCompanyService', ['catalogService', '$http', '$q', RestCompanyService]);

function RestCompanyService(catalogService, $http, $q) {

     var that = this;

     this.findCompanyByComercialName = function (filter) {
        var deferedCompany = $q.defer();
        var response = $http.get('findCompanyByComercialName/' + filter);
        response.success(function (data, status, headers, config) {
        	deferedCompany.resolve(data);
        });
        response.error(function (data, status, headers, config) {
        	deferedCompany.reject(data);
        });
        return deferedCompany.promise;
    }
     
     this.validationIdNumber = function (filter) {
         var deferedCompany = $q.defer();
         var response = $http.get('validarRuc/' + filter);
         response.success(function (data, status, headers, config) {
         	deferedCompany.resolve(data);
         });
         response.error(function (data, status, headers, config) {
         	deferedCompany.reject(data);
         });
         return deferedCompany.promise;
     }
 
}



