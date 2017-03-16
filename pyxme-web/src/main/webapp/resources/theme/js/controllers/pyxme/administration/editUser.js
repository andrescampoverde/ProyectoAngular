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

app
		.controller(
				'PersonController',
				[
						'system_variable',
						'$scope',
						'$timeout',
						'$http',
						'Alertify',
						'blockUI',
						'ngTableParams',
						'$modal',
						"genericService",
						function(system_variable, $scope, $timeout, $http,
								Alertify, blockUI, ngTableParams, $modal,
								genericService) {
							controller = this;
							controller.lstPersons;
							controller.phoneDto = undefined;
							controller.personObjeto = undefined;
							controller.lstPhones;
							controller.alerts = genericService.alerts;
							controller.blneditPerson = true;
							controller.activeDirective = true;
							controller.invoiceVariable = undefined;

							controller.tableParams = new ngTableParams(
									{
										page : 1, // show first page
										count : 4, // count per page
										sorting : {
											firstLastName : 'asc' // initial
																	// sorting
										}
									},
									{

										total : 0, // length of data
										getData : function($defer, params) {

											var paramFilter = {
												"firstResult" : (params.page() - 1)
														* params.count(),
												"itemsPerPage" : params.count(),
												"filterByFields" : params
														.filter(),
												"orderBy" : params.sorting()
											};

											blockUI.start();

											var response = $http.post(
													'retrievePerson_json.json',
													paramFilter);
											response.success(function(data,
													status, headers, config) {
												controller.lstPersons = data;
												$scope.items = data.items;
												params.total(data.totalCount);
												$defer.resolve(data.items);
												blockUI.stop();
											});

											response
													.error(function(data,
															status, headers,
															config) {
														Alertify
																.error('Ocurrio un error al retornar valores!');
														blockUI.stop();
													});
										}
									});

							controller.initPerson = function() {
								controller.personObjeto = undefined;
								controller.personObj = undefined;
							};

							controller.newPerson = function() {
								controller.activeDirective = false;
								controller.personObj = {
									status : true
								};
							};

							controller.closeMessage = function() {
								$timeout(function() {
									controller.alerts.splice(0, 1);
								}, 3000);

							};

							controller.savePerson = function(person, status) {
								person.status = status;
								blockUI.start();
								var response = $http.post(
										'createPerson_json.json', person);
								response.success(function(data, status,
										headers, config) {
									controller.alerts
											.push(genericService.succesAlert);
									controller.closeMessage();
									blockUI.stop();
									controller.initPerson();
								});

								response
										.error(function(data, status, headers,
												config) {
											Alertify
													.error('Ocurrio un error al guardar!');
											blockUI.stop();
										});
							};

							controller.alertRequiredFields = function() {
								Alertify
										.error('Llene los campos obligatorios, marcados en rojo');
							};

							controller.editPerson = function(currentPerson) {
								controller.personObj = currentPerson;
								controller.personObjeto = currentPerson;
							};

							controller.editPersonObj = function() {
								controller.activeDirective = false;
							};

							controller.cancelPerson = function() {
								controller.activeDirective = true;
								controller.initPerson();
							};

							controller.cargarVariables = function() {
								controller.respConfiguracionFactura = undefined;
								if (system_variable.getInvoiceVariable() == undefined) {
									var repuesta = system_variable
											.invoiceVariableLoader();
									repuesta
											.then(
													function(data) {
														controller.invoiceVariable = data;
													},
													function(error) {
														Alertify
																.error('Ocurrio un error al cargar las variables!');
													});
								} else {
									controller.invoiceVariable = system_variable
											.getInvoiceVariable();
								}

							};

							controller.initPerson();
							controller.cargarVariables();

						} ]);