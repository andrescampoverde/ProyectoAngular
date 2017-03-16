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


app.controller('WayPayController',['catalogService','$scope',"genericService", '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', function(catalogService,$scope, genericService, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.lstWayPays;
        controller.alerts = genericService.alerts;
        controller.wayPayObj = undefined;
        controller.rangeDayObj = undefined;
        controller.disableStepOne = true;
        controller.lstDayRangeDto = [];
        
        controller.activeStatus = function (currentDto){
        	currentDto.status = true; 
        	controller.saveWayPayStatus(currentDto);
        	controller.saveWayPay ();
        }
        
        controller.inactiveStatus = function (currentDto){
        	currentDto.status = false; 
        	controller.saveWayPayStatus(currentDto);
        	controller.saveWayPay ();
        }
        
        controller.detailLoad = function (){        	 
        	controller.lstDayRangeDto.push(controller.rangeDayObj);
        	controller.wayPayObj.lstDayRange=controller.lstDayRangeDto;     	
        	
        }
        
        controller.retrievePayTypeCatalog = function(){
            blockUI.start();
            catalogService.loadSimpleCatalog('CAT_TPAGO').then(function(data){
            	controller.catalogPayTypeList = data;
                blockUI.stop();
            }, function(){
                Alertify.error('Ocurrio un error al cargar el catalogo tipo pago!');
                blockUI.stop();
            });
        };

        

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

                var response = $http.post('retrieveWayPay_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstWayPays = data;
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
        controller.initWayPay = function(){
            controller.wayPayObj = undefined;
            controller.rangeDayObj = undefined;
            controller.lstDayRangeDto = [];
        }
        controller.newWayPay = function(){
            controller.wayPayObj = {
            		 status:true	
            						};
        }
        
        controller.saveWayPayStatus = function(currentObjt){
            blockUI.start();
            //controller.detailLoad();
            var response = $http.post('createWayPay_json.json', currentObjt);
            response.success(function (data, status, headers, config) {
                
                blockUI.stop();
                controller.initWayPay();
                controller.wayPayObj = undefined;
                controller.alerts.push(genericService.succesAlert);
      	      	controller.closeMessage();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }
        
        
        controller.saveWayPay = function(){
            blockUI.start();
            controller.detailLoad();
            var response = $http.post('createWayPay_json.json', controller.wayPayObj);
            response.success(function (data, status, headers, config) {
                Alertify.success('Registro guardado!');
                blockUI.stop();
                controller.initWayPay();
                controller.wayPayObj = undefined;
                controller.alerts.push(genericService.succesAlert);
      	      	controller.closeMessage();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }

        controller.editWayPay = function(currentWayPay){
            controller.wayPayObj = currentWayPay;
            controller.rangeDayObj = controller.wayPayObj.lstDayRange[0]; 
        }

        controller.cancelWayPay = function(){
            controller.initWayPay();
        }
        
        controller.closeMessage = function(){
      	  $timeout(function() {
      		  controller.alerts.splice(0, 1);
      	      }, 3000);
      	  
        }

        controller.initWayPay();
        controller.retrievePayTypeCatalog();

    }]);