/*
 * Copyright (c) 2016. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

'use strict';

/**
 * @ngdoc service
 * @name app.catalogService
 * @description
 * # myService
 * Service in the angularSeedApp.
 */
app.service('utilStringService',['$timeout','$q', '$http', function ($timeout,$q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	this.obtenerIncrementoHora = function (date,valor){
		var dato = minutosHoras(date.getMinutes()+valor);
		var tmp ={
				hr:date.getHours()+dato.hr,
				mn:dato.mn
		} 
		return tmp;
	};
	
	function minutosHoras (minutos){
		var tiempo = {
				hr:0,
				mn:0
		};
		
		if (minutos<60){
			tiempo ={
					hr:0,
					mn:minutos
			} 
			return tiempo; 
		}else{
			
			var tmp = minutosHoras (minutos -60);
			tiempo = {
					hr:tiempo.hr+1+tmp.hr,
					mn:tmp.mn
			};
			
			return tiempo;
		}
	};
	
   this.loadSimpleCatalog = function(groupCatalogName){
        var deferred = $q.defer();
        var response = $http.get('retrieve_simple_catalog/'+groupCatalogName);
        response.success(function (data,status) {
            deferred.resolve(data)
        });
        response.error(function (reason, status, headers, config) {
            deferred.reject(reason);
        });

        return deferred.promise;
    }
    this.crearMensaje = function ($scope,tipo,mensaje){
		$scope.vm.alerts= [];
		$scope.vm.alerts.push(this.obtenerMensaje (tipo,mensaje));
		closeMessage($scope);
	}
    
    
    function closeMessage($scope) {
        $timeout(function () {
        	$scope.vm.alerts.splice(0, 1);
        }, 3000);

    };
    
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
	
    
    this.arrayObjectIndexOf = function (myArray, searchTerm, property) {
	    for(var i = 0, len = myArray.length; i < len; i++) {
	        if (myArray[i][property] === searchTerm) 
	        return myArray[i];
	    }
	    return -1;
	}
    
    this.validarCedulaEcuatoriana = function  ($scope, cedula){
    	if (cedula== undefined){
    		this.crearMensaje($scope,3,'Debe ingresar un dato válido');
    		return false;
    	}else {
    	
    	if(cedula.length == 10){
            
            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.substring(0,2);
            
            //Pregunto si la region existe ecuador se divide en 24 regiones
            if( digito_region >= 1 && digito_region <=24 ){
              
              // Extraigo el ultimo digito
              var ultimo_digito   = cedula.substring(9,10);

              //Agrupo todos los pares y los sumo
              var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

              //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
              var numero1 = cedula.substring(0,1);
              var numero1 = (numero1 * 2);
              if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

              var numero3 = cedula.substring(2,3);
              var numero3 = (numero3 * 2);
              if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

              var numero5 = cedula.substring(4,5);
              var numero5 = (numero5 * 2);
              if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

              var numero7 = cedula.substring(6,7);
              var numero7 = (numero7 * 2);
              if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

              var numero9 = cedula.substring(8,9);
              var numero9 = (numero9 * 2);
              if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

              var impares = numero1 + numero3 + numero5 + numero7 + numero9;

              //Suma total
              var suma_total = (pares + impares);

              //extraemos el primero digito
              var primer_digito_suma = String(suma_total).substring(0,1);

              //Obtenemos la decena inmediata
              var decena = (parseInt(primer_digito_suma) + 1)  * 10;

              //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
              var digito_validador = decena - suma_total;

              //Si el digito validador es = a 10 toma el valor de 0
              if(digito_validador == 10)
                var digito_validador = 0;

              //Validamos que el digito validador sea igual al de la cedula
              if(digito_validador == ultimo_digito){
            	  this.crearMensaje($scope,1,'La cédula: ' + cedula + ' es correcta');
            	  return true;
                //console.log('la cedula:' + cedula + ' es correcta');
              }else{
            	  this.crearMensaje($scope,3,'La cédula: ' + cedula + ' es incorrecta');
            	  return false;	
                //console.log('la cedula:' + cedula + ' es incorrecta');
              }
              
            }else{
              // imprimimos en consola si la region no pertenece
            	this.crearMensaje($scope,1,'La cédula: ' + cedula + ' no pertenece a ninguna región');
            	return false;
            	//  console.log('Esta cedula no pertenece a ninguna region');
            }
         }else{
            //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        	 this.crearMensaje($scope,1,'La cédula: ' + cedula + ' no posee 10 dígitos');
        	 return false;
        	 //console.log('Esta cedula tiene menos de 10 Digitos');
         }    
    	}
    }
    
    
}]);