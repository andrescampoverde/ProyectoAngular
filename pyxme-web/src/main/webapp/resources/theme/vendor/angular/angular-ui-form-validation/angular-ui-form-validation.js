(function() {

    var app = angular.module('app');

    var submitDirectiveId = 'customSubmit';
    app.directive(submitDirectiveId, ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: [submitDirectiveId, '?form'],
            controller: ['$scope', function ($scope) {

                this.attempted = false;

                var formController = null;

                this.setAttempted = function () {
                    this.attempted = true;
                };

                this.reset = function () {
                    this.attempted = false;
                    formController.$setPristine();
                };

                this.setFormController = function (controller) {
                    formController = controller;
                };

                this.needsAttention = function (fieldModelController) {
                    if (!formController) return false;
                    if (fieldModelController) {
                        return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
                    } else {
                        return formController && formController.$invalid && (formController.$dirty || this.attempted);
                    }
                };
            }],
            compile: function (cElement, cAttributes, transclude) {
                return {
                    pre: function (scope, formElement, attributes, controllers) {

                        var submitController = controllers[0];
                        var formController = (controllers.length > 1) ? controllers[1] : null;

                        submitController.setFormController(formController);

                        scope.ac = scope.ac || {};
                        scope.ac[attributes.name] = submitController;
                    },
                    post: function (scope, formElement, attributes, controllers) {

                        var submitController = controllers[0];
                        var formController = (controllers.length > 1) ? controllers[1] : null;
                        var fn = $parse(attributes[submitDirectiveId]);

                        formElement.bind('submit', function (event) {
                            submitController.setAttempted();
                            if (!scope.$$phase) scope.$apply();

                            if (!formController.$valid) return false;

                            scope.$apply(function () {
                                fn(scope, { $event: event });
                            });
                        });
                    }
                };
            }
        };
    }]);
})();