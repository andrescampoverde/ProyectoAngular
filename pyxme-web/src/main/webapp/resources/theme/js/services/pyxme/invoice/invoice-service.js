/**
 * 
 */

angular.module('app').service("factura",['$http','$q', Factura]);

function Factura($http, $q) {

	
  this.customer = undefined;
  this,headerInvoiceDto = undefined;
  this.lstDetalleDto = [];
  this.lstClientes= [];
  this.detalleDto = undefined;
  this.total = undefined;
  this.wayPay = undefined;
  this.cliente = undefined;
  this.ivaAddional = undefined;
  
  var result = this;
  result.lstTPagoOpciones = [];
  
  this.limpiarVariables = function (){
	  this.lstDetalleDto = [];
	  this.lstClientes= [];
  }

  this.cedulaValidor = function (cedula){

      //Preguntamos si la cedula consta de 10 digitos
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
        	  return 'Exito: El numero de identificion' + cedula + ' es correcta';
           }else{
             return 'Error: La cedula: ' + cedula + ' es incorrecta';
           }
           
         }else{
           // imprimimos en consola si la region no pertenece
        	 return 'Error: Esta cedula no pertenece a ninguna region';
         }
      }else{
         //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
    	 return 'Error: Esta cedula tiene menos de 10 Digitos';
      }    

	  
  }
  
  
  this.setCliente = function (cliente){
	  this.cliente = cliente; 
  }
  
  this.setVariable = function (variable){
	  this.variableFacturacion = variable;
	  this.loadEstadoFacturado(variable.estadoFacturado);
	  
  }
  
  this.loadEstadoFacturado = function(codigo){
	  if (codigo!= null){
		  var response = $http.get('findCatalogById/'+codigo);
	      response.success(function (data, status, headers, config) {
	    	  result.setearEstadoFacturado(data);
	      });
	      response.error(function (data, status, headers, config) {
	     	 console.log(data);
	      });  
	  }else{
		  
	  }
      
  }

  this.loadCustomer = function (cliente){
	  if (cliente.comercialName == undefined){
		  this.cliente = {
				  person: cliente.person,
				  comercialName: (cliente.person.firstLastName== undefined ? ("1--") : (cliente.person.firstLastName)) + " " + (cliente.person.secondLastName == undefined ? (""):(cliente.person.secondLastName)) ,
				  address: cliente.person.address,
				  email: cliente.person.email,
				  phone:cliente.person.phone
		  }
		  return this.cliente;
	  }else {
		  return cliente;
	  }
  }
  
  result.setearEstadoFacturado = function (estado){
	  this.setEstadoFacturado(estado);
  }
  
  result.setearAdicional = function (data){
	  this.setIvaAdditional(data);
  }
  result.setearAdicionalDesc = function (data){
	  this.setDescAdditional(data);
  }
  
  this.setEstadoFacturado= function (estado){
	  this.estadoFacturado = estado;
  }
  
  this.setIvaAdditional= function (ivaAddional){
	  this.ivaAddional = ivaAddional;
  }
  this.setDescAdditional= function (descuento){
	  this.descAdditional = descuento;
  }
  
  this.findIvaAdditional =function (id){
	  var defered = $q.defer();
	  var promise = defered.promise;
      var response = $http.get('findAdditionalById/'+id);
      response.success(function (data, status, headers, config) {
    	  defered.resolve(data);
      });
      response.error(function (data, status, headers, config) {
    	  defered.reject(data);
      });
	  
      return promise;
  }
  
  this.findDescAdicional =function (id){
	  var defered = $q.defer();
	  var promise = defered.promise;
      var response = $http.get('findAdditionalById/'+id);
      response.success(function (data, status, headers, config) {
    	  defered.resolve(data);
      });
      response.error(function (data, status, headers, config) {
    	  defered.reject(data);
      });
	  
      return promise;
  }
  
  this.getUserCompany = function (){
		      var response = $http.get('getUserSubsidiary/');
		      response.success(function (data, status, headers, config) {
   	     	  result.setearUsuarioSucursal(data);
		      });
		      response.error(function (data, status, headers, config) {
		     	 console.log(data);
		      });
		}
  this.getUserCompany();
  
  result.setearUsuarioSucursal = function (usuarioSucursal){
	  this.setUserSubsidiary(usuarioSucursal);  
  }
	  
  this.setUserSubsidiary = function (userSubsidiary){
  this.userSubsidiary =   userSubsidiary;
 }
	  
  
  this.setCustomer = function (customer){
	  this.customer =customer;
  }
  
  this.setLstDetalleDto = function (lstDetalleDto){
	  this.lstDetalleDto = lstDetalleDto;
  }
  


  this.setDetalleDto = function (detalleDto){
	  this.detalleDto = detalleDto;
  }
  
  

  this.cargarCabecera = function (){
	  this.headerInvoiceDto = {
			  customer:this.customer,
			  lstInvoiceDetails:this.lstDetalleDto
			  
	  }
  
  }
  
  
  this.cargarLstDetalle = function (article){
	  this.cargarDetalle(article);
	  this.lstDetalleDto.push(this.detalleDto);
	  this.cargarCabecera ();
  }
  
  
  this.cargarTotalesCabecera = function (totales){
	  this.headerInvoiceDto = {
    			subTotalZero: totales.subTotal0,
    			subTotalDoce: totales.subTotal12,
    			subTotal: totales.subTotal,
    			totalValue: totales.total,
    			descuento : totales.descuento,        		
        		//lstInvoiceDetails: (this.headerInvoiceDto == undefined ? undefined:this.headerInvoiceDto.lstInvoiceDetails)
        		//lstInvoiceDetails: this.headerInvoiceDto.lstInvoiceDetails
        	}	
	  return this.headerInvoiceDto; 
    }
  
  
  this.cargarDetalle = function(article){
	  this.detalleDto = {
	      			"article" :article,
	          		"precioUnitario" :0,
	          		"quantity" : 1,
	          		"cashDiscount" : 0,
	          		"quantityProduct" :0 ,
	          		"quantityProductDiscount": 0,
	          		"birbpnr": 0,
	          		"ice" :0
	      	}
	  
   }
  
  this.calculateTotals = function (lstCurrentDetails){
	  var defered = $q.defer();
	  var promise = defered.promise;
	  try {
	      var response = $http.post('calculateTotals.json', lstCurrentDetails);
	      response.success(function (data, status, headers, config) {
	      });
	      response.error(function (data, status, headers, config) {
	      });
	      defered.resolve(response);
		} catch (e) {
	          defered.reject(e);
	    }
		return promise;
  }
  
  
  result.cargarCliente = function (persona){
	  
  }	
  
  result.cargarClientePersona= function(persona){
	  result.customerDto  = {
					person: persona,
					comercialName: persona.firstName +" "+  persona.secondName + " "+ persona.firstLastName + " "+ persona.secondLastName,
					address: persona.address,
					email: persona.email,
					identificationNumber: persona.identificationNumber
				};
	  return result.customerDto; 
  }
  
  result.lstPersonaCliente = function (lstPersona){
	  this.lstClientes = [];	   
		  for (var i = 0; i < lstPersona.length; i++  ){
			  this.lstClientes.push(result.cargarClientePersona (lstPersona[i]) );
		  }
	return   this.lstClientes;
  }
  
  
  result.setCliente = function (cliente ){
	  this.cliente = cliente ;
  }
  
  
  this.calculateTotals = function (lstCurrentDetails){
	  var defered = $q.defer();
	  var promise = defered.promise;
	  try {
	      var response = $http.post('calculateTotals.json', lstCurrentDetails);
	      response.success(function (data, status, headers, config) {
	      });
	      response.error(function (data, status, headers, config) {
	      });
	      defered.resolve(response);
		} catch (e) {
	          defered.reject(e);
	    }
		return promise;
  }
  
  
  this.obtenerCliente = function (filtro){
	  this.cliente = undefined;
	  var deferedCustomer = $q.defer();
	  
	  try {
		  //devuelve la promesa del servidoer
		  var responsePersona =	result.obtenerPersona (filtro);
		  
		  //espera hasta que el servidor devuelva datos y se ejecute el promesa.resolve()
		  responsePersona.then(function(response) {
			  if (response.length > 1 ){
				  var cliente = result.lstPersonaCliente (response);
				  result.setCliente (cliente);
			  } else if (response.length == 1 ){
				  var persona = response[0];
				  var cliente =  result.cargarClientePersona (persona);
				  result.setCliente (cliente);
//				  var cliente = result.lstPersonaCliente (response);
//				  result.setCliente (cliente);
			  }	else {
				  
				//  var cliente = result.lstPersonaCliente (response);
				  result.setCliente (undefined);

//				  var persona = response[0];
//				  var cliente =  result.cargarClientePersona (persona);
//				  result.setCliente (cliente);
			  }
			  deferedCustomer.resolve(response);

		 }, function(error) {
			 deferedCustomer.reject(error);
		 });
	  } catch (e){
		  deferedCustomer.reject(e);
	  }
	  
	  return deferedCustomer.promise;
  };
  
  

  
  result.getCustomer = function (filter){
	  var deferedgetCustomer = $q.defer();
	  var promisegetCustomer = deferedgetCustomer.promise;
	  
      var responseCliente = $http.get('findCustomerByFilter/'+ filter);
      responseCliente.success(function (data, status, headers, config) {
    	  responseCliente.resolve(data);
      });
      responseCliente.error(function (data, status, headers, config) {
    	  deferedgetCustomer.reject(data);
      });
	  return promisegetCustomer;
  }
  
  
 
  
  result.obtenerPersona = function (filtro) {
	  var deferedPersona = $q.defer();
	  
	  try {
	      var responsePersona = $http.get('findPersonByFilter/'+ filtro);
	      responsePersona.success(function (data, status, headers, config) {
	      deferedPersona.resolve(data);
	      });
	      responsePersona.error(function (data, status, headers, config) {
	      deferedPersona.reject(data);
	      });
	      
	  } catch (e) {
		  deferedPersona.reject(e);
	  }
	  
	  return deferedPersona.promise;
      
  }
  

  result.obtenerNumeroSecuencial = function (tipoDocumento){
	 // result.obtenerPersona('1721737243');
	  var deferedSecuencial = $q.defer();
	  
	  
	  try {
		  var responseSecuencial = $http.get('findSecuencialNumber/'+ tipoDocumento);
		  responseSecuencial.success(function (data, status, headers, config) {
		  deferedSecuencial.resolve(data);
	      });
		  responseSecuencial.error(function (data, status, headers, config) {
		  deferedSecuencial.reject(data);
	      });
		  
		  //deferedSecuencial.resolve(responseSecuencial);
		  
	  }catch (e){
		  deferedSecuencial.reject(e);
	  }
	  
	  return deferedSecuencial.promise;
  }
  
}



