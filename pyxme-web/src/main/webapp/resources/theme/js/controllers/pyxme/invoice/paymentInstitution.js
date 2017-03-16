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


app.controller('PaymentInstitutionController',['$scope','genericService', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', function($scope, genericService, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.alerts = genericService.alerts;
       

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

                var response = $http.post('retrievePaymentInstitution_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstPaymentInstitutions = data.items;
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
        controller.initPaymentInstitution = function(){
            controller.paymentInstitutionObj = undefined;
        }
        
        controller.newPaymentInstitution = function(){
            controller.paymentInstitutionObj = {
            		card:false
            };
        }
        
        controller.activeStatus= function (currentDto){
        	currentDto.status = true;
        	  var promise = genericService.saveObject('PaymentInstitution',currentDto);
          	  promise.then(function(response) {
          	      controller.alerts.push(genericService.succesAlert);
          	      controller.closeMessage();
          		
          	    }, function(error) {
          	    	controller.alerts.push(genericService.dangerAlert);
          	    });
          	controller.cancelCompany();
        
        }
        
        controller.closeMessage = function(){
      	  $timeout(function() {
      		  controller.alerts.splice(0, 1);
      	      }, 3000);
      	  
        }
        
        controller.inactiveStatus= function (currentDto){
        	currentDto.status = false;
        	  var promise = genericService.saveObject('PaymentInstitution',currentDto);
          	  promise.then(function(response) {
          	      controller.alerts.push(genericService.succesAlert);
          	      controller.closeMessage();
          		
          	    }, function(error) {
          	    	controller.alerts.push(genericService.dangerAlert);
          	    });
        	
        }
        
        
        
        controller.savePaymentInstitution = function(){
            blockUI.start();

            var response = $http.post('createPaymentInstitution_json.json', controller.paymentInstitutionObj);
            response.success(function (data, status, headers, config) {
            	controller.alerts.push(genericService.succesAlert);
            	controller.closeMessage();
                blockUI.stop();
                controller.initPaymentInstitution();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }

        controller.editPaymentInstitution = function(currentPaymentInstitution){
            controller.paymentInstitutionObj = currentPaymentInstitution;
        }

        controller.cancelPaymentInstitution = function(){
            controller.initPaymentInstitution();
        }

        controller.initPaymentInstitution();

    }]);