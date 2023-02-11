/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var ProgressSegments;
        (function (ProgressSegments) {
            "use strict";
            var SharedProgressSegmentsController = /** @class */ (function () {
                function SharedProgressSegmentsController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window) {
                    this.$scope = $scope;
                    this.$filter = $filter;
                    this.$log = $log;
                    this.$timeout = $timeout;
                    this.$attrs = $attrs;
                    this.$q = $q;
                    this.$location = $location;
                    this.$anchorScroll = $anchorScroll;
                    this.$window = $window;
                }
                SharedProgressSegmentsController.$inject = [
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
                return SharedProgressSegmentsController;
            }());
            ProgressSegments.SharedProgressSegmentsController = SharedProgressSegmentsController;
        })(ProgressSegments = Shared.ProgressSegments || (Shared.ProgressSegments = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map