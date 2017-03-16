

(function () {
    app.service('MotivoNota', ['$q', '$http', 
                      function ($q, $http) {

        
        this.saveReasonNote = function(reasonNote){
        	var deferedReport = $q.defer();
            var response = $http.post('createReasonNotes_json.json', reasonNote);
            response.success(function (data, status, headers, config) {
            	 deferedReport.resolve(data);
            });
            response.error(function (data, status, headers, config) {
            	 deferedReport.reject(data);
            });
            return deferedReport.promise;
        };
        
        
    }]);
})();