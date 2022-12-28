/// <reference path="../../../Typings/angular.d.ts" />
/// <reference path="../../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var ProgressSegments;
        (function (ProgressSegments) {
            var ProgressSegment;
            (function (ProgressSegment) {
                "use strict";
                var SharedProgressSegmentsProgressSegmentController = /** @class */ (function () {
                    function SharedProgressSegmentsProgressSegmentController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window) {
                        this.$scope = $scope;
                        this.$filter = $filter;
                        this.$log = $log;
                        this.$timeout = $timeout;
                        this.$attrs = $attrs;
                        this.$q = $q;
                        this.$location = $location;
                        this.$anchorScroll = $anchorScroll;
                        this.$window = $window;
                        this.$scope.ctrl = this;
                    }
                    SharedProgressSegmentsProgressSegmentController.prototype.setStatus = function () {
                        this.$scope.segment.progressStatus++;
                        if (this.$scope.segment.progressStatus > 4) {
                            this.$scope.segment.progressStatus = 1;
                        }
                    };
                    SharedProgressSegmentsProgressSegmentController.$inject = [
                        '$scope',
                        '$filter',
                        '$log',
                        '$timeout',
                        '$attrs',
                        '$q',
                        '$location',
                        '$anchorScroll',
                        "$window",
                    ];
                    return SharedProgressSegmentsProgressSegmentController;
                }());
                ProgressSegment.SharedProgressSegmentsProgressSegmentController = SharedProgressSegmentsProgressSegmentController;
            })(ProgressSegment = ProgressSegments.ProgressSegment || (ProgressSegments.ProgressSegment = {}));
        })(ProgressSegments = Shared.ProgressSegments || (Shared.ProgressSegments = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map