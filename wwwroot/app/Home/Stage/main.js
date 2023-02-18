/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Stage;
        (function (Stage) {
            "use strict";
            angular.module('homeStageApp', ['sharedAnswersApp', 'sharedQuestionApp', 'ui.bootstrap'])
                .controller('homeStageController', Stage.HomeStageController)
                .service('dataService', Home.HomeDataService)
                .service('audioPlayer', App.AudioPlayer)
                .value('baseUrl', $("#baseUrl").val())
                .directive('answers', function () {
                return {
                    restrict: 'E',
                    scope: {
                        answers: '='
                    },
                    templateUrl: '/Shared/Answers'
                };
            })
                .directive("iconDisplay", iconDisplay)
                .directive("counterDisplay", counterDisplay);
            function iconDisplay() {
                var directive = {
                    link: link,
                    restrict: 'A'
                };
                return directive;
                function link(scope, element, attrs) {
                    scope.$watch('showIcon', function (newValue, oldValue, scope) {
                        showIcon(element, newValue);
                    }, true);
                }
            }
            function counterDisplay() {
                var directive = {
                    link: link,
                    restrict: 'A'
                };
                return directive;
                function link(scope, element, attrs) {
                    scope.$watch('showCounter', function (newValue, oldValue, scope) {
                        showIcon(element, newValue);
                    }, true);
                }
            }
            function showIcon(element, show) {
                element.removeClass('logo-disappear');
                element.removeClass('logo-appear');
                if (!show) {
                    element.addClass('logo-disappear');
                }
                else {
                    element.addClass('logo-appear');
                }
            }
        })(Stage = Home.Stage || (Home.Stage = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map