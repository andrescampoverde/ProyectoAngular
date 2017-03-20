/**
 * Created by andres.campoverde on 17/03/2017.
 */
app.controller('UsuariosPerfiles', ['ngNotify', "$scope", 'ngTableParams',
    function (ngNotify, $scope, ngTableParams) {

        controller = this;
        controller.lstUsers = [];
        //controller.lstOficinas = [];
        var seleccionFuncion = undefined;

        controller.editarRegistro = function (registro) {
            controller.user =registro;
        };


        controller.elimiarRegistro = function ($index){
            controller.lstUsers.splice($index, 1);
            ngNotify.set('Exito registro eliminado correctamente', 'success');
        };

        controller.cancelar= function () {
            controller.user=undefined;
        };
        controller.nuevo = function () {
          controller.user= {};
        };

        function cargarSuperiores() {
            controller.lstSuperiores = [];
            var superior = {
                id:1,
                nombre:"CORONEL "
            };

            controller.lstSuperiores.push(superior);

            superior = {
                id:2,
                nombre:"TENIENTE "
            };

            controller.lstSuperiores.push(superior);
        };


        function cargarCargos() {
            controller.lstCargos = [];
            var cargo = {
              id:1,
                nombre:"SUPERVISOR"
            };

            controller.lstCargos.push(cargo);

            cargo = {
                id:2,
                nombre:"GERENTE"
            };

            controller.lstCargos.push(cargo);
        };

        function cargarEstados() {
            controller.lstEstado = [];
            var estado = {
                id: 1,
                nombre: "ACTIVO"
            }

            controller.lstEstado.push(estado);

            estado = {
                id: 2,
                nombre: "INACTIVO"
            }

            controller.lstEstado.push(estado);

        };

        function cargarOficinas() {
            controller.lstOficinas = [];
            var oficina = {
                id: "1",
                nombre: "Guayaquil",
            };

            controller.lstOficinas.push(oficina);

             oficina = {
                id: "2",
                nombre: "Quito",
            };

            controller.lstOficinas.push(oficina);

             oficina = {
                id: "3",
                nombre: "Cayambe",
            };

            controller.lstOficinas.push(oficina);

        };

        function guardarUsuario  (user){
            var usr = {
                id:user.id,
                userName:user.userName,
                identificationNumber:user.identificationNumber,
                office:user.office,
                appointment:user.appointment,
                upper:user.upper,
                status:user.status,
                email:user.email
            };

            controller.lstUsers.push(usr);
            controller.cancelar();
            ngNotify.set('Exito registro guardado correctamente', 'success');
        };

        controller.guardar = function () {

           switch (seleccionFuncion){
                case 1:
                    if(document.formUsuarios.reportValidity());
                    guardarUsuario(controller.user);
                    break;
                case 2:
                    document.formPerfiles.reportValidity();
                    break;
                case 3:
                    document.formEstaciones.reportValidity();
                    break;
            }


           /* if (seleccionFuncion == 1)
                document.formUsuarios.reportValidity();

            if (seleccionFuncion == 2)
                document.formPerfiles.reportValidity();

            if (seleccionFuncion == 3)
                document.formEstaciones.reportValidity();*/


        };

        controller.seleccionarTab = function (steep) {
            seleccionFuncion = steep;
        };

        cargarSuperiores();
        cargarOficinas();
        cargarEstados();
        cargarCargos();

    }
]);