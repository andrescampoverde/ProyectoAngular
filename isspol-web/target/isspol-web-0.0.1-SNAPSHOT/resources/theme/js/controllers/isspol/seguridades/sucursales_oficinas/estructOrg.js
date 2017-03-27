
app.controller("EstructOrg",['ngNotify',"$scope", 'ngTableParams', 
						  function( ngNotify,  $scope , ngTableParams) {
	 
	  controller = this;
	  controller.lstPerfiles= [];
	  controller.lstNiveles = [];
	  controller.perfil = undefined;

	  controller.nevaEstructura = function () {
          controller.perfil= {};
      };
	  
	  controller.editarPerfil = function (perfil){
		  controller.perfil= perfil;
	  };
	  
	  function cargarNiveles ( ) {
		  var nivel = {
				  id:1,
				  nombre: "NIVEL 1"
		  };
		  
		  controller.lstNiveles.push(nivel);
		  
		   nivel = {
				  id:2,
				  nombre: "NIVEL 2"
		  };
		  
		  controller.lstNiveles.push(nivel);
		  
		  
		   nivel = {
				  id:3,
				  nombre: "NIVEL 3"
		  };
		  
		  controller.lstNiveles.push(nivel);
		  
		   nivel = {
				  id:4,
				  nombre: "NIVEL 4"
		  };
		  
		  controller.lstNiveles.push(nivel);
		  
	  };
	  
	  
	  
	  controller.guardarPerfil = function (perfil){
		  controller.lstPerfiles.push(perfil);
		  ngNotify.set('Exito registro guardado correctamente', 'success');
		  controller.perfil = undefined;
	  }
	  
	  function cargarPerfiles (){
		  
		  var  perfil = {
				  id:1,
				  descripcion:"Secretaria",
				  nivelPadre:"Admin",
				  orden:1,
				  nivel:{
					  id:1,
					  nombre:"Nivel 1"
				  }
		  }
		  
		  controller.lstPerfiles.push(perfil);
		  
		  
		  perfil = {
				  id:2,
				  descripcion:"Admin",
				  nivelPadre:"Admin",
				  orden:2,
				  nivel:{
					  id:2,
					  nombre:"Nivel 2"
				  }
		  }
		  
		  controller.lstPerfiles.push(perfil);
		  
		  
		  perfil = {
				  id:3,
				  descripcion:"Presidente",
				  nivelPadre:"Admin",
				  orden:2,
				  nivel:{
					  id:3,
					  nombre:"Nivel 3"
				  }
		  }
		  
		  controller.lstPerfiles.push(perfil);
		  
		  perfil = {
				  id:4,
				  descripcion:"Auditor",
				  nivelPadre:"Admin",
				  orden:1,
				  nivel:{
					  id:4,
					  nombre:"Nivel 4"
				  }
		  }
		  
		  controller.lstPerfiles.push(perfil);
		  
	  };
	
	  cargarNiveles ();
	  cargarPerfiles();
	  
}]);
