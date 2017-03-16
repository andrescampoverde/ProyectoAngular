app.controller('UnitController',['ngTableParams','$http','blockUI','Alertify','dispatcherCarService','$scope','$modal' , 
                        function(ngTableParams,$http,blockUI,Alertify,dispatcherCarService,$scope,$modal ) 
{
        controller = this;
        controller.currentDate = new Date();

        controller.edit= function (obj){
        	controller.unitDto = obj;
        };

       
        controller.newUnit = function (bandera){
        	if (bandera){
        		controller.unitDto = {};
        	}else {
        		controller.unitDto = undefined;
        	}
        };
        
        controller.save = function (unidad, status){
        	unidad.status = status;
        	blockUI.start();
        	var respuesta = dispatcherCarService.createUnit(unidad);
        		respuesta.then (function(data){
        			blockUI.stop();
        			Alertify.seccess('Guardado');
        		},function(error){
        			blockUI.stop();
        			Alertify.error ('Error al guardar la unidad');
        		});
        };
        
        controller.alertRequiredFields = function(){
            Alertify.error('Llene los campos obligatorios, marcados en rojo');
        };
        
        
        controller.searchDistpatcher = function ($select) {
            if ($select.search != "") {
            	var response = dispatcherCarService.findDispatcherByFilter($select.search);
            	response.then (function(data){
            		controller.lstDispatchers = data;
            	},function(error){
            		Alertify.error("Error al filtrar los transportistas");
            	});
            }else {
            	
            }
        };

        controller.searchCar = function ($select) {
            if ($select.search != "") {
            	var response = dispatcherCarService.findCarsByFilter($select.search);
            	response.then (function(data){
            		controller.lstCars	 = data;
            	},function(error){
            		Alertify.error("Error al filtrar los transportistas");
            	});
            }else {
            	
            }
        };
        

        controller.tableParams = new ngTableParams({
            page: 1,            		// show first page  mnnnbbb
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

                var response = $http.post('retrieveUnit_json.json', paramFilter);
                response.success(function (data, status, headers, config) {
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

        
        
       controller.newUnit(false);
        
    }]);