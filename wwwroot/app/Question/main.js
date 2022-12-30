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
                            wrapText(el.canvas[0], 0, context, scope.displayQuestion.text, (canvas.width / 2), 32, canvas.width, 42);
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
                            context.strokeText(line, x, y);
                            context.fillText(line, x, y);
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
        })(Question = Shared.Question || (Shared.Question = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map