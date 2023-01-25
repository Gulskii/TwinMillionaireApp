/// <reference path="Typings/angular.d.ts" />
/// <reference path="Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var TextFormatters;
    (function (TextFormatters) {
        "use strict";
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
        TextFormatters.fitTextOnCanvas = fitTextOnCanvas;
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
                var multiLineArray = [];
                var totalHeight = y;
                for (var n = 0; n < words.length; n++) {
                    var testLine = line + words[n] + ' ';
                    var metrics = context.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        multiLineArray.push({ text: line, width: x, height: y });
                        line = words[n] + ' ';
                        y += lineHeight;
                        totalHeight += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }
                multiLineArray.push({ text: line, width: x, height: y });
                var pad = Math.round((canvas.height - totalHeight) / 2);
                $.each(multiLineArray, function (i, v) {
                    context.textAlign = "center";
                    context.strokeText(v.text, v.width, (v.height + pad));
                    context.fillText(v.text, v.width, (v.height + pad));
                });
            }
        }
        TextFormatters.wrapText = wrapText;
    })(TextFormatters = App.TextFormatters || (App.TextFormatters = {}));
})(App || (App = {}));
//# sourceMappingURL=textFormatters.js.map