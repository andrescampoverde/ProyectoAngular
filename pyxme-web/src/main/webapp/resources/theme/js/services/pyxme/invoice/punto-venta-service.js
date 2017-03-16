/*
 * Copyright (c) 2016.
 *  maniac787@gmail.com
 */

/**
 * Created by Roberto on 12/30/2016.
 */

(function () {
    app.service('FacturaService', ['system_variable','$q', '$http', function (system_variable,$q, $http) {

        /**
         * Retorna una lista de articulos
         * @param filter
         * @returns {Promise}
         */
        this.searchArticle = function (filter) {
            var defer = $q.defer();
            $http.get('facturacion/findArticle/' + filter).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });

            return defer.promise;
        };
        
        this.obtenerAdicional = function (codeId){
        		  var defered = $q.defer();
        		  var promise = defered.promise;
        	      var response = $http.get('findAdditionalById/'+codeId);
        	      response.success(function (data, status, headers, config) {
        	    	  defered.resolve(data);
        	      });
        	      response.error(function (data, status, headers, config) {
        	    	  defered.reject(data);
        	      });
        	
        	      return promise;
        };

        this.searchInvoiceByNumber = function (filter) {
            var defer = $q.defer();
            $http.get('findInvoiceByNumber/' + filter).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });

            return defer.promise;
        };
        
        this.crearFactura = function(cabeceraFactura){
            var defer = $q.defer();
            $http.post('facturacion/createBill_json.json', cabeceraFactura).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        function calcularTotalConIva   (lstDetalle){
    		var sumaValores = 0;
    		var detalle = lstDetalle;
       		angular.forEach(detalle, function (iterador, indice){
        		if (iterador.article.ivaLoader){
        			sumaValores = sumaValores + iterador.quantityProduct;
        		}else {

        		}
        	});
       		return sumaValores;
    	};
        
        function calcularTotalSinIva  (lstDetalle){
    		var sumaValores = 0;
    		var result = undefined;
    		var detalle = lstDetalle;
       		angular.forEach(detalle, function (iterador, indice){
        		if (!iterador.article.ivaLoader){
        			sumaValores = sumaValores + iterador.quantityProduct;
        		}else {
        		}
        	});
       		return sumaValores;
    	};
        
        function calcularDescuento (subtotal, valorDescuento){
    		var calculo = 0;
    		if (valorDescuento== undefined){
    			return 0;
    			 
    		}else {
    			calculo = subtotal * (valorDescuento == undefined ? 0: valorDescuento) /100;
    		}
    		
    		return calculo;
    	};
        
    	function obtenerValores (lstDetalles, lstAdicionales, codigoIva, codigoDescuento){
    		var iva = undefined;
    		var descuento = undefined;
    		
    		for (var i= 0;i<lstAdicionales.length  ;i++){
    			 if(lstAdicionales[i].additional.id == codigoIva  ){
                 	iva = lstAdicionales[i].value;
                 	
                 }else if (lstAdicionales[i].additional.id == codigoDescuento) {
                 	descuento = lstAdicionales[i].value;
                 	
                 }else{
                 	
                 }
    			
    		}
    		
    		
    		
    		var respuestaCalculo = calcularTotalesItems (lstDetalles);
        	var porcentajeIva = iva /100;
    		var valorDescuento = 0;
    		var totalSinImpuesto = calcularTotalSinIva (lstDetalles);
    		var totalConImpuesto = calcularTotalConIva (lstDetalles);
    		var subtotal = totalSinImpuesto + totalConImpuesto;
    		valorDescuento = calcularDescuento  (subtotal,descuento );
    		var valorImpuesto =  porcentajeIva *totalConImpuesto;
    		var invoiceHeader = {
    				valoriva:iva,
    				valorDescuento:descuento,
    				porcentageAdicionalIva:iva,
    				calculoIva:valorImpuesto,
    				calculoDescuento:subtotal -valorDescuento,
    				subTotalZero:totalSinImpuesto,
    				subTotalDoce:totalConImpuesto,
    				subTotal:subtotal,
    				totalValue:valorImpuesto + subtotal -valorDescuento
    		}
    		
    		return invoiceHeader;
    		
    	}
    	
        	
        this.calcularTotals = function (lstDetalles, lstAdicionales){
        	var codigoIva = undefined;
        	var codigoDes = undefined;
        	var deferedTotales= $q.defer(); 
        	var  variablesFacturacion = system_variable.getInvoiceVariable();
        	
        //	if (true) {
        	if (variablesFacturacion.configuracionFactura == undefined) {
                  var repuesta = system_variable.invoiceVariableLoader();
                  repuesta.then(function (data) {
                	  variablesFacturacion = data;
                	  codigoIva = variablesFacturacion.adicionalIva;
                	  codigoDes = variablesFacturacion.adicionaDescuento;
                 
                  var  totalesFactura  = obtenerValores (lstDetalles, lstAdicionales, codigoIva, codigoDes); 	  

                  deferedTotales.resolve(totalesFactura);  
                  
                  }, function (error) {
                	  console.log ('Error al obtener los adicionales');
                
                  deferedTotales.reject(error);
                  });
              } else {
            	  codigoIva = variablesFacturacion.adicionalIva;
            	  codigoDes = variablesFacturacion.adicionaDescuento;
            	  var  totalesFactura  = obtenerValores (lstDetalles, lstAdicionales, codigoIva, codigoDes);
            	  deferedTotales.resolve(totalesFactura);  
              
              }
        	
        	
        	 return deferedTotales.promise;
        
        };
        
        
        function calcularTotalesItems (lstDetalles){
        	var detalle = lstDetalles;
        	var lstDetalle = [];
       		angular.forEach(detalle, function (iterador, indice){
        		iterador.precioUnitario= iterador.article.price;
        		iterador.quantity = iterador.quantity == undefined ? 0:iterador.quantity;
        		iterador.cashDiscount = iterador.cashDiscount == undefined ? 0 : iterador.cashDiscount;
        		iterador.quantityProduct = iterador.quantity * iterador.precioUnitario;
        		iterador.quantityProductDiscount = iterador.quantityProductDiscount == undefined ? 0: iterador.quantityProductDiscount;
        		lstDetalle.push (iterador);
        	});	
       		return detalle;
        };
    
        
        
    }]);
})();