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

app.controller("PerfilesIsspol",['ngNotify',"$scope", 'ngTableParams', 
						function( ngNotify,  $scope , ngTableParams) {
	 
	  controller = this;
	  controller.lstPerfiles = [];
	  
	  controller.nuevoPerfil = function(){
		  controller.perfil = {}
	  };
	  
	  controller.editarPerfil = function(perfil){
		  controller.perfil= perfil;
	  };
	  
	  controller.eliminarPerfil = function($index){
		  controller.lstPerfiles.splice($index, 1);
		  ngNotify.set('Exito, registro eliminado correctamente', 'success');
	  };
	  
	  controller.cancelar = function(){
		  controller.perfil = undefined;
	  };
	  
	  controller.guardar = function(perfil){
          var valida = document.form.reportValidity();
          if(valida) {
              var of = {
                  id: perfil.id,
                  tipo: perfil.tipo,
                  nombre: perfil.nombre,
                  ciudad: perfil.ciudad,
                  direccion: perfil.direccion,
                  telefono: perfil.telefono
              };
              controller.lstPerfiles.push(of);
              ngNotify.set('Exito, registro creado correctamente', 'success');
              iniciarFormulario();
          }
	  };
	  
	  function iniciarFormulario(){
		  controller.perfil = undefined;
	  };
	  
	  iniciarFormulario();
}]);
