/*
 * Copyright (c) 2015. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * Created by esyacelga
 */

app.controller("InvoiceConfigController",['utilStringService','system_variable','$modal','catalogService',"$scope","genericService",'$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams','$q',
                                 function(utilStringService,system_variable,$modal, catalogService,$scope,genericService, $timeout, $http, Alertify, blockUI, ngTableParams,$q) {
	 
	 controller = this;
	 controller.madule = undefined;
	 controller.opcionContado= undefined;
	 controller.opcionCredito= undefined;
	 controller.habilitarContado = false;
	 controller.habilitarCredito = false;
	 controller.pagoContado = undefined;	
	 controller.pagoCredito = undefined;
	 controller.respConfiguracionFactura = undefined;
	 controller.taxInformationObj = {
			 typeTrasaction : undefined
	 };
	 controller.lstPagoContado = [];
	 controller.lstPagoCredito = [];
	 controller.lstVariables = [];
	 
	 controller.grupo = {
		 opcioncontado:[] 
	 };
	 

     controller.guardarFormaPago = function(currentObjt){
    	 var defered = $q.defer();
         var response = $http.post('createWayPay_json.json', currentObjt);
         response.success(function (data, status, headers, config) {
        	 defered.resolve(data)
         });

         response.error(function (data, status, headers, config) {
        	 defered.reject(reason);
         });
         return defered.promise;
     };
     
     controller.closeMessage = function(){
     	  $timeout(function() {
     		  controller.alerts.splice(0, 1);
     	      }, 3000);
     	
       };
       
      controller.cargarAdicionalIva = function (){
    	  var iva = {
    			  name:controller.aditonalIva.name,
    			  parameter:controller.aditonalIva.parameter,
    			  sign:1,
    			  status:true
    	  }
    	  
    	  return iva;
      }  
	 
      controller.reconfigurarVariables= function (){
    	  controller.invoiceVariable.configuracionFactura  = undefined;
      }
      
      controller.cargarAdicionalDescuento = function (){
    	  if (controller.aditonalDesc == undefined){
    		  var descuento = {
        			  name:"Desuento",
        			  parameter:"0",
        			  sign:-1,
        			  status:true
        	  }  
    	  } else {
	    	  var descuento = {
	    			  name:controller.aditonalDesc.name,
	    			  parameter:controller.aditonalDesc.parameter,
	    			  sign:-1,
	    			  status:true
	    	  }
    	  }
    	  return descuento;
      }   
     
      controller.saveAdditional = function(object, status){
    	  object.status = status;
    	  var promise = genericService.saveObject('Additional',object);
    	  promise.then(function(response) {

    	  }, function(error) {
    	  
    	   });
    	  
      }
    
      controller.pararBloqueo = function (){
    	  
    	blockUI.stop();
      	}  
      
	controller.guardarConfiguraciones = function (){
		 blockUI.start();
		controller.contenedorObjetos= undefined;
		
		var variable = {
				 value: controller.ambPruebas.id,
				 name:'tipoAmbiente'
		 } 	
  		controller.lstVariables.push (variable);
		
		
		var variable = {
				 value: controller.emiNormal.id,
				 name:'tipoEmision'
		 } 	
 		controller.lstVariables.push (variable);
		
		

		
		var variable = {
				 value:controller.manejaProductoServicio,
				 name:'sevicioProducto'
		 }
		
		controller.lstVariables.push (variable); 

		var variable = {
				 value:true,
				 name:'configuracionFactura'
		 }
		
		
		controller.lstVariables.push (variable);
		
		var variable = {
				 value:controller.manejaDescuentos,
				 name:'manejaDescuentos'
		 }

		controller.lstVariables.push (variable);

		var variable = {
				 value: controller.estadoFacturado.id,
				 name:'estadoFacturado'
		 } 	
   		
   		controller.lstVariables.push (variable);
				
   		var variable = {
				 value: controller.estadoAnulado.id,
				 name:'estadoAnulado'
		 } 	
  	
   		controller.lstVariables.push (variable);
		
	   	 if (controller.tipoDescuento == undefined){
	   	
	   	
	   	 }else {
	   		variable = {
					 value:controller.tipoDescuento.codigoInterno,
					 name:'tipoDescuento'
			 }
			
			controller.lstVariables.push (variable); 
	   	 }
			
		
	 
	 var iva = controller.cargarAdicionalIva();
 
	 var descuento = controller.cargarAdicionalDescuento(); 
	 
		 
     variable = {
					 value:controller.lstOpciones[controller.arrayObjectIndexOf(controller.lstOpciones,'CAT_EFEC','codigoInterno' )].id,
					 name:'formaPagoContado'
			 }
			
		controller.lstVariables.push (variable); 
 	    if (controller.opcionCredito== undefined){

 	    } else {
			variable = {
						 value:controller.lstOpciones[controller.arrayObjectIndexOf(controller.lstOpciones,'CAT_CRED','codigoInterno' )].id,
						 name:'formaPagoCredito'
				 		}
	
			controller.lstVariables.push (variable);
 	    }
		   
		 
		 var variable = {
				 value:controller.variosPagos,
				 name:'opcionVariosTiposPago'
		 }

		 controller.lstVariables.push (variable);
		 if (controller.variosPagos== false) {
			 controller.defaultEfectivo ();
			 
		 } else 
		  {

		  }
		 

	 	 variable = {
						 value:controller.pagoMixto,
						 name:'opcionPagoMixto'
	 				}
	 	
	 	controller.lstVariables.push (variable);
	 	 
	 	 
  	    controller.contenedorObjetos = {
					informaciontributaria:controller.taxInformationObj,
					lstVariables: controller.lstVariables,
					lstPagoContado:controller.lstPagoContado,
					lstPagoCredito:controller.lstPagoCredito,
					adcionalDescuento:descuento,
					adcionalImpuesto:iva
			}

	 	controller.guardarConfiguracion(controller.contenedorObjetos); 
	
		 
	
	 }
	 
	
	   controller.guardarConfiguracion = function(configuracion){
           var response = $http.post('saveCustomization_json.json', configuracion);
           response.success(function (data, status, headers, config) {
        	   controller.invoiceVariable = data;
        	   var repuesta = system_variable.invoiceVariableLoader();
			 	repuesta.then (function (data){
			 	controller.invoiceVariable =  data;
			 	},function (error){
			 		Alertify.success('Ocurrio un error al guardar las configuraciones');
			 		
			 	});
        	   
               Alertify.success('Registro guardado!');
               blockUI.stop();                
           });

           response.error(function (data, status, headers, config) {
        	   controller.invoiceVariable = data;
               Alertify.error('Ocurrio un error al guardar!');
               blockUI.stop();
           });
       }
	
	
	 	 
	 controller.actualizarVarible = function (variable){
		 var defered = $q.defer();
		   var response = $http.post('editSystemVariable_json.json', variable);
	         response.success(function (data, status, headers, config) {
	         defered.resolve(data)
	         controller.invoiceVariable = data;
	         });

	         response.error(function (data, status, headers, config) {
	         defered.reject(data);
	         controller.invoiceVariable = data;
	         
	         });
	         return defered.promise;
	 };
	 
	 controller.submitTabGeneral = function (){
		 controller.actulizaLista ();
		 return true;
	 }
	 
	 
	 controller.defaultEfectivo = function (){
		 if ( controller.lstOpciones != undefined){
		 controller.lstPagoContado = [];
	 		var pago = {
	 				name : 'EFECTIVO',
	 				status:true,
	 				codigoInterno:'CAT_EFEC',
	 				catalogPayType: utilStringService.arrayObjectIndexOf(controller.lstOpciones,'CAT_EFEC','codigoInterno')
	 		}
	 	  controller.lstPagoContado.push (pago);
		 } else {
			 Alertify.error('Ocurrio un error al guardar!');
		 }
	 };
	 
	 
	 controller.actulizaLista = function (){
		 if (controller.variosPagos){
		 controller.lstPagoContado =[];
		 angular.forEach(controller.grupo.opcioncontado, function(elemento, indice){
		 		var pago = {
		 				name : elemento.name,
		 				status:true,
		 				codigoInterno:elemento.codigoInterno,
		 				catalogPayType: controller.lstOpciones[controller.arrayObjectIndexOf(controller.lstOpciones,'CAT_EFEC','codigoInterno' )]  
		 		}
	             controller.lstPagoContado.push (pago);
	         });
		 	controller.grupo.opcioncontado;
		 } else {
		 
		 }
	 };
	 
	 controller.cargarDefectoPagoEf = function (opcion){
		 controller.lstPagoContado.push	 
	 }
	
	 controller.arrayObjectIndexOf = function (myArray, searchTerm, property) {
		    for(var i = 0, len = myArray.length; i < len; i++) {
		        if (myArray[i][property] === searchTerm) 
		        return i;
		    }
		    return -1;
		}
	 
	 
	 
	 controller.editarOpcionContado = function (index){
		 controller.btnEdit=  true;
		 controller.index= index;
		 controller.habilitarContado = true;
		 controller.pagoContado = controller.lstPagoContado[index];
		 controller.openModal('modal-wayPayCounted', 'lg');
		 
	 };
	 
	 controller.editarOpcionCredito = function (index){
		 controller.btnEdit=  true;
		 controller.index= index;
		 controller.habilitarCredito = true;
		 controller.pagoCredito = controller.lstPagoCredito[index];
		 controller.openModal('modal-wayPayCredit', 'lg');
		 
	 };
	 
	 controller.agregarOpcionCont = function(){
		 controller.btnEdit=  false;
		 controller.pagoContado = undefined;
		 controller.openModal('modal-wayPayCounted', 'lg');
	 };
	 
	 controller.agregarOpcionCred = function(){
		 controller.btnEdit=  false;
		 controller.pagoCredito = undefined;
		 controller.openModal('modal-wayPayCredit', 'lg');
	 };
	 
	 
	 controller.eliminarOpcionCont = function (){
		 controller.lstPagoContado.splice( controller.index, 1);
		 controller.habilitarCredito = true;
		 $scope.currentModal.dismiss();
	 }
	 
	 controller.eliminarOpcionCred = function (){
		 controller.lstPagoCredito.splice( controller.index, 1);
		 controller.habilitarCredito = true;
		 $scope.currentModal.dismiss();
		 
	 }
	 
	 controller.cancelarContado = function (){
		 controller.index = undefined;
		 controller.btnEdit=  false;
		 controller.pagoContado = undefined;
		 $scope.currentModal.dismiss();
	 };
	 
	 controller.cargarPagoCredito = function (formaPago){
		 formaPago.catalogPayType = controller.lstOpciones[controller.arrayObjectIndexOf(controller.lstOpciones,'CAT_CRED','codigoInterno' )];
		 formaPago.status = true;
		 formaPago.codigoInterno= 'CREDITO';
		 if (controller.btnEdit){
			 controller.lstPagoCredito[controller.index]=formaPago;
			 controller.index = undefined;
		 }else {
			 controller.lstPagoCredito.push(formaPago);
		 }
		 controller.pagoCredito = undefined;
		 controller.habilitarCredito = true;
		 controller.close();
	 };
	 
	 controller.cargarPagoContado = function (formaPago){
		 formaPago.catalogPayType = controller.lstOpciones[controller.arrayObjectIndexOf(controller.lstOpciones,'CAT_EFEC','codigoInterno' )]  ;
		 formaPago.status = true;
		 formaPago.codigoInterno= 'CAT_OTROS';
		 if (controller.btnEdit){
			 controller.lstPagoContado[controller.index]=formaPago;
			 controller.index = undefined;
		 }else {
			 controller.lstPagoContado.push(formaPago);
		 }
		 controller.pagoContado = undefined;
		 controller.habilitarContado = true;
		 controller.close();
	 };
	 
	 
	 controller.close=function(){
         $scope.currentModal.dismiss();
     };
	 
     controller.openModal = function(modal_id, modal_size, modal_backdrop) {
         $scope.currentModal = $modal.open({
             templateUrl: modal_id,
             size: modal_size,
             scope:$scope
         });
     };
	 
	 controller.habilitarOpcionContado = function (){
		 if (controller.habilitarContado == true) {
			 controller.habilitarContado = false;
		 }else{
			 controller.habilitarContado = true;
		 }
		 
	 }
	 
	 controller.habilitarOpcionCredito = function (){
		 if (controller.habilitarCredito == true) {
			 controller.habilitarCredito = false;
		 }else{
			 controller.habilitarCredito = true;
		 }
		 
	 }
	 
	 controller.cargarEstadoFacturado= function ()
	 {
		    blockUI.start();
	        var response = $http.get('findCatalogByInternalCode/'+'EST_FACTURADO');
	        response.success(function (data, status, headers, config) {
	        	controller.estadoFacturado = data;
	            blockUI.stop();
	        });


	        response.error(function (data, status, headers, config) {
	            Alertify.error('Ocurrio un error al obtener el estado facturado!');
	            blockUI.stop();
	        });
		 
	 }

	 controller.cargarEstadoAnulado= function ()
	 {
		    blockUI.start();
	        var response = $http.get('findCatalogByInternalCode/'+'EST_ANULADO');
	        response.success(function (data, status, headers, config) {
	        	controller.estadoAnulado = data;
	            blockUI.stop();
	        });


	        response.error(function (data, status, headers, config) {
	            Alertify.error('Ocurrio un error al obtener el estado anulado!');
	            blockUI.stop();
	        });
	 }

	 controller.cargarAmbiente= function ()
	 {
	        var response = $http.get('findCatalogByInternalCode/'+'PRUEBAS');
	        response.success(function (data, status, headers, config) {
	        	controller.ambPruebas = data;
	        });

	        response.error(function (data, status, headers, config) {
	            Alertify.error('Ocurrio un error al obtener el estado anulado!');
	        });
	 }
	 
	 controller.cargarEmision= function ()
	 {
	        var response = $http.get('findCatalogByInternalCode/'+'NORMAL');
	        response.success(function (data, status, headers, config) {
	        	controller.emiNormal = data;
	        });

	        response.error(function (data, status, headers, config) {
	            Alertify.error('Ocurrio un error al obtener el estado anulado!');
	        });
	 }
	 
	 
	 controller.cargarTDocumentoFactura= function ()
	 {
		    blockUI.start();
	        var response = $http.get('findCatalogByInternalCode/'+'DOC_FACT');
	        response.success(function (data, status, headers, config) {
	        	controller.taxInformationObj.typeTrasaction = data;
	            blockUI.stop();
	        });


	        response.error(function (data, status, headers, config) {
	            Alertify.error('OCURRIO UN ERROR AL RETORNAR EL TIPO DE DOCUMENTO FACTURA!');
	            blockUI.stop();
	        });
		 
	 }
	 
	 
	 controller.cargarPagosContado = function (){
	     blockUI.start();
         catalogService.loadSimpleCatalog('CAT_FPAGO').then(function(data){
       	 controller.lstPagosContado = data;
         blockUI.stop();
         }, function(){
             Alertify.error('Ocurrio un error al cargar los pagos al contado!');
             blockUI.stop();
         }); 
	 }
	 
	 
	 controller.cargarOpcionFormaPago = function (){
	      blockUI.start();
          catalogService.loadSimpleCatalog('CAT_TPAGO').then(function(data){
        	  controller.lstOpciones = data;
              blockUI.stop();
          }, function(){
              Alertify.error('Ocurrio un error al cargar el catalogo de tipo de pago!');
              blockUI.stop();
          }); 
	 }
	 
	 controller.cargarTiposDescuentos = function (){
	      blockUI.start();
         catalogService.loadSimpleCatalog('CAT_TDESC').then(function(data){
       	  controller.lstTipoDescuento = data;
             blockUI.stop();
         }, function(){
             Alertify.error('Ocurrio un error al cargar el catalogo de tipo de pago!');
             blockUI.stop();
         }); 
	 }

	 controller.cargarVariables = function(){
		 controller.respConfiguracionFactura = undefined;
		 if (system_variable.getInvoiceVariable()== undefined){
			 var repuesta = system_variable.invoiceVariableLoader();
			 	repuesta.then (function (data){
			 	controller.invoiceVariable =  data;
			 	},function (error){
			 		Alertify.success('Ocurrio un error al cargar la variable');
			 		
			 	});
		 }else{
			 controller.invoiceVariable =  system_variable.getInvoiceVariable();
		 }
		 
	 }
	 
	 controller.cargarAmbiente();
	 controller.cargarEmision ();
	 controller.cargarEstadoAnulado();
	 controller.cargarEstadoFacturado();
	 controller.cargarTDocumentoFactura();
	 controller.cargarVariables();
	 controller.cargarTiposDescuentos();
	 controller.cargarPagosContado ();
	 controller.cargarOpcionFormaPago();
	  
	}]);
