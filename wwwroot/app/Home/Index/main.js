/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Index;
        (function (Index) {
            "use strict";
            angular.module('homeIndexApp', ['sharedProgressSegmentsApp', 'ui.bootstrap'])
                .controller('homeIndexController', Index.HomeIndexController)
                .service('dataService', Home.HomeDataService)
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
        })(Index = Home.Index || (Home.Index = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map