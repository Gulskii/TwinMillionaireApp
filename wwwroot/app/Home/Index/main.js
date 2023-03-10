/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Index;
        (function (Index) {
            "use strict";
            angular.module('homeIndexApp', ['sharedProgressSegmentsApp', 'sharedAnswersApp', 'sharedQuestionApp', 'sharedAudienceAnswersApp', 'ui.bootstrap'])
                .controller('homeIndexController', Index.HomeIndexController)
                .service('dataService', Home.HomeDataService)
                .service('audioPlayer', App.AudioPlayer)
                .value('baseUrl', $("#baseUrl").val())
                .directive('audienceAnswers', function () {
                return {
                    restrict: 'E',
                    scope: {
                        audienceAnswers: '='
                    },
                    templateUrl: '/Shared/AudienceAnswers'
                };
            })
                .directive('progressSegments', function () {
                return {
                    restrict: 'E',
                    scope: {
                        segments: '='
                    },
                    templateUrl: '/Shared/ProgressSegments'
                };
            })
                .directive('answers', function () {
                return {
                    restrict: 'E',
                    scope: {
                        answers: '='
                    },
                    templateUrl: '/Shared/Answers'
                };
            })
                .directive("iconDisplay", iconDisplay);
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
        })(Index = Home.Index || (Home.Index = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map