/*
 * Copyright (c) 2015. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * Created by nmavelin
 */

app.controller("OficinasIsspol",['ngNotify',"$scope", 'ngTableParams', 
						function( ngNotify,  $scope , ngTableParams) {
	 
	  controller = this;
	  controller.lstOficinas= [];
	  controller.lstTipos= [];
	  controller.lstCiudades= [];
	  
	  controller.nuevaOficina = function(){
		  controller.oficina = {}
	  };
	  
	  controller.editarOficina = function(oficina){
		  controller.oficina= oficina;
	  };
	  
	  controller.eliminarOficina = function($index){
		  controller.lstOficinas.splice($index, 1);
		  ngNotify.set('Exito, registro eliminado correctamente', 'success');
	  };
	  
	  controller.cancelar = function(){
		  controller.oficina = undefined;
	  };
	  
	  controller.guardar = function(oficina){
          var valida=document.form.reportValidity();
          if(valida){
              var of = {
                  id:oficina.id,
                  tipo:oficina.tipo,
                  nombre:oficina.nombre,
                  ciudad:oficina.ciudad,
                  direccion:oficina.direccion,
                  telefono: oficina.telefono
              };
              controller.lstOficinas.push(of);
              ngNotify.set('Exito, registro creado correctamente', 'success');
              iniciarFormulario();
		  }

	  };
	  
	  function iniciarFormulario(){
		  controller.oficina = undefined;
	  };
	  
	  cargarTipos();
	  cargarCiudades();
	  iniciarFormulario();
	  
	  function cargarTipos(){
		  var 
		  tipo = {id:1, nombre: "Matriz"};
		  controller.lstTipos.push(tipo);
		  
		  tipo = {id:2, nombre: "Agencia"};
		  controller.lstTipos.push(tipo);
		  
		  tipo = {id:3, nombre: "Ventanilla de Extension"};
		  controller.lstTipos.push(tipo);
	  };
	  
	  function cargarCiudades(){
		  var 
		  ciudad = {id:1, nombre: "Quito"};
		  controller.lstCiudades.push(ciudad);
		  
		  ciudad = {id:2, nombre: "Guayaquil"};
		  controller.lstCiudades.push(ciudad);
		  
		  ciudad = {id:3, nombre: "Cuenca"};
		  controller.lstCiudades.push(ciudad);
	  };

}]);
