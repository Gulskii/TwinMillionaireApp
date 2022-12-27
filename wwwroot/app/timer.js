/// <reference path="Typings/angular.d.ts" />
/// <reference path="Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Timer = /** @class */ (function () {
        function Timer($q, elementId, outlineElementId) {
            this.$q = $q;
            this.timerElement = document.getElementById(elementId);
            this.timerOutlineElement = document.getElementById(outlineElementId);
            this.time = 45;
            this.outlineElementId = outlineElementId;
            this.elementId = elementId;
            this.timerElement.style.animation = "arc " + 0 + "s linear";
            this.timerElement.style.animationName = "arc, col";
            this.timerElement.style.animationPlayState = "paused";
            this.timerOutlineElement.style.animation = "arc " + 0 + "s linear";
            this.timerOutlineElement.style.animationName = "arc, col";
            this.timerOutlineElement.style.animationPlayState = "paused";
        }
        Timer.prototype.setTimerDrawing = function () {
            this.timerElement.style.transform = "rotate(-90deg)";
            this.timerElement.style.animation = "arc " + this.time + "s linear";
            this.timerElement.style.animationName = "arc, col";
            this.timerElement.style.animationPlayState = "started";
            this.timerOutlineElement.style.transform = "rotate(-90deg)";
            this.timerOutlineElement.style.animation = "arc " + this.time + "s linear";
            this.timerOutlineElement.style.animationName = "arc, col";
            this.timerOutlineElement.style.animationPlayState = "started";
        };
        Timer.prototype.clearTimerDrawing = function () {
            var el = $("#" + this.elementId);
            el.before(el.clone(true)).remove();
            this.timerElement = document.getElementById(this.elementId);
            this.timerElement.style.animation = "arc " + 0 + "s linear";
            this.timerElement.style.animationName = "arc, col";
            this.timerElement.style.animationPlayState = "paused";
            el = $("#" + this.outlineElementId);
            el.before(el.clone(true)).remove();
            this.timerOutlineElement = document.getElementById(this.outlineElementId);
            this.timerOutlineElement.style.animation = "arc " + 0 + "s linear";
            this.timerOutlineElement.style.animationName = "arc, col";
            this.timerOutlineElement.style.animationPlayState = "paused";
        };
        Timer.prototype.startTimer = function (initialTime) {
            var _this = this;
            this.time = initialTime;
            this.timerOn = true;
            this.setTimerDrawing();
            var deferred = this.$q.defer();
            $("#timerText").text(this.time);
            this.intervalId = setInterval(function () {
                if (_this.timerOn)
                    _this.time = _this.time - 1;
                $("#timerText").text(_this.time);
                if (_this.time === 0) {
                    _this.clearTimer();
                    deferred.resolve((true));
                }
            }, 1000);
            return deferred.promise;
        };
        Timer.prototype.resumeTimer = function () {
            this.timerOn = true;
            this.timerOutlineElement.style.animationPlayState = "running";
            this.timerElement.style.animationPlayState = "running";
        };
        Timer.prototype.stopTimer = function () {
            this.timerOutlineElement.style.animationPlayState = "paused";
            this.timerElement.style.animationPlayState = "paused";
            this.timerOn = false;
        };
        Timer.prototype.clearTimer = function () {
            this.time = 0;
            this.timerOn = false;
            $("#timerText").text("");
            clearInterval(this.intervalId);
            this.clearTimerDrawing();
        };
        Timer.$inject = [];
        return Timer;
    }());
    App.Timer = Timer;
})(App || (App = {}));
//# sourceMappingURL=timer.js.map