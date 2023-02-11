/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var AudienceAnswers;
        (function (AudienceAnswers) {
            "use strict";
            angular.module('homeAudienceAnswersApp', ['sharedAudienceAnswersApp', 'ui.bootstrap'])
                .controller('homeAudienceAnswersController', AudienceAnswers.HomeAudienceAnswersController)
                .service('dataService', Home.HomeDataService)
                .service('audioPlayer', App.AudioPlayer)
                .value('baseUrl', $("#baseUrl").val())
                .directive('audienceAnswers', function () {
                return {
                    restrict: 'E',
                    scope: {
                        audienceAnswers: '='
                    },
                    templateUrl: '/Shared/AudienceAnswers'
                };
            });
        })(AudienceAnswers = Home.AudienceAnswers || (Home.AudienceAnswers = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map