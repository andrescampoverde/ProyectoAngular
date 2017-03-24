'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          $urlRouterProvider.otherwise('/access/signin');

          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v2.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/chart.js']);
                          }]
                  }
              })

              .state('app.form.carshared', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/transport/transport-shared.js']);
                          }]
                  }
              })
              
              
              .state('app.lokme', {
                  url: '/lokme',
                  templateUrl: 'tpl/page_lokme.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/page_lokme.js']);
                          }]
                  }
              })
              
              .state('app.dashboard-mycompany', {
                  url: '/companyprofile',
                  templateUrl: 'tpl/pyxme/administration/mycompany.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/services/generic-service.js',
                                  'js/controllers/pyxme/administration/mycompany.js']);
                          }]
                  }
              })

              .state('app.dashboard-subsidiary', {
                  url: '/subsidiary',
                  templateUrl: 'tpl/pyxme/administration/subsidiary.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/administration/subsidiary.js']);
                          }]
                  }
              })

              .state('app.catalog', {
                  url: '/catalog',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load('js/controllers/form.js');
                          }]
                  }
              })

              .state('app.catalog.lugar', {
                  url: '/lugar-geografico',
                  templateUrl: 'tpl/pyxme/administration/geo_location.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function ($ocLazyLoad) {
                              return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                  function () {
                                      return $ocLazyLoad.load('js/controllers/pyxme/administration/geo_location.js');
                                  }
                              );
                          }
                      ]
                  }
              })
              
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/services/generic-service.js',
                                                  'js/services/pyxme/administration/user-restservice.js',
                                                  'js/controllers/signin.js']);
                          }]
                  }
              })

              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/signup.js',
                                                  'js/services/pyxme/administration/user-restservice.js',
                                                  ]);
                          }]
                  }
              })
              
             .state('app.form.person', {
                  url: '/person',
                  templateUrl: 'tpl/pyxme/administration/person.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/directives/pyxme/administration/form-person-validator.js',
                                  'js/directives/pyxme/administration/form-phone-validator.js',
                                  'js/directives/pyxme/administration/form-idnumber-validator.js',
                                  'js/services/pyxme/invoice/invoice-restservice.js',
                                  'js/services/pyxme/administration/person-restservice.js',
                                  'js/services/generic-service.js',
                                  'js/controllers/pyxme/administration/person.js']);
                          }]
                  }
              })
            
              
             .state('app.form.usuarioIsspol', {
                  url: '/usuarioIsspol',
                  templateUrl: 'tpl/pyxme/administration/usuarioIsspol.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/pyxme/administration/usuarioIsspol.js']);
                          }]
                  }
              })
              
              
             .state('app.form.estructOrg', {
                  url: '/estructOrg',
                  templateUrl: 'tpl/isspol/seguridades/sucursales_oficinas/estructOrg.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/seguridades/sucursales_oficinas/estructOrg.js']);
                          }]
                  }
              })
              
             
              .state('app.form.sucursalesIsspol', {
                  url: '/sucursalesIsspol',
                  templateUrl: 'tpl/isspol/seguridades/sucursales_oficinas/sucursalesIsspol.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/seguridades/sucursales_oficinas/sucursalesIsspol.js']);
                          }]
                  }
              })
                
              .state('app.form.ciudadesIsspol', {
                  url: '/ciudadesIsspol',
                  templateUrl: 'tpl/isspol/seguridades/sucursales_oficinas/ciudadesIsspol.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/seguridades/sucursales_oficinas/ciudadesIsspol.js']);
                          }]
                  }
              })
              
              .state('app.form.oficinasIsspol', {
                  url: '/oficinasIsspol',
                  templateUrl: 'tpl/isspol/seguridades/sucursales_oficinas/oficinasIsspol.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/seguridades/sucursales_oficinas/oficinasIsspol.js']);
                          }]
                  }
              })
              
              .state('app.form.perfilesIsspol', {
                  url: '/perfilesIsspol',
                  templateUrl: 'tpl/isspol/seguridades/usuarios_perfiles/perfilesIsspol.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/seguridades/usuarios_perfiles/perfilesIsspol.js']);
                          }]
                  }
              })
                .state('app.form.nivelOrg', {
                          url: '/nivelOrg',
                          templateUrl: 'tpl/isspol/seguridades/sucursales_oficinas/nivelOrg.html',
                          resolve: {
                              deps: ['$ocLazyLoad',
                                  function (uiLoad) {
                                      return uiLoad.load([
                                          'js/controllers/isspol/seguridades/sucursales_oficinas/nivelOrg.js']);
                                  }]
                          }
                      })
                .state('app.form.usuarioPerfiles', {
                          url: '/usuarioPerfiles',
                          templateUrl: 'tpl/isspol/seguridades/usuarios_perfiles/usuarioPerfil.html',
                          resolve: {
                              deps: ['$ocLazyLoad',
                                  function (uiLoad) {
                                      return uiLoad.load([
                                          'js/controllers/isspol/seguridades/usuarios_perfiles/usuarioPerfil.js']);
                                  }]
                          }
                      })
              
              .state('app.form.cargosIsspol', {
                  url: '/cargosIsspol',
                  templateUrl: 'tpl/isspol/seguridades/usuarios_perfiles/cargosIsspol.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/seguridades/usuarios_perfiles/cargosIsspol.js']);
                          }]
                  }
              })

              .state('app.form.catalogos', {
                  url: '/catalogos',
                  templateUrl: 'tpl/isspol/sistema/catalogos-generales.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/sistema/catalogos-generales.js']);
                          }]
                  }
              })


              .state('app.form.motivoCierreSesion', {
                  url: '/cierreSesionIsspol',
                  templateUrl: 'tpl/isspol/seguridades/inicios_sesion/motivoCierreSesion.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/controllers/isspol/seguridades/inicios_sesion/motivoCierreSesion.js']);
                          }]
                  }
              })
              
              .state('app.form.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/pyxme/administration/profile.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/directives/pyxme/administration/form-phone-validator.js',
                                  'js/services/pyxme/invoice/invoice-restservice.js',
                                  'js/services/pyxme/administration/user-restservice.js',
                                  'js/services/pyxme/administration/person-restservice.js',
                                  'js/controllers/pyxme/administration/profile.js']);
                          }]
                  }
              })
              
              .state('app.form.wizardbill', {
                  url: '/wizardbill',
                  templateUrl: 'tpl/pyxme/invoice/wizardbill.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/wizardbill.js',
                                  'js/directives/pyxme/invoice/bill/modals/additional-invoice-validator.js',
                                  'js/directives/pyxme/invoice/bill/modals/form-productservice-validator.js',   
                                  'js/directives/pyxme/invoice/bill/modals/pay-cash-validator.js',
                                  'js/directives/pyxme/invoice/bill/modals/pay-chk-validator.js',
                                  'js/directives/pyxme/invoice/bill/modals/pay-creditcard-validator.js', 
                                  'js/directives/pyxme/invoice/bill/form-report-invoice.js',
                                  'js/directives/pyxme/administration/form-idnumber-validator.js',
                                  'js/directives/pyxme/invoice/bill/modals/form-type-idnumber.js',
                                 
                                  'js/directives/pyxme/administration/radio-phone-location.js',
                                  'js/directives/pyxme/administration/form-idnumber-validator.js',
                                  'js/services/pyxme/invoice/invoice-service.js',
                                  'js/services/pyxme/invoice/total-service.js',
                                  'js/services/pyxme/invoice/opcionpago-service.js',
                                  'js/services/generic-service.js',
                                  'js/services/pyxme/invoice/invoice-restservice.js',
                                  'js/services/pyxme/administration/person-restservice.js']);
                          }]
                  }
              })
              
              .state('app.form.car', {
                  url: '/car',
                  templateUrl: 'tpl/pyxme/transport/car.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/transport/car.js',
                                                  'js/services/pyxme/transport/car-service.js']);
                          }]
                  }
              })
              .state('app.form.unit', {
                  url: '/unit',
                  templateUrl: 'tpl/pyxme/transport/dispatcher-car.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/transport/dispatcher-car.js',
                                                  'js/services/pyxme/transport/dispatcher-car-service.js'
                                                  ]);
                          }]
                  }
              })
              
              .state('app.form.sharedService', {
                  url: '/sharedService',
                  templateUrl: 'tpl/pyxme/transport/solicitud.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/transport/solicitud.js',
                                                  'js/services/pyxme/transport/dispatcher-car-service.js']);
                          }]
                  }
              })
              
               .state('app.form.spotRoute', {
                  url: '/spotRoute',
                  templateUrl: 'tpl/pyxme/transport/spotRoute.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/transport/spotRoute.js',
                                                  'js/services/pyxme/transport/dispatcher-car-service.js']);
                          }]
                  }
              })
              
              .state('app.form.adminRoute', {
                  url: '/adminRoute',
                  templateUrl: 'tpl/pyxme/transport/admin-route.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/transport/admin-route.js',
                                                  'js/services/pyxme/transport/dispatcher-car-service.js']);
                          }]
                  }
              })
              
              
              .state('app.form.frequentRoute', {
                  url: '/frequentRoute',
                  templateUrl: 'tpl/pyxme/transport/frequentRoute.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/transport/frequentRoute.js',
                                                  'js/services/pyxme/transport/dispatcher-car-service.js']);
                          }]
                  }
              })
              
              .state('app.form.taxinformation', {
                  url: '/taxinformation',
                  templateUrl: 'tpl/pyxme/invoice/taxInformation.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/taxInformation.js',
                                  'js/services/pyxme/invoice/invoice-restservice.js',
                                  'js/services/generic-service.js']);
                          }]
                  }
              })

              .state('app.form.hreporte', {
                  url: '/hreporte',
                  templateUrl: 'tpl/pyxme/system/header-report.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/system/header-report.js']);
                          }]
                  }
              })

              .state('app.form.dreporte', {
                  url: '/dreporte',
                  templateUrl: 'tpl/pyxme/system/detail-report.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/system/detail-report.js',
                                  'js/directives/pyxme/system/modal.report-parameter.js']);
                          }]
                  }
              })

              .state('app.form.opciones', {
                  url: '/opciones',
                  templateUrl: 'tpl/pyxme/system/opcion-sistema.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/system/opcion-sistema.js', 'js/services/generic-service.js']);
                          }]
                  }
              })

              .state('app.form.invoiceconfig', {
                  url: '/invoice-config',
                  templateUrl: 'tpl/pyxme/invoice/invoice-config.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/invoice-config.js',
                                  'js/services/generic-service.js',
                                  'js/directives/pyxme/invoice/config-invoice/modals/pay-cash-validator.js',
                                  'js/directives/pyxme/invoice/config-invoice/modals/pay-credit-validator.js'
                              ]);
                          }]
                  }
              })

              .state('app.form.invoice', {
                  url: '/punto-venta',
                  templateUrl: 'tpl/pyxme/invoice/punto_venta.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/punto_venta_controller.js',
                                  'js/services/pyxme/invoice/punto-venta-service.js'
                              ]);
                          }]
                  }
              })

              .state('app.form.edocument', {
                  url: '/e-document',
                  templateUrl: 'tpl/pyxme/cxc/edocumentNotes.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/services/pyxme/invoice/tax-information-service.js',
                                                  'js/services/pyxme/invoice/punto-venta-service.js',
                                                  'js/services/pyxme/invoice/customer-service.js',
                      							  'js/services/pyxme/cxc/edocumentService.js',
                                                  'js/services/pyxme/accounting/article-service.js',
                                                  'js/controllers/pyxme/cxc/edocumentNotes.js'
                              ]);
                          }]
                  }
              })
              
              .state('app.form.reason-notes', {
                  url: '/reason-note',
                  templateUrl: 'tpl/pyxme/cxc/reason-notes.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/services/pyxme/cxc/reason-note.js',
                                                  'js/controllers/pyxme/cxc/reason-notes.js'
                              ]);
                          }]
                  }
              })
              
              
              .state('app.form.storage', {
                  url: '/storage',
                  templateUrl: 'tpl/pyxme/invoice/storage.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/storage.js',
                                  'js/services/generic-service.js']);
                          }]
                  }
              })
              
           
              
              
              
              .state('app.form.additional', {
                  url: '/additional',
                  templateUrl: 'tpl/pyxme/invoice/additional.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/additional.js',
                                  'js/services/generic-service.js']);
                          }]
                  }
              })

              .state('app.form.module', {
                  url: '/module',
                  templateUrl: 'tpl/pyxme/system/module.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/system/module.js']);
                          }]
                  }
              })

              .state('app.form.systemvariable', {
                  url: '/systemvariable',
                  templateUrl: 'tpl/pyxme/system/system_variable.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/system/system_variable.js']);
                          }]
                  }
              })

              .state('app.form.paymentInstitution', {
                  url: '/paymentInstitution',
                  templateUrl: 'tpl/pyxme/invoice/paymentInstitution.html',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/services/generic-service.js',
                                  'js/controllers/pyxme/invoice/paymentInstitution.js']);
                          }]
                  }
              })

              .state('app.form.article', {
                  url: '/article',
                  templateUrl: 'tpl/pyxme/accounting/article.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/accounting/article.js']);
                          }]
                  }
              })

              .state('app.form.dispatcher', {
                  url: '/dispatcher',
                  templateUrl: 'tpl/pyxme/invoice/dispatcher.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/dispatcher.js',
                                                  'js/services/pyxme/administration/person-restservice.js',
                                                  'js/services/pyxme/invoice/invoice-restservice.js',
                                                  'js/services/pyxme/invoice/customer-service.js',
                                                  'js/services/pyxme/invoice/dispatcher-service.js',
                                                  'js/directives/pyxme/administration/form-idnumber-validator.js',
                                                  'js/directives/pyxme/invoice/bill/modals/form-type-idnumber.js'
                                                  ]);
                          }]
                  }
              })

              .state('app.form.distributionagency', {
                  url: '/distributionagency',
                  templateUrl: 'tpl/pyxme/invoice/distributionAgency.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/distributionAgency.js']);
                          }]
                  }
              })

              .state('app.form.seller', {
                  url: '/seller',
                  templateUrl: 'tpl/pyxme/invoice/seller.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/seller.js']);
                          }]
                  }
              })

              .state('app.form.factura', {
                  url: '/bill',
                  templateUrl: 'tpl/pyxme/invoice/bill.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/bill-controller.js']);
                          }]
                  }
              })

              .state('app.form.sellercustomer', {
                  url: '/sellercustomer',
                  templateUrl: 'tpl/pyxme/invoice/sellercustomer.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/sellercustomer.js']);
                          }]
                  }
              })

              .state('app.form.waypay', {
                  url: '/waypay',
                  templateUrl: 'tpl/pyxme/invoice/waypay.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/services/generic-service.js',
                                  'js/controllers/pyxme/invoice/waypay.js']);
                          }]
                  }
              })

              .state('app.form.catalog', {
                  url: '/catalog',
                  templateUrl: 'tpl/pyxme/administration/catalog.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/administration/catalog.js']);
                          }]
                  }
              })

              .state('app.form.gcatalog', {
                  url: '/catalog-group',
                  templateUrl: 'tpl/pyxme/administration/catalog_group.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/administration/catalog_group.js']);
                          }]
                  }
              })

              .state('app.form.user', {
                  url: '/user',
                  templateUrl: 'tpl/pyxme/security/user.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load([
                                  'js/services/generic-service.js',
                                  'js/directives/pyxme/administration/form-phone-validator.js',
                                  'js/services/pyxme/administration/user-restservice.js',
                                  'js/controllers/pyxme/administration/user_controller.js']);
                          }]
                  }
              })

              .state('app.form.customer', {
                  url: '/customer',
                  templateUrl: 'tpl/pyxme/invoice/customer.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/invoice/customer.js',
                                  'js/services/generic-service.js',
                                  'js/services/pyxme/invoice/customer-service.js',
                                  'js/services/pyxme/administration/person-restservice.js',
                                  'js/directives/pyxme/administration/form-idnumber-validator.js',
                                  'js/directives/pyxme/invoice/bill/modals/form-type-idnumber.js',
                                  'js/services/pyxme/invoice/invoice-restservice.js',
                                  'js/directives/pyxme/administration/form-customer.js']);

                          }]
                  }
              })

              .state('app.dashboard-company', {
                  url: '/company',
                  templateUrl: 'tpl/pyxme/administration/company.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/services/generic-service.js',
                                                  'js/services/pyxme/administration/company-restservice.js',
                                                  'js/controllers/pyxme/administration/company.js']);
                          }]
                  }
              })

              .state('app.form.hclinica', {
                  url: '/hclinica',
                  templateUrl: 'tpl/pyxme/clinica/hclinica.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/pyxme/clinica/hclinica.js']);
                          }]
                  }
              })

              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/app_dashboard_v2.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function ($ocLazyLoad) {
                              return $ocLazyLoad.load(['js/controllers/chart.js']);
                          }]
                  }
              })

              .state('app.ui', {
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>'
              })

              .state('app.form', {
                  url: '/form',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load('js/controllers/form.js');
                          }]
                  }
              })

              .state('app.form.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'tpl/form_fileupload.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function ($ocLazyLoad) {
                              return $ocLazyLoad.load('angularFileUpload').then(
                                  function () {
                                      return $ocLazyLoad.load('js/controllers/file-upload.js');
                                  }
                              );
                          }]
                  }
              })

              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })

              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })



              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/layout.html'
              })

              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/vectormap.js']);
                          }]
                  }
              })

              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_mobile.html'
                      }
                  }
              })

              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                          function (uiLoad) {
                              return uiLoad.load(['js/controllers/tab.js']);
                          }]
                  }
              })

              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/layout.html'
              })
      }
    ]
  );