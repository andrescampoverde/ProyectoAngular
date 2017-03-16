<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>


<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<head>
  <meta charset="utf-8" />
  <title>Pyxme</title>
  <meta name="description" content="app, web app, responsive, responsive layout, admin, admin panel, admin dashboard, flat, flat ui, ui kit, AngularJS, ui route, charts, widgets, components" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="css/animate.css" type="text/css" />
  <link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
  <link rel="stylesheet" href="css/simple-line-icons.css" type="text/css" />
  <link rel="stylesheet" href="css/font.css" type="text/css" />
  <link rel="stylesheet" href="css/app.css" type="text/css" />

  <link rel="stylesheet" href="vendor/angular/angular-block-ui/angular-block-ui.min.css"/>
  <link rel="stylesheet" href="vendor/angular/angular-alertify/ng-alertify.css" />
  <link rel="stylesheet" href="vendor/angular/ng-table/ng-table.min.css" />
  <link rel="stylesheet" href="vendor/modules/angular-ui-select/select2.css" />
  <link rel="stylesheet" href="vendor/modules/angular-ui-select/select.min.css" />
  <link rel="stylesheet" href="vendor/modules/angular-ui-select/select.min.css" />
  <link rel="stylesheet" href="css/pyxme_global.css" />
  <link rel="stylesheet" type="text/css" href="vendor/angular/bower_components/ng-notify/dist/ng-notify.min.css"/>
  <link rel="stylesheet" type="text/css" href="vendor/angular/angularjs-slider/dist/rzslider.css"/>

  <!-- After AngularJS -->

</head>
<body ng-controller="AppCtrl" >
  <div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}" ui-view></div>
  <!-- jQuery -->
  <script src="vendor/jquery/jquery.min.js"></script>

  <!-- Angular -->
  <script src="vendor/angular/angular.js"></script>
  
  <script src="vendor/angular/angular-animate/angular-animate.js"></script>
  <script src="vendor/angular/angular-cookies/angular-cookies.js"></script>
  <script src="vendor/angular/angular-resource/angular-resource.js"></script>
  <script src="vendor/angular/angular-sanitize/angular-sanitize.js"></script>
  <script src="vendor/angular/angular-touch/angular-touch.js"></script>
  
  <!-- Vendor -->
  <script src="vendor/angular/bower_components/ng-notify/dist/ng-notify.min.js"></script> 
  <script src="vendor/angular/angular-ui-router/angular-ui-router.js"></script> 
  <script src="vendor/angular/ngstorage/ngStorage.js"></script>
  <script src="vendor/angular/ngMask-master/dist/ngMask.min.js"></script>
  <script src="vendor/angular/ngGeolocation/ngGeolocation.min.js"></script>
  <script src="vendor/angular/angularjs-slider/dist/rzslider.min.js"></script>
  <script src="vendor/angular/ngmap/scripts/ng-map.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQfwzThRL-PyXVusv6VizyAuWrygjU-1o&callback=initMap" type="text/javascript"></script>

      
  <!-- bootstrap -->
  <script src="vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js"></script>
  <!-- lazyload -->
  <script src="vendor/angular/oclazyload/ocLazyLoad.js"></script>
  <!-- translate -->
  <script src="vendor/angular/angular-translate/angular-translate.js"></script>
  <script src="vendor/angular/angular-translate/loader-static-files.js"></script>
  <script src="vendor/angular/angular-translate/storage-cookie.js"></script>
  <script src="vendor/angular/angular-translate/storage-local.js"></script>

  <!-- App -->
  <script src="js/app.js"></script>
  <script src="js/config.js"></script>
  <script src="js/config.lazyload.js"></script>
  <script src="js/config.router.js"></script>
  <script src="js/main.js"></script>
  <script src="js/services/ui-load.js"></script>
  <script src="js/services/pyxme/catalog/catalogService.js"></script>
  <script src="js/services/pyxme/system/utilStringService.js"></script>
  <script src="js/factory/pyxme/system/system-variable.js"></script>
  <script src="js/factory/pyxme/system/user-company.js"></script>
  <script src="js/filters/fromNow.js"></script>
  <script src="js/directives/setnganimate.js"></script>
  <script src="js/directives/ui-butterbar.js"></script>
  <script src="js/directives/ui-focus.js"></script>
  <script src="js/directives/ui-fullscreen.js"></script>
  <script src="js/directives/ui-jq.js"></script>
  <script src="js/directives/ui-module.js"></script>
  <script src="js/directives/ui-nav.js"></script>
  <script src="js/directives/ui-scroll.js"></script>
  <script src="js/directives/ui-shift.js"></script>
  <script src="js/directives/ui-toggleclass.js"></script>
  <script src="js/directives/ui-validate.js"></script>
  <script src="js/controllers/bootstrap.js"></script>

  <script src="vendor/angular/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js"></script>
  <script src="vendor/angular/angular-block-ui/angular-block-ui.min.js"></script>
  <script src="vendor/angular/angular-alertify/ng-alertify.js"></script>
  <script src="vendor/angular/ng-table/ng-table.min.js"></script>
  <script src="vendor/angular/checklist-model/checklist-model.js"></script>
  <script src="vendor/modules/angular-ui-select/select.min.js"></script>

  <script src="js/factory/pyxme/downloadFactory.js"></script>
  <script src="js/factory/pyxme/sessionFactory.js"></script>
  <script src="js/factory/pyxme/userSessionFactory.js"></script>
  <script src="js/services/pyxme/security/sessionService.js"></script>

  <script src="vendor/angular/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js"></script>
  <script src="vendor/angular/angular-ui-form-validation/angular-ui-form-validation.js"></script>
  <script src="vendor/modules/underscore/underscore-min.js"></script>
  <!-- Lazy loading -->
</body>
</html>

