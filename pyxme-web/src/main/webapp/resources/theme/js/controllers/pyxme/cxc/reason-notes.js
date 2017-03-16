app.controller('ReasonNotes',['MotivoNota','catalogService','$scope', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', 
                     function(MotivoNota,catalogService,$scope, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        
        controller.cancel = function (){
        	controller.reasonNoteDto = undefined;
        }
        
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

                var response = $http.post('retrieveNotaMotivo_json.json', paramFilter);
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
        
        controller.editObj = function (edit){
        	controller.reasonNoteDto = edit;
        }
        
        
        controller.saveReasonNote = function (objeto,status){
        	objeto.status = status;
        	var respuesta = MotivoNota.saveReasonNote (objeto);
        	respuesta.then(function(data){
        		controller.cancel ();
        		Alertify.success('Registro guardado');
        		
        	},function(error){
        		 Alertify.error('Error al gurdar');
        	});
        	
        	
        }
        
        controller.motivoNota = function (){
        	catalogService.loadSimpleCatalog('CAT_MOTNOTA').then(function (data) {
                controller.lstMotNota = data;
            }, function () {
                Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
            });
        }
        controller.nuevaNota = function (){
        	controller.reasonNoteDto =  {
        		id:undefined
        	};
        }
        
        controller.init = function (){
        	controller.reasonNoteDto = undefined;
        	
        };
        controller.motivoNota();
        controller.init();
        
        
        
    }]);