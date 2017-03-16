/*
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * Created by esyacelga
 */

app.controller("WizardInvoiceController", ['catalogService', 'downloadFactory', 'user_company', 'restInvoiceService', "$scope", 'calculoTotalServicio', "opcionPagoService", "genericService", '$q', 'system_variable', 'factura', '$modal', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams',
    function (catalogService, downloadFactory, user_company, RestInvoiceService, $scope, calculoTotalServicio, opcionPagoService, genericService, $q, system_variable, Factura, $modal, $timeout, $http, Alertify, blockUI, ngTableParams) {

        controller = this;
        controller.downloadManager = new downloadFactory();
        controller.visualizacion = false;
        controller.alerts = genericService.alerts;
        controller.aletasValidaciones = [];
        controller.customerDto = undefined;
        controller.headerInvoiceDto = undefined;
        controller.totales = undefined;
        controller.lstCustomers = undefined;
        controller.filter = undefined;
        controller.strCase = undefined;
        controller.descripcionFactura = undefined;
        controller.valorFormaPago = undefined;
        controller.lstPagoFactura = [];
        controller.pagoFacturaDto = undefined;
        controller.formaPagoAux = undefined;
        controller.activaPanelTotal = false;
        controller.totalFormaPago = 0;
        controller.currentDate = new Date();
        controller.fechaFactura = undefined;
        controller.adicionalDetalleDto = undefined;
        controller.valorDescuento = 0;
        controller.lstOpcionesPanel = [];
        controller.lstAdicionales = [];
        controller.numeroValidado = false;


        var lstOpcionesPanelAux = [];
        var seleccionFormaPago = undefined;
        var formapagoEfectivo = undefined;
        var pagoFacturaEfectivo = [];
        var pagoEfectivoDto = undefined
        var opcionesPagoActivo = undefined;
        var result = this;
        var obtenerPagoEfectivo = undefined;

        controller.searchArticle = function ($select) {
            controller.findArticleByFilter($select.search);
        };

        controller.searchPerson = function ($select) {
            if ($select.search != "") {
                RestInvoiceService.findPersonByFilter($select.search).then(function (data) {
                    controller.personList = data;
                    if (controller.personList.length > 0) {
                    } else {
                        controller.customerDto = {
                            person: {
                                id: undefined
                            }
                        }
                    }
                }, function (reason) {
                    alert('error');
                });
            }
        };

        controller.submitProducto = function (article) {
            var producto = {
                id: 0,
                name: article.name,
                price: article.price,
                ivaLoader: article.ivaLoader
            };
            controller.productoServicio = undefined;
            controller.valorArticuloProducto = producto;
            Factura.cargarLstDetalle(producto);
            controller.headerInvoiceDto = Factura.headerInvoiceDto;
            $scope.currentModal.dismiss();
        };


        controller.submitModalArticle = function (article) {
            Factura.cargarLstDetalle(article);
            controller.headerInvoiceDto = Factura.headerInvoiceDto;
        };

        controller.submitCustomerItem = function (person) {
            controller.customerDto = {
                person: person,
                comercialName: person.fullName,
                address: person.address,
                email: person.email
            };
            var responsePerson = RestInvoiceService.findPersonByIdNumber(person.identificationNumber);
            responsePerson.then(function (respuesta) {
                controller.customerDto.person.lstPhones = respuesta.lstPhones;
                if ( 1 <= controller.customerDto.person.lstPhones.length){
                	controller.customerDto.phone = controller.customerDto.person.lstPhones[0].number;
                }else {
                	
                }
            }, function (error) {
            	Alertify.success('Ocurrio un error');
            });
            return true;
        };


        controller.mostrarAlertas = function (mensaje) {
            var str = mensaje;
            var index = str.search("Error");

            if (index >= 0) {
                if (controller.aletasValidaciones.length < 1) {
                    controller.aletasValidaciones.push({type: 'danger', msg: mensaje});
                }
                controller.closeMessageValidaciones();
                return false;
            } else {
                if (controller.aletasValidaciones.length < 1) {
                    controller.aletasValidaciones.push({type: 'success', msg: mensaje});
                }
                controller.closeMessageValidaciones();
                return true;
            }
        };


        controller.submitAdicional = function (adicional) {
            controller.setearValorAdicional(adicional.value, controller.variablesFacturacion.adicionaDescuento);
            controller.setearPorcetageAdicional(adicional.quantity, controller.variablesFacturacion.adicionaDescuento);
            controller.calculateItems(controller.headerInvoiceDto);
            controller.porcentageDescuento = adicional.quantity;
            calculoTotalServicio.setDescuento(adicional.value);
            calculoTotalServicio.setObjetoAdicional(controller.obtnerAdicional(controller.variablesFacturacion.adicionaDescuento));
            controller.calculateItems(controller.headerInvoiceDto);
            $scope.currentModal.dismiss();
        };

        controller.obtnerAdicional = function (idAdicional) {
            for (var i = 0; i < controller.lstAdicionales.length; i++) {
                if (controller.lstAdicionales [i].additional.id == idAdicional) {
                    return controller.lstAdicionales [i];
                } else {
                }
            }
        };

        controller.setearDescuento = function (descuento) {
            controller.headerInvoiceDto.descuento = descuento;
        };


        controller.loadUserCompany = function () {
            if (user_company.getUserCompany() == undefined) {
                var repuesta = user_company.userCompanyLoader();
                repuesta.then(function (data) {
                    controller.userSubsidiary = data;
                }, function (error) {
                	Alertify.success('Ocurrio un error al cargar la compania');
			 		
                });
            } else {
                controller.userSubsidiary = user_company.getUserCompany();
            }
        };

        controller.abrirPanelProducto = function () {
            controller.openModal('modal-productservice', 'lg');
        };

        controller.abrirSaveInvoicePanel = function () {
            controller.openModal('modal-save-invoice', 'md');
        };

        controller.adicionalSeleccionado = function (item) {
            controller.adicionalObjeto = item;
            if (item.additional.id == controller.variablesFacturacion.adicionalIva) {
                controller.openModal('modal-select-adicional', 'lg');
            } else if (item.additional.id == controller.variablesFacturacion.adicionaDescuento) {
                controller.adicionalObjeto.value = 0;
                controller.adicionalObjeto.quantity = 0;
                controller.totalSubTotal = controller.totales.subTotal0 + controller.totales.subTotal12;
                calculoTotalServicio.setDescuento(0);
                controller.openModal('modal-additional', 'lg');
            } else {
            }

        };

        controller.obtenerAdicionales = function () {
            var deferedSubsidiaries = $q.defer();
            var response = $http.get('findAdditionalByCompany/');
            response.success(function (data, status) {
                angular.forEach(data, function (iterador, indice) {
                    var adicionaFactura = {
                        quantity: iterador.parameter,
                        additional: iterador,
                        value: 0
                    };
                    if (iterador.id == controller.variablesFacturacion.adicionalIva) {
                        calculoTotalServicio.espesificarIva(iterador.parameter);
                        controller.porcentageAdicional = iterador.parameter;
                    } else if (iterador.id == controller.variablesFacturacion.adicionaDescuento) {
                        calculoTotalServicio.espesificarDescuento(iterador.parameter);
                    } else if (iterador.id == controller.variablesFacturacion.adicionalPropina) {
                        calculoTotalServicio.espesificarPropina(iterador.parameter);
                    } else {
                    }

                    controller.lstAdicionales.push(adicionaFactura);
                });

            });
            response.error(function (data, status, headers, config) {
            	Alertify.success('Ocurrio un error al obtener los adicionales');
		 		
            });
        };


        controller.viewReport = function (factura, opcion) {
            for (var i = 0; i < controller.myReport.lstParameterReport.length; i++) {
                controller.myReport.lstParameterReport[i].value = factura.id;
            }

            var response = $http.post('imprimirReporteFactura.json', controller.myReport, {responseType: 'arraybuffer'});
            response.success(function (data, status, headers, config) {

                controller.downloadManager.getData(data, opcion);
            }).error(function (reason) {
            	Alertify.success('Ocurrio un error al visualizar el reporte');
            });
        };

        controller.imprimirReporte = function (factura, opcion) {

            for (var i = 0; i < controller.myReport.lstParameterReport.length; i++) {
                controller.myReport.lstParameterReport[i].value = factura.id;
            }
            var response = $http.post('imprimirReporteFactura.json', controller.myReport, {responseType: 'arraybuffer'});
            response.success(function (data, status, headers, config) {
            controller.downloadManager.getData(data, opcion);
            }).error(function (reason) {
            	Alertify.success('Ocurrio un error al guardar al imprimir el reporte');
		 		
            });
        };


        controller.cargarReporte = function (idReport) {
        	if (idReport== null){
        		Alertify.error('No se encuentra configurado el reporte en esta compania');
                controller.closeMessage();
        	}else{
        		 var respuesta = RestInvoiceService.findReportbyId(idReport);
                 respuesta.then(function (objeto) {
                     controller.myReport = objeto;
                 }, function (error) {
                     Alertify.error('Ocurrio un error al leer la variable: (reporteFacturaXDefecto)');
                 });
        	}
           
        };

        controller.initInvoiceFormulary = function () {
            if (system_variable.getInvoiceVariable() == undefined) {
                var repuesta = system_variable.invoiceVariableLoader();
                repuesta.then(function (data) {
                    controller.variablesFacturacion = data;
                    if(controller.variablesFacturacion.reporteFacturaXDefecto == null){
                		Alertify.success('No se encuentra configurado el reporte en esta compania'); 
                    	//controller.alerts.push(genericService.obtenerMensaje(2,'No se encuentra configurado el reporte en esta compania'));
                         controller.closeMessage();
                    } else {
                    	controller.cargarReporte(controller.variablesFacturacion.reporteFacturaXDefecto);	
                    }
                    
                    calculoTotalServicio.setVariables(data);
                    Factura.setVariable(data);
                }, function (error) {
                	Alertify.error('Ocurrio un error al inicializar el formulario');
                });
            } else {
                controller.variablesFacturacion = system_variable.getInvoiceVariable();
                controller.cargarReporte(controller.variablesFacturacion.reporteFacturaXDefecto);
                calculoTotalServicio.setVariables(controller.variablesFacturacion);
                Factura.setVariable(controller.variablesFacturacion);


            }
            controller.invoiceObj = undefined;
        };


        controller.findArcticleByName = function () {
            var responseArticle = RestInvoiceService.findArticleByName(controller.articlefilter);
            responseArticle.then(function (respuesta) {
                controller.articleList = respuesta;
            }, function (error) {
            	Alertify.success('Ocurrio un error al realizar la busqueda');
            });
        };

        controller.findArticleByFilter = function (filter) {
            if (filter != "") {
                blockUI.start();
                var responseArticle = RestInvoiceService.findArticleByFilter(filter);
                responseArticle.then(function (lstArticle) {
                    controller.articleList = lstArticle;
                    blockUI.stop();
                }, function (error) {
                    blockUI.stop();
                });
            } else {
		 		
            }
        };

        
        var indexInv = undefined;
        
        controller.processEInvoice = function (invoice) {
            blockUI.start();
            indexInv = $scope.items.indexOf(invoice);
            var promise = RestInvoiceService.processE_Invoice(invoice);
            promise.then(function (response) {
            	blockUI.stop();
            	$scope.items[indexInv] = response;  
            	controller.mostrarAlertaFact (response.mensaje);
                controller.closeMessage();
            }, function (error) {
                blockUI.stop();
            });

        };
        
        controller.mostrarAlertaFact = function (mensaje) {
            var str = mensaje;
            var index = str.search("Error");

            if (index >= 0) {
                if (controller.alerts.length < 1) {
                    controller.alerts.push({type: 'danger', msg: mensaje});
                }
                return false;
            } else {
            	
            	var index = str.search("Advertencia");
            	if (index >= 0){
                        controller.alerts.push({type: 'warning', msg: mensaje});
            	}else{
            	    controller.alerts.push({type: 'success', msg: mensaje});
            	}
                
                return true;
            }
        };

        controller.guardarFactura = function () {
            $scope.currentModal.dismiss();
            blockUI.start();
            var promise = genericService.saveObject('Bill', controller.factura);
            promise.then(function (response) {
                controller.alerts.push(genericService.succesAlert);
                blockUI.stop();
                controller.closeMessage();
                controller.cancelInvoice();
                return response;
            }, function (error) {
                blockUI.stop();
                controller.alerts.push(genericService.dangerAlert);
                controller.closeMessage();
                return undefined;
            });

        };


        controller.cargarServicioOpciones = function () {
            lstOpcionesPanelAux = opcionPagoService.lstOpcionesPanelAuxiliar;
            controller.lstOpcionesPanel = opcionPagoService.lstOpcionesPanel;
        };


        controller.regenerarOpciones = function () {
            for (var i = 0; i < controller.lstPagoFactura.length; i++) {
                 controller.removerFormaPago(controller.lstPagoFactura[0]);
            }
        };

        controller.buscarAdicionales = function (id) {
            var responseFactura = $http.get('findAdditionalDetailByInvoice/' + id);
            responseFactura.success(function (data, status, headers, config) {
                controller.cargarAdicioneales(data);
                blockUI.stop();
            });

            responseFactura.error(function (data, status, headers, config) {
                blockUI.stop();
            });
        };

        controller.cargarAdicioneales = function (adicionales) {
        	controller.factura.totales = controller.totales;
        	angular.forEach(adicionales, function (iterador, indice) {
                var a = '' + iterador.additional.id;
                var b = '' + controller.variablesFacturacion.adicionalIva;
                if (a == b) {
                    controller.factura.totales.iva = iterador.value;
                } else {
                    controller.factura.totales.descuento = iterador.value;
                }
            });
        };


        controller.visualizarFactura = function (item) {
            blockUI.start();
            var deferedPersona = $q.defer();
            try {
                var responseFactura = $http.get('findInvoiceById/' + item.id);
                responseFactura.success(function (data, status, headers, config) {
                    controller.factura = controller.calculateItems(data);
                    controller.factura.totales = controller.totales;
                    controller.factura = data;
                    controller.factura.id = item.id;
                    controller.factura.totalValue = data.totalValue;
                    controller.buscarAdicionales(item.id);
                    controller.visualizacion = true;
                    blockUI.stop();

                });
                responseFactura.error(function (data, status, headers, config) {
                    deferedPersona.reject(data);
                    blockUI.stop();
                });

            } catch (e) {
                deferedPersona.reject(e);
            }
        };


        controller.limpiarFactura = function () {
            controller.totales = undefined;
            controller.descripcionFactura = undefined;
            controller.userSubsidiary = undefined;
            controller.numeroFactura = undefined;
            controller.fechaFactura = undefined;
            controller.totales = undefined;
            controller.headerInvoiceDto = undefined;
            controller.lstPagoFactura = [];

        };

        controller.cargarFactura = function () {
            controller.factura = {
                totales: controller.totales,
                description: controller.descripcionFactura,
                creatingUser: controller.userSubsidiary.user,
                subsidiary: controller.userSubsidiary.subsidiary,
                number: controller.numeroFactura,
                catalogStatus: Factura.estadoFacturado,
                elaborationDate: controller.fechaFactura,
                customer: Factura.loadCustomer(controller.customerDto),
                description: controller.descripcionFactura,
                subTotalZero: controller.totales.subTotal0,
                subTotalDoce: controller.totales.subTotal12,
                subTotal: controller.totales.subTotal,
                totalValue: controller.totales.total,
                lstInvoiceDetails: controller.headerInvoiceDto.lstInvoiceDetails,
                lstAdditionalDetails: controller.lstAdicionales,
                lstBillPayment: controller.lstPagoFactura
            };
            controller.customerDto = controller.factura.customer;
            return true;
        };


        controller.estableceTipoVariosPagos = function (opcion) {
            controller.activarPanelB = true;
            controller.activarPanelA = false;
            if (controller.campoOpcionesAuxiliar == undefined || controller.campoOpcionesAuxiliar == opcion) {
                controller.campoOpcionesAuxiliar = opcion;
            } else {
                controller.eliminarDatosLista(controller.campoOpcionesAuxiliar, opcion);
            }
        }


        controller.establecerTipoPagoEfectivo = function (opcion) {
            controller.activarPanelA = true;
            controller.activarPanelB = false;
            controller.regenerarOpciones();
            if (controller.campoOpcionesAuxiliar == undefined) {
                controller.campoOpcionesAuxiliar = opcion;
            } else {
                controller.eliminarDatosLista(controller.campoOpcionesAuxiliar, opcion);
            }
            controller.totalFormaPago = 0;
            controller.lstPagoFactura = [];
            controller.pagoEfectivoDto = opcionPagoService.obtenerPagoEfectivo(controller.variablesFacturacion.pagoEfectivo);
            controller.totalFormaPago = controller.totales.total;
            controller.cargarPagoFactura(controller.pagoEfectivoDto, controller.totalFormaPago);
            controller.activaPanelTotal = false;
        };


        controller.eliminarDatosLista = function (auxiliar, opcion) {
            if (auxiliar == opcion) {
                controller.campoOpcionesAuxiliar = opcion;
            } else {
                controller.totalFormaPago = 0;
                controller.lstPagoFactura = [];
                controller.campoOpcionesAuxiliar = opcion;
            }
        };


        result.obtenerPagoEfectivo = function (codigoFormaPago) {
            for (var i = 0; i < lstOpcionesPanelAux.length; i++) {
                for (var j = 0; j < lstOpcionesPanelAux [i].lstWayPay.length; j++) {
                    if (lstOpcionesPanelAux [i].lstWayPay[j].id == codigoFormaPago) {
                        return lstOpcionesPanelAux [i].lstWayPay[j];

                    } else {
                    }
                }
            }
        };


        controller.submitFormaPago = function (valorPago) {
            controller.cargarModalPagoFactura(controller.formaPagoAux, valorPago);
            controller.removerOpciones(seleccionFormaPago);
            seleccionFormaPago = undefined;
            try{
                controller.validador.value = false;
            }catch(e){}

            $scope.currentModal.dismiss();
        };

        controller.submitAdicionalFactura = function (valorAdicional) {
            calculoTotalServicio.espesificarIva(valorAdicional);
            controller.setearPorcetageAdicional(valorAdicional, controller.variablesFacturacion.adicionalIva);
            controller.calculateItems(controller.headerInvoiceDto);
            controller.valorAdicional.valor = 0;
            $scope.currentModal.dismiss();
        };

        controller.removerOpciones = function (item) {
            angular.forEach(controller.lstOpcionesPanel, function (iterador, indice) {
                var index = iterador.lstWayPay.indexOf(item);
                if (index >= 0) {
                    iterador.lstWayPay.splice(index, 1);
                } else {
                }
            });

        };

        controller.removerFormaPago = function (item) {
            opcionPagoService.recuperarFormaPago(item.waypay);
            controller.cargarServicioOpciones();
            var index = controller.lstPagoFactura.indexOf(item);
            controller.lstPagoFactura.splice(index, 1);
            result.cargarTotales(controller.lstPagoFactura);
        };


        controller.cargarPagoFactura = function (formaPago, valorPago) {
            controller.pagoFacturaDto = {
                waypay: formaPago,
                valor: valorPago,

            };
            controller.lstPagoFactura.push(controller.pagoFacturaDto);
            result.cargarTotales(controller.lstPagoFactura);
        };

        controller.cargarModalPagoFactura = function (formaPago, valorPago) {
            controller.pagoFacturaDto = {
                waypay: formaPago,
                valor: valorPago,
                numeroCheque: (valorPago.numero == undefined ? 0 : valorPago.numero )
            };
            controller.lstPagoFactura.push(controller.pagoFacturaDto);
            result.cargarTotales(controller.lstPagoFactura);
        };


        result.cargarTotales = function (lstPagos) {
            controller.valorFormaPago = 0;
            controller.totalFormaPago = 0;
            angular.forEach(lstPagos, function (iterador, indice) {
                controller.totalFormaPago = iterador.valor + controller.totalFormaPago;
            })
        };

        controller.formaPagoSeleccionado = function (formaPago, valorPago) {
            controller.pagoSeleccionado = formaPago;
            controller.valorFormaPago = Number(valorPago);
            if (formaPago.id == controller.variablesFacturacion.pagoEfectivo) {
                seleccionFormaPago = formaPago;
                controller.formaPagoAux = formaPago;
                controller.openModal('modal-select-formapago', 'lg');
            } else if (formaPago.id == controller.variablesFacturacion.pagoCheque) {
                seleccionFormaPago = formaPago;
                controller.formaPagoAux = formaPago;
                controller.openModal('modal-select-pagoCheque', 'lg');

            } else if (formaPago.id == controller.variablesFacturacion.pagoTargeta) {/// modal-select-pagoCredito
                seleccionFormaPago = formaPago;
                controller.formaPagoAux = formaPago;
                controller.openModal('modal-select-pagoTargeta', 'lg');
            } else if (system_variable.validarVariable(formaPago.id, controller.variablesFacturacion.otrosPagosEfectivo)) {

                seleccionFormaPago = formaPago;
                controller.formaPagoAux = formaPago;
                controller.openModal('modal-select-formapago', 'lg');
            } else if (system_variable.validarVariable(formaPago.id, controller.variablesFacturacion.otrosPagosCredito)) {
                seleccionFormaPago = formaPago;
                controller.formaPagoAux = formaPago;
                controller.openModal('modal-select-formapago', 'lg');
            }
            else {
            }
        };


        controller.openModal = function (modal_id, modal_size, modal_backdrop) {
            $scope.currentModal = $modal.open({
                templateUrl: modal_id,
                size: modal_size,
                scope: $scope
            });
        };


        controller.openPhoneModal = function () {
            controller.openModal('modal-select-phone', 'sm');
        };

        controller.openIdentificationTypeModal = function () {
            controller.openModal('modal-catalog-tidentification', 'lg');
        };

        controller.submitModalPhone = function (phone) {
            controller.customerDto.phone = phone.number;
            $scope.currentModal.dismiss();
        };


        $scope.$watch(angular.bind(this, function () {
            return this.headerInvoiceDto;
        }), function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            controller.calculateItems(newValue);
        }, true);


        controller.calculateItems = function (objeto) {
            if (objeto == undefined) {
                return undefined;
            } else {
                var factura = {
                    descuento: controller.descuento == undefined ? 0 : controller.descuento,
                    lstInvoiceDetails: objeto.lstInvoiceDetails
                };

                calculoTotalServicio.calcularTotales(factura);
                controller.totales = {
                    subTotal0: calculoTotalServicio.subTotalZero,
                    subTotal12: calculoTotalServicio.subTotal,
                    subTotal: calculoTotalServicio.subTotalFact,
                    descuento: calculoTotalServicio.valorDescuento,
                    iva: calculoTotalServicio.iva.toFixed(2),
                    total: calculoTotalServicio.total.toFixed(2)
                };

                controller.setearValorAdicional(calculoTotalServicio.iva, controller.variablesFacturacion.adicionalIva);
                controller.setearValorAdicional(calculoTotalServicio.valorDescuento, controller.variablesFacturacion.adicionaDescuento);

                controller.porcentageDescuento = controller.totales.descuento;
                controller.headerInvoiceDto = Factura.cargarTotalesCabecera(controller.totales);
                controller.headerInvoiceDto.lstInvoiceDetails = factura.lstInvoiceDetails;
                controller.headerInvoiceDto.customer = objeto.customer;
                controller.headerInvoiceDto.subsidiary = objeto.subsidiary;
                return controller.headerInvoiceDto;
            }
        };


        controller.obtenerAdicional = function (campo) {
            for (var i = 0; i < controller.lstAdicionales.length; i++) {
                if (controller.lstAdicionales [i].additional.id == campo) {
                    return controller.lstAdicionales [i].additional;
                } else {
                }
            }
        };

        controller.setearValorAdicional = function (valor, campo) {
            for (var i = 0; i < controller.lstAdicionales.length; i++) {
                if (controller.lstAdicionales [i].additional.id == campo) {
                    controller.lstAdicionales [i].value = valor;
                } else {
                }

            }

        };
        controller.setearPorcetageAdicional = function (valor, campo) {
            for (var i = 0; i < controller.lstAdicionales.length; i++) {
                if (controller.lstAdicionales [i].additional.id == campo) {
                    controller.lstAdicionales [i].quantity = valor;
                    if (campo == controller.variablesFacturacion.adicionalIva) {
                        controller.porcentageAdicional = valor;
                    } else {
                    }
                    ;
                } else {
                }
            }

        };


        controller.findPersonEvent = function () {
            controller.customerDto = undefined;
            controller.filter = undefined;
            controller.identificationType = undefined;
            return true;
        };

        controller.removeItem = function (item) {
            var index = controller.headerInvoiceDto.lstInvoiceDetails.indexOf(item);
            controller.headerInvoiceDto.lstInvoiceDetails.splice(index, 1);
            controller.activeStep01();
        };

        controller.submit = function () {
            controller.loadHeaderInvoice();
            $scope.currentModal.dismiss();
        };

        controller.close = function () {
            $scope.currentModal.dismiss();
        };

        controller.loadHeaderInvoice = function () {
            controller.headerInvoiceDto = {
                customer: controller.customerDto
            };
        };


        controller.cargarOpcionesPanel = function () {
            opcionPagoService.cargarOpcionesPanel();

        };


        controller.newInvoice = function () {
            controller.cancelInvoice();
            controller.filter = undefined;
            controller.obtenerAdicionales();
            controller.numeroValidado = false;
            controller.visualizacion = false;
            controller.loadUserCompany();
            var promise = Factura.obtenerNumeroSecuencial(controller.variablesFacturacion.documentoFactura);
            blockUI.start();
            promise.then(function (respuesta) {
                controller.numeroFactura = respuesta.number;
                blockUI.stop();
            }, function (error) {
            	Alertify.success('Ocurrio un error al obtener el secuencial');
                blockUI.stop();
            });

            controller.cargarServicioOpciones();
            controller.invoiceObj = {
                status: true
            };
        };

        controller.cancelInvoice = function () {
            controller.numeroValidado = false;
            controller.cargarOpcionesPanel();
            controller.customerDto = undefined;
            Factura.limpiarVariables();
            controller.limpiarFactura();
            controller.visualizacion = false;
            controller.alerts = genericService.alerts;
            controller.lstPagoFactura = [];
            controller.activaPanelTotal = false;
            controller.totalFormaPago = 0;
            controller.currentDate = new Date();
            controller.valorDescuento = 0;
            controller.lstOpcionesPanel = [];
            controller.lstAdicionales = [];
            controller.initInvoiceFormulary();
        };

        controller.findCustomerByFilter = function (filter) {
            blockUI.start();
            var respuestaRest = RestInvoiceService.findCustomerObject(filter);
            respuestaRest.then(function (object) {
                controller.customerDto = object;
                if (controller.customerDto == undefined) {
                    controller.customerDto = {
                        person: {
                            identificationNumber: filter
                        },
                        identificationNumber: filter
                    }
                } else {
                }
                blockUI.stop();
            }, function (error) {
                blockUI.stop();
            });
        };

        //Cierre de mensajes de formulario
        controller.closeMessage = function () {
            $timeout(function () {
                controller.alerts.splice(0, 1);
            }, 3000);

        };

        controller.closeMessageValidaciones = function () {
            $timeout(function () {
                controller.aletasValidaciones.splice(0, 1);
            }, 3000);

        };
        
        controller.closeMessageFact = function () {
            $timeout(function () {
                controller.alerts.splice(0, 1);
            }, 3000);

        };

        //Paginación
        controller.tableParams = new ngTableParams({
            page: 1,            		// show first page
            count: 4,          			// count per page
            sorting: {
                //name: 'asc'     // initial sorting
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
                var response = $http.post('retrieveInvoice_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstStorages = data;
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

        controller.cargarOpcionesPanel();
        controller.initInvoiceFormulary();

    }]);
