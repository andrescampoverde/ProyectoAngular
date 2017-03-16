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


app.controller('DetailReportController',
		 ['$modal','$scope', '$timeout', '$http', 'Alertify','blockUI', 'ngTableParams', '$q', 
 function($modal,$scope,     $timeout, $http,     Alertify, blockUI,    ngTableParams, $q) {
        controller = this;
        controller.detailReporObj = undefined;
        controller.parameter= undefined;
        controller.edicion = false;
        controller.lstReportParameter= [];
        controller.initTable = function(){

       	controller.tableParams = new ngTableParams({
            page: 1,            		// show first page
            count: 4,          		// count per page
            sorting: {
                		name: 'asc'     // initial sorting
            		}
       		}, 
       		{
            total: 0,           		// length of data
            getData: function ($defer, params) {

                var paramFilter = {
                    "firstResult": (params.page() - 1) * params.count(),
                    "itemsPerPage": params.count(),
                    "filterByFields": params.filter(),
                    "orderBy": params.sorting()
                };
                blockUI.start();

                var response = $http.post('retrieveReportDetail_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstReportDetail = data;
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
        })
    };
    
    controller.openModalReport = function (parameter){
    	controller.edicion = true;
    	controller.parametroReporte = parameter;
    	controller.openModal('modal-parameter','lg' );
    	
    };
    
    controller.insertarParametro = function (parametro){
    	if (controller.edicion == true){
    		controller.parametroReporte;
    		var index = controller.lstReportParameter.indexOf(controller.parametroReporte);
    		controller.lstReportParameter[index]= controller.parametroReporte; 
    	}else {
    		controller.lstReportParameter.push(parametro);	
    	}
    	
    	$scope.currentModal.dismiss();
    };




     controller.agregarParametro = function (){
         if(!controller.lstReportParameter){
             controller.lstReportParameter = [];
         }
         controller.lstReportParameter.push({"parameter":""});
     };


     controller.removerParametro = function (item){
         var index = controller.lstReportParameter.indexOf(item);
         controller.lstReportParameter.splice(index, 1);
     };

    
    controller.openModal = function(modal_id, modal_size, modal_backdrop) {
        $scope.currentModal = $modal.open({
            templateUrl: modal_id,
            size: modal_size,
            scope:$scope
        });
    };
    
    controller.retrieveReportDirectory = function(){
        blockUI.start();
        var response =  $http.get('retrieveAllHeaderReport_json');
        response.success(function (data,status) {
        	controller.lstReportDirectory = data;
            blockUI.stop();
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
            blockUI.stop();
        });
    }
    
    
    controller.retrieveParameter = function(idReport){
        blockUI.start();
        var response =  $http.get('findParametersByFilter/'+idReport);
        response.success(function (data,status) {
        	controller.lstReportParameter = data;
            blockUI.stop();
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
            blockUI.stop();
        });
    }
    
    controller.retrieveReportDirectory();
    
    
    controller.initDetailReport = function () {
        controller.detailReporObj = undefined;
    };
    
    
    controller.newDetailReport = function () {
    	controller.lstReportParameter = [];
        controller.detailReporObj = {
            status: true
        };
    };

    controller.saveDetailReport = function (objeto, status) {
    	objeto.lstParameterReport= controller.lstReportParameter;
    	blockUI.start();
    	objeto.status = status;
        var response = $http.post('createDetailReport_json.json', objeto);
        response.success(function (data, status, headers, config) {
            Alertify.success('Registro guardado!');
            blockUI.stop();
            controller.initDetailReport();
            return data;
        });

        response.error(function (data, status, headers, config) {
            Alertify.error('Ocurrio un error al guardar!');
            blockUI.stop();
            return undefined;
        });
    }

    controller.editDetailReport = function (currentDetailReport) {
    	controller.edicion = true;
        controller.detailReporObj = currentDetailReport;
        controller.retrieveParameter (currentDetailReport.id);
    }

    
    
    controller.cancelDetailReport = function () {
        controller.initDetailReport();
    }


    controller.initTable();
    controller.initDetailReport();
}]);