/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var Answers;
        (function (Answers) {
            var Answer;
            (function (Answer) {
                "use strict";
                angular.module('sharedAnswersAnswerApp', [])
                    .controller('sharedAnswersAnswerController', Answer.SharedAnswersAnswerController)
                    .directive('answerShaper', answerShaper)
                    .directive('textFitChoice', textFitChoice)
                    .directive('textFitAnswer', textFitAnswer);
                function answerShaper() {
                    var directive = {
                        link: link,
                        restrict: 'A'
                    };
                    return directive;
                    function link(scope, element, attrs) {
                        changeAnswerPosition(element, scope.answer);
                        scope.$watch('answer["flipped"]', function (newValue, oldValue, scope) {
                            flipAnswer(element, scope, newValue);
                        }, true);
                        scope.$watch('answer["answerStatus"]', function (newValue, oldValue, scope) {
                            changeAnswerColor(element, scope.answer);
                            addAnswerActualAnimation(element, scope.answer);
                        }, true);
                    }
                }
                function textFitChoice() {
                    var directive = {
                        link: link,
                        restrict: 'A'
                    };
                    return directive;
                    function link(scope, element, attrs) {
                        angular.element(document).ready(function () {
                            var el = {
                                canvas: element
                            };
                            var context = el.canvas[0].getContext('2d');
                            App.TextFormatters.fitTextOnCanvas(el.canvas[0], context, 0, 0, scope.choice, App.TwinFont);
                        });
                    }
                }
                function flipAnswer(element, scope, flipped) {
                    element.removeClass('answer-flip');
                    setTimeout(function () {
                        element.addClass('answer-flip');
                    }, (baseDelay));
                    setTimeout(function () {
                        removeAnswerColor(element);
                        if (!flipped) {
                            element.addClass('answer-back');
                        }
                        else {
                            addAnswerColor(element, scope.answer);
                        }
                        scope.$applyAsync();
                    }, baseDelay);
                    setTimeout(function () {
                        if (!flipped) {
                            scope.answer.showAnswerText = false;
                        }
                        else {
                            scope.answer.showAnswerText = true;
                        }
                        scope.$applyAsync();
                    }, 500 + baseDelay);
                }
                function changeAnswerColor(element, answer) {
                    if (answer.flipped) {
                        removeAnswerColor(element);
                        addAnswerColor(element, answer);
                    }
                }
                function changeAnswerPosition(element, answer) {
                    if (answer.sequence % 2 !== 0) {
                        element.addClass('answer-left');
                    }
                    else {
                        element.addClass('answer-right');
                    }
                    if (answer.sequence > 2) {
                        element.addClass('answer-bottom');
                    }
                    else {
                        element.addClass('answer-top');
                    }
                }
                function removeAnswerColor(element) {
                    element.removeClass('answer-back');
                    element.removeClass('answer-status-actual');
                    element.removeClass('answer-status-correct');
                    element.removeClass('answer-status-incorrect');
                    element.removeClass('answer-status-normal');
                }
                function addAnswerActualAnimation(element, answer) {
                    if (answer.answerStatus === 5 /* AnswerStatus.Actual */) {
                        element.removeClass('answer-flip');
                        element.removeClass('answer-status-actual-blink');
                    }
                    setTimeout(function () {
                        if (answer.answerStatus === 5 /* AnswerStatus.Actual */) {
                            element.addClass('answer-status-actual-blink');
                        }
                    }, baseDelay);
                }
                function addAnswerColor(element, answer) {
                    switch (answer.answerStatus) {
                        case 5 /* AnswerStatus.Actual */:
                            element.addClass('answer-status-actual');
                            break;
                        case 4 /* AnswerStatus.Guess */:
                            element.addClass('answer-status-actual');
                            break;
                        case 2 /* AnswerStatus.Correct */:
                            element.addClass('answer-status-correct');
                            break;
                        case 3 /* AnswerStatus.Incorrect */:
                            element.addClass('answer-status-incorrect');
                            break;
                        case 1 /* AnswerStatus.Normal */:
                            element.addClass('answer-status-normal');
                            break;
                    }
                }
                var baseDelay = 100;
                function textFitAnswer() {
                    var directive = {
                        link: link,
                        restrict: 'A'
                    };
                    return directive;
                    function link(scope, element, attrs) {
                        scope.$watch('answer["text"]', function (newValue, oldValue, scope) {
                            setTimeout(function () {
                                var el = {
                                    canvas: element
                                };
                                var context = el.canvas[0].getContext('2d');
                                App.TextFormatters.fitTextOnCanvas(el.canvas[0], context, 0, 0, scope.answer.text, App.TwinFont);
                            }, 500);
                        }, true);
                    }
                }
            })(Answer = Answers.Answer || (Answers.Answer = {}));
        })(Answers = Shared.Answers || (Shared.Answers = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map