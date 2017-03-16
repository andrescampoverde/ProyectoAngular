app.service('restInvoiceService', ['catalogService', '$http', '$q', RestInvoiceService]);

function RestInvoiceService(catalogService, $http, $q) {

    var that = this;

    
    this.processE_Invoice = function(invoice){
    	var deferedReport = $q.defer();
        var response = $http.post('processEInvoice_json.json', invoice);
        response.success(function (data, status, headers, config) {
        	 deferedReport.resolve(data);
        });
        response.error(function (data, status, headers, config) {
        	 deferedReport.resolve(data);
        });
        return deferedReport.promise;
    };
    
    this.revokeInvoice = function(invoice){
    	var deferedReport = $q.defer();
        var response = $http.post('revokeInvoice_json.json', invoice);
        response.success(function (data, status, headers, config) {
        	 deferedReport.resolve(data);
        });
        response.error(function (data, status, headers, config) {
        	 deferedReport.resolve(data);
        });
        return deferedReport.promise;
    };
    
    
    this.findReportbyId = function (idReport) {
        var deferedReport = $q.defer();
        var response = $http.get('findReportById/' + idReport);
        response.success(function (data, status) {
            deferedReport.resolve(data);
        });

        response.error(function (data, status, headers, config) {
            deferedReport.resolve(data);
        });
        return deferedReport.promise;

    };

    this.restValidacionCedula = function (cedula, tipoIdentificacion) {
        var deferedValidacion = $q.defer();
        var response = $http.get('validarCedulaPersona/' + cedula +'/'+tipoIdentificacion);
        response.success(function (data, status) {
            deferedValidacion.resolve(data);
        });

        response.error(function (data, status, headers, config) {
            deferedValidacion.reject(data);
        });

        return deferedValidacion.promise;
    };

    this.retrieveSubsidiaries = function () {
        var deferedSubsidiaries = $q.defer();
        var response = $http.get('findSubsidiariesByCompany');
        response.success(function (data, status) {
            deferedSubsidiaries.resolve(data);
        });

        response.error(function (data, status, headers, config) {
            deferedSubsidiaries.resolve(data);
        });
        return deferedSubsidiaries.promise;
    };


    this.findArticleByFilter = function (filter) {
        var deferedArticle = $q.defer();
        var response = $http.get('findArticle/' + filter);
        response.success(function (data, status, headers, config) {
            deferedArticle.resolve(data);
        });
        response.error(function (data, status, headers, config) {
            deferedArticle.reject(data);
        });
        return deferedArticle.promise;
    }


    this.findArticleByName = function (filter) {
        var deferedArticle = $q.defer();
        var response = $http.get('findArticleByFilter/' + filter);
        response.success(function (data, status, headers, config) {
            deferedArticle.resolve(data);
        });
        response.error(function (data, status, headers, config) {
            deferedArticle.reject(data);
        });
        return deferedArticle.promise;
    }


    this.restIva = function (filtro) {
        var deferedTotal = $q.defer();
        try {
            var responseTotal = $http.get('findAdditionalById/' + filtro);
            responseTotal.success(function (data, status, headers, config) {
                deferedTotal.resolve(data);
            });
            responseTotal.error(function (data, status, headers, config) {
                deferedTotal.reject(data);
            });

        } catch (e) {
            deferedTotal.reject(e);
        }

        return deferedTotal.promise;

    }


    this.obtenerFormaPagoportipo = function (codeType) {
        var deferedTipoPago = $q.defer();

        try {
            var response = $http.get('findWayPayByTypeId/' + codeType);
            response.success(function (data, status, headers, config) {
                deferedTipoPago.resolve(response);
            });

            response.error(function (data, status, headers, config) {
                deferedTipoPago.reject(e);
            });


        } catch (e) {
            deferedTipoPago.reject(e);
        }
        return deferedTipoPago.promise;
    }


    this.obtenerTipoIdentificacion = function (codigoCatalogo) {
        var deferedPanelOpciones = $q.defer();
        try {
            var response = $http.get('retrieve_simple_catalog/' + codigoCatalogo);
            response.success(function (data, status, headers, config) {
                deferedPanelOpciones.resolve(data);
            });
            response.error(function (data, status, headers, config) {
                deferedPanelOpciones.reject(data);
            });
        } catch (e) {
            deferedPanelOpciones.reject(e);
        }
        return deferedPanelOpciones.promise;
    }


    this.obtenerOpcionesPanel = function () {
        var deferedPanelOpciones = $q.defer();
        try {
            var response = $http.get('retrieve_simple_catalog/' + 'CAT_TPAGO');
            response.success(function (data, status, headers, config) {
                deferedPanelOpciones.resolve(data);
            });
            response.error(function (data, status, headers, config) {
                deferedPanelOpciones.reject(data);
            });
        } catch (e) {
            deferedPanelOpciones.reject(e);
        }
        return deferedPanelOpciones.promise;
    }


    this.findCustomerByfilter = function (filtro) {
        var deferedCustomer = $q.defer();
        try {
            var responsePersona = $http.get('findCustomerByNumberId/' + filtro);
            responsePersona.success(function (data, status, headers, config) {
                deferedCustomer.resolve(data);
            });
            responsePersona.error(function (data, status, headers, config) {
                deferedCustomer.reject(data);
            });

        } catch (e) {
            deferedCustomer.reject(e);
        }
        return deferedCustomer.promise;
    }

   
    
    this.RestfindCustomerByfilter = function (filtro) {
        var deferedCustomer = $q.defer();
        try {
            var responsePersona = $http.get('findCustomerByFilter/' + filtro);
            responsePersona.success(function (data, status, headers, config) {
                deferedCustomer.resolve(data);
            });
            responsePersona.error(function (data, status, headers, config) {
                deferedCustomer.reject(data);
            });

        } catch (e) {
            deferedCustomer.reject(e);
        }
        return deferedCustomer.promise;
    }

    that.findPersonByFilter = function (filtro) {
        var deferedPersona = $q.defer();

        try {
            var responsePersona = $http.get('findPersonByFilter/' + filtro);
            responsePersona.success(function (data, status, headers, config) {
                deferedPersona.resolve(data);
            });
            responsePersona.error(function (data, status, headers, config) {
                deferedPersona.reject(data);
            });

        } catch (e) {
            deferedPersona.reject(e);
        }
        return deferedPersona.promise;
    };
    
    that.findPersonByIdNumber = function (filtro) {
        var deferedPersona = $q.defer();

        try {
            var responsePersona = $http.get('findPersonByIdNumber/' + filtro);
            responsePersona.success(function (data, status, headers, config) {
                deferedPersona.resolve(data);
            });
            responsePersona.error(function (data, status, headers, config) {
                deferedPersona.reject(data);
            });

        } catch (e) {
            deferedPersona.reject(e);
        }

        return deferedPersona.promise;

    };

    this.eliminarNull = function (valor) {
        if (valor == null) {
            return '';
        } else {
            return valor
        }
    }

    this.findCustomersByFilter = function (filter) {

    }

    this.findCustomerObject = function (filter) {

        var customerDto = undefined;
        var deferedCustomer = $q.defer();
        var respuestaServidor = this.findCustomerByfilter(filter);
            respuestaServidor.then(function (response) {
                if (response.id == null) {

                    var deferedPerson = $q.defer();
                    var respuestaPersona = that.findPersonByFilter(filter);
                    respuestaPersona.then(function (objetoPersona) {

                        if (objetoPersona.id == null) {
                            customerDto = {
                                person: {
                                    id: 0
                                }
                            }
                        } else {
                            customerDto = {
                                person: objetoPersona,
                                ivaLoader: true,
                                comercialName: this.eliminarNull(objetoPersona.firstLastName) + " " + this.eliminarNull(objetoPersona.secondLastName) + " " + this.eliminarNull(objetoPersona.firstName) + " " + this.eliminarNull(objetoPersona.secondName),
                                identificationNumber: objetoPersona.identificationNumber,
                                email: objetoPersona.email,
                                phone: objetoPersona.phone,
                                address: objetoPersona.address

                            }
                        }
                        deferedCustomer.resolve(customerDto);
                    }, function (error) {
                    	deferedCustomer.reject(error);
                    });

                } else {
                    customerDto = response;
                    deferedCustomer.resolve(customerDto);
                }
                //blockUI.stop();


            }, function (error) {
                deferedCustomer.reject(error);
            });
            return deferedCustomer.promise;
      
    };

}



