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
	      	
	      	defered.resolve(undefined);

            return promise;
        },
        loaderSession: function () {
        	var defered = $q.defer();
	      	var promise = defered.promise;
	      	
	      	defered.resolve(undefined);

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