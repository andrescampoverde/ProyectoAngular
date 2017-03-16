app.service('restUserService', ['catalogService', '$http', '$q', RestUserService]);

function RestUserService(catalogService, $http, $q) {

     var that = this;

     
     this.editUser = function (userDto){
    	 var deferedUser = $q.defer();
         var responseUser = $http.post('editUser_json.json', userDto);
         	 responseUser.success(function (data, status, headers, config) {
        	 deferedUser.resolve(data);
         });
         	responseUser.error(function (data, status, headers, config) {
         		deferedUser.reject(data);
         });
         return deferedUser.promise;
     };

      
     this.crearAutoRegistro = function (userDto){
    	 var deferedUser = $q.defer();
         var responseUser = $http.post('autoRegistro_json.json', userDto);
         	 responseUser.success(function (data, status, headers, config) {
        	 deferedUser.resolve(data);
         });
         	responseUser.error(function (data, status, headers, config) {
         		deferedUser.reject(data);
         });
         return deferedUser.promise;
     };
     
     this.loginSubsidiary = function (userSubsidiary) {
    	 var deferedDirec = $q.defer();
         var responseDir = $http.post('loginSubsidiary_json.json', userSubsidiary);
         	 responseDir.success(function (data, status, headers, config) {
        	 deferedDirec.resolve(data);
         });
         	 responseDir.error(function (data, status, headers, config) {
        	 deferedDirec.reject(data);
         });
         return deferedDirec.promise;
     };
     
     
     this.findUserByName = function (filter) {
    	 var deferedUser = $q.defer();
    	 var responseUser = $http.get('findUserByUsername/' + filter);
    	 responseUser.success(function (data, status) {
    		 deferedUser.resolve(data);
         });
    	 responseUser.error(function (data, status, headers, booconfig) {
    		 deferedUser.reject(data);
         });
         return deferedUser.promise;
     }; 
     
     
     this.retrieveSubsidiaries = function (filter) {
    	 var deferedUserSubsidiary = $q.defer();
    	 var responseUserSubsidiary = $http.get('findSubsidiariesByUser/' + filter);
    	 responseUserSubsidiary.success(function (data, status) {
    	 deferedUserSubsidiary.resolve(data);
         });
    	 responseUserSubsidiary.error(function (data, status, headers, booconfig) {
         deferedUserSubsidiary.reject(data);
         });
         return deferedUserSubsidiary.promise;
     }; 
     
     
 	this.verificarUsuario = function (user){
      	var deferedUser = $q.defer();
		var response = $http.post('loginUser_json.json', user);
        response.success(function (data, status, headers, config) {
        	deferedUser.resolve(data);
        }, function (data, status, headers, config){
        	deferedUser.reject(data);
        });
        return deferedUser.promise;
	};

    this.findUserByName = function (filter) {
    		var user = {
         			id:0,
         			userName: filter
         	}
    	 
    		var deferedUsuario = $q.defer();
         	var response = $http.post('findUserByUsername.json',user);
             response.success(function (data, status, headers, config) {
    	           	deferedUsuario.resolve(data);
             });
             response.error(function (data, status, headers, config) {
             	deferedUsuario.reject(data);
             });
         return deferedUsuario.promise;
     }
 
}



