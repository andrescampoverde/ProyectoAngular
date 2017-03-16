
angular.module('app').service('calculoTotalServicio',['$http','$q', Total]);

function Total($http, $q) {
	
	this.subTotalZero= undefined;
	this.subTotal= undefined;
	this.descuento = undefined;
	this.subTotalFact= undefined;
	this.iva = undefined;
	this.total= undefined;
	this.valorIva = undefined;
	this.valorDescuento = undefined;
	
	this.setValorDescuento = function(valor){
		this.valorDescuento = valor;
	}
	
	this.setDescuento = function (valor){
		this.descuento = valor;
	}
	
	this.setTotal = function(valor){
		this.total= valor;
	}
	
	this.setIva = function (valor){
		this.iva = valor;
	}
	
	this.setSubTotalFact = function (valor){
		this.subTotalFact = valor ;
	}
	
	this.setSubTotalZero = function (valor){
		this.subTotalZero = valor ;
	}
	this.setSubTotal = function (valor){
		this.subTotal = valor ;
	}
	
	 var result = this;

	this.setValorIva = function (valorIva){
		this.valorIva = valorIva;
	}
	

	
	this.calcularTotales = function (lstDetalle){
		this.totalPrimeRegla (lstDetalle);
	}
	 
	this.setVariables = function (valor){
		this.variable = valor;
	} 
	
	
	this.setObjetoAdicional = function (obj){
		obj.quantity = (obj.quantity== undefined ? 0:obj.quantity);
		obj.value = (obj.value== undefined ? 0:obj.value);
		this.objetoAdicional = obj;	
	}
	
	result.calcularDescuento = function (subtotal, objAdicional){
		var calculo = 0;
		if (objAdicional== undefined){
			return 0;
			 
		}else {
			calculo = subtotal * (objAdicional.quantity == undefined ? 0: objAdicional.quantity) /100;
		}
		
		return calculo;
	};
	
	this.totalPrimeRegla = function (factura){
		var respuestaCalculo = result.primeraRegla (factura);
		var porcentajeIva = 0;
		var valorDescuento = 0;
		porcentajeIva = this.valorIva /100;
		
		result.calcularTotalSinIva (respuestaCalculo);
		result.calcularTotalConIva (respuestaCalculo);
		var varSubtotal = this.subTotal+ this.subTotalZero;

		valorDescuento = result.calcularDescuento(varSubtotal,this.objetoAdicional);
		this.valorDescuento = valorDescuento;
		this.setSubTotalFact (varSubtotal - valorDescuento);
		this.setIva(porcentajeIva * (this.subTotal));
		this.setTotal  (this.iva + varSubtotal - valorDescuento);
		
	}
	
	result.calcularTotalSinIva  = function (lstDetalle){
		var sumaValores = 0;
		result.lstDetalle = [];
		var detalle = lstDetalle;
   		angular.forEach(detalle, function (iterador, indice){
    		if (!iterador.article.ivaLoader){
    			sumaValores = sumaValores + iterador.quantityProduct;
    		}else {
    		}
    		result.lstDetalle.push (iterador);
    	});
   		this.setSubTotalZero (sumaValores);
	}

	result.calcularTotalConIva  = function (lstDetalle){
		var sumaValores = 0;
		result.lstDetalle = [];
		var detalle = lstDetalle;
   		angular.forEach(detalle, function (iterador, indice){
    		if (iterador.article.ivaLoader){
    			sumaValores = sumaValores + iterador.quantityProduct;
    		}else {
    		}
    		result.lstDetalle.push (iterador);
    	});
   		this.setSubTotal (sumaValores);
	}
	
	
	result.primeraRegla= function (factura){
		result.lstDetalle = [];
		var detalle = factura.lstInvoiceDetails;
   		angular.forEach(detalle, function (iterador, indice){
    		iterador.precioUnitario= iterador.article.price;
    		iterador.quantity = iterador.quantity == undefined ? 0:iterador.quantity;
    		iterador.cashDiscount = iterador.cashDiscount == undefined ? 0 : iterador.cashDiscount;
    		iterador.quantityProduct = iterador.quantity * iterador.precioUnitario;
    		iterador.quantityProductDiscount = iterador.quantityProductDiscount == undefined ? 0: iterador.quantityProductDiscount;
    		result.lstDetalle.push (iterador);
    	});
    		
    	return detalle;
	}

	result.setDescuentoValue = function (valor){
		this.setValorDescuento (valor);
	}
	
	result.setIvaValue = function(valor) {
		this.setValorIva(valor);
	}
	
	
	this.espesificarIva = function (valor){
		result.setIvaValue (valor);
	};
	
	this.espesificarDescuento = function (valor){
		result.setDescuentoValue (valor);
	};
	
	this.espesificarPropina = function (valor){
		result.setDescuentoValue (valor);
	};
	
	
	this.obtenerDescuento = function (codigo){
		var deferedIva = $q.defer();
		try {
			var responceIva = result.additional (codigo);
			responceIva.then (function (succes){
			result.setDescuentoValue (succes.parameter);
			},function (error){
				deferedIva.reject(error);
			});
			
		}catch (e){
			deferedIva.reject(e);
		}
	};
	
	this.obtenerIva = function (codigo){
		var deferedIva = $q.defer();
		try {
			var responceIva = result.additional (codigo);
			responceIva.then (function (succes){
			result.setIvaValue (succes.parameter);
			//this.setValorIva (succes.parameter);				
			},function (error){
				deferedIva.reject(error);
			});
			
		}catch (e){
			deferedIva.reject(e);
		}
	};
	
	result.additional = function (filtro) {
		  var deferedTotal = $q.defer();
		  
			  var responseTotal = $http.get('findAdditionalById/'+ filtro);
			      responseTotal.success(function (data, status, headers, config) {
			    	  deferedTotal.resolve(data);
			      });
			      
			      responseTotal.error(function (data, status, headers, config) {
			      deferedTotal.reject(data);
			      });
		      
		  
		  return deferedTotal.promise;
	      
	  }
	
	
	
	 this.obtenerCalcularTotal = function (filtro){
		  this.cliente = undefined;
		  var deferedTotal = $q.defer();
		  
		  try {
			  //devuelve la promesa del servidoer
			  var responseTotal =	result.obtenerPersona (filtro);
			  
			  //espera hasta que el servidor devuelva datos y se ejecute el promesa.resolve()
			  responseTotal.then(function(response) {
				  if (response.length > 1 ){
					  var cliente = result.lstPersonaCliente (response);
					  result.setCliente (cliente);
				  } else if (response.length == 1 ){
					  var persona = response[0];
					  var cliente =  result.cargarClientePersona (persona);
					  result.setCliente (cliente);
				  }	else {
					  result.setCliente (undefined);
				  }
				  deferedTotal.resolve(response);
			 }, function(error) {
				 deferedTotal.reject(error);
			 });
		  } catch (e){
			  deferedTotal.reject(e);
		  }
		  
		  return deferedTotal.promise;
	  };
	
	

}



