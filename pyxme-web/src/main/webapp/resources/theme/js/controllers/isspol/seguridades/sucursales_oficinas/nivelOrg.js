/**
 *
 */

app.controller("NivelOrganizacional",['ngNotify',"$scope", 'ngTableParams',
    function(ngNotify,$scope,ngTableParams){
        controller=this;
        controller.lstNiveles=[];
        controller.lstIconos=[];

        controller.nuevonivel=function(){
            controller.objNivel={

            }
        }

        controller.insertarnivel=function(objNivel){
            // var f=new Date();
            var validacion=document.formNivel.reportValidity();
            if(validacion&&controller.objNivel.icono!==undefined){
                controller.objNivel.creacionFecha=new Date();
                controller.objNivel.creacionUsuario={
                    id: 1,
                    nombre: 'admin'
                };
                var niv={
                    idNivelEstructuraOrg:objNivel.idNivelEstructuraOrg,
                    descripcion:objNivel.descripcion,
                    largoCodigo:objNivel.largoCodigo,
                    icono:objNivel.icono,
                    creacionUsuario:objNivel.creacionUsuario,
                    creacionFecha:objNivel.creacionFecha
                };
                controller.lstNiveles.push(niv);
                ngNotify.set('Exito, registro creado correctamente', 'success');
                inicioFormulario();
            }else{
                ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
            }


        }

        controller.actualizarnivel=function(nivel_editar,$index){
            controller.lstNiveles.splice($index,1);
            controller.objNivel=nivel_editar;
        }

        controller.borrarnivel=function($indice){
            controller.lstNiveles.splice($indice,1);
        }

        controller.cancelar=function(){
            controller.objNivel=undefined
        }

        function inicioFormulario(){
            controller.objNivel=undefined;
        }

        function cargarIconos() {
            controller.lstIconos=[
                {
                    idIcono:1,
                    creacionUsuario: 'Admin',
                    creacionFecha: '12/12/2012'
                },
                {
                    idIcono:2,
                    creacionUsuario: 'Admin',
                    creacionFecha: '15/02/2016'
                },
                {
                    idIcono:3,
                    creacionUsuario: 'Admin',
                    creacionFecha: '24/06/2017'
                }
            ];
        }

        inicioFormulario();
        cargarIconos();
    }
]);