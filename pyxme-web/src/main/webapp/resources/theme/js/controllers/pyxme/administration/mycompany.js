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


app.controller('MyCompanyController',['catalogService','SessionData','$scope',"genericService", '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', 
                             function(catalogService,SessionData,$scope,genericService, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.lstCompanies;
        controller.blneditCompany = true;
        controller.alerts = genericService.alerts;
        
        controller.closeMessage = function(){
      	  $timeout(function() {
      		  controller.alerts.splice(0, 1);
      	      }, 3000);
      	  
        }
        
    	controller.retrieveAllUsers = function(){
  	          var response = $http.get('findAllUserByCompany');
    	          response.success(function (data,status) {
    	        	  controller.lstUsuarios = data; 
    	          });

    	          response.error(function (data, status, headers, config) {
    	        	  Alertify.error('Ocurrio un error retornar los usuarios');
    	          });
    	 };
        
        controller.editCompanyObj = function (){
        	controller.blneditCompany = false;	
        	
        }

        controller.getMyCompany = function (){
            var response = $http.get('findCurrentCompany');
            response.success(function (data, status, headers, config) {
            	controller.currentCompany = data;
            	controller.abrirCatalogos();
                
            });
            
            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
            });
      	  	
        }
        

        
        
        controller.saveCompany = function(){
        	  var promise = genericService.saveObject('Company',controller.currentCompany);
        	  promise.then(function(response) {
        	      controller.alerts.push(genericService.succesAlert);
        	      controller.closeMessage();
        	      controller.blneditCompany = true;
        	    }, function(error) {
        	      $scope.mensaje = "Se ha producido un error al obtener el dato:" + error;
        	    });
        	  
          }

        controller.editCompany = function(currentCompany){
            controller.companyObj = currentCompany;
        }

        controller.cancelCompany = function(){
            controller.initCompany();
        }

                
        
        
        controller.retrieveTComCatalog = function(){
            blockUI.start();
            
            catalogService.loadSimpleCatalog('CAT_TCOM').then(function(data){
                controller.catalogTComList = data;
                blockUI.stop();
            }, function(){
                Alertify.error('Ocurrio un error al cargar el catalogo de tipo de compania!');
                blockUI.stop();
            });
            

        }
        
        controller.retrieveCoinCatalog = function(){
            blockUI.start();
            
            catalogService.loadSimpleCatalog('CAT_MONEDA').then(function(data){
            	 controller.catalogCoinList = data;
                blockUI.stop();
            }, function(){
                Alertify.error('Ocurrio un error al cargar el catalogo de moneda!');
                blockUI.stop();
            });
            
        };
        
        
        controller.retrieveComercialActivityCatalog = function(){
            blockUI.start();
            
            catalogService.loadSimpleCatalog('CAT_ACOM').then(function(data){
                controller.catalogAComList = data;
                blockUI.stop();
            }, function(){
                Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
                blockUI.stop();
            });
        };
        

        
        controller.abrirCatalogos = function (){
        	controller.retrieveComercialActivityCatalog();
            controller.retrieveTComCatalog();
            controller.retrieveCoinCatalog();
        }
        
        controller.getMyCompany();
        controller.retrieveAllUsers();


    }]);