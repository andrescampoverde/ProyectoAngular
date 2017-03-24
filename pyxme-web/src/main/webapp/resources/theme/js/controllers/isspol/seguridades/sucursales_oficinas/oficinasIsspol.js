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
            controller.objOficina = {}
        };

        controller.editarOficina = function(objOficina,$index){
            controller.lstOficinas.splice($index,1);
            controller.objOficina= objOficina;
        };

        controller.eliminarOficina = function($index){
            controller.lstOficinas.splice($index, 1);
            ngNotify.set('Exito, registro eliminado correctamente', 'success');
        };

        controller.cancelar = function(){
            controller.objOficina = undefined;
        };

        controller.guardar = function(objOficina){
            var valida=document.formOficina.reportValidity();
            if(valida&&controller.objOficina.tipoOficina!==undefined&&controller.objOficina.ciudad!==undefined){
                var of = {
                    idOficina:objOficina.idOficina,
                    tipoOficina:objOficina.tipoOficina,
                    nombre:objOficina.nombre,
                    ciudad:objOficina.ciudad,
                    direccion:objOficina.direccion,
                    telefono: objOficina.telefono
                };
                controller.lstOficinas.push(of);
                ngNotify.set('Exito, registro creado correctamente', 'success');
                iniciarFormulario();
            }else{
                ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
            }

        };

        function iniciarFormulario(){
            controller.objOficina = undefined;
        };

        cargarTipos();
        cargarCiudades();
        iniciarFormulario();

        function cargarTipos(){
            var
                tipoOficina = {id:1, nombre: "Matriz"};
            controller.lstTipos.push(tipoOficina);

            tipoOficina = {id:2, nombre: "Agencia"};
            controller.lstTipos.push(tipoOficina);

            tipoOficina = {id:3, nombre: "Ventanilla de Extension"};
            controller.lstTipos.push(tipoOficina);
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
