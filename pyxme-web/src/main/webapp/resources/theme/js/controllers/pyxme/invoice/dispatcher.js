app.controller('dispatcherController',['catalogService','utilStringService','$http','dispatcherService','$q','$scope', '$timeout', 'Alertify', 'blockUI', 'ngTableParams', 
                              function(catalogService,utilStringService,$http,dispatcherService,$q, $scope, $timeout, Alertify, blockUI, ngTableParams) 
{		

	controller = this;
	
	controller.editDispatcher = function (distpacher){
		var respuestaServidor = dispatcherService.findDispacherById(distpacher.id);
        respuestaServidor.then (function(respuesta){
        	controller.dispatcherDto =respuesta;
        },function(error){
            Alertify.error('Ocurrio un error al editar la persona');
        });
	};

	controller.retrieveSexCatalog = function(){
        blockUI.start();
        catalogService.loadSimpleCatalog('CAT_SEX').then(function(data){
        	controller.catalogSexList = data;
            blockUI.stop();
        }, function(){
            Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
            blockUI.stop();
        });
    };
    
    
    controller.retrievePrnTypeCatalog = function(){
        blockUI.start();
        catalogService.loadSimpleCatalog('CAT_PRNTYPE').then(function(data){
        	controller.catalogLstPrnType = data;
            blockUI.stop();
        }, function(){
            Alertify.error('Error en: Catálogo tipo persona');
            blockUI.stop();
        });
    };
    

    
    controller.retrieveMaritalStatus = function(){
        blockUI.start();
        catalogService.loadSimpleCatalog('CAT_ESTCIV').then(function(data){
        	controller.catalogMStatusList = data;
            blockUI.stop();
        }, function(){
            Alertify.error('Ocurrio un error al cargar el catalogo de estado civil!');
            blockUI.stop();
        });
    };

	
	
	
	
	controller.guardarTransportista = function (transportista, status){
		transportista.status = status;
		var respuesta = dispatcherService.createDispatcher(transportista);
		respuesta.then(function(data){
			controller.cancel();
			utilStringService.crearMensaje($scope, 1, "El registro se guardó exitosamente");
		},function(error){
			utilStringService.crearMensaje($scope, 1, "Error al guardar");
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

                var response = $http.post('retrieveDispatcher_json.json', paramFilter);
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

		controller.cancel= function (){
			controller.dispatcherDto = undefined;
		}
	
		controller.newDispatcher = function (){
			controller.dispatcherDto = {};
		};
	
		controller.init = function (){
			controller.dispatcherDto = undefined;
		};
		
		controller.init();
		controller.retrieveSexCatalog ();
	    controller.retrievePrnTypeCatalog();
	    controller.retrieveMaritalStatus();
	    
		
		
    }]);