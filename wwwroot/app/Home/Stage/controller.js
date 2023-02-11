/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Stage;
        (function (Stage) {
            "use strict";
            var HomeStageController = /** @class */ (function () {
                function HomeStageController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl, audioPlayer) {
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
                        'loadChosenQuestion': this.loadChosenQuestion,
                        'flipNextPanel': this.flipNextPanel,
                        'acceptQuestion': this.acceptQuestion,
                        'confirmAnswer': this.confirmAnswer,
                        'revealCorrectAnswer': this.revealCorrectAnswer,
                        'startClock': this.startClock,
                        'stopClock': this.stopClock,
                        'resumeClock': this.resumeClock,
                        'clearClock': this.clearClock,
                        'setBGVolume': this.setBGVolume,
                        'setSFXVolume': this.setSFXVolume,
                        'killCurrentAudio': this.killCurrentAudio,
                        'showAudienceAnswersGraph': this.showAudienceAnswersGraph,
                    };
                    this.revealCount = 0;
                    this.$scope.chosenQuestion = {};
                    this.socketClient = new App.WebSocketClient(this.magicWand, this);
                    this.$scope.accessToken = $("#accessToken").val();
                    this.$scope.ctrl = this;
                    var ctrl = this;
                    this.$scope.showIcon = true;
                    this.socket = this.socketClient.createSocket(this.baseUrl);
                    this.timer = new App.Timer(this.$q, "timer", "timerOutline");
                    this.$scope.answers = [];
                    this.initialDisplayQuestion();
                    this.initialAnswers();
                    this.$scope.audioMute = false;
                    this.$scope.bgVolume = 100;
                    this.$scope.sfxVolume = 100;
                    this.clockStopped = false;
                }
                HomeStageController.prototype.initialDisplayQuestion = function () {
                    this.$scope.displayQuestion = {
                        text: "This is a super long question for twin to test the multi line system I am expecting a second line to pop up and then a third after this one to round it up",
                        flipped: false,
                        showQuestionText: false
                    };
                };
                HomeStageController.prototype.initialAnswers = function () {
                    this.$scope.answers = [
                        {
                            text: "The Emancipation Proclamation",
                            flipped: false,
                            answerStatus: 1 /* AnswerStatus.Normal */,
                            sequence: 1,
                            showAnswerText: false
                        },
                        {
                            text: "Answer 2",
                            flipped: false,
                            answerStatus: 1 /* AnswerStatus.Normal */,
                            sequence: 2,
                            showAnswerText: false
                        },
                        {
                            text: "Answer 3",
                            flipped: false,
                            answerStatus: 1 /* AnswerStatus.Normal */,
                            sequence: 3,
                            showAnswerText: false
                        },
                        {
                            text: "Answer 4",
                            flipped: false,
                            answerStatus: 1 /* AnswerStatus.Normal */,
                            sequence: 4,
                            showAnswerText: false
                        }
                    ];
                };
                HomeStageController.prototype.openRemote = function () {
                    window.open("/Home/Remote", "newwindow", "width=800,height=800,left=150,top=200,toolbar=0,status=0,");
                };
                HomeStageController.prototype.loadChosenQuestion = function (ctrl, data) {
                    ctrl.hideAllPanels();
                    ctrl.$scope.showIcon = true;
                    setTimeout(function () {
                        ctrl.clearClock(ctrl, null);
                        ctrl.$scope.chosenQuestion = data;
                        ctrl.writeQuestion(data.questionContent);
                        ctrl.writeAnswer(data.firstAnswer, 0);
                        ctrl.writeAnswer(data.secondAnswer, 1);
                        ctrl.writeAnswer(data.thirdAnswer, 2);
                        ctrl.writeAnswer(data.fourthAnswer, 3);
                        ctrl.$scope.$applyAsync();
                    }, 500);
                };
                HomeStageController.prototype.acceptQuestion = function (ctrl, data) {
                    ctrl.answerLocked = false;
                    ctrl.clockStopped = false;
                    ctrl.playQuestionMusic(data);
                };
                HomeStageController.prototype.playQuestionMusic = function (question) {
                    var _this = this;
                    var sound = null;
                    switch (question.difficultyLevelTypeId) {
                        case 1 /* DifficultyLevelType.Easy */:
                            sound = this.audioPlayer.Easy;
                            this.audioPlayer.stopBgMusic(true);
                            setTimeout(function () {
                                _this.audioPlayer.playBgMusic(sound, _this.$scope.audioMute);
                            }, 500);
                            break;
                        case 2 /* DifficultyLevelType.Medium */:
                        case 3 /* DifficultyLevelType.Hard */:
                            sound = this.audioPlayer.MediumHard;
                            this.audioPlayer.stopBgMusic(true);
                            setTimeout(function () {
                                _this.audioPlayer.playBgMusic(sound, _this.$scope.audioMute);
                            }, 500);
                            break;
                        case 4 /* DifficultyLevelType.VeryHard */:
                            sound = this.audioPlayer.VeryHard;
                            this.audioPlayer.stopBgMusic(true);
                            setTimeout(function () {
                                _this.audioPlayer.playBgMusic(sound, _this.$scope.audioMute);
                            }, 500);
                            break;
                        case 5 /* DifficultyLevelType.Impossible */:
                            this.playImpossible(true);
                            break;
                    }
                };
                HomeStageController.prototype.flipNextPanel = function (ctrl, data) {
                    switch (ctrl.revealCount) {
                        case 0:
                            ctrl.$scope.displayQuestion.flipped = !ctrl.$scope.displayQuestion.flipped;
                            break;
                        case 1:
                            ctrl.$scope.answers[0].flipped = !ctrl.$scope.answers[0].flipped;
                            break;
                        case 2:
                            ctrl.$scope.answers[1].flipped = !ctrl.$scope.answers[1].flipped;
                            break;
                        case 3:
                            ctrl.$scope.answers[2].flipped = !ctrl.$scope.answers[2].flipped;
                            break;
                        case 4:
                            ctrl.$scope.answers[3].flipped = !ctrl.$scope.answers[3].flipped;
                            break;
                    }
                    if (ctrl.revealCount === 4)
                        ctrl.revealCount = 0;
                    else
                        ctrl.revealCount++;
                    ctrl.$scope.$applyAsync();
                };
                HomeStageController.prototype.confirmAnswer = function (ctrl, data) {
                    ctrl.playerChoice = data;
                    ctrl.changeAllAnswerColors();
                    ctrl.playImpossible(true);
                    if (data != null) {
                        ctrl.$scope.answers[data - 1].answerStatus = 4 /* AnswerStatus.Guess */;
                        this.answerLocked = true;
                    }
                    ctrl.$scope.showIcon = true;
                    ctrl.$scope.$applyAsync();
                    ctrl.timer.clearTimer();
                };
                HomeStageController.prototype.revealAnswer = function (ctrl, data) {
                    ctrl.changeAllAnswerColors();
                    var isCorrect = (ctrl.playerChoice === ctrl.$scope.chosenQuestion.correctAnswer);
                    if (isCorrect) {
                        ctrl.$scope.answers[ctrl.playerChoice - 1].answerStatus = 2 /* AnswerStatus.Correct */;
                        ctrl.audioPlayer.stopBgMusic(false);
                        ctrl.audioPlayer.playSFX(ctrl.audioPlayer.CorrectAnswer, ctrl.$scope.audioMute);
                    }
                    else {
                        if (ctrl.playerChoice !== null)
                            ctrl.$scope.answers[ctrl.playerChoice - 1].answerStatus = 3 /* AnswerStatus.Incorrect */;
                        ctrl.$scope.answers[ctrl.$scope.chosenQuestion.correctAnswer - 1].answerStatus = 5 /* AnswerStatus.Actual */;
                        ctrl.audioPlayer.stopBgMusic(false);
                        ctrl.audioPlayer.playSFX(ctrl.audioPlayer.WrongAnswer, ctrl.$scope.audioMute);
                    }
                    ctrl.audioPlayer.bgAudio.src = "";
                    ctrl.$scope.$applyAsync();
                };
                HomeStageController.prototype.hideAllPanels = function () {
                    this.revealCount = 0;
                    this.$scope.displayQuestion.flipped = false;
                    $.each(this.$scope.answers, function (i, v) {
                        v.flipped = false;
                    });
                    this.$scope.$applyAsync();
                };
                HomeStageController.prototype.changeAllAnswerColors = function () {
                    $.each(this.$scope.answers, function (i, v) {
                        v.answerStatus = 1 /* AnswerStatus.Normal */;
                    });
                    this.$scope.$applyAsync();
                };
                HomeStageController.prototype.revealCorrectAnswer = function (ctrl, data) {
                    ctrl.revealAnswer(ctrl, data);
                };
                HomeStageController.prototype.startClock = function (ctrl, data) {
                    ctrl.$scope.showIcon = false;
                    if (ctrl.clockStopped) {
                        setTimeout(function () {
                            ctrl.playQuestionMusic(ctrl.$scope.chosenQuestion);
                        }, 500);
                    }
                    ctrl.timer.startTimer(data).then(function (result) {
                        if (result === true) {
                            var webSocketCall = ctrl.socketClient.createWebSocketCall("timeUp", null);
                            ctrl.socket.send(JSON.stringify(webSocketCall));
                            ctrl.$scope.showIcon = true;
                            ctrl.$scope.$applyAsync();
                            ctrl.audioPlayer.stopBgMusic(false);
                            ctrl.audioPlayer.playSFX(ctrl.audioPlayer.ClockRunsOut, ctrl.$scope.audioMute);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                    ctrl.$scope.$applyAsync();
                };
                HomeStageController.prototype.resumeClock = function (ctrl, data) {
                    ctrl.timer.resumeTimer();
                    setTimeout(function () {
                        ctrl.playQuestionMusic(ctrl.$scope.chosenQuestion);
                    }, 500);
                };
                HomeStageController.prototype.stopClock = function (ctrl, data) {
                    ctrl.timer.stopTimer();
                    ctrl.clockStopped = true;
                    ctrl.playImpossible(true);
                };
                HomeStageController.prototype.playImpossible = function (fadeOut) {
                    var _this = this;
                    if (this.audioPlayer.bgAudio.src.indexOf(this.audioPlayer.Impossible.substring(2)) === -1) {
                        this.audioPlayer.stopBgMusic(fadeOut);
                        setTimeout(function () {
                            _this.audioPlayer.playBgMusic(_this.audioPlayer.Impossible, _this.$scope.audioMute);
                        }, 500);
                    }
                };
                HomeStageController.prototype.showAudienceAnswersGraph = function (ctrl) {
                    ctrl.audioPlayer.stopBgMusic(true);
                    setTimeout(function () {
                        ctrl.audioPlayer.playBgMusic(ctrl.audioPlayer.AudiencePollRevealMusic, ctrl.$scope.audioMute);
                        setTimeout(function () {
                            ctrl.playImpossible(false);
                        }, 5000);
                    }, 500);
                };
                HomeStageController.prototype.clearClock = function (ctrl, data) {
                    ctrl.timer.clearTimer();
                };
                HomeStageController.prototype.writeQuestion = function (question) {
                    this.$scope.displayQuestion.text = question;
                };
                HomeStageController.prototype.writeAnswer = function (answer, index) {
                    this.$scope.answers[index].text = answer;
                    this.$scope.answers[index].answerStatus = 1 /* AnswerStatus.Normal */;
                };
                HomeStageController.prototype.setBGVolume = function (ctrl, data) {
                    ctrl.$scope.bgVolume = data;
                    ctrl.audioPlayer.bgAudio.volume = (ctrl.$scope.bgVolume / 100);
                    ctrl.audioPlayer.bgVolume = ctrl.$scope.bgVolume;
                };
                HomeStageController.prototype.setSFXVolume = function (ctrl, data) {
                    ctrl.$scope.sfxVolume = data;
                    ctrl.audioPlayer.sfxAudio.volume = (ctrl.$scope.sfxVolume / 100);
                    ctrl.audioPlayer.sfxVolume = ctrl.$scope.sfxVolume;
                };
                HomeStageController.prototype.killCurrentAudio = function (ctrl, data) {
                    ctrl.audioPlayer.stopBgMusic(true);
                    ctrl.audioPlayer.stopSfx();
                };
                HomeStageController.prototype.mute = function () {
                    this.$scope.audioMute = true;
                };
                HomeStageController.prototype.unmute = function () {
                    this.$scope.audioMute = false;
                };
                HomeStageController.prototype.isAudioMuted = function () {
                    return this.$scope.audioMute;
                };
                HomeStageController.$inject = [
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
                return HomeStageController;
            }());
            Stage.HomeStageController = HomeStageController;
        })(Stage = Home.Stage || (Home.Stage = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map