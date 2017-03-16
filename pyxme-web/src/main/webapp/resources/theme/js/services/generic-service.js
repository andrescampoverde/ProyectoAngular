/**
 * 
 */
angular.module('app').service('genericService', ['$http','Alertify','$timeout', 'blockUI','$q',
                                        function($http,Alertify,$timeout,blockUI,$q) {

	this.succesAlert ={ type: 'success', msg: 'EL registro ha sido guardado exitosamente' };
	this.succesFind = {type: 'success', msg: 'Se ha encontrado un registro con el parametro de busqueda'};
	this.warningFind = {type: 'warning', msg: 'No se ha encontrado registro alguno con el parametro de busqueda'};
	this.dangerUserLogin ={ type: 'warning', msg: 'El usuario no posee una sucursal asignada' },
	this.dangerLogin ={ type: 'danger', msg: 'Acceso no autorizado' },
	this.customerDuplicated ={ type: 'danger', msg: 'El cliente seleccionado ya existe' },
	this.warningRegistroEncontrado ={ type: 'warning', msg: 'No se ha encotnrado registro alguno' },
	this.dangerAlert ={ type: 'danger', msg: 'Hubo un problema al guardar el registro' },
	this.alerts = [];
	
	this.obtenerMensaje = function (tipo, mensaje){
		var sms = undefined;
		if (tipo == 1){
			sms = { type: 'success', msg: mensaje }
		}else if (tipo==2){
			sms = { type: 'warning', msg: mensaje }
		}else{
			sms = { type: 'danger', msg: mensaje }
		}
		return sms;
	}
	
	
	this.closeMessage = function ($scope) {
        $timeout(function () {
        	$scope.alerts.splice(0, 1);
        }, 3000);

    };
	
	this.findObjectDto =function(parameterName){
		var defered = $q.defer();
		var promise = defered.promise;
	        
	        blockUI.start();
            var response = $http.get(parameterName);
            response.success(function (data, status, headers, config) {
                blockUI.stop();
                defered.resolve(data);
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
                defered.reject(data);
            });
			
			return promise;
		
	}
	
	
	
	this.saveObject = function(objectName,object){
		var defered = $q.defer();
		var promise = defered.promise;
		
		
        blockUI.start();
        var response = $http.post('create'+objectName+'_json.json', object);
        response.success(function (data, status, headers, config) {
        defered.resolve(data);	
        blockUI.stop();
                    
        });
        
        response.error(function (data, status, headers, config) {
        Alertify.error('Ocurrio un error al guardar!');
        defered.reject(data);
        blockUI.stop();
        });
		
		return promise;
    }
    
}]);