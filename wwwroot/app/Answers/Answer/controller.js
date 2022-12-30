/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var Answers;
        (function (Answers) {
            var Answer;
            (function (Answer) {
                "use strict";
                var SharedAnswersAnswerController = /** @class */ (function () {
                    function SharedAnswersAnswerController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window) {
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
                        this.$scope.choice = this.getChoice();
                    }
                    SharedAnswersAnswerController.prototype.getChoice = function () {
                        switch (this.$scope.answer.sequence) {
                            case 1:
                                return "A)";
                                break;
                            case 2:
                                return "B)";
                                break;
                            case 3:
                                return "C)";
                                break;
                            case 4:
                                return "D)";
                                break;
                        }
                    };
                    SharedAnswersAnswerController.prototype.showAnswerText = function () {
                        return this.$scope.answer.showAnswerText;
                    };
                    SharedAnswersAnswerController.prototype.setStatus = function () {
                        this.$scope.segment.progressStatus++;
                        if (this.$scope.segment.progressStatus > 4) {
                            this.$scope.segment.progressStatus = 1;
                        }
                    };
                    SharedAnswersAnswerController.$inject = [
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
                    return SharedAnswersAnswerController;
                }());
                Answer.SharedAnswersAnswerController = SharedAnswersAnswerController;
            })(Answer = Answers.Answer || (Answers.Answer = {}));
        })(Answers = Shared.Answers || (Shared.Answers = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map