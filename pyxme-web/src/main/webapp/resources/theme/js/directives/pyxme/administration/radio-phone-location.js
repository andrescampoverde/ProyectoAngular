angular.module('app').directive('uiSphone', function() {
    return {
      restrict: 'AE',
      scope: {
        currentPerson: '=currentPerson',
        currentPhone: '=currentPhone',
        
      },
      templateUrl: 'js/directives/pyxme/administration/radio-phone-location.html',
      controller: ['$scope','Alertify', 'blockUI','$http', function($scope,Alertify, blockUI, $http) {
          var ctrl = this;
          ctrl.customerObj = undefined;          
          $scope.lstPhones = [];
          
          
          ctrl.selectPhone = function(currentPhone){
              $scope.currentPhone = currentPhone;
          }
             
          ctrl.retrievePhoneByPerson = function(){
              blockUI.start();
              var response = $http.get('findPhoneByPerson/' + $scope.currentPerson.id );
              response.success(function (data,status) {
              	$scope.phoneList = data;
                  blockUI.stop();
              });

              response.error(function (data, status, headers, config) {
                  Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
                  blockUI.stop();
              });
          }
          
          ctrl.retrievePhoneByPerson();

      }],
      controllerAs: 'vm'
    }
  });