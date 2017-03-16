/*
 * Copyright (c) 2016.
 *  maniac787@gmail.com
 */

/**
 * Created by Roberto on 12/28/2016.
 */

(function () {
    app.controller("PuntoVentaController", ['FacturaService', 'downloadFactory', "$scope", '$q', 'system_variable', '$http', 'Alertify', 'blockUI', '$filter',
            function (FacturaService, downloadFactory, $scope, $q, system_variable, $http, Alertify, blockUI, $filter) {
                that = this;
                that.downloadManager = new downloadFactory();

                /**
                 * initialize controller
                 */
                that.initController = function(){
                    that.downloadManager = new downloadFactory();
                    that.person = null;
                    that.identificationNumber = null;
                    that.invoiceDate = $filter('date')(Date.now(), 'yyyy-MM-dd HH:mm');

                    that.invoiceHeader = {
                        lstInvoiceDetails : [{'article':{'name':null, 'price':00}}],
                        subTotalZero :0,
                        subTotalDoce :0,
                        totalValue :0,
                        customer:{
                            person:null
                        }
                    };
                };
                /**
                 *
                 * @param identificationNumber
                 */
                that.findPerson = function(identificationNumber){
                    if(identificationNumber){
                        blockUI.start();
                        $http.get('punto_venta/findPerson/' + identificationNumber).success(function (data, status, headers, config) {
                            if(_.isObject(data)){
                                that.invoiceHeader.customer.person = data;
                            }else{
                                that.invoiceHeader.customer.person = {
                                    identificationNumber:identificationNumber
                                };
                            }

                            blockUI.stop();
                        }).error(function (data, status, headers, config) {
                            blockUI.stop();
                        });
                    }
                };

                /**
                 *
                 * @param item
                 */
                that.removeArticle = function(item){
                    if(that.invoiceHeader.lstInvoiceDetails && that.invoiceHeader.lstInvoiceDetails.length==1){
                        that.invoiceHeader.lstInvoiceDetails[0]={'article':{'name':null, 'price':00}};
                    }else{
                        var index = that.invoiceHeader.lstInvoiceDetails.indexOf(item);
                        that.invoiceHeader.lstInvoiceDetails.splice(index, 1);
                    }
                    //that.invoiceHeader.lstInvoiceDetails = _.without(that.invoiceHeader.lstInvoiceDetails, _.findWhere(that.invoiceHeader.lstInvoiceDetails, {id: 3}));
                };

                /**
                 *
                 * @param filter
                 * @param currentRowIndex
                 */
                that.searchArticle = function(filter, currentRowIndex){
                    if (filter && filter != "") {
                        blockUI.start();

                        FacturaService.searchArticle(filter).then(function(data){
                            blockUI.stop();
                            if(data){
                                if(data.length==1){
                                    that.invoiceHeader.lstInvoiceDetails[currentRowIndex].article = data[0];
                                    that.invoiceHeader.lstInvoiceDetails[currentRowIndex].quantity=1;

                                    if(that.invoiceHeader.lstInvoiceDetails[that.invoiceHeader.lstInvoiceDetails.length-1].article.id){
                                        that.invoiceHeader.lstInvoiceDetails.push({'article':{'name':null, 'price':00}, 'quantity':0});
                                    }

                                    that.invoiceHeader.lstAdditionalDetails = [
                                        {
                                            "quantity": "12",
                                            "additional": {
                                                "id": "27",
                                                "name": "iva",
                                                "parameter": "12"
                                            },
                                            "value": ""
                                        },
                                        {
                                            "quantity": "14",
                                            "additional": {
                                                "id": "28",
                                                "name": "descuento",
                                                "parameter": "12"
                                            },
                                            "value": ""
                                        }
                                    ];

                                    that.invoiceHeader.lstBillPayment = [
                                        {
                                            "waypay": {
                                                "id": 31,
                                                "name": "EFECTIVO",
                                                "codigoInterno": "CAT_EFEC",
                                            },
                                            "valor": 82.71,
                                        }
                                    ];

                                    var result = FacturaService.calcularTotals(that.invoiceHeader.lstInvoiceDetails, 14, null);

                                    that.invoiceHeader.subTotal = result.subTotal;
                                    that.invoiceHeader.subTotalDoce = result.subTotalDoce;
                                    that.invoiceHeader.subTotalZero = result.subTotalZero;
                                    that.invoiceHeader.totalValue = result.totalValue;
                                }else if(data.length>1){
                                    //Mostrar popup de opciones
                                }
                            }else{
                                //No existen coincidencias
                            }
                        }, function(error){
                            blockUI.stop();
                        });
                    }
                };

                //Action Controll
                that.saveInvoice = function(){
                    //blockUI.start();

                    that.removeArticle(that.invoiceHeader.lstInvoiceDetails[that.invoiceHeader.lstInvoiceDetails.length]);
                    FacturaService.crearFactura(that.invoiceHeader).then(function(data){
                        Alertify.success("Guardado");
                    },function(error){
                        Alertify.success("Error");
                    });
                };

                //Init controller
                that.initController();
            }
        ]
    );
})();