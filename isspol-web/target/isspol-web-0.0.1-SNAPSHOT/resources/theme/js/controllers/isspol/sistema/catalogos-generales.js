/**
 * Created by santiago.yacelga on 23/3/2017.
 */

app.controller('CatalogosController', ['ngNotify', "$scope",
    function (ngNotify, $scope) {

        ctrl = this;


        var formOptions = {
                validationMessage: {
                    302: 'Campo obligatorio'
                },
                feedback: "{ 'is-required': form.required && !hasSuccess() && !hasError() ,'has-success': hasSuccess(), 'has-error': hasError() }"
            };

        ctrl.questionsExtra = {
            /*formOptions: formOptions
            schema: {
                type: "object",
                properties: {}
            },
            form: ["*"],
            modelForm: {}*/
        };

        $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];

        $scope.addNewChoice = function () {
            var newItemNo = $scope.choices.length + 1;
            $scope.choices.push({'id': 'choice' + newItemNo});
        };

        $scope.removeChoice = function () {
            var lastItem = $scope.choices.length - 1;
            $scope.choices.splice(lastItem);
        };

        function cargarTablas() {
            ctrl.lstTablas = [];
            var tabla = {
                id: 1,
                nombre: "Estados",
                campos: 2
            };
            ctrl.lstTablas.push(tabla);

            tabla = {
                id: 2,
                nombre: "Estaciones",
                campos: 3

            };

            ctrl.lstTablas.push(tabla);

            tabla = {
                id: 3,
                nombre: "Cargos",
                campos: 2
            };

            ctrl.lstTablas.push(tabla);

        };

        //  resources/theme/tpl/isspol/sistema/catalogos/ejemplo_A.html
        //  ctrl.urlCatalogo = "tpl/isspol/sistema/catalogos/ejemplo_A.html"


        ctrl.cambiar = function (value) {
            if (value == "A") {
                ctrl.urlCatalogo = ' <div class="form-group">  ' +
                    '<label class="col-sm-2 control-label">Nombre: </label> ' +
                    '<div class="col-sm-10"> ' +
                    ' <input type="text" ng-model="vm.storageObj.name"  class="form-control" placeholder="ingrese el nombre de la bodega"  required />' +
                    ' </div>' +
                    '</div>';

            } else {
                ctrl.urlCatalogo = 'I am an <code>HTML2</code>string with ' +
                    '<a href="#">links!</a> and other <em>stuff</em>';

            }

        };


        cargarTablas();

    }
]);