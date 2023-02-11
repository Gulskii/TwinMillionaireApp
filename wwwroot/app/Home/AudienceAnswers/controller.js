/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var AudienceAnswers;
        (function (AudienceAnswers) {
            "use strict";
            var HomeAudienceAnswersController = /** @class */ (function () {
                function HomeAudienceAnswersController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl, audioPlayer) {
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
                        'showAudienceAnswersGraph': this.showAudienceAnswersGraph,
                        'hideAudienceAnswersGraph': this.hideAudienceAnswersGraph,
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
                }
                HomeAudienceAnswersController.prototype.openRemote = function () {
                    window.open("/Home/Remote", "newwindow", "width=800,height=800,left=150,top=200,toolbar=0,status=0,");
                };
                HomeAudienceAnswersController.prototype.playImpossible = function (fadeOut) {
                    var _this = this;
                    if (this.audioPlayer.bgAudio.src.indexOf(this.audioPlayer.Impossible.substring(2)) === -1) {
                        this.audioPlayer.stopBgMusic(fadeOut);
                        setTimeout(function () {
                            _this.audioPlayer.playBgMusic(_this.audioPlayer.Impossible, _this.$scope.audioMute);
                        }, 500);
                    }
                };
                HomeAudienceAnswersController.prototype.showAudienceAnswersGraph = function (ctrl) {
                    ctrl.dataService.getAudienceAnswers().then(function (results) {
                        ctrl.$scope.audienceAnswers = results;
                        //fake data, please remove
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 4 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 4 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 4 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 4 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 3 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 3 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 3 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 2 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 2 });
                        //ctrl.$scope.audienceAnswers.push({ userName: '1', answerChosen: 1 });
                        //ctrl.audioPlayer.stopBgMusic(true);
                        setTimeout(function () {
                            //ctrl.audioPlayer.playBgMusic(ctrl.audioPlayer.AudiencePollRevealMusic, ctrl.$scope.audioMute);
                            ctrl.$scope.$broadcast("showAudienceAnswersGraph");
                            //setTimeout(() => {
                            //ctrl.playImpossible(false);
                            //}, 5000);
                        }, 500);
                    });
                };
                HomeAudienceAnswersController.prototype.hideAudienceAnswersGraph = function (ctrl) {
                    ctrl.$scope.$broadcast("hideAudienceAnswersGraph");
                };
                HomeAudienceAnswersController.prototype.setBGVolume = function (ctrl, data) {
                    ctrl.$scope.bgVolume = data;
                    ctrl.audioPlayer.bgAudio.volume = (ctrl.$scope.bgVolume / 100);
                    ctrl.audioPlayer.bgVolume = ctrl.$scope.bgVolume;
                };
                HomeAudienceAnswersController.prototype.setSFXVolume = function (ctrl, data) {
                    ctrl.$scope.sfxVolume = data;
                    ctrl.audioPlayer.sfxAudio.volume = (ctrl.$scope.sfxVolume / 100);
                    ctrl.audioPlayer.sfxVolume = ctrl.$scope.sfxVolume;
                };
                HomeAudienceAnswersController.prototype.killCurrentAudio = function (ctrl, data) {
                    ctrl.audioPlayer.stopBgMusic(true);
                    ctrl.audioPlayer.stopSfx();
                };
                HomeAudienceAnswersController.prototype.mute = function () {
                    this.$scope.audioMute = true;
                };
                HomeAudienceAnswersController.prototype.unmute = function () {
                    this.$scope.audioMute = false;
                };
                HomeAudienceAnswersController.prototype.isAudioMuted = function () {
                    return this.$scope.audioMute;
                };
                HomeAudienceAnswersController.$inject = [
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
                return HomeAudienceAnswersController;
            }());
            AudienceAnswers.HomeAudienceAnswersController = HomeAudienceAnswersController;
        })(AudienceAnswers = Home.AudienceAnswers || (Home.AudienceAnswers = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map