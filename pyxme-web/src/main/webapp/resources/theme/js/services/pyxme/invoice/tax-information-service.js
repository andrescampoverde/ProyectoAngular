
(function () {
    app.service('TaxInformationService', ['$q', '$http', function ($q, $http) {

    	this.findTaxInformation = function () {
            var defer = $q.defer();
            $http.get('findInfoNotes/').success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });

            return defer.promise;
        };
        
    }]);
})();