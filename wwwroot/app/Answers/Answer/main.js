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
                            fitTextOnCanvas(el.canvas[0], context, 0, 0, scope.choice, App.TwinFont);
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
                                fitTextOnCanvas(el.canvas[0], context, 0, 0, scope.answer.text, App.TwinFont);
                            }, 500);
                        }, true);
                    }
                }
                function bounds(x, y, context, text) {
                    var metrics = context.measureText(text);
                    return {
                        top: y - metrics.actualBoundingBoxAscent,
                        right: x + metrics.actualBoundingBoxRight,
                        bottom: y + metrics.actualBoundingBoxDescent,
                        left: x - metrics.actualBoundingBoxLeft
                    };
                }
                function textActualHeight(context, text) {
                    return Math.abs(context.measureText(text).actualBoundingBoxDescent)
                        + Math.abs(context.measureText(text).actualBoundingBoxAscent);
                }
                function textActualWidth(context, text) {
                    return Math.abs(context.measureText(text).actualBoundingBoxLeft)
                        + Math.abs(context.measureText(text).actualBoundingBoxRight);
                }
                function fitTextOnCanvas(canvas, context, paddingX, paddingY, text, fontface) {
                    // start with a large font size
                    var fontsize = 42;
                    var xTotal = 0;
                    var actualTextWidth = 0;
                    var xAlignment = 0;
                    var yTotal = 0;
                    var actualTextHeight = 0;
                    var yAlignment = 0;
                    context.fillStyle = "white";
                    context.strokeStyle = 'black';
                    context.lineWidth = 5;
                    context.lineJoin = 'round';
                    // lower the font size until the text fits the canvas
                    do {
                        fontsize--;
                        context.font = fontsize + "px " + fontface;
                        actualTextWidth = textActualWidth(context, text);
                        xAlignment = xAlign(canvas.width, actualTextWidth);
                        xTotal = paddingX + actualTextWidth + xAlignment;
                        actualTextHeight = textActualHeight(context, text);
                        yAlignment = yAlign(canvas.height, actualTextHeight);
                        yTotal = paddingY + actualTextHeight + yAlignment;
                    } while ((xTotal > canvas.width) || (yTotal > canvas.height));
                    var boundary = bounds((paddingX + xAlignment), (canvas.height - yAlignment - paddingY), context, text);
                    // draw the text
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.textAlign = "center";
                    context.strokeText(text, (canvas.width / 2), (canvas.height - boundary.top));
                    context.fillText(text, (canvas.width / 2), (canvas.height - boundary.top));
                }
                function xAlign(cWidth, tWidth) {
                    return ((cWidth - tWidth) / 2);
                }
                function yAlign(cHeight, tHeight) {
                    return ((cHeight - tHeight) / 2);
                }
                function wrapText(canvas, padding, context, text, x, y, maxWidth, lineHeight) {
                    var words = text.split(' ');
                    var line = '';
                    var metrics = context.measureText(text);
                    context.fillStyle = "white";
                    context.strokeStyle = 'black';
                    context.lineWidth = 5;
                    context.lineJoin = 'round';
                    if (metrics.width < canvas.width) {
                        y = ((canvas.height + metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) / 2);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.textAlign = "center";
                        context.strokeText(text, x, y);
                        context.fillText(text, x, y);
                    }
                    else {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        for (var n = 0; n < words.length; n++) {
                            var testLine = line + words[n] + ' ';
                            var metrics = context.measureText(testLine);
                            var testWidth = metrics.width;
                            if (testWidth > maxWidth && n > 0) {
                                context.textAlign = "center";
                                context.fillText(line, x, y);
                                context.strokeText(line, x, y);
                                line = words[n] + ' ';
                                y += lineHeight;
                            }
                            else {
                                line = testLine;
                            }
                        }
                        context.textAlign = "center";
                        context.strokeText(line, x, y);
                        context.fillText(line, x, y);
                    }
                }
            })(Answer = Answers.Answer || (Answers.Answer = {}));
        })(Answers = Shared.Answers || (Shared.Answers = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map