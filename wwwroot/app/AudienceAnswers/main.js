/// <reference path="../Typings/angular.d.ts" />
/// <reference path="../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var AudienceAnswers;
        (function (AudienceAnswers) {
            "use strict";
            angular.module('sharedAudienceAnswersApp', [])
                .controller('sharedAudienceAnswersController', AudienceAnswers.SharedAudienceAnswersController);
        })(AudienceAnswers = Shared.AudienceAnswers || (Shared.AudienceAnswers = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map