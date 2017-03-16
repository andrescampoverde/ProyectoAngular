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


app.controller('SubsidiaryController',['$scope', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', function($scope, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.lstSubsidiaries;

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

                var response = $http.post('retrieveSubsidiary_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
                    controller.lstSubsidiaries = data;
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
        controller.initSubsidiary = function(){
            controller.subsidiaryObj = undefined;
        }
        controller.newSubsidiary = function(){
            controller.subsidiaryObj = {
            		status:true
            };
        }
        controller.saveSubsidiary = function(currentSubsidiary){
            blockUI.start();
            currentSubsidiary.status = true;
            var response = $http.post('createSubsidiary_json.json', currentSubsidiary);
            response.success(function (data, status, headers, config) {
                Alertify.success('Registro guardado!');
                blockUI.stop();
                controller.initSubsidiary();
            });
            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }
        
        
        controller.saveInactiveSubsidiary = function(currentSubsidiary){
            blockUI.start();
            currentSubsidiary.status = false;
            var response = $http.post('createSubsidiary_json.json', currentSubsidiary);
            response.success(function (data, status, headers, config) {
                Alertify.success('Registro guardado!');
                blockUI.stop();
                controller.initSubsidiary();
            });
            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al guardar!');
                blockUI.stop();
            });
        }

        
        
        
        
        
        
        controller.refreshCompany = function(company){

            if(!company){
                company = undefined;
            }
            var response = $http.get('findCompaniesByName/'+company);

            response.success(function (data,status) {
                controller.companyList = data;
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al cargar las companias!');
                blockUI.stop();
            });
        }

        controller.editSubsidiary = function(currentSubsidiary){
            controller.subsidiaryObj = currentSubsidiary;
        }

        controller.cancelSubsidiary = function(){
            controller.initSubsidiary();
        }

        controller.initSubsidiary();

    }]);