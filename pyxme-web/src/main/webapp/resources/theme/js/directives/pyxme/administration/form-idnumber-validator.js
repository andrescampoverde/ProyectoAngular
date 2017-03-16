 angular.module('app').directive('uiNumberIdentification', ['blockUI','Alertify','restInvoiceService','$timeout','$http','blockUI', 
                                                    function(blockUI,Alertify,RestInvoiceService,$timeout,$http,blockUI) {
    return {
      restrict: 'AE',
      scope: {
    	  number: '=tagNumber',
    	  identificationType: '=tagIdentificationType',
    	  option: '=tagOption',
          validatorValue : '=tagValidator'
      },
      link: function(scope, el, attr) {

      },
      templateUrl: 'js/directives/pyxme/administration/form-idnumber-validator.html',
      controller: ['customerService','restPersonService','restInvoiceService','$modal','$scope','catalogService','blockUI','Alertify',  
          function(CustomerService,RestPersonService,RestInvoiceService,$modal,$scope,catalogService,blockUI, Alertify) {
          var ctrl = this;
          ctrl.customerObj = undefined;
          ctrl.aletasValidaciones = [];
          $scope.number = ($scope.number ? $scope.number:undefined ) ;
          $scope.identificationType =( $scope.identificationType ?  $scope.identificationType :undefined);
          $scope.validatorValue = ( $scope.validatorValue ? $scope.validatorValue	: undefined);
          $scope.option = ($scope.option ? $scope.option:undefined);
          
          ctrl.openIdentificationTypeModal = function () {
        	  ctrl.openModal('modal-catalog-tidentification', 'md');
          };
          
          ctrl.encerarNumero  = function (){
        	  $scope.numeroValidado = undefined;
        	  $scope.number = undefined;
        	  
          }
          
          ctrl.retrieveIndentType = function(){
        	  ctrl.value="";
              blockUI.start();
              catalogService.loadSimpleCatalog('CAT_TIDENT').then(function(data){
            	  ctrl.catalogIdTypeList = data;
                  blockUI.stop();
              }, function(){
                  Alertify.error('Ocurrio un error al cargar el catalogo tipo de identificacion!');
                  blockUI.stop();
              });
          };
          
          
          ctrl.validarNumeroIdentificacion = function (cedula) {
        	  ctrl.numeroValidado = undefined;
          	if (cedula!= undefined){
          		if ($scope.option == '1'){
          			$scope.identificationType = ctrl.identificationType;
          			var respuestaServidor = RestPersonService.validationIdNumber(cedula, ctrl.identificationType.codigoInterno);
      	            respuestaServidor.then(function (respuesta) {
               		ctrl.numeroValidado = ctrl.mostrarAlertas(respuesta);	
               			$scope.validatorValue = ctrl.numeroValidado; 
      	                return ctrl.numeroValidado;
      	            }, function (error) {
      	                console.log(error);
      	                return false;
      	            });	
          			
          		} else if ($scope.option == '2' ){
          			$scope.identificationType = ctrl.identificationType;
          			var respuestaServidor = RestPersonService.findCustomerByNumberId (cedula, ctrl.identificationType.codigoInterno);
          			respuestaServidor.then(function(data){
          				if (data == ''){
          					ctrl.numeroValidado = true;
          					$scope.validatorValue = ctrl.numeroValidado;           					
          					return ctrl.numeroValidado;;
          				}else {
          					ctrl.numeroValidado = false;
          					$scope.validatorValue = ctrl.numeroValidado;
          					ctrl.mensaje = data;
          					return ctrl.numeroValidado;;
          				}
          				
          			},function(error){
          				return false;
          			});
          			
          			
          		} else if ($scope.option == '3' ){
          			$scope.identificationType = ctrl.identificationType;
          			var respuestaServidor = RestPersonService.buscarTranportista (cedula, ctrl.identificationType.codigoInterno);
          			respuestaServidor.then(function(data){
          				if (data == ''){
          					ctrl.numeroValidado = true;
          					$scope.validatorValue = ctrl.numeroValidado;           					
          					return ctrl.numeroValidado;;
          				}else {
          					ctrl.numeroValidado = false;
          					$scope.validatorValue = ctrl.numeroValidado;
          					ctrl.mensaje = data;
          					return ctrl.numeroValidado;;
          				}
          				
          			},function(error){
          				return false;
          			});
          			
          		}
          		else{
          			$scope.identificationType = ctrl.identificationType;
          			var respuestaServidor = RestPersonService.restValidacionCedula(cedula, ctrl.identificationType.codigoInterno);
      	            respuestaServidor.then(function (respuesta) {
               		ctrl.numeroValidado = ctrl.mostrarAlertas(respuesta);	
               			$scope.validatorValue = ctrl.numeroValidado; 
      	                return $scope.validatorValue;
      	            }, function (error) {
      	                console.log(error);
      	                return false;
      	            });	
          		}
  	            
          	} else {
          		console.log(".")
          	}
          };
          
          ctrl.mostrarAlertas = function (mensaje) {
              var str = mensaje;
              var index = str.search("Error");

              if (index >= 0) {
                  if (ctrl.aletasValidaciones.length < 1) {
                	  ctrl.aletasValidaciones.push({type: 'danger', msg: mensaje});
                  }
                  ctrl.closeMessageValidaciones();
                  return false;
              } else {
                  if (ctrl.aletasValidaciones.length < 1) {
                	  ctrl.aletasValidaciones.push({type: 'success', msg: mensaje});
                  }
                  ctrl.closeMessageValidaciones();
                  return true;
              }
          };
          
          ctrl.closeMessageValidaciones = function () {
              $timeout(function () {
            	  ctrl.aletasValidaciones.splice(0, 1);
              }, 3000);

          };
          
          
          ctrl.submitTidentificacion = function (tipoIdentificacion){
        	  ctrl.identificationType= tipoIdentificacion;
        	  $scope.identificationType= tipoIdentificacion;
        	  ctrl.currentModal.dismiss();
         };
          
          ctrl.close = function () {
        	  ctrl.currentModal.dismiss();
          };
          
          ctrl.retrieveIndentType();
          ctrl.openModal = function (modal_id, modal_size, modal_backdrop) {
        	  ctrl.currentModal = $modal.open({
                  templateUrl: modal_id,
                  size: modal_size,
                  scope: $scope
              });
          };
                
      }],
      controllerAs: 'vm'
    };
}]);