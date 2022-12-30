/// <reference path="../Typings/angular.d.ts" />
/// <reference path="../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var Question;
        (function (Question) {
            "use strict";
            angular.module('sharedQuestionApp', [])
                .controller('sharedQuestionController', Question.SharedQuestionController)
                .directive('displayQuestion', function () {
                return {
                    restrict: 'E',
                    scope: {
                        displayQuestion: '='
                    },
                    templateUrl: '/Shared/Question'
                };
            })
                .directive('textFitQuestion', textFitQuestion)
                .directive('questionShaper', questionShaper);
            function questionShaper() {
                var directive = {
                    link: link,
                    restrict: 'A'
                };
                return directive;
                function link(scope, element, attrs) {
                    scope.$watch('displayQuestion["flipped"]', function (newValue, oldValue, scope) {
                        flipQuestion(element, scope, newValue);
                    }, true);
                }
            }
            function flipQuestion(element, scope, flipped) {
                element.removeClass('question-flip');
                setTimeout(function () {
                    element.addClass('question-flip');
                }, (baseDelay));
                setTimeout(function () {
                    if (!flipped) {
                        scope.displayQuestion.showQuestionText = false;
                        element.removeClass('question-front');
                        element.addClass('question-back');
                    }
                    else {
                        element.removeClass('question-back');
                        element.addClass('question-front');
                        scope.displayQuestion.showQuestionText = true;
                    }
                    scope.$applyAsync();
                }, 500 + baseDelay);
            }
            var baseDelay = 100;
            function textFitQuestion() {
                var directive = {
                    link: link,
                    restrict: 'A'
                };
                return directive;
                function link(scope, element, attrs) {
                    scope.$watch('displayQuestion["text"]', function (newValue, oldValue, scope) {
                        setTimeout(function () {
                            var el = {
                                canvas: element
                            };
                            var canvas = el.canvas[0];
                            var context = el.canvas[0].getContext('2d');
                            context.font = "40px " + App.TwinFont;
                            App.TextFormatters.wrapText(el.canvas[0], 0, context, scope.displayQuestion.text, (canvas.width / 2), 32, canvas.width, 42);
                        }, 500);
                    }, true);
                }
            }
        })(Question = Shared.Question || (Shared.Question = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map