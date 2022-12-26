/// <reference path="Typings/angular.d.ts" />
/// <reference path="Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    "use strict";
    App.TwinFont = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinFont");
    App.TwinGold = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinGold");
    App.TwinTeal = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinTeal");
    App.TwinRed = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinRed");
    App.TwinGreen = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinGreen");
    App.TwinLifeline1 = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinLifeline1");
    App.TwinLifeline2 = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinLifeline2");
    App.TwinLifeline3 = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinLifeline3");
    App.TwinLifeline4 = getComputedStyle(document.documentElement)
        .getPropertyValue("--twinLifeline4");
})(App || (App = {}));
//# sourceMappingURL=shared.js.map