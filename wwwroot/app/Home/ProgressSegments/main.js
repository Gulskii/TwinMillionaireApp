/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var ProgressSegments;
        (function (ProgressSegments) {
            "use strict";
            angular.module('sharedProgressSegmentsApp', ['sharedProgressSegmentsProgressSegmentApp'])
                .controller('sharedProgressSegmentsController', ProgressSegments.SharedProgressSegmentsController)
                .directive('progressSegment', function () {
                return {
                    restrict: 'E',
                    scope: {
                        segment: '='
                    },
                    templateUrl: '/Shared/ProgressSegment'
                };
            });
        })(ProgressSegments = Shared.ProgressSegments || (Shared.ProgressSegments = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map