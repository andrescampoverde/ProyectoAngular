app.service('edocumentservice',['system_variable','FacturaService','$q', '$http',
function (system_variable,FacturaService,$q, $http) {

	this.adicionalIva = undefined;
	
	this.obtenerMotivos = function(){
		 var deferedMotivos = $q.defer();
		 var response = $http.get('obtenerMotivosNotas/');
		        response.success(function (data, status) {
		        	deferedMotivos.resolve(data);
		        });
		        response.error(function (data, status, headers, config) {
		        	deferedMotivos.resolve(data);
		        });
		 return deferedMotivos.promise;
	};
	
	this.guardarNota = function (nota){
		var deferNota = $q.defer();
        $http.post('savedocument_json.json', nota).success(function (data, status, headers, config) {
        	deferNota.resolve(data);
        }).error(function (data, status, headers, config) {
        	deferNota.reject(data);
        });
        return deferNota.promise;
	}
   	                           
	
	function crearAdicional (lstDetalleNota, impuesto){
		var totalImpuesto = 0.0;
		var totalSinImpuesto = 0.0;
		for(var i= 0; i< lstDetalleNota.length; i++ ){
			if (lstDetalleNota[i].article)
			if (lstDetalleNota[i].article.ivaLoader){
				totalImpuesto = (lstDetalleNota[i].quantity * lstDetalleNota[i].article.price) + totalImpuesto ;
			}else {
				totalSinImpuesto = (lstDetalleNota[i].quantity * lstDetalleNota[i].article.price)+ totalSinImpuesto;
			}
		};
		
		var adicional = {
				additionalHeader: impuesto,
				value: totalImpuesto * (impuesto.parameter/100),
				subtotal:totalSinImpuesto
		}
		
		return adicional;
	};
	
	
	function obtenerTotales (lstAdicionales){
    	if (lstAdicionales.length>0)
    	var totales = {
    			subTotalSinImp:lstAdicionales[0].subtotal,
    			subTotalConIp:lstAdicionales[0].value,
    			subTotal: lstAdicionales[0].subtotal + lstAdicionales[0].value,
    			total:lstAdicionales[0].subtotal + lstAdicionales[0].value,
    			iva:lstAdicionales[0].additionalHeader.parameter
    	};
    	
    	
    	return totales;
    };
	
	
	function obtenerImpuesto (lstDetalleNota,codigoIva){
		var defered = $q.defer();
		var promise = defered.promise;
		
		if (this.adicionalIva){
			var adicional = crearAdicional (lstDetalleNota,this.adicionalIva);
	    	defered.resolve (adicional);	
		}else {
	    	
	    	var respuestaAdicional = FacturaService.obtenerAdicional (codigoIva);
	    		respuestaAdicional.then(function(data){
		    	this.adicionalIva = data;
		    	var adicional = crearAdicional (lstDetalleNota,data);
		    	defered.resolve (adicional);
		    },function(error){
		    	
		    	defered.reject(error);
		    });
		
		}
		return promise;
	};
    
	
    this.cargarAdicionales = function (noteHeader){
    	var deferedTotales= $q.defer(); 
    	var variablesFacturacion = system_variable.getInvoiceVariable();
    	var codigoIva = undefined;
    	noteHeader.lstNoteAditional=[];
    	
    	if (variablesFacturacion == undefined) {
              var repuesta = system_variable.invoiceVariableLoader();
              repuesta.then(function (data) {
            	  variablesFacturacion = data;
            	  codigoIva = variablesFacturacion.adicionalIva;
            	  
            	  var responce = obtenerImpuesto (noteHeader.lstNoteDetail,codigoIva);
            	  responce.then (function(data){
            		  
            		  noteHeader.lstNoteAditional.push(data);
            		
            		  deferedTotales.resolve(noteHeader);
            		  
            	  },function(error){
            		  deferedTotales.reject(error);  
            	  });
            	  
            	    
              
              }, function (error) {
                  deferedTotales.reject(error);
              });
          } else {
        	  codigoIva = variablesFacturacion.adicionalIva;
        	  var responce = obtenerImpuesto (noteHeader.lstNoteDetail,codigoIva);
        	  responce.then (function(data){
        		  
        		  noteHeader.lstNoteAditional.push(data);
        		  noteHeader.totales = obtenerTotales(noteHeader.lstNoteAditional);
        		  deferedTotales.resolve(noteHeader);
        		  
        	  },function(error){
        		  deferedTotales.reject(error);  
        	  });
        	  
        	  deferedTotales.resolve(noteHeader);  
          }
    	 return deferedTotales.promise;
    };   
}]);