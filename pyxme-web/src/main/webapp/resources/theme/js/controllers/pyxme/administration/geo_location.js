
app.controller('GeoLocationController',['catalogService','$scope', '$timeout', '$http', 'Alertify', 'blockUI',
                               function(catalogService,$scope, $timeout, $http, Alertify, blockUI) {
        controller = this;
        var permiteEditar = false;
        controller.geoLocationObj = {};
        var tree;

        controller.my_data = [];
        controller.my_tree = tree = {};

        controller.saveGeoLocation = function(){
            blockUI.start();
            if (permiteEditar==true){
	            var response = $http.post('editGeoLocation_json.json', controller.geoLocationObj);
	            response.success(function (data, status, headers, config) {
	                Alertify.success('Registro guardado!');
	                controller.retrieveRootGeoLocations();
	                blockUI.stop();
	            });
	            response.error(function (data, status, headers, config) {
	                Alertify.error('Ocurrio un error al guardar!');
	                blockUI.stop();
	            });
            	
            	
            }else {
		            var b = tree.get_selected_branch();
		            controller.geoLocationObj.parentGeographicLocation = undefined;
		            if(b){
		                controller.geoLocationObj.parentGeographicLocation ={
		                    id:b.id
		                };
		            }
		            var response = $http.post('createGeoLocation_json.json', controller.geoLocationObj);
		            response.success(function (data, status, headers, config) {
		                controller.geoLocationObj.id = data.id;
		                Alertify.success('Registro guardado!');
		                controller.try_adding_a_branch();
		                controller.geoLocationObj = undefined;
		                blockUI.stop();
		            });
		            response.error(function (data, status, headers, config) {
		                Alertify.error('Ocurrio un error al guardar!');
		                blockUI.stop();
		            });
            
            }
        }

        
        controller.searchType = function ($select) {
            if ($select.search != "") {
            	var response = catalogService.loadCatalogByFilter('CAT_TLGE', $select.search);
            	response.then (function(data){
            		controller.lstTipos = data;
            	},function(error){
            		Alertify.error("Error al filtrar los transportistas");
            	});
            }else {
            	
            }
        };

        controller.retrieveRootGeoLocations = function(){
            var response = $http.get('retrieveGeoLocationParents_json');
            response.success(function (data, status, headers, config) {
                controller.my_data = data;
    	  		permiteEditar= false;
                blockUI.stop();
            });

            response.error(function (data, status, headers, config) {
                Alertify.error('Ocurrio un error al retornar valores!');
                blockUI.stop();
            });
        }
        
        
        controller.obtenerGeoLoaction = function (){
      	   var id = controller.objData.id;
        	var respuesta = $http.get('findGeographicLocationById/'+id);
	  	  respuesta.success(function (data, status, headers, config){
	  		controller.geoLocationObj= data;
	  		permiteEditar= true;
	  	  });
	  	  respuesta.error(function (data, status, headers, config){
	  	      Alertify.error('Ocurrio un error al retornar valores!');
	  	  });
	
        };

        controller.retrieveRootGeoLocations();

        controller.my_tree_handler = function(branch) {
        	controller.geoLocationObj = undefined;
        	var _ref;
            permiteEditar= false;
            controller.objData = branch;
            controller.output = branch.label;
            if ((_ref = branch.data) != null ? _ref.description : void 0) {
                return controller.output += '(' + branch.data.description + ')';
            }
        }

        controller.deselectBranch = function(){
        	tree.select_branch(null);
            controller.geoLocationObj = undefined;
            controller.output = undefined;
        }

        return controller.try_adding_a_branch = function() {
            var b, parentId;
            b = tree.get_selected_branch();

            if(b){
                parentId = b.id;
            }
            return tree.add_branch(b, {
                id : controller.geoLocationObj.id,
                label : controller.geoLocationObj.label,
                idParentGeographicLocation : parentId
            });
        }
}]);