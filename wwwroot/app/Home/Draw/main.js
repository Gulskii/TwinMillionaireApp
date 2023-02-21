/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Draw;
        (function (Draw) {
            "use strict";
            angular.module('homeDrawApp', ['ui.bootstrap'])
                .controller('homeDrawController', Draw.HomeDrawController)
                .service('dataService', Home.HomeDataService)
                .service('audioPlayer', App.AudioPlayer)
                .value('baseUrl', $("#baseUrl").val());
        })(Draw = Home.Draw || (Home.Draw = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map