/**
 * Created by andres.campoverde on 23/03/2017.
 */

app.controller("MotivosCierre",['ngNotify',"$scope", 'ngTableParams',
    function( ngNotify,  $scope , ngTableParams) {
        controller=this;
        controller.lstMotivosCierre=[];
        controller.usuario={
            id:1,
            nombre: 'Admin'
        };

        controller.nuevo=function () {
            controller.motivo={};
        }

        controller.cancelar = function(){
            controller.motivo= undefined;
        };

        controller.guardar=function () {
            var validacion=document.formMotivoCierreSesion.reportValidity();
            // var invalid = $scope.$$childTail.$$childHead.$$childHead.formMotivoCierreSesion.$valid;
            if(validacion){
                controller.motivo.usuario=controller.usuario;
                controller.motivo.fecha=new Date();
                controller.lstMotivosCierre.push(controller.motivo);
                ngNotify.set('Exito registro guardado correctamente', 'success');
                controller.cancelar();
            }else{
                ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
            }
        }

        controller.editarMotivo=function (motivo,$indice) {
            controller.lstMotivosCierre.splice($indice,1);
            controller.motivo=motivo;
        }

        controller.eliminarMotivo=function ($indice) {
            controller.lstMotivosCierre.splice($indice,1);
            ngNotify.set('Exito, registro eliminado correctamente', 'success');
        }

    }
]);