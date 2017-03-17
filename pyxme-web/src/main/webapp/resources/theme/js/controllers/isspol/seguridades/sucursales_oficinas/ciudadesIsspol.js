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
	  
	  
	  controller.nuevaCiudad = function (){
		  controller.ciudad = {
				  
		  }
	  };
	  
	  controller.editarCiudad = function (ciudad){
		  controller.ciudad= ciudad;
	  };
	  
	  
	  controller.elimiarCiudad = function ($index){
		  controller.lstCiu.splice($index, 1);
		  ngNotify.set('Exito registro eliminado correctamente', 'success');
	  };
	  
	  
	  controller.cancelar = function (){
		  controller.ciudad = undefined;
	  };
	  
	  controller.guardar = function (ciudad){
		  var ciu = {
				  nombre:ciudad.nombre,
				  id:ciudad.id
		  };
		  controller.lstCiu.push(ciu	);
		  ngNotify.set('Exito registro creado correctamente', 'success');
		  iniciarFormulario ();
	  };
	  
 
	  function iniciarFormulario (){
		  controller.ciudad = undefined;
	  };
	  
	  iniciarFormulario ();
	  
}]);
