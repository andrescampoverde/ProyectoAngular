/**
 * Created by andres.campoverde on 17/03/2017.
 */
app.controller('UsuariosPerfiles', ['ngNotify', "$scope", 'ngTableParams',
    function (ngNotify, $scope, ngTableParams) {

        controller = this;
        controller.lstUsers = [];
        var index = undefined;
        var seleccionFuncion = undefined;

        controller.editarRegistro = function (registro) {
            index = controller.lstUsers.indexOf(registro);
            controller.user =registro;
            controller.updateList();
        };


        controller.elimiarRegistro = function ($index){
            controller.lstUsers.splice($index, 1);
            ngNotify.set('Exito registro eliminado correctamente', 'success');
        };



        controller.updateList = function(){
            if (controller.lstUsers.length==0)
                return -1

            controller.lstAux=  controller.lstUsers;
            controller.lstUsers = [];
            for (var i=0; i<controller.lstAux.length;i++ ){
                controller.lstUsers.push(controller.lstAux[i]);
            };
        };


        controller.nuevaLinea = function (){
            switch (seleccionFuncion){
                case 1:
                    controller.user= {};
                    index = undefined;
                    break;
                case 2:
                    controller.oficina={};
                    break;
                case 3:
                    document.formEstaciones.reportValidity();
                    break;
                case 4:
                    document.formEstaciones.reportValidity();
                    break;

                case 5:
                    controller.object= {};
                    controller.oficina={};
                    break;
            }
        };

        controller.nuevo = function () {
            controller.updateList();
            controller.user= {
                lstOficinas:[]
            };
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
            //controller.cancelar();
            ngNotify.set('Exito registro guardado correctamente', 'success');
            controller.cancelarIngresoOficinas();
        };




        controller.guardar = function () {

            switch (seleccionFuncion){
                case 1:
                    var valida = document.formUsuarios.reportValidity();
                    if(valida){
                        guardarUsuario(controller.user);
                        break;
                    }else {
                        break;
                    }
                case 2:
                    document.formPerfiles.reportValidity();
                    break;
                case 3:
                    document.formEstaciones.reportValidity();
                    break;
                case 4:
                    document.formEstaciones.reportValidity();
                    break;
                case 5:
                    document.formOficinas.reportValidity();
                    controller.guardarOficinas();
                    break;
            }

        };

        controller.seleccionarTab = function (steep) {
            seleccionFuncion = steep;
        };



        //Inicio de creacion de oficinas para un usuario

        controller.usuarioRegistro = {
            id:1,
            userName:"Javier Almeida"
        };

        function buscarUsuario (user){
            for (var i=0; i<controller.lstUsers.length;i++){
                if(controller.lstUsers[i].id=user.id)
                    controller.lstUsers[i] = user;

            }
        };


        function actuliazarLista() {
            if(index!=undefined)
                controller.lstUsers[index]=controller.user;

            if (index== undefined){
                var ind = controller.lstUsers.indexOf(controller.user);
                // controller.lstUsers[ind]= controller.user;
                buscarUsuario (controller.user);
            }else {

            }


        };

        controller.guardarOficinas = function () {
            if (controller.object== undefined)  {
                ngNotify.set('Debe ingresar un nuevo registro para poder continuar', 'warn');
            }else {
                controller.object.creatingUser=controller.usuarioRegistro;
                controller.object.creatingDate = new Date();
                if (controller.user.lstOficinas==undefined)
                    controller.user.lstOficinas=[];

                controller.user.lstOficinas.push(controller.object);
                ngNotify.set('Exito registro guardado correctamente', 'success');
                actuliazarLista();
                controller.cancelarIngresoOficinas();
            }
        };

        controller.lstOficinas= [];

        function cargarOficinas() {
            var oficina = {
                id:1,
                nombre:'San Miguel de los Bancos'
            }

            controller.lstOficinas.push(oficina);

            oficina = {
                id:2,
                nombre:'Pedro Vicente Maldonado'
            }

            controller.lstOficinas.push(oficina);

            oficina = {
                id:3,
                nombre:'Puerto Quito'
            }

            controller.lstOficinas.push(oficina);

        };


        controller.insertarOficina=function (objOficina) {
            controller.user.lstOficinas.push(objOficina);
        }



        controller.cancelarIngresoOficinas = function () {
            controller.object  = undefined;
        };

        controller.cancelar= function () {
            controller.user=undefined;
        };

        controller.editarOficina= function (registro) {
            controller.object = registro;
        };

        controller.eliminarOficina= function ($index) {
            controller.user.lstOficinas.splice($index,1);
        };



        cargarSuperiores();
        cargarOficinas();
        cargarEstados();
        cargarCargos();

    }
]);