/**
 * Created by andres.campoverde on 17/03/2017.
 */
app.controller('UsuariosPerfiles',['ngNotify',"$scope", 'ngTableParams',
                         function (ngNotify,$scope,ngTableParams) {

        controller=this;
        var seleccionFuncion = undefined;

        controller.guardar = function(){


            //document.formUsuarios.reportValidity();

            if (seleccionFuncion==1)
                document.formUsuarios.reportValidity();

            if (seleccionFuncion==2)
                document.formPerfiles.reportValidity();

            if (seleccionFuncion==3)
                document.formEstaciones.reportValidity();


        };

        controller.seleccionarTab = function (steep) {
            seleccionFuncion = steep;
        };


        controller.mensaje= function (){
            alert('d');
        };
        //controller
    }
]);