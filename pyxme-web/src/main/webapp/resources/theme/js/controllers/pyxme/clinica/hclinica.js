/*
 * Copyright (c) 2016.
 *  maniac787@gmail.com
 */

/**
 * Created by Roberto on 6/11/2016.
 */


app.controller('HClinicaController',['$scope', '$timeout', '$http', 'Alertify', 'blockUI',
    function($scope, $timeout, $http, Alertify, blockUI) {

        ctrl = this;

        ctrl.objModel = null;

        ctrl.hclinica = function () {
            blockUI.start();

            blockUI.stop();
        };

        ctrl.newHistoria = function(){
            ctrl.objModel = {};
        };


        ctrl.cancelHistoria = function () {
            ctrl.objModel = null;
        };

    }]
);