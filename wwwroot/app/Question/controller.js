/// <reference path="../Typings/angular.d.ts" />
/// <reference path="../Typings/jquery/jquery.d.ts"/>
/// <reference path="../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var Question;
        (function (Question) {
            "use strict";
            var SharedQuestionController = /** @class */ (function () {
                function SharedQuestionController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window) {
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
                SharedQuestionController.prototype.showQuestionText = function () {
                    return this.$scope.displayQuestion.showQuestionText;
                };
                SharedQuestionController.$inject = [
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
                return SharedQuestionController;
            }());
            Question.SharedQuestionController = SharedQuestionController;
        })(Question = Shared.Question || (Shared.Question = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map