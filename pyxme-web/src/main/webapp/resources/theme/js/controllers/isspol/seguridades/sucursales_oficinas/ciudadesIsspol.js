/*
 * Copyright (c) 2015. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * Created by cidh
 */

app.controller("CiudadesIsspol",['ngNotify',"$scope", 'ngTableParams', 
						  function( ngNotify,  $scope , ngTableParams) {
	 
	  controller = this;
	  controller.lstCiu= [];
	  controller.lstTipos = [];
	       
	  
	  controller.nuevaCiudad = function (){
		  controller.ciudad = {
				  
		  }
	  };
	  
	  controller.editarCiudad = function (ciudad){
		  controller.ciudad= ciudad;
	  };
	  
	  
	  controller.eliminarCiudad = function ($index){
		  controller.lstCiu.splice($index, 1);
		  ngNotify.set('Exito registro eliminado correctamente', 'success');
	  };
	  
	  
	  controller.cancelar = function (){
		  controller.ciudad = undefined;
	  };
	  
	  controller.guardar = function (ciudad){
		  var cid = {
				  
				  id:ciudad.id,
				  nombre:ciudad.nombre,
				  tipo:ciudad.tipo
				  
				  };
		  controller.lstCiu.push(cid);
		  ngNotify.set('Exito registro creado correctamente', 'success');
		  iniciarFormulario ();
	  };
	  
	  cargarTipo ();
	  iniciarFormulario ();
	  
	  function cargarTipo () {
		  var tipo = {  id:1,
				  nombre: "CANTON"
		  };
		  
		  controller.lstTipos.push(tipo);
		  
		  tipo = {
				  id:2,
				  nombre: "PARROQUIA"
		  };
		  
		  controller.lstTipos.push(tipo);
		  
		  
		  tipo = {    
				  id:3,
				  nombre: "CIUDAD"
		  };
		  
		  controller.lstTipos.push(tipo);
		  
		  
		  
	  };
	  function iniciarFormulario (){
		  controller.ciudad = undefined;
	  };
	  
	  
	  
	  
	  
}]);


