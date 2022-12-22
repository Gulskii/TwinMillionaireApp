/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Remote;
        (function (Remote) {
            "use strict";
            angular.module('homeRemoteApp', [])
                .controller('homeRemoteController', Remote.HomeRemoteController)
                .service('dataService', Home.HomeDataService)
                .value('baseUrl', $("#baseUrl").val());
        })(Remote = Home.Remote || (Home.Remote = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map