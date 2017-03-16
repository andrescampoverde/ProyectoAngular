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
	  controller.lstOficina= [];
	  
	  controller.nuevaOficina = function(){
		  controller.oficina = {}
	  };
	  
	  controller.editarOficina = function(oficina){
		  controller.oficina= oficina;
	  };
	  
	  controller.eliminarOficina = function($index){
		  controller.lstOficina.splice($index, 1);
		  ngNotify.set('Exito, registro eliminado correctamente', 'success');
	  };
	  
	  controller.cancelar = function(){
		  controller.oficina = undefined;
	  };
	  
	  controller.guardar = function(oficina){
		  var of = {
				  id:oficina.id,
				  tipo:oficina.tipo,
				  nombre:oficina.nombre,
				  ciudad:oficina.ciudad,
				  direccion:oficina.direccion,
				  telefono: oficina.telefono
		  };
		  controller.lstOficina.push(of);
		  ngNotify.set('Exito, registro creado correctamente', 'success');
		  iniciarFormulario();
	  };
	  
	  function iniciarFormulario(){
		  controller.oficina = undefined;
	  };
	  
	  iniciarFormulario();
}]);
