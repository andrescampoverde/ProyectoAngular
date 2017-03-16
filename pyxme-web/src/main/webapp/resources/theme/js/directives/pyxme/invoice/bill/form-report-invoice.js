angular.module('app').directive('uiReporteFactura', ['Alertify','$modal','$timeout', 'restInvoiceService','$http','blockUI','$modal', function(Alertify,$modal,$timeout,RestInvoiceService,$http,blockUI,$modal) {

        return {
            restrict: 'AE',
            scope: {
                objetoFactura: '=tagFactura'
            },
            link: function(scope, el, attr) {

            },
            templateUrl: 'js/directives/pyxme/invoice/bill/form-report-invoice.html',
            controller: ['$scope', function($scope) {
                var ctrl = this;
              
                ctrl.openModal = function (modal_id, modal_size, modal_backdrop) {
                	ctrl.currentModal = $modal.open({
                        templateUrl: modal_id,
                        size: modal_size,
                        scope: $scope
                    });
                };
                ctrl.openRevokeInvoiceModal = function () {
                	ctrl.openModal('modal-revoke-invoice', 'md');
                }
                
                ctrl.cerarPopUp = function (){
                	ctrl.currentModal.dismiss();
                }
                
                ctrl.anularFactura = function (factura){
                	 blockUI.start();
                	  var respuestaServidor = RestInvoiceService.revokeInvoice(factura);
      	               respuestaServidor.then(function (respuesta) {
      	               $scope.objetoFactura =respuesta;
      	               blockUI.stop();
      	               Alertify.success('Factura anulada exitosamente');
      	               ctrl.currentModal.dismiss();
      	            }, function (error) {
      	               blockUI.stop();
      	               //alert(error);
      	               Alertify.error('Existió un error al anular la factura');
      	               ctrl.currentModal.dismiss();
      	            });
                }
            }],
            controllerAs: 'vm'
        };
    }]);