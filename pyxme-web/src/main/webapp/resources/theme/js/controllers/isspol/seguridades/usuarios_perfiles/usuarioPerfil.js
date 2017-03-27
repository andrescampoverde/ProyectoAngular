/**
 * Created by andres.campoverde on 17/03/2017.
 */
app.controller('UsuariosPerfiles', ['ngNotify', "$scope", 'ngTableParams',
    function (ngNotify, $scope, ngTableParams) {

        controller = this;
        controller.lstUsers = [];
        var index = undefined;
        controller.seleccionFuncion = undefined;

        controller.mostarBtnCancelaLin= false;

        controller.notificacionBloqueo=function () {
            var validacion=document.formUsuarios.reportValidity();
            if(!validacion){
                ngNotify.set('Ingrese un usuario antes de continuar', {type:'error',sticky:true});
            }

        }

        controller.editarRegistro = function (registro,$index) {
            // index = controller.lstUsers.indexOf(registro);
            controller.lstUsers.splice($index,1);
            controller.objUsuario =registro;
            // controller.updateList();
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
                    controller.objUsuario= {};
                    index = undefined;
                    break;
                case 2:
                    controller.usrPerfil={};
                    controller.mostarBtnCancelaLin= true;

                    break;
                case 3:
                    document.formEstaciones.reportValidity();
                    controller.mostarBtnCancelaLin= true;
                    controller.usrEstacion={}
                    break;
                case 4:
                    document.formEstaciones.reportValidity();

                    break;

                case 5:
                    controller.object= {};
                    controller.mostarBtnCancelaLin= true;
                    break;
            }
        };


        controller.cancelarIngresoLineas = function () {
            controller.mostarBtnCancelaLin= false;
            controller.cancelarIngresoOficinas();
            controller.cancelarIngresoPerfiles();
            controller.cancelarIngresoEstaciones();
        };

        controller.nuevo = function () {
            controller.updateList();
            controller.objUsuario= {
                lstOficinas:[]
            };
        };

        function cargarHorarios() {
            controller.lstHorarios = [];
            var horario = {
                idHorario:1,
                descripcion:"Diurno"
            };

            controller.lstHorarios.push(horario);

            horario = {
                idHorario:2,
                descripcion:"Nocturno"
            };
            controller.lstHorarios.push(horario);
        };


        function cargarDashboard() {
            controller.lstDashBoard = [];
            var dashBoard = {
                id:1,
                nombre:"DashBoard 1"
            };

            controller.lstDashBoard.push(dashBoard);

            dashBoard = {
                id:2,
                nombre:"DashBoard 2"
            };
            controller.lstDashBoard.push(dashBoard);

            dashBoard = {
                id:3,
                nombre:"DashBoard 3"
            };
            controller.lstDashBoard.push(dashBoard);

        };





        function cargarEstaciones() {
            controller.lstEstaciones = [];
            var estacion = {
                idEstacion: "1",
                descripcion: "equipo1",
            };

            controller.lstEstaciones.push(estacion);

            estacion = {
                idEstacion: "2",
                descripcion: "equipo2",
            };

            controller.lstEstaciones.push(estacion);

            estacion = {
                idEstacion: "3",
                descripcion: "equipo3",
            };

            controller.lstEstaciones.push(estacion);

        };

        function cargarEstadosPerfil() {
            controller.lstEstadoPerfil=[
                {
                    idEstado: 1,
                    nombreEstado: "Activo"
                },
                {
                    idEstado: 2,
                    nombreEstado: "Inactivo"
                }
            ];
        }

        function cargarPerfiles() {
            controller.lstPerfiles=[
                {
                    idPerfil:1,
                    nombrePerfil:"Administrador"
                },
                {
                    idPerfil:2,
                    nombrePerfil:"Gerente"
                }
            ];
        }

        function cargarSuperiores() {
            controller.lstSuperiores = [];
            var superior = {
                idUsuario:1,
                nombre:"CORONEL "
            };

            controller.lstSuperiores.push(superior);

            superior = {
                idUsuario:2,
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
                idOficina: "1",
                nombre: "Guayaquil",
            };

            controller.lstOficinas.push(oficina);

            oficina = {
                idOficina: "2",
                nombre: "Quito",
            };

            controller.lstOficinas.push(oficina);

            oficina = {
                idOficina: "3",
                nombre: "Cayambe",
            };

            controller.lstOficinas.push(oficina);

        };

        function guardarUsuario  (objUsuario){
            var usr = {
                idUsuario:objUsuario.idUsuario,
                nombre:objUsuario.nombre,
                identificacion:objUsuario.identificacion,
                oficina:objUsuario.oficina,
                cargo:objUsuario.cargo,
                superior:objUsuario.superior,
                estado:objUsuario.estado,
                email:objUsuario.email
            };

            controller.lstUsers.push(usr);
            //controller.cancelar();
            ngNotify.set('Exito registro guardado correctamente', 'success');
            controller.cancelarIngresoOficinas();
        };




        controller.guardar = function () {
            $scope;
            switch (seleccionFuncion){
                case 1:
                    var valida = document.formUsuarios.reportValidity();
                    var invalid = $scope.$$childTail.$$childHead.$$childHead.formUsuarios.$valid;
                    if(valida && invalid){
                        guardarUsuario(controller.objUsuario);
                        break;
                    }else {
                        ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
                        break;
                    }
                case 2:
                    var valida=document.formPerfiles.reportValidity();
                    if(valida&&controller.usrPerfil.perfil!==undefined&&controller.usrPerfil.estado!==undefined){
                        controller.guardarPerfil();
                        break;
                    }else{
                        ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
                        break;
                    }
                // break;
                case 3:
                    var valida1 = document.formEstaciones.reportValidity();
                    // var invalid1 = $scope.$$childTail.$$childHead.$$childHead.formEstaciones.$valid;
                    if(valida1 && controller.usrEstacion.estacion!==undefined){
                        controller.guardarEstaciones();
                        break;
                    }else {
                        ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
                        break;
                    }
                case 4:
                    document.formEstaciones.reportValidity();
                    break;
                case 5:
                    var validacion=document.formOficinas.reportValidity();
                    if(validacion&&controller.object.oficina!==undefined){
                        controller.guardarOficinas();
                        break;
                    }else{
                        ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
                        break;
                    }
            }

        };

        controller.seleccionarTab = function (steep) {
            seleccionFuncion = steep;
        };



        //Inicio de creacion de oficinas para un usuario

        controller.usuarioRegistro = {
            idUsuario:1,
            nombre:"Javier Almeida"
        };

        function buscarUsuario (objUsuario){
            for (var i=0; i<controller.lstUsers.length;i++){
                if(controller.lstUsers[i].idUsuario=objUsuario.idUsuario)
                    controller.lstUsers[i] = objUsuario;

            }
        };


        function actuliazarLista() {
            if(index!=undefined)
                controller.lstUsers[index]=controller.objUsuario;

            if (index== undefined){
                // var ind = controller.lstUsers.indexOf(controller.objUsuario);
                // controller.lstUsers[ind]= controller.user;
                buscarUsuario (controller.objUsuario);
            }else {

            }


        };

        controller.guardarPerfil = function () {
            if (controller.usrPerfil== undefined)  {
                ngNotify.set('Debe ingresar un nuevo registro para poder continuar', 'warn');
            }else {
                controller.usrPerfil.creacionUsuario = controller.usuarioRegistro;
                controller.usrPerfil.creacionFecha = new Date();
                if (controller.objUsuario.lstPerfiles == undefined)
                    controller.objUsuario.lstPerfiles = [];
                controller.objUsuario.lstPerfiles.push(controller.usrPerfil);
                ngNotify.set('Exito registro guardado correctamente', 'success');
                actuliazarLista();
                controller.cancelarIngresoLineas();
            };
        };

        controller.guardarEstaciones = function () {
            if (controller.usrEstacion== undefined)  {
                ngNotify.set('Debe ingresar un nuevo registro para poder continuar', 'warn');
            }else {
                controller.usrEstacion.creacionUsuario=controller.usuarioRegistro;
                controller.usrEstacion.creacionFecha = new Date();
                if (controller.objUsuario.lstEstaciones==undefined)
                    controller.objUsuario.lstEstaciones=[];

                controller.objUsuario.lstEstaciones.push(controller.usrEstacion);
                ngNotify.set('Exito registro guardado correctamente', 'success');
                actuliazarLista();
                //controller.cancelarIngresoLineas();
                controller.usrEstacion= undefined
                controller.mostarBtnCancelaLin= false;

            }
            actuliazarLista();

        };

        controller.guardarOficinas = function () {
            if (controller.object== undefined)  {
                ngNotify.set('Debe ingresar un nuevo registro para poder continuar', 'warn');
            }else {
                controller.object.creacionUsuario=controller.usuarioRegistro;
                controller.object.creacionFecha = new Date();
                if (controller.objUsuario.lstOficinas==undefined)
                    controller.objUsuario.lstOficinas=[];

                controller.objUsuario.lstOficinas.push(controller.object);
                ngNotify.set('Exito registro guardado correctamente', 'success');
                actuliazarLista();
                controller.cancelarIngresoLineas();
            }
        };

        controller.lstOficinas= [];
        controller.logActividades=[];

        function cargarActividades() {

            var objActividad={
                tipoActividad: 'DESBLOQUEAR',
                anteriorActividad: '1',
                nuevoActividad: '0',
                creacionUsuarioActividad: 'Admin',
                creacionFechaActividad: '09/03/2017'
            };

            controller.logActividades.push(objActividad);
        }

        function cargarOficinas() {
            var oficina = {
                idOficina:1,
                nombre:'San Miguel de los Bancos'
            }

            controller.lstOficinas.push(oficina);

            oficina = {
                idOficina:2,
                nombre:'Pedro Vicente Maldonado'
            }

            controller.lstOficinas.push(oficina);

            oficina = {
                idOficina:3,
                nombre:'Puerto Quito'
            }

            controller.lstOficinas.push(oficina);

        };


        controller.insertarOficina=function (objOficina) {
            controller.objUsuario.lstOficinas.push(objOficina);
        };



        controller.cancelarIngresoOficinas = function () {
            controller.object  = undefined;
        };

        controller.cancelarIngresoPerfiles = function () {
            controller.usrPerfil = undefined;
        };

        controller.cancelarIngresoEstaciones= function () {
            controller.usrEstacion = undefined;
        };
        controller.cancelar= function () {
            controller.objUsuario=undefined;
        };


        controller.editarPerfil= function (registro,$index) {
            controller.objUsuario.lstPerfiles.splice($index,1);
            controller.usrPerfil = registro;
            controller.mostarBtnCancelaLin= false;

        };

        controller.eliminarPerfil= function ($index) {
            controller.objUsuario.lstPerfiles.splice($index,1);
        };

        controller.editarEstacion= function (registro,$index) {
            controller.objUsuario.lstEstaciones.splice($index,1);
            controller.usrEstacion = registro;
            controller.mostarBtnCancelaLin= false;
        };

        controller.eliminarEstacion= function ($index) {
            controller.objUsuario.lstEstaciones.splice($index,1);
        };

        controller.editarOficina= function (registro,$index) {
            controller.objUsuario.lstOficinas.splice($index,1);
            controller.object = registro;
            controller.mostarBtnCancelaLin= false;

        };

        controller.eliminarOficina= function ($index) {
            controller.objUsuario.lstOficinas.splice($index,1);
        };

        cargarEstaciones();
        cargarEstadosPerfil();
        cargarPerfiles();
        cargarSuperiores();
        cargarOficinas();
        cargarEstados();
        cargarCargos();
        cargarActividades();
        cargarHorarios();
        cargarDashboard();


    }
]);