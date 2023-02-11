/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Progress;
        (function (Progress) {
            "use strict";
            var HomeProgressController = /** @class */ (function () {
                function HomeProgressController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl, audioPlayer) {
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
                        'setCurrentSegment': this.setCurrentSegment,
                        'clearSegments': this.clearSegments,
                        'setBGVolume': this.setBGVolume,
                        'setSFXVolume': this.setSFXVolume,
                        'killCurrentAudio': this.killCurrentAudio,
                    };
                    this.revealCount = 0;
                    this.$scope.chosenQuestion = {};
                    this.socketClient = new App.WebSocketClient(this.magicWand, this);
                    this.$scope.accessToken = $("#accessToken").val();
                    this.$scope.ctrl = this;
                    var ctrl = this;
                    this.socket = this.socketClient.createSocket(this.baseUrl);
                    this.$scope.progressSegments = [];
                    this.numberOfQuestions = 20;
                    this.generateProgressSegments();
                    this.$scope.audioMute = false;
                    this.$scope.bgVolume = 100;
                    this.$scope.sfxVolume = 100;
                    this.lastSegment = 0;
                }
                HomeProgressController.prototype.generateProgressSegments = function () {
                    var count = 1;
                    this.$scope.progressSegments = [];
                    while (count <= this.numberOfQuestions) {
                        var ps = {
                            text: "Question " + count,
                            progressStatus: 1 /* ProgressStatus.Inactive */,
                            sequence: count,
                        };
                        this.$scope.progressSegments.unshift(ps);
                        count++;
                    }
                    this.$scope.progressSegments[this.numberOfQuestions - 1].progressStatus = 2 /* ProgressStatus.Current */;
                };
                HomeProgressController.prototype.openRemote = function () {
                    window.open("/Home/Remote", "newwindow", "width=800,height=800,left=150,top=200,toolbar=0,status=0,");
                };
                HomeProgressController.prototype.setCurrentSegment = function (ctrl, currentSegment) {
                    ctrl.audioPlayer.playSFX(ctrl.audioPlayer.Flutter, ctrl.$scope.audioMute);
                    var time = ((100 * ctrl.$scope.progressSegments.length) - (100 * ctrl.lastSegment));
                    $.each(ctrl.$scope.progressSegments, function (i, v) {
                        if (time > 0) {
                            time -= 100;
                        }
                        setTimeout(function () {
                            if (v.sequence < currentSegment)
                                v.progressStatus = 3 /* ProgressStatus.Pass */;
                            else if (v.sequence === currentSegment)
                                v.progressStatus = 2 /* ProgressStatus.Current */;
                            else
                                v.progressStatus = 1 /* ProgressStatus.Inactive */;
                            ctrl.$scope.$applyAsync();
                        }, time);
                    });
                    ctrl.lastSegment = currentSegment;
                };
                HomeProgressController.prototype.clearSegments = function (ctrl, data) {
                    $.each(ctrl.$scope.progressSegments, function (i, v) {
                        v.progressStatus = 1 /* ProgressStatus.Inactive */;
                    });
                    ctrl.$scope.$applyAsync();
                };
                HomeProgressController.prototype.setBGVolume = function (ctrl, data) {
                    ctrl.$scope.bgVolume = data;
                    ctrl.audioPlayer.bgAudio.volume = (ctrl.$scope.bgVolume / 100);
                    ctrl.audioPlayer.bgVolume = ctrl.$scope.bgVolume;
                };
                HomeProgressController.prototype.setSFXVolume = function (ctrl, data) {
                    ctrl.$scope.sfxVolume = data;
                    ctrl.audioPlayer.sfxAudio.volume = (ctrl.$scope.sfxVolume / 100);
                    ctrl.audioPlayer.sfxVolume = ctrl.$scope.sfxVolume;
                };
                HomeProgressController.prototype.killCurrentAudio = function (ctrl, data) {
                    ctrl.audioPlayer.stopBgMusic(true);
                    ctrl.audioPlayer.stopSfx();
                };
                HomeProgressController.prototype.mute = function () {
                    this.$scope.audioMute = true;
                };
                HomeProgressController.prototype.unmute = function () {
                    this.$scope.audioMute = false;
                };
                HomeProgressController.prototype.isAudioMuted = function () {
                    return this.$scope.audioMute;
                };
                HomeProgressController.$inject = [
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
                return HomeProgressController;
            }());
            Progress.HomeProgressController = HomeProgressController;
        })(Progress = Home.Progress || (Home.Progress = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map