/*
 */

/**
 * Created by Roberto on 5/12/2015.
 */


app.controller('BillController',['$rootScope','$scope', '$modal', '$timeout', '$http', 'Alertify', 'blockUI',
    function($rootScope, $scope, $modal, $timeout, $http, Alertify, blockUI) {
        controller = this;
        controller.customerDto = undefined;
        controller.headerInvoiceDto = undefined;
        controller.detailInvoiceDto = undefined;
        controller.totales= undefined;
        controller.filter = undefined;
        controller.lstCurrentArticles = [];
        controller.lstCurrentDetails = [];
        
        
        var prueba= {};
       
        
        controller.saveInvoice = function(){
            blockUI.start();
            var response = $http.post('createBill_json.json', controller.headerInvoiceDto);
            response.success(function (data, status, headers, config) {
                Alertify.success('Registro guardado!');
                blockUI.stop();                
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }
        
        controller.calculateItems = function(headerInvoice){
        	blockUI.start();
        	var response = $http.post('calculateTotals.json', headerInvoice);
            response.success(function (data, status, headers, config) {            	
            	controller.totales = data;
            	controller.loadTotalsHeader();
                blockUI.stop();
            });
            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
            });
        }
        
        controller.findByFilter = function (filter) {
            blockUI.start();
            var response = $http.get('findCustomerByFilter/'+ filter);
            response.success(function (data, status, headers, config) {
                controller.customerDto = undefined;
                if(data && data.length == 0){
                    controller.newPersonEvent();
                }else if(data && data.length == 1){
                    //llenar directamente los datos en la factura
                    controller.customerDto = data[0];
                    controller.loadCustomerInvoice();
                }else if(data && data.length > 1){
                    //Mostrar un popup de seleccion de usuario
                    controller.customerList = data;
                    controller.openModal('modal-select-customer', 'sm');

                }else if(angular.isUndefined(data)){
                    //Mostrar popup de creacion de persona
                }
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
            });
        };

        controller.removeItem = function(item){
            var index = controller.lstCurrentDetails.indexOf(item);
            controller.lstCurrentDetails.splice(index, 1);
        };
        
        
        controller.openModal = function(modal_id, modal_size, modal_backdrop) {
            $scope.currentModal = $modal.open({
                templateUrl: modal_id,
                scope:$scope
            });
        };

        controller.close=function(){
            $scope.currentModal.dismiss();//$scope.modalInstance.close() also works I think
        };
        
        controller.submit=function(){
        	controller.loadItems();
            $scope.currentModal.dismiss();//$scope.modalInstance.close() also works I think
        };
        

        controller.findPersonEvent = function(){
            controller.customerDto = undefined;
            controller.filter = undefined;
        }

        controller.newPersonEvent = function(){
            controller.customerDto = {};
            controller.loadCustomerInvoice();
            controller.filter = undefined;
        }

        controller.saveBillEvent = function(){
        	controller.saveInvoice ();
        }
        
        controller.loadTotalsHeader = function (){
        	controller.headerInvoiceDto = {
        			"subTotalZero": controller.totales.subTotal0,
        			"subTotalDoce":controller.totales.subTotal12,
        			"subTotal":controller.totales.subTotal,
        			"totalValue": controller.totales.total,
            		"customer":controller.headerInvoiceDto.customer,
            		"lstInvoiceDetails":controller.headerInvoiceDto.lstInvoiceDetails
            	}
        }
        
        controller.loadItems = function (){
        	controller.headerInvoiceDto = {
        			"customer":controller.customerDto,
            		"lstInvoiceDetails":controller.lstCurrentDetails
        	}

        }
       
    

        controller.findByArticleFilter = function(filter){
            blockUI.start();
            controller.articleDto = undefined;
            var response = $http.get('findArticle/'+ filter);
            response.success(function (data, status, headers, config) {
            	controller.detailInvoiceDto= undefined;

                if(data.length == 1){
                    controller.loadOnlyDetailInvoice(data[0]);
                    controller.lstCurrentDetails.push(controller.detailInvoiceDto);
                    controller.loadItems();
                }

                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
            });
        }
        
        controller.loadOnlyDetailInvoice = function(article){
        controller.detailInvoiceDto= {
        			"article" :article,
            		"precioUnitario" : controller.detailInvoiceDto == undefined ? 0:controller.detailInvoiceDto.price,
            		"quantity" :controller.detailInvoiceDto == undefined ? 0:controller.detailInvoiceDto.quantity,
            		"cashDiscount" :controller.detailInvoiceDto == undefined ? 0:controller.detailInvoiceDto.cashDiscount,
            		"quantityProduct" :controller.detailInvoiceDto == undefined ? 0:controller.detailInvoiceDto.quantityProduct,
            		"quantityProductDiscount": controller.detailInvoiceDto == undefined ? 0:controller.detailInvoiceDto.quantityProductDiscount,
            		"birbpnr": controller.detailInvoiceDto == undefined ? 0:controller.detailInvoiceDto.birbpnr,
            		"ice" :controller.detailInvoiceDto == undefined ? 0:controller.detailInvoiceDto.ice
        	}
        }

        

    }]
);