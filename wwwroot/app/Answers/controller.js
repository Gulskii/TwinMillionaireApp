/// <reference path="../Typings/angular.d.ts" />
/// <reference path="../Typings/jquery/jquery.d.ts"/>
/// <reference path="../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var Answers;
        (function (Answers) {
            "use strict";
            var SharedAnswersController = /** @class */ (function () {
                function SharedAnswersController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window) {
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
                SharedAnswersController.$inject = [
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
                return SharedAnswersController;
            }());
            Answers.SharedAnswersController = SharedAnswersController;
        })(Answers = Shared.Answers || (Shared.Answers = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map