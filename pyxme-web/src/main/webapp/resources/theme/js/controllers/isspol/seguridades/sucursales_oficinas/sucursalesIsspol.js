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

app.controller("SucursalesIsspol",['ngNotify',"$scope", 'ngTableParams', 
						  function( ngNotify,  $scope , ngTableParams) {
	 
	  controller = this;
	  controller.lstSuc= [];
	  
	  
	  controller.nuevaSucursal = function (){
		  controller.sucursal = {
				  
		  }
	  };
	  
	  controller.editarSucursal = function (sucursal){
		  controller.sucursal= sucursal;
	  };
	  
	  
	  controller.elimiarSucursal = function ($index){
		  controller.lstSuc.splice($index, 1);
		  ngNotify.set('Exito registro eliminado correctamente', 'success');
	  };
	  
	  
	  controller.cancelar = function (){
		  controller.sucursal = undefined;
	  };
	  
	  controller.guardar = function (sucursal){
		  var suc = {
				  nombre:sucursal.nombre,
				  id:sucursal.id,
				  direccion:sucursal.direccion
		  };
		  controller.lstSuc.push(suc	);
		  ngNotify.set('Exito registro creado correctamente', 'success');
		  iniciarFormulario ();
	  };
	  
 
	  function iniciarFormulario (){
		  controller.sucursal = undefined;
	  };
	  
	  iniciarFormulario ();
	  
}]);
