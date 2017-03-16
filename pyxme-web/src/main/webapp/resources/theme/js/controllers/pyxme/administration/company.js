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


app.controller('CompanyController', ['restCompanyService', '$q', '$scope', 'genericService', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', 'catalogService',
    function (RestCompanyService, $q, $scope, genericService, $timeout, $http, Alertify, blockUI, ngTableParams, catalogService) {
        controller = this;
        controller.blnNewCompany = false;
        controller.blnEditCompany = false;
        controller.blnCheck = false;
        controller.lstCompanies;
        controller.userSubsidiaryDto = undefined;
        controller.companyObj = undefined;
        controller.subsidiaryDto = undefined;
        controller.userDto = undefined;
        controller.confirm_password = undefined;
        controller.alerts = genericService.alerts;
        controller.nombreUsuario = 'root';

        
        controller.steps = {
            step : [true, false, false, false],
            percent: 1
        };

        controller.searchCompany = function ($select) {
            if ($select.search != "") {
                var response = $http.get('findCatalogbyFilter/' + $select);
                response.success(function (data, status) {
                    deferedValidacion.resolve(data);
                });
                response.error(function (data, status, headers, config) {
                    deferedValidacion.reject(data);
                });
            }
        };

        controller.validatePassword = function (key, confirmedKey){
        	if (key == confirmedKey){
        		return true;
        	}else{
        		return false;
        	}
        }

        controller.procesoValidacion = function (cedula) {
            if (cedula) {
                if (cedula.length == 13) {
                    controller.validacionCedula(cedula);

                }
                if (cedula.length == 10) {
                    controller.validacionCedula(cedula);

                } else {
                    controller.validacionCedula(cedula);
                }
            }
        };

        controller.validacionCedula = function (cedula) {
            var respuesta = RestCompanyService.validationIdNumber(cedula);
            respuesta.then(function (responce) {
                controller.mostrarAlertas(responce);
            }, function (error) {
                controller.alerts.push(genericService.dangerAlert);
                controller.closeMessage();
            });
        };


        controller.mostrarAlertas = function (mensaje) {
            var str = mensaje;
            var index = str.search("Error");
            if (index >= 0) {
                controller.tipoMensaje = false;
                controller.mensajeValidacionNumero = 'INCORRECTO';

            } else {
                controller.tipoMensaje = true;
                controller.mensajeValidacionNumero = 'COORECTO';
            }
        };

        controller.cargarFormato = function (abreviacion) {
            var string = abreviacion;
            if (string == undefined) {
                string = '';
            } else {

            }
            var cadena = string.replace(" ", "");
            controller.userSubsidiaryDto.subsidiary.company.abbreviation = '@' + cadena + '.com';
        };

        controller.editText = function (string, boolean) {
            if (string == undefined) {
                controller.userSubsidiaryDto.subsidiary.company.abbreviation = "";
            } else {
                if (boolean) {
                    string = string.toUpperCase();
                } else {
                    string = string.toLowerCase()
                }
                var cadena = string.replace(" ", "");
                controller.userSubsidiaryDto.subsidiary.company.abbreviation = cadena.replace(" ", "");
                controller.cargarFormato(cadena);
            }
        };

        controller.editCompany = function (currentCompany) {
            controller.blnEditCompany = true;
            controller.companyObj = currentCompany;
            controller.subsidiaryDto.subsidary.company = currentCompany;
        };


        controller.tableParams = new ngTableParams({
            page: 1,            		// show first page
            count: 4,          			// count per page
            sorting: {
                id: 'asc'     // initial sorting
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

                var response = $http.post('retrieveCompanies_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstCompanies = data;
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


        controller.initCompany = function () {
            controller.subsidiaryDto = undefined;
            controller.companyObj = undefined;
        };


        controller.closeMessage = function () {
            $timeout(function () {
                controller.alerts.splice(0, 1);
            }, 3000);

        };


        controller.newCompany = function () {
            controller.userSubsidiaryDto = undefined;
            controller.tipoMensaje == 'fail';
            controller.validarNombre = undefined;
            controller.tipoMensaje = undefined;
            controller.blnCheck = false;
            controller.blnNewCompany = true;
            controller.blnEditCompany = false;

        };

        controller.saveObject = function (userSubsidiary, status) {
            userSubsidiary.user.userName = 'root' + controller.userSubsidiaryDto.subsidiary.company.abbreviation;
            userSubsidiary.subsidiary.company.status = status;
            userSubsidiary.subsidiary.status = status;
            userSubsidiary.user.status = status;
            userSubsidiary.status = status;
            var promise = genericService.saveObject('UserSubsidiary', userSubsidiary);
            promise.then(function (response) {
                controller.alerts.push(genericService.succesAlert);
                controller.closeMessage();
                controller.cancelCompany();
                return true;

            }, function (error) {
                controller.alerts.push(genericService.dangerAlert);
                controller.closeMessage();
            });

        };
        controller.obtenerNuevoTCom = function () {
            if (controller.blnCheck) {
                controller.catalog = {
                    name: controller.nameCatalog,
                    status: true,
                    description: 'Catalogo creado por usuario',
                };
                controller.userSubsidiaryDto.subsidiary.company.catalogCompanyType = controller.catalog;
            } else {


            }

        };

        controller.nextTab = function (steep) {
            switch (steep){
                case 1:
                    controller.changeStep(steep, 50);
                    break;
                case 2:
                    controller.changeStep(steep, 75);
                    break;
                case 3:
                    controller.changeStep(steep, 100);
                    break;
            }
        };

        controller.changeStep = function(step, percent){
            controller.steps.step[step-1]=false;
            controller.steps.step[step]=true;
            controller.steps.percent = percent;
        };

        controller.findCompanyByComercialName = function (comercialName) {
            var respuesta = RestCompanyService.findCompanyByComercialName(comercialName);
            respuesta.then(function (responce) {
                if (responce.id == null) {
                    controller.validarNombre = true;
                } else {
                    controller.validarNombre = false;
                }
            }, function (error) {
                controller.alerts.push(genericService.dangerAlert);
                controller.closeMessage();
            });
        };

        controller.saveCompany = function (currentCompany, status) {
            currentCompany.status = status;
            var promise = genericService.saveObject('Company', currentCompany);
            promise.then(function (response) {
                controller.alerts.push(genericService.succesAlert);
                controller.closeMessage();
                controller.cancelCompany();

            }, function (error) {
                controller.alerts.push(genericService.dangerAlert);
                controller.closeMessage();
            });

        };

        controller.cancelCompany = function () {
            controller.tipoMensaje == 'ok';
            controller.blnEditCompany = false;
            controller.blnNewCompany = false;
            controller.initCompany();
        };


        controller.retrieveTComCatalog = function () {
            catalogService.loadSimpleCatalog('CAT_TCOM').then(function (data) {
                controller.catalogTComList = data;
            }, function () {
                Alertify.error('Ocurrio un error al cargar el catalogo de tipo de compania!');
            });
        };

        controller.retrieveCoinCatalog = function () {
            catalogService.loadSimpleCatalog('CAT_MONEDA').then(function (data) {
                controller.catalogCoinList = data;
            }, function () {
                Alertify.error('Ocurrio un error al cargar el catalogo de moneda!');
            });
        };

        controller.retrieveComercialActivityCatalog = function () {
            catalogService.loadSimpleCatalog('CAT_ACOM').then(function (data) {
                controller.catalogAComList = data;
            }, function () {
                Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
            });
        };

        controller.initCatalogs = function () {
            controller.retrieveComercialActivityCatalog();
            controller.retrieveTComCatalog();
            controller.retrieveCoinCatalog();
        };

        controller.initCatalogs();
        controller.initCompany();
    }]);