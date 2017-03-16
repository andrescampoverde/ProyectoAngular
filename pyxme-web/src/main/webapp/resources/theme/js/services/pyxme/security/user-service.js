
app.service('userService',['$q', '$http', function ($q, $http) {

	
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

	

}]);