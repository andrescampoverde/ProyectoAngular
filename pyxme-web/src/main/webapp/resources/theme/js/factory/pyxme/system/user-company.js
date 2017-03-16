
angular.module('app').factory("user_company",UserCompany,['$http','$q', function ($http,$q){
	
}]);

function UserCompany($http, $q) {
    var descargasRealizadas = ["Manual de Javascript", "Manual de jQuery", "Manual de AngularJS"];
    
    var user_company
    
    var interfaz = {
        
        getUserCompany:function(){
            return user_company;
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
         	// $scope.userSubsidiary = data;
          });
          response.error(function (data, status, headers, config) {
        	  defered.reject(data);
         	// $scope.userSubsidiary = data;
          });

      	  return promise;
        }
        
    }
    return interfaz;
    
     
  
} 



