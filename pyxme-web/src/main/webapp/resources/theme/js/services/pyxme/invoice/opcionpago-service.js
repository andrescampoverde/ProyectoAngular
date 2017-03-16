/**
 * 
 */

angular.module('app').service('opcionPagoService',['catalogService','$http','$q', OpcionPago]);

function OpcionPago(catalogService,$http, $q) {
	
	var contador=0;
	var variable = this;
	this.lstOpcionesPanel = [];
	this.lstOpcionesPanelAuxiliar = [];
	var lstOpcionesPanelAux = [];
	
	
	this.cargarOpcionesPanel = function (){
		contador=0;
		this.lstOpcionesPanel = [];
		this.lstOpcionesPanelAuxiliar = [];
		var lstOpcionesPanelAux = [];
		
		var responseOpcionesPanel = variable.obtenerOpcionesPanel();
			responseOpcionesPanel.then (function(response) {
			variable.cargarOpcionesCompletas(response);
		},function(error){
			deferedOpciones.reject(error);
		});
	}
	
	variable.obtenerOpcionesPanel = function (){
		var deferedPanelOpciones = $q.defer();
		try {
			 var response = $http.get('retrieve_simple_catalog/'+'CAT_TPAGO');
		     response.success(function (data, status, headers, config) {
		    	 deferedPanelOpciones.resolve(data);
		     });
		     response.error(function (data, status, headers, config) {
		    	 deferedPanelOpciones.reject(data);
		     });
			
			}catch (e){
				deferedPanelOpciones.reject(e);
			}
			
			return deferedPanelOpciones.promise;
	}
	

 	this.obtenerPagoEfectivo = function (codigoFormaPago){
 	 	for (var i = 0; i<lstOpcionesPanelAux.length ; i++){
 	 	  for (var j = 0; j< lstOpcionesPanelAux [i].lstWayPay.length ; j++ ){
 	 	 	 if (lstOpcionesPanelAux [i].lstWayPay[j].id == codigoFormaPago  ){
 	 	   				 return  lstOpcionesPanelAux [i].lstWayPay[j];
 	 	   				 
 	 	   			 }else {
 	 	   			 }
 	 	   		 }
 	 	   		} 
 	 	}
	
	
	this.setLstOpciones = function(lstOpcionesPanel){
		this.lstOpcionesPanel = lstOpcionesPanel;
	}
	
	this.setlstOpcionesPanelAuxiliar = function(lstOpcionesPanelAuxiliar){
		this.lstOpcionesPanelAuxiliar = lstOpcionesPanelAuxiliar;
	}
	
	variable.cargarFormapago = function (formaPago){
	     this.lstOpcionesPanel.push(formaPago);
	     this.setLstOpciones(this.lstOpcionesPanel);
	     variable.clonarListaOpciones(this.lstOpcionesPanel);
    }
	
	
	
	this.recuperarFormaPago = function (formaPago){
		  var lstNewOpciones = [];
	      this.lstWayPayBucle = [];
	    	  for(var j=0;j<lstOpcionesPanelAux.length ;j++) {
	    		  for(var i=0;i<lstOpcionesPanelAux[j].lstWayPay.length ;i++) {
	    		  	if (lstOpcionesPanelAux[j].lstWayPay[i].id == formaPago.id ){
	       					 this.lstWayPayBucle = {
	       							cratingDate:lstOpcionesPanelAux[j].lstWayPay[i].cratingDate,
	       							id:lstOpcionesPanelAux[j].lstWayPay[i].id,
	       							name:lstOpcionesPanelAux[j].lstWayPay[i].name,
	       							status:lstOpcionesPanelAux[j].lstWayPay[i].status
	       					} 
	       					lstNewOpciones={
	       							creatingDate:lstOpcionesPanelAux[j].creatingDate,
	       							description :lstOpcionesPanelAux[j].description,
	       							id:lstOpcionesPanelAux[j].id,
	       							name:lstOpcionesPanelAux[j].name,
	       							status:lstOpcionesPanelAux[j].status,
	       							lstWayPay: []
	       					};
	       					
	       					lstNewOpciones.lstWayPay.push(this.lstWayPayBucle);
	       					variable.insertarRecuperado(lstNewOpciones);
	       					 return lstNewOpciones.lstWayPay;
	       				}else{
	       				}
	    		  }
	    	  }
	      }
	
	variable.insertarRecuperado = function (lstOpcionRecuperado)
    {
  	  for(var j=0;j<controller.lstOpcionesPanel.length ;j++) {
  		  if (this.lstOpcionesPanel[j].id == lstOpcionRecuperado.id ){
  			this.lstOpcionesPanel[j].lstWayPay.push(lstOpcionRecuperado.lstWayPay[0]);
  		  }
  		  else {
  		  }
  	  }
  	  this.lstOpcionesPanel[j];
    }
	
	variable.clonarListaOpciones = function (lstOpciones){
   	 var lstOpcion = [];
   	 for (var i= 0; i< lstOpciones.length ; i++ ){
   		 var opcion={
						creatingDate:lstOpciones[i].creatingDate,
						description :lstOpciones[i].description,
						id:lstOpciones[i].id,
						name:lstOpciones[i].name,
						status:lstOpciones[i].status,
						lstWayPay: []
				};
   		 
   		 for (var j = 0; j< lstOpciones[i].lstWayPay.length; j++ ){
   			 var formaPago= {
   				 creatingDate:lstOpciones[i].lstWayPay[j].creatingDate,
  					 id: lstOpciones[i].lstWayPay[j].id,
  					 name:lstOpciones[i].lstWayPay[j].name,
  					 status:lstOpciones[i].lstWayPay[j].status
   			 }
   			 opcion.lstWayPay.push(formaPago);
   		 }
   		 lstOpcion.push(opcion);
   	 }
   	 lstOpcionesPanelAux =lstOpcion;
   	 this.setlstOpcionesPanelAuxiliar (lstOpcionesPanelAux);
   	 //lstOpcionesPanelAux =lstOpcion;
    }
	
	
	variable.cargarOpcionesCompletas = function (lstTipoPago){
		  angular.forEach(lstTipoPago, function(iterador, indice){
		      var promise = variable.obtenerFormaPagoportipo(iterador.id);
			   promise.then(function(response) 
				{
				   contador = contador +1;
				   if (contador <= 2){
					   iterador.lstWayPay = response.data;
					   variable.cargarFormapago(iterador);
				   }
				   		else 
				   {
				   }
			   
			   }, function(error) {
		 	    	console.log ( error );
		 	    });
		  });
	  }
	
	variable.obtenerFormaPago = function (codigoformaPago){
	    	 for (var i = 0; i<lstOpcionesPanelAux.length ; i++){
	    		 for (var j = 0; j< lstOpcionesPanelAux [i].lstWayPay.length ; j++ ){
	    			 if (lstOpcionesPanelAux [i].lstWayPay[j].id == codigoformaPago  ){
	    				 return  lstOpcionesPanelAux [i].lstWayPay[j];
	    				 
	    			 }else {
	    			 }
	    		 }
	    	 }
	     } 
	
	variable.obtenerFormaPagoportipo = function (codeType){
		  var defered = $q.defer();
		     var response = $http.get('findWayPayByTypeId/'+codeType );
			     response.success(function (data, status, headers, config) {
	  	         defered.resolve(response);
		     });
		      response.error(function (data, status, headers, config) {
		    	  defered.reject(e);
		     });
		      
		  return defered.promise;
	  }
	
	


}



