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
            controller.objSucursal = {

            }
        };


        controller.editarSucursal = function (objSucursal, opcion,$index){
        	controller.lstSuc.splice($index,1);
            controller.objSucursal= objSucursal;
            controller.habilitarCampos = opcion;
        };


        controller.elimiarSucursal = function ($index){
            controller.lstSuc.splice($index, 1);
            ngNotify.set('Exito registro eliminado correctamente', 'success');
        };


        controller.cancelar = function (){
            controller.objSucursal = undefined;
        };

        controller.guardar = function (objSucursal){

            var valida = document.formSucursal.reportValidity();
            if(valida){
                var suc = {
                    nombre:objSucursal.nombre,
                    idSucursal:objSucursal.idSucursal

                }
                controller.lstSuc.push(suc);
                ngNotify.set('Exito registro creado correctamente', 'success');
                iniciarFormulario ();
            }else{
                ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
            }

        };


        function iniciarFormulario (){
            controller.objSucursal = undefined;
        };

        iniciarFormulario ();

    }]);
