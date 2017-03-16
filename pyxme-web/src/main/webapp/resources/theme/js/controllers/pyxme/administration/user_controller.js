/*
 * Copyright (c) 2015. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * Created by roberto on 10/24/15.
 */


app.controller('UserController', ['restUserService', '$q', '$scope', 'genericService', '$modal', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams',
    function (restUserService, $q, $scope, genericService, $modal, $timeout, $http, Alertify, blockUI, ngTableParams) {
        controller = this;
        controller.filter = undefined;
        controller.lstUsers;
        controller.userDto = undefined;
        controller.personDto = undefined;
        controller.personObject = undefined;
        controller.lstPhones;
        controller.habilitarTabs = true;
        controller.opcion = undefined;
        controller.blnNewUser = false;
        controller.blnEditUser = false;
        controller.alerts = genericService.alerts;
        controller.subsidaryObj = undefined;
        controller.userSubsidiary = undefined;
        controller.lstUserSubsidiaryDto = [];
        controller.aletasValidaciones = [];
        controller.company = {
            subsidiary: []
        };

        controller.validacionNombreUsuario = false;

        controller.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 4,          // count per page
            sorting: {
                userName: 'asc'     // initial sorting
            }
        }, {
            total: 0,           // length of data
            getData: function ($defer, params) {

                var paramFilter = {
                    "firstResult": (params.page() - 1) * params.count(),
                    "itemsPerPage": params.count(),
                    "filterByFields": params.filter(),
                    "orderBy": params.sorting()
                };

                blockUI.start();

                var response = $http.post('retrieveUsers_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstUsers = data;

                    $scope.items = data.items;
                    params.total(data.totalCount);
                    $defer.resolve(data.items);

                    blockUI.stop();
                });

                response.error(function (data, status, headers, config) {
                    Alertify.error('Ocurrio un error al retornar valores!');
                    blockUI.stop();
                });
            }
        });

        controller.closeMessageValidaciones = function () {
            $timeout(function () {
                controller.aletasValidaciones.splice(0, 1);
            }, 3000);
        };

        controller.validarUsuarioRegistrado = function (userName) {
            if (userName) {
                blockUI.start();
                var respuestaUsuario = controller.obtenerUsuarioRegistrado(userName);
                respuestaUsuario.then(function (respuesta) {
                    if (respuesta.id != null) {
                        controller.aletasValidaciones.push({
                            type: 'danger',
                            msg: 'Error: El nombre de usuario ingresado no se encuentra disponible'
                        });
                        controller.closeMessageValidaciones();
                        controller.validacionNombreUsuario = false;
                        controller.userDto.userName = null;
                    } else {
                        controller.validacionNombreUsuario = true;
                    }
                    blockUI.stop();
                }, function (error) {
                    Alertify.error('Ocurrio un error al validar al usuario!');
                });
            }

        };

        controller.obtenerUsuarioRegistrado = function (userName) {
            blockUI.start();
            var user = {
                id: 0,
                userName: userName + '' + controller.currentCompany.abbreviation
            };
            var deferedUsuario = $q.defer();
            var response = $http.post('findUserByUsername.json', user);
            response.success(function (data, status, headers, config) {
                deferedUsuario.resolve(data);
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                deferedUsuario.reject(data);
                blockUI.stop();
            });

            return deferedUsuario.promise;
        };

        controller.saveObject = function (user, status) {
            controller.save('createUser_json.json', user, status);
        };

        controller.saveEdition = function () {
            blockUI.start();
            $http.post('updateUser_json.json', controller.userDto).success(function (data, status, headers, config) {
                Alertify.success("Usuario actualizado");
                blockUI.stop();
            }).error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        };

        controller.saveTabObject = function (user, status) {
            controller.save('editUser_json.json', user, status);
        };

        controller.save = function (path, user, status) {
            user.status = status;
            blockUI.start();
            var response = $http.post(path, user);
            response.success(function (data, status, headers, config) {
                controller.alerts.push(genericService.succesAlert);
                controller.closeMessage();
                controller.cancel();
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });

        };

        controller.cargarUnicaSucursal = function () {
            controller.company.subsidiary.push(controller.lstSubsidiaries[0]);
        };

        controller.getMyCompany = function () {
            var response = $http.get('findCurrentCompany');
            response.success(function (data, status, headers, config) {
                controller.currentCompany = data;
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
            });
        };


        controller.saveUser = function () {
            blockUI.start();
            angular.forEach(controller.company.subsidiary, function (elemento, indice) {
                var usuarioSucursal = controller.loadUserSubsidiary(elemento);
                controller.lstUserSubsidiaryDto [indice] = {
                    user: usuarioSucursal.user,
                    status: true,
                    subsidiary: usuarioSucursal.subsidiary
                };

            });
            var user = {
                userName: controller.lstUserSubsidiaryDto[0].user.userName + '' + controller.currentCompany.abbreviation,
                email: controller.lstUserSubsidiaryDto[0].user.email,
                password: controller.lstUserSubsidiaryDto[0].user.password,
                person: controller.lstUserSubsidiaryDto[0].user.person,
                status: true,
                lstUserSubsidiary: controller.lstUserSubsidiaryDto
            };
            controller.saveObject(user, true);
        };

        controller.limpiarFormulario = function () {
            controller.userDto = undefined;
            controller.company = {
                subsidiary: []
            };
            controller.confirm_password = undefined;
            controller.filter = '';
            controller.personNames = '';

        };

        controller.loadUserSubsidiary = function (userSubsidiary) {
            controller.userSubsidiaryDto = {
                status: true,
                user: controller.userDto,
                subsidiary: userSubsidiary
            };
            return controller.userSubsidiaryDto;
        };

        controller.closeMessage = function () {
            $timeout(function () {
                controller.alerts.splice(0, 1);
            }, 3000);
        };

        controller.activeStatus = function (currentCompany) {
            currentCompany.status = true;
            var promise = genericService.saveObject('User', currentCompany);
            promise.then(function (response) {
                controller.alerts.push(genericService.succesAlert);
                controller.closeMessage();

            }, function (error) {
                controller.alerts.push(genericService.dangerAlert);
            });
            controller.cancelCompany();

        };

        controller.inactiveStatus = function (currentCompany) {
            currentCompany.status = false;
            var promise = genericService.saveObject('User', currentCompany);
            promise.then(function (response) {
                controller.alerts.push(genericService.succesAlert);
                controller.closeMessage();

            }, function (error) {
                controller.alerts.push(genericService.dangerAlert);
            });

        };

        controller.findByFilter = function (filter) {
            if (filter != undefined) {
                blockUI.start();
                var response = $http.get('findPersonByIdNumber/' + filter);
                response.success(function (data, status, headers, config) {
                    controller.personDto = undefined;
                    controller.personNames = undefined;

                    /// Aca va la funcion cuando no encuentra nada
                    if (data == "") {
                        controller.alerts.push(genericService.warningFind);
                        controller.closeMessage();
                        controller.userDto = {
                            person: {}
                        };
                    } else if (data != "") {

                        controller.personNames = data.firstLastName + " " + data.secondLastName + " " + data.firstName + " " + data.secondName;
                        controller.alerts.push(genericService.succesFind);
                        controller.closeMessage();
                        controller.userDto = {
                            person: data
                        };

                    } else if (data && data.length > 1) {
                        controller.opcion = "C";
                        controller.personList = data;
                        controller.openModal('modal-select-person', 'sm');

                    } else if (angular.isUndefined(data)) {
                        //Mostrar popup de creacion de persona
                    }
                    blockUI.stop();
                });

                response.error(function (data, status, headers, config) {
                    Alertify.error('Ocurrio un error al retornar valores!');
                    blockUI.stop();
                });
            } else {

            }
        };

        controller.openModal = function (modal_id, modal_size, modal_backdrop) {
            controller.currentModal = $modal.open({
                templateUrl: modal_id,
                scope: $scope
            });
        };

        controller.loadItems = function () {
            if (controller.personDto != undefined) {
                controller.userDto = {
                    person: controller.personDto
                };
                controller.habilitarTabs = false;
                controller.filter = controller.personDto.identificationNumber;
                controller.retrieveSexCatalog();
                controller.retrieveIndentType();
                controller.retrieveMaritalStatus();
            }
        };
        controller.newUser = function () {
            controller.retrieveSubsidiaries();
            controller.getMyCompany();
            controller.blnNewUser = true;
            controller.userDto = undefined;

        };

        controller.close = function () {
            controller.habilitarTabs = false;
            controller.currentModal.dismiss();//$scope.modalInstance.close() also works I think
        };

        controller.submit = function () {
            controller.habilitarTabs = true;
            controller.loadItems();
            controller.currentModal.dismiss();//$scope.modalInstance.close() also works I think
        };

        controller.retrievePhoneType = function () {
            blockUI.start();
            var response = $http.get('retrieve_catalog/CAT_TPHONE');
            response.success(function (data, status) {
                controller.catalogPhoneList = data;
                controller.personObj = {
                    lstPhones: []
                };
                angular.forEach(data, function (elemento, indice) {
                    controller.personObj.lstPhones [indice] = {
                        typeLocation: elemento
                    };
                });

                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al cargar el catalogo de telefonos!');
                blockUI.stop();
            });
        };

        controller.initUser = function () {
            controller.userObj = undefined;
        };

        controller.retrieveSexCatalog = function () {
            blockUI.start();
            var response = $http.get('retrieve_catalog/CAT_SEX');
            response.success(function (data, status) {
                controller.catalogSexList = data;
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
                blockUI.stop();
            });
        };

        controller.editUser = function (currentUser) {
            controller.blnEditUser = true;
            controller.userDto = currentUser;

            blockUI.start();
            $http.get('findSubsidiariesByUserId/' + currentUser.id).success(function (data, status) {
                posiblesSucursales(controller.userDto.lstUserSubsidiary, data)
                blockUI.stop();
            }).error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al cargar el catalogo tipo pago!');
                blockUI.stop();
            });


        };

        function posiblesSucursales(listaSucursalesUsuario, nuevasSucursales) {
            var nuevaSucursalList = [];
            if (listaSucursalesUsuario) {
                angular.forEach(listaSucursalesUsuario, function (valorBase, claveBase) {
                    valorBase.selected = valorBase.status;
                });

                angular.forEach(nuevasSucursales, function (valorMemoria, claveMemmoria) {

                    if (!(_.find(listaSucursalesUsuario, function (o) {
                            return o.subsidiaryId == valorMemoria.id;
                        }))) {
                        nuevaSucursalList.push({subsidiaryName: valorMemoria.name, subsidiaryId: valorMemoria.id});
                    }
                });
            } else {
                angular.forEach(nuevasSucursales, function (valorMemoria, claveMemmoria) {
                    nuevaSucursalList.push({subsidiaryName: valorMemoria.name, subsidiaryId: valorMemoria.id});
                });
            }

            angular.forEach(nuevaSucursalList, function (valor, clave) {
                controller.userDto.lstUserSubsidiary.push(valor);
            });

        }

        controller.cancel = function () {
            controller.blnEditUser = undefined;
            controller.blnNewUser = false;
            controller.limpiarFormulario();
        };

        controller.retrieveIndentType = function () {
            blockUI.start();
            var response = $http.get('retrieve_catalog/CAT_TIDENT');
            response.success(function (data, status) {
                controller.catalogIdTypeList = data;
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al cargar el catalogo de tipo de identificacion!');
                blockUI.stop();
            });
        }

        controller.retrieveMaritalStatus = function () {
            blockUI.start();
            var response = $http.get('retrieve_catalog/CAT_ESTCIV');
            response.success(function (data, status) {
                controller.catalogMStatusList = data;
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al cargar el catalogo de estado civil!');
                blockUI.stop();
            });
        };

        controller.retrieveSubsidiaries = function () {

            blockUI.start();
            var response = $http.get('findSubsidiariesByCompany');
            response.success(function (data, status) {
                controller.lstSubsidiaries = data;
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al cargar el catalogo tipo pago!');
                blockUI.stop();
            });
        };

        controller.retrieveSubsidiaries();
        controller.retrieveSexCatalog();
        controller.retrieveIndentType();
        controller.retrieveMaritalStatus();


    }]);