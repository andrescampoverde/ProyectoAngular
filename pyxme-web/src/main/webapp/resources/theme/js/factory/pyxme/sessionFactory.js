/*
 * Copyright (c) 2016.
 *  maniac787@gmail.com
 */

/**
 * Created by Roberto Chasipanta on 8/3/16.
 */

app.factory('SessionData', ['$state','$q','$cookies', '$http', 
                  function ( $state , $q, $cookies, $http) {

	var Session = {
        data: null,
        menu:null,
        saveSession: function () { /* save session data to db */
        },
        updateSession: function (requestData, invalidateSession) {
            this.data = requestData;
            if(invalidateSession){
                $cookies.logedUser = null;
            }
        },
        loaderServerSession: function () {
        	var defered = $q.defer();
	      	var promise = defered.promise;

	      	var response = $http.get('getUserSubsidiary/');
            response.success(function (data, status) {
            	defered.resolve(data);
            });

            response.error(function (data, status, headers, booconfig) {
            	defered.reject(data);
            });

            return promise;
        },
        loaderSession: function () {
        	var defered = $q.defer();
	      	var promise = defered.promise;
	      	if ($cookies.logedUser==null)
	      		$state.go('access.signin');
	      		
        	var response = $http.get('restoreSession/' +$cookies.logedUser);
            response.success(function (data, status) {
            	defered.resolve(data);
            });

            response.error(function (data, status, headers, booconfig) {
            	defered.reject(data);
            });

            return promise;
        },
        
        
        getSession: function () {

        	var deft = $q.defer();
        	var prm = deft.promise;
        	if (this.data != null ){
        		deft.resolve(this.data);
        	}else {
        		this.loaderSession ().then(function(data){
        			if(data.id== null)
        			  $state.go('app.lokme');

        			deft.resolve(data);
        		},function(error){
        			deft.reject(error);
        		});
        	}	
            return prm;
        }
    };
    return Session;
}]);