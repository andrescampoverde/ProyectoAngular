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

app.controller("CargosIsspol",['ngNotify',"$scope", 'ngTableParams',
    function( ngNotify,  $scope , ngTableParams) {

        controller = this;
        controller.lstCargos= [];

        controller.nuevoCargo = function(){
            controller.cargo = {};
        };

        controller.editarCargo = function(cargo,$index){
            controller.lstCargos.splice($index,1);
            controller.cargo= cargo;
        };

        controller.eliminarCargo = function($index){
            controller.lstCargos.splice($index, 1);
            ngNotify.set('Exito, registro eliminado correctamente', 'success');
        };

        controller.cancelar = function(){
            controller.cargo = undefined;
        };

        controller.guardar = function(cargo){
            var validacion=document.formCargos.reportValidity();
            if(validacion){
                var of = {
                    id:cargo.id,
                    nombre:cargo.nombre
                };
                controller.lstCargos.push(of);
                ngNotify.set('Exito, registro creado correctamente', 'success');
                iniciarFormulario();
            }else{
                ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
            }

        };

        function iniciarFormulario(){
            controller.cargo = undefined;
        };

        iniciarFormulario();
    }]);
