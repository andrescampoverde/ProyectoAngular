/**
 * 
 */

app.controller("NivelOrganizacional",['ngNotify',"$scope", 'ngTableParams',
	function(ngNotify,$scope,ngTableParams){
	controller=this;
	controller.niveles=[];
	
	controller.nuevonivel=function(){
		controller.nivel={
				
		}
	}
	
	controller.insertarnivel=function(nivel){
		var f=new Date();
		controller.nivel.creacionFecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
		var niv={
				idNivelEstructura:nivel.idNivelEstructura,
				descripcion:nivel.descripcion,
				largo:nivel.largo,
				icono:nivel.icono,
				creacionUsuario:nivel.creacionUsuario,
				creacionFecha:nivel.creacionFecha
		};
		controller.niveles.push(niv);
		inicioFormulario();
	}
	
	controller.actualizarnivel=function(nivel_editar){
		controller.nivel=nivel_editar;
	}
	
	controller.borrarnivel=function($indice){
		controller.niveles.splice($indice,1);
	}
	
	controller.cancelar=function(){
		controller.nivel=undefined
	}
	
	function inicioFormulario(){
		controller.nivel=undefined;
	}
	
	inicioFormulario();
}
	]);