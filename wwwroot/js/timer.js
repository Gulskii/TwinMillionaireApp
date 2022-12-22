var App;
(function (App) {
    var Timer = /** @class */ (function () {
        function Timer(element) {
            this.timerElement = document.getElementById(element);
        }
        Timer.prototype.setTimeOnTimer = function (seconds) {
            this.timerElement.style.animation = 'arc ' + seconds + 's linear infinite';
        };
        return Timer;
    }());
    App.Timer = Timer;
})(App || (App = {}));
//# sourceMappingURL=timer.js.map