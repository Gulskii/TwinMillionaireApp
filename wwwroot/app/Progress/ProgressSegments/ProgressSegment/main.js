/// <reference path="../../../Typings/angular.d.ts" />
/// <reference path="../../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var ProgressSegments;
        (function (ProgressSegments) {
            var ProgressSegment;
            (function (ProgressSegment) {
                "use strict";
                angular.module('sharedProgressSegmentsProgressSegmentApp', [])
                    .controller('sharedProgressSegmentsProgressSegmentController', ProgressSegment.SharedProgressSegmentsProgressSegmentController);
            })(ProgressSegment = ProgressSegments.ProgressSegment || (ProgressSegments.ProgressSegment = {}));
        })(ProgressSegments = Shared.ProgressSegments || (Shared.ProgressSegments = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map