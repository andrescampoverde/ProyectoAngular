app.controller('e-document-cred',['utilStringService','edocumentservice','customerService','FacturaService','TaxInformationService','articleService','catalogService','$scope', '$timeout', '$http', 'Alertify', 'blockUI', 'ngTableParams', 
                         function(utilStringService,edocumentservice,customerService,FacturaService,TaxInformationService,articleService,catalogService,$scope, $timeout, $http, Alertify, blockUI, ngTableParams) 
{
        controller = this;
        controller.alerts= [];
        controller.currentDate = new Date();
        
        
        controller.viewEdocument = function (edocument){
        	controller.nuevoDocumento(false);
        	controller.noteHeaderDto = edocument;
        }
        
        controller.visualizarGid = function (bandera){
        	controller.gridView= bandera;
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

                var response = $http.post('retrieveEDocument_json.json', paramFilter);
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
        
        
        
        
        function actualizarDatos (header){
        	var repuestaServicio = edocumentservice.cargarAdicionales(header);
    		repuestaServicio.then (function(data){
    			if (data.totales){
    				controller.noteHeaderDto = data;
    				controller.noteHeaderDto.subTotalSinImp = data.totales.subTotalSinImp;
    				controller.noteHeaderDto.subTotalConIp = data.totales.subTotalConIp;
    				controller.noteHeaderDto.subTotal= data.totales.subTotal;
    				controller.noteHeaderDto.total= data.totales.subTotal;
    				
    			}else {
    				
    			}
    				
    				
    			},function(error){
    				console.log(error);
    			});
        	
        };
		
        controller.nuevoDocumento = function(bandera){
        	controller.noteHeaderDto = undefined;
        	controller.gridView= bandera;
        	controller.init();
        };
            
        controller.validarDocumento= function (edocument){
        	if ($scope.form.$invalid){
        		utilStringService.crearMensaje($scope,3,'Error: Debe completar los campos obligatorios');
        		return false;
        	}else if (!edocument.lstNoteDetail[0].article.id)
        	{
        		utilStringService.crearMensaje($scope,3,'Error: No ha seleccionado ningún articulo');
        		return false;
        	}else if (edocument.total<=0)
        	{
        		utilStringService.crearMensaje($scope,3,'Error: El valor del documento es menor o igual a 0');
        		return false;
        	} else {
        		
        		save (edocument);
        	}
        		
        }
        
        function save (note){
        	controller.removeItem(controller.noteHeaderDto.lstNoteDetail[controller.noteHeaderDto.lstNoteDetail.length]);
        	edocumentservice.guardarNota(note).then(function (data){
        		controller.noteHeaderDto.id = data.id;
        		utilStringService.crearMensaje($scope,1,'El registro se ha guardado exitosamente');
        	},function(error){	
        		utilStringService.crearMensaje($scope,2,'Ocurrio un error al guardar el registro');
        	});
        };
        
        $scope.$watch(angular.bind(this, function () {
            return this.noteHeaderDto;
        }), function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            actualizarDatos (newValue);
        }, true);
        
        
        
        controller.obtnerArticulosXFactura = function (invoiceId){
        	var respesta = articleService.findArticlesByInvoice(invoiceId);
        	respesta.then(function(data){
        		controller.lstArticle= data;
        		
        	},function(error){
        		Alertify.error("Error al realizar la busqueda");
        	});
        	
        }
        
        
        controller.newRow = function (){
        	if (controller.noteHeaderDto.lstNoteDetail.length>0){
        		var repuestaServicio = edocumentservice.cargarAdicionales(controller.noteHeaderDto);
        		repuestaServicio.then (function(data){
        				controller.noteHeaderDto = data;
        			},function(error){
        				console.log(error);
        			});
        		
        	}else {
        		
        	}
        		
        	
        	if (controller.noteHeaderDto.lstNoteDetail[controller.noteHeaderDto.lstNoteDetail.length -1 ].article != undefined)
        		controller.noteHeaderDto.lstNoteDetail.push({'reasonNote':{'name':null, 'price':00}, 'quantity':0});
        };
        
        controller.seleccionarFactura = function (factura){
        	controller.noteHeaderDto.customer = factura.customer;
        	controller.obtnerArticulosXFactura(factura.id);
        };
        
        
        
        controller.finArticlesByFilter = function (filter){
        	if (filter.search== ""){
        		
        	}else {
        		var respesta = articleService.findArticlesByFilter(filter.search);
            	respesta.then(function(data){
            		controller.lstArticle= data;
            		
            	},function(error){
            		Alertify.error("Error al realizar la busqueda");
            	});	
        	}
        };
        
        controller.findCustomersByFilter = function (customer){
        	if (customer.search== ""){
        		
        	}else{
        		var repuesta = customerService.findCustomersByFilter(customer.search);
        		repuesta.then (function(data){
            		controller.lstCustomer = data;
            	},function(error){
            		Alertify.error("Error no se puede realizar la busqueda");
            	});	
        	}
        	
        };
        
        controller.findInvoiceByNumber = function (number){
        	if (number.search== ""){
        		
        	}else{
        		var repuesta = FacturaService.searchInvoiceByNumber( number.search);
        		repuesta.then (function(data){
            		controller.lstFacturas = data;
            	},function(error){
            		Alertify.error("Error no se puede realizar la busqueda");
            	});	
        	}
        	
        };
        
        controller.findNoteInformation = function (){
        	var responce = TaxInformationService.findTaxInformation();
        	responce.then(function(data){
        		controller.lstTaxInformation = data;
        	},function (error){
        		Alertify.error("No se han podido cargar la información de las notas de crédito/débito");
        	});
        };
        
        
          
        controller.motivoNota = function (){
        	var respuestaMotivos = edocumentservice.obtenerMotivos().then (function (data){
        		controller.lstMotivos = data;
        	},function(error){
        		Alertify.error('Ocurrio un error al cargar el catalogo de genero!');
        	});

        };
        
        controller.init = function (){
        	controller.noteHeaderDto = {
        			lstNoteDetail: [{'reasonNote':{'name':null},'article':{'name':null, 'price':00},
        							  'quantity':0	}]
        	};
        };
        
        controller.removeItem = function (item){
        	if(controller.noteHeaderDto.lstNoteDetail && controller.noteHeaderDto.lstNoteDetail.length==1){
        		controller.noteHeaderDto.lstNoteDetail[0]={'article':{'name':null, 'price':00},'quantity':0	};
            }else{
                var index = controller.noteHeaderDto.lstNoteDetail.indexOf(item);
                controller.noteHeaderDto.lstNoteDetail.splice(index, 1);
            }
        };
        
        controller.findNoteInformation();
        controller.motivoNota();
        controller.init();
        
    }]);