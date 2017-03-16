app.controller('CarShared',['$cookies','$scope','$modal' , 
                   function($cookies,$scope,$modal ) 
{
        controller = this;
        controller.activarDashBoard= true;
        controller.userName = $cookies.userName;	
        
        controller.abrirConfirmacion = function () {
            controller.openModal('modal-confirmar-ruta', 'lg');
        };
        
        
        controller.abrirFormAutomovil = function (bandera){
        	 controller.formAutomovil = bandera;
        	 controller.listaRutas =bandera;
        	 controller.activarDashBoard = bandera;
        };
        
        controller.openModal = function (modal_id, modal_size, modal_backdrop) {
            $scope.currentModal = $modal.open({
                templateUrl: modal_id,
                size: modal_size,
                scope: $scope
            });
        };
        
        controller.activarLista = function (bandera){
        	controller.listaRutas = bandera;	
        };
        
        controller.cancelarFormularios = function (){
        	controller.solicitd = false;
        	controller.formAutomovil = false;
            controller.oferta = false;	
            controller.categorias = false;
            controller.activarDashBoard = true;
        };
        
        controller.activarCategorias = function (bandera){
        	controller.categorias = bandera;
        	controller.activarDashBoard = false;
        };
        
        controller.activarSolicitud = function (bandera){
        	controller.oferta= false;
        	controller.solicitd = bandera;
        	controller.activarDashBoard = false;
        
        };
        
        controller.activarOferta = function (bandera){
        	controller.solicitd = false;
        	controller.oferta= bandera;	
        	controller.activarDashBoard = false;
        	
        }
        
        
    }]);