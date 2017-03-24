
app.controller("EstructOrg",['ngNotify',"$scope", 'ngTableParams',
    function( ngNotify,  $scope , ngTableParams) {

        controller = this;
        controller.lstPerfiles= [];
        controller.lstNiveles = [];
        controller.objEstOrg = undefined;

        controller.nevaEstructura = function () {
            controller.objEstOrg= {};
        };

        controller.editarPerfil = function (objEstOrg,$index){
            controller.lstPerfiles.splice($index,1);
            controller.objEstOrg= objEstOrg;
        };

        function cargarNiveles ( ) {
            var nivel = {
                id:1,
                nombre: "NIVEL 1"
            };

            controller.lstNiveles.push(nivel);

            nivel = {
                id:2,
                nombre: "NIVEL 2"
            };

            controller.lstNiveles.push(nivel);


            nivel = {
                id:3,
                nombre: "NIVEL 3"
            };

            controller.lstNiveles.push(nivel);

            nivel = {
                id:4,
                nombre: "NIVEL 4"
            };

            controller.lstNiveles.push(nivel);

        };



        controller.guardarPerfil = function (objEstOrg){
            var validacion=document.formEstructura.reportValidity();
            if(validacion&&controller.objEstOrg.nivelEstructuraOrgByIdNivelEstrcuturaOrg){
                controller.lstPerfiles.push(objEstOrg);
                ngNotify.set('Exito registro guardado correctamente', 'success');
                controller.objEstOrg = undefined;
            }else{
                ngNotify.set('Debe ingresar todos los campos marcados en *', 'error');
            }

        }

        function cargarPerfiles (){

            var  objEstOrg = {
                idEstructuraOrganizacional:1,
                descripcion:"Secretaria",
                estructuraOrganizacionalByIdEstructuraPadre:"Admin",
                orden:1,
                nivelEstructuraOrgByIdNivelEstrcuturaOrg:{
                    id:1,
                    nombre:"Nivel 1"
                }
            }

            controller.lstPerfiles.push(objEstOrg);


            objEstOrg = {
                id:2,
                descripcion:"Admin",
                estructuraOrganizacionalByIdEstructuraPadre:"Admin",
                orden:2,
                nivelEstructuraOrgByIdNivelEstrcuturaOrg:{
                    id:2,
                    nombre:"Nivel 2"
                }
            }

            controller.lstPerfiles.push(objEstOrg);


            objEstOrg = {
                id:3,
                descripcion:"Presidente",
                estructuraOrganizacionalByIdEstructuraPadre:"Admin",
                orden:2,
                nivelEstructuraOrgByIdNivelEstrcuturaOrg:{
                    id:3,
                    nombre:"Nivel 3"
                }
            }

            controller.lstPerfiles.push(objEstOrg);

            objEstOrg = {
                id:4,
                descripcion:"Auditor",
                estructuraOrganizacionalByIdEstructuraPadre:"Admin",
                orden:1,
                nivelEstructuraOrgByIdNivelEstrcuturaOrg:{
                    id:4,
                    nombre:"Nivel 4"
                }
            }

            controller.lstPerfiles.push(objEstOrg);

        };

        cargarNiveles ();
        cargarPerfiles();

    }]);
