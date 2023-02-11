/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var ProgressBar;
        (function (ProgressBar) {
            "use strict";
            var HomeProgressBarController = /** @class */ (function () {
                function HomeProgressBarController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl, audioPlayer) {
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
                        'addProgress': this.addProgress,
                        'removeProgress': this.removeProgress,
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
                    this.socket = this.socketClient.createSocket(this.baseUrl);
                    this.$scope.progressBar = 0;
                    this.$scope.progressBarMax = 200;
                    this.$scope.progressAddRemove = 0;
                    this.$scope.audioMute = false;
                    this.$scope.bgVolume = 100;
                    this.$scope.sfxVolume = 100;
                }
                HomeProgressBarController.prototype.openRemote = function () {
                    window.open("/Home/Remote", "newwindow", "width=800,height=800,left=150,top=200,toolbar=0,status=0,");
                };
                HomeProgressBarController.prototype.addProgress = function (ctrl, data) {
                    ctrl.audioPlayer.playSFX(ctrl.audioPlayer.MoneyBar, ctrl.$scope.audioMute);
                    ctrl.$scope.progressBar += data;
                    ctrl.$scope.$applyAsync();
                };
                HomeProgressBarController.prototype.removeProgress = function (ctrl, data) {
                    ctrl.$scope.progressBar -= data;
                    ctrl.$scope.$applyAsync();
                };
                HomeProgressBarController.prototype.clearSegments = function (ctrl, data) {
                    $.each(ctrl.$scope.progressSegments, function (i, v) {
                        v.progressStatus = 1 /* ProgressStatus.Inactive */;
                    });
                    ctrl.$scope.$applyAsync();
                };
                HomeProgressBarController.prototype.setBGVolume = function (ctrl, data) {
                    ctrl.$scope.bgVolume = data;
                    ctrl.audioPlayer.bgAudio.volume = (ctrl.$scope.bgVolume / 100);
                    ctrl.audioPlayer.bgVolume = ctrl.$scope.bgVolume;
                };
                HomeProgressBarController.prototype.setSFXVolume = function (ctrl, data) {
                    ctrl.$scope.sfxVolume = data;
                    ctrl.audioPlayer.sfxAudio.volume = (ctrl.$scope.sfxVolume / 100);
                    ctrl.audioPlayer.sfxVolume = ctrl.$scope.sfxVolume;
                };
                HomeProgressBarController.prototype.killCurrentAudio = function (ctrl, data) {
                    ctrl.audioPlayer.stopBgMusic(true);
                    ctrl.audioPlayer.stopSfx();
                };
                HomeProgressBarController.prototype.mute = function () {
                    this.$scope.audioMute = true;
                };
                HomeProgressBarController.prototype.unmute = function () {
                    this.$scope.audioMute = false;
                };
                HomeProgressBarController.prototype.isAudioMuted = function () {
                    return this.$scope.audioMute;
                };
                HomeProgressBarController.$inject = [
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
                return HomeProgressBarController;
            }());
            ProgressBar.HomeProgressBarController = HomeProgressBarController;
        })(ProgressBar = Home.ProgressBar || (Home.ProgressBar = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map