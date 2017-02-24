angular.module('app')
    .directive('select', function($timeout) {
        return {
            restrict: 'E',
            require: ['^form', 'ngModel'],
            scope: {
                ngModel: '=ngModel'
            },
            link: function(scope, element, attrs, formCtrl) {
                // We use a tomeout of 0ms so that that semantic waits for angular to init the scope
                $timeout(function() {
                    element.dropdown();
                    // Sync this dropdown if something outside changes the model value
                    scope.$watch("ngModel", function(newValue) {
                        // If model is defined set new value and remove placeholder
                        if (angular.isDefined(newValue)) {
                            // Set control dirty if this is in a form
                            if (formCtrl && angular.isDefined(attrs.name) && attrs.name != "") {
                                var controlIndex = _.findIndex(formCtrl, {
                                    $name: attrs.name
                                });

                                if (formCtrl[controlIndex].$pristine)
                                    element.parent().addClass('ng-pristine');
                                else
                                    element.parent().removeClass('ng-pristine');

                                if (formCtrl[controlIndex].$dirty)
                                    element.parent().addClass('ng-dirty');
                                else
                                    element.parent().removeClass('ng-dirty');

                                if (formCtrl[controlIndex].$untouched)
                                    element.parent().addClass('ng-untouched');
                                else
                                    element.parent().removeClass('ng-untouched');

                                if (formCtrl[controlIndex].$touched)
                                    element.parent().addClass('ng-touched');
                                else
                                    element.parent().removeClass('ng-touched');

                                if (angular.isDefined(formCtrl[controlIndex].$validators.required)) {
                                    if (formCtrl[controlIndex].$valid) {
                                        element.parent().addClass('ng-valid');
                                        element.parent().addClass('ng-valid-required');
                                    } else {
                                        element.parent().removeClass('ng-valid');
                                        element.parent().removeClass('ng-valid-required');
                                    }

                                    if (formCtrl[controlIndex].$invalid) {
                                        element.parent().addClass('ng-invalid');
                                        element.parent().addClass('ng-invalid-required');
                                    } else {
                                        element.parent().removeClass('ng-invalid');
                                        element.parent().removeClass('ng-invalid-required');
                                    }
                                } else {
                                    if (formCtrl[controlIndex].$valid) {
                                        element.parent().addClass('ng-valid');
                                    } else {
                                        element.parent().removeClass('ng-valid');
                                    }

                                    if (formCtrl[controlIndex].$invalid) {
                                        element.parent().addClass('ng-invalid');
                                    } else {
                                        element.parent().removeClass('ng-invalid');
                                    }
                                }
                            }
                        }
                        // End of IF
                    }, true);
                    // End of WATCH
                });
                // End of timeout
            }
            // End of LINK function
        }
        // End of RETURN
    });
