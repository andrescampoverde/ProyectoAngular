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

app.controller("TaxInformationController",['catalogService','restInvoiceService',"$scope","$modal","genericService",'$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams','$q',function(catalogService,RestInvoiceService,$scope,$modal,genericService, $timeout, $http, Alertify, blockUI, ngTableParams,$q) {

	  controller = this;
	  controller.lstITributaria = [];
	  controller.cabInfTributaria= undefined;
	  controller.detInfTributariaObj= undefined;
	  controller.subsidaryObj = undefined;
	  controller.taxInformationObj = undefined;
      controller.lstTaxInformations;
      controller.alerts = genericService.alerts;
      

    controller.openModal = function(modal_id, modal_size, modal_backdrop) {
    $scope.currentModal = $modal.open({
        templateUrl: modal_id,
        size: modal_size,
        scope:$scope
    	});
    };

	controller.openTInformationModal = function (){
	  controller.openModal('modal-select-taxInformation', 'lg');
	}
	controller.submitTInformation = function (informacionTributaria){
	  informacionTributaria.subsidiary =controller.subsidaryObj;
	  informacionTributaria.taxInformation = {
			  transactionType : controller.cabInfTributaria.transactionType	  
	  }
	  controller.detInfTributariaObj = informacionTributaria;
	  controller.lstITributaria.push(informacionTributaria);
	  controller.taxInformationObj = undefined;
	  $scope.currentModal.dismiss();
	}
      
      
      controller.retrieveTypeTransaccion = function(){
          blockUI.start();
          catalogService.loadSimpleCatalog('CAT_TTRANSA').then(function(data){
        	  controller.lstTransacciones = data;
              blockUI.stop();
          }, function(error){
              Alertify.error('Ocurrio un error al cargar el catalogo !');
              blockUI.stop();
          });
      };
      
      
      
      controller.retrieveSubsidiaries = function(){
    	  blockUI.start();
    	  var responseSubsidiary = RestInvoiceService.retrieveSubsidiaries ();
    	  responseSubsidiary.then(function(data){
    		   controller.lstSubsidiaries = data;
               blockUI.stop();
    	  },function(errot){
    		  Alertify.error('Ocurrio un error al obtener las sucursales!');
              blockUI.stop();
    	  } );

      }
      
      controller.initTaxInformation = function(){
          controller.taxInformationObj = undefined;
      }
      
      controller.newTaxInformation = function(){
    	  controller.retrieveSubsidiaries();
          controller.retrieveTypeTransaccion ();
          controller.taxInformationObj = {
        		  taxInformation :{
        				  id:0
        		  }
          }

          
      }
      
      controller.closeMessage = function(){
    	  $timeout(function() {
    		  controller.alerts.splice(0, 1);
    	      }, 3000);
    	  
      }
      
      controller.saveDetTaxInformation = function(taxinformationDto,boolean ){
    	  taxinformationDto.status = boolean;
    	  blockUI.start();
    	  var promise = genericService.saveObject('DetTaxInformation',taxinformationDto);
    	  promise.then(function(response) {
    	      controller.alerts.push(genericService.succesAlert);
    	      controller.closeMessage();
    	      controller.cancelTaxInformation();
    	      blockUI.stop();
    	      return true;
    	    }, function(error) {
    	    	controller.alerts.push(genericService.dangerAlert);
      	        controller.closeMessage();
      	      blockUI.stop();
      	      return false;
    	    });
    	  return true;
      }

      controller.editTaxInformation = function(currentTaxInformation){
    	  controller.retrieveSubsidiaries();
          controller.retrieveTypeTransaccion ();
          controller.taxInformationObj = currentTaxInformation;
      }
      
      controller.removeTaxInformation = function(currentTaxInformation){
    	  currentTaxInformation = {
        		  id: currentTaxInformation.id,
        		  status:false
          }
          TaxInformationService.saveTaxInformation(currentTaxInformation);
      }

      controller.cancelTaxInformation = function(){
    	  controller.taxInformationObj = undefined;
      }
      
      controller.tableParams = new ngTableParams({
          page: 1,            		// show first page
          count: 4,          			// count per page
          sorting: {
              		name: 'asc'     // initial sorting
          		 }
      }, {
          
      	total: 0,           // length of data
          getData: function($defer, params) {

              var paramFilter = {
                  "firstResult": (params.page() - 1) * params.count(),
                  "itemsPerPage": params.count(),
                  "filterByFields": params.filter(),
                  "orderBy": params.sorting()
              };

              blockUI.start();

              var response = $http.post('retrieveTaxInformationDet_json.json', paramFilter);
              response.success(function (data, status, headers, config) {
                  controller.lstTaxinformation = data;
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

      controller.initTaxInformation();
	  
	}]);
