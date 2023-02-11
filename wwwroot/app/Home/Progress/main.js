/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Progress;
        (function (Progress) {
            "use strict";
            angular.module('homeProgressApp', ['sharedProgressSegmentsApp', 'ui.bootstrap'])
                .controller('homeProgressController', Progress.HomeProgressController)
                .service('dataService', Home.HomeDataService)
                .service('audioPlayer', App.AudioPlayer)
                .value('baseUrl', $("#baseUrl").val())
                .directive('progressSegments', function () {
                return {
                    restrict: 'E',
                    scope: {
                        segments: '='
                    },
                    templateUrl: '/Shared/ProgressSegments'
                };
            });
        })(Progress = Home.Progress || (Home.Progress = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map