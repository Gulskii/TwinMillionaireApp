/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var ProgressBar;
        (function (ProgressBar) {
            "use strict";
            angular.module('homeProgressBarApp', ['ui.bootstrap'])
                .controller('homeProgressBarController', ProgressBar.HomeProgressBarController)
                .service('dataService', Home.HomeDataService)
                .service('audioPlayer', App.AudioPlayer)
                .value('baseUrl', $("#baseUrl").val());
        })(ProgressBar = Home.ProgressBar || (Home.ProgressBar = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map