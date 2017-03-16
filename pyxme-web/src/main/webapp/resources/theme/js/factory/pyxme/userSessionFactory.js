
app.factory('userSessionFactory', ['$q','$cookies', '$http', function ($q, $cookies, $http) {
	var user_company;
	var localState;
    var interfaz = {
        getUserCompany:function(){
            return user_company;
        },
        setState:function (state){
        	localState = state;
        },
        
        getState:function (){
        	return localState;
        },
        
        userCompanyLoader:function(){
	        var deferedInformation = $q.defer();
	        var responce = this.getRestUserSuc();
	        	responce.then(function(data) 
	            	   {
	         			  user_company = data;
	         			  deferedInformation.resolve(data);
	        	  	   }, function(error) {
	        	   	       deferedInformation.reject(error);
	        	   	    });
	         return deferedInformation.promise;
        },
        
        getRestUserSuc : function (){
	      	  var defered = $q.defer();
	      	  var promise = defered.promise;
	      	  var response = $http.get('getUserSubsidiary/');
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
	
}]);