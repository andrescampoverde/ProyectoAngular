angular.module('app').directive('uiIdentificationtype', function() {
    return {
      restrict: 'AE',
      scope: {
        identificationType: '=identificationType',
        valorValidador : '=valorValidador' 
      },
      templateUrl: 'js/directives/pyxme/invoice/bill/modals/form-type-idnumber.html',
      controller: ['catalogService','$scope','Alertify', 'blockUI','$http', function(catalogService,$scope,Alertify, blockUI, $http) {
          var ctrl = this;
          ctrl.value="";
          ctrl.cargarValor = function (){
        	  $scope.identificationType=ctrl.value; 
          }
          
          ctrl.retrieveIndentType = function(){
        	  ctrl.value="";
              blockUI.start();
              catalogService.loadSimpleCatalog('CAT_TIDENT').then(function(data){
            	  ctrl.catalogIdTypeList = data;
                  blockUI.stop();
              }, function(){
                  Alertify.error('Ocurrio un error al cargar el catalogo de identidad!');
                  blockUI.stop();
              });
          };
          
       ctrl.retrieveIndentType();

      }],
      controllerAs: 'vm'
    }
  });