/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Draw;
        (function (Draw) {
            "use strict";
            var HomeDrawController = /** @class */ (function () {
                function HomeDrawController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl, audioPlayer) {
                    this.$scope = $scope;
                    this.$filter = $filter;
                    this.$log = $log;
                    this.$timeout = $timeout;
                    this.$attrs = $attrs;
                    this.$q = $q;
                    this.$location = $location;
                    this.$anchorScroll = $anchorScroll;
                    this.$window = $window;
                    this.dataService = dataService;
                    this.baseUrl = baseUrl;
                    this.audioPlayer = audioPlayer;
                    this.magicWand = {
                        'runDraw': this.runDraw,
                        'stopDraw': this.stopDraw,
                        'setBGVolume': this.setBGVolume,
                        'setSFXVolume': this.setSFXVolume,
                        'killCurrentAudio': this.killCurrentAudio,
                    };
                    this.$scope.chosenQuestion = {};
                    this.$scope.audienceAnswers = [];
                    this.socketClient = new App.WebSocketClient(this.magicWand, this);
                    this.$scope.accessToken = $("#accessToken").val();
                    this.$scope.ctrl = this;
                    var ctrl = this;
                    this.showAudienceAnswers = true;
                    this.socket = this.socketClient.createSocket(this.baseUrl);
                    this.$scope.audioMute = false;
                    this.$scope.bgVolume = 100;
                    this.$scope.sfxVolume = 100;
                    this.$scope.stopDrawCalled = false;
                }
                HomeDrawController.prototype.runDraw = function (ctrl, data) {
                    var entryArray = [];
                    $("#drawLabel").removeClass("draw-chosen");
                    ctrl.dataService.getAudienceLeaderboard().then(function (results) {
                        ctrl.$scope.audienceLeaderboardCount = results.length;
                        ctrl.$scope.audienceLeaderboard = results;
                        $.each(ctrl.$scope.audienceLeaderboard, function (i, v) {
                            var count = 0;
                            while (count < v.numOfCorrectAnswers) {
                                entryArray.push(v.userName);
                                count++;
                            }
                        });
                        ctrl.chooseEntry(entryArray);
                    });
                };
                HomeDrawController.prototype.stopDraw = function (ctrl, data) {
                    var count = 0;
                    setTimeout(function () {
                        clearInterval(ctrl.interval);
                        $("#drawLabel").addClass("draw-chosen");
                    }, 5000);
                };
                HomeDrawController.prototype.chooseEntry = function (entryArray) {
                    var ctrl = this;
                    this.interval = setInterval(function () {
                        ctrl.$scope.chosenAudience = entryArray[Math.floor(Math.random() * entryArray.length)];
                        ctrl.$scope.$applyAsync();
                    }, 500);
                };
                HomeDrawController.prototype.openRemote = function () {
                    window.open("/Home/Remote", "newwindow", "width=800,height=800,left=150,top=200,toolbar=0,status=0,");
                };
                HomeDrawController.prototype.setBGVolume = function (ctrl, data) {
                    ctrl.$scope.bgVolume = data;
                    ctrl.audioPlayer.bgAudio.volume = (ctrl.$scope.bgVolume / 100);
                    ctrl.audioPlayer.bgVolume = ctrl.$scope.bgVolume;
                };
                HomeDrawController.prototype.setSFXVolume = function (ctrl, data) {
                    ctrl.$scope.sfxVolume = data;
                    ctrl.audioPlayer.sfxAudio.volume = (ctrl.$scope.sfxVolume / 100);
                    ctrl.audioPlayer.sfxVolume = ctrl.$scope.sfxVolume;
                };
                HomeDrawController.prototype.killCurrentAudio = function (ctrl, data) {
                    ctrl.audioPlayer.stopBgMusic(true);
                    ctrl.audioPlayer.stopSfx();
                };
                HomeDrawController.prototype.mute = function () {
                    this.$scope.audioMute = true;
                };
                HomeDrawController.prototype.unmute = function () {
                    this.$scope.audioMute = false;
                };
                HomeDrawController.prototype.isAudioMuted = function () {
                    return this.$scope.audioMute;
                };
                HomeDrawController.$inject = [
                    '$scope',
                    '$filter',
                    '$log',
                    '$timeout',
                    '$attrs',
                    '$q',
                    '$location',
                    '$anchorScroll',
                    "$window",
                    'dataService',
                    'baseUrl',
                    'audioPlayer'
                ];
                return HomeDrawController;
            }());
            Draw.HomeDrawController = HomeDrawController;
        })(Draw = Home.Draw || (Home.Draw = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map