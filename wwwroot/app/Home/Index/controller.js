/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Index;
        (function (Index) {
            "use strict";
            var HomeIndexController = /** @class */ (function () {
                function HomeIndexController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl, audioPlayer) {
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
                        'showAudienceAnswersGraph': this.showAudienceAnswersGraph,
                        'hideAudienceAnswersGraph': this.hideAudienceAnswersGraph,
                        'addProgress': this.addProgress,
                        'removeProgress': this.removeProgress,
                        'setCurrentSegment': this.setCurrentSegment,
                        'clearSegments': this.clearSegments,
                        'setBGVolume': this.setBGVolume,
                        'setSFXVolume': this.setSFXVolume,
                    };
                    this.revealCount = 0;
                    this.$scope.chosenQuestion = {};
                    this.$scope.audienceAnswers = [];
                    this.socketClient = new App.WebSocketClient(this.magicWand, this);
                    this.$scope.accessToken = $("#accessToken").val();
                    this.$scope.ctrl = this;
                    var ctrl = this;
                    this.showAudienceAnswers = false;
                    this.audienceAnswersGraph = null;
                    this.$scope.showIcon = true;
                    this.socket = this.socketClient.createSocket(this.baseUrl);
                    this.timer = new App.Timer(this.$q, "timer", "timerOutline");
                    this.$scope.progressSegments = [];
                    this.$scope.answers = [];
                    this.initialDisplayQuestion();
                    this.initialAnswers();
                    this.$scope.progressBar = 0;
                    this.$scope.progressBarMax = 200;
                    this.$scope.progressAddRemove = 0;
                    this.numberOfQuestions = 20;
                    this.generateProgressSegments();
                    this.$scope.audioMute = false;
                    this.$scope.bgVolume = 100;
                    this.$scope.sfxVolume = 100;
                    this.lastSegment = 0;
                    this.clockStopped = false;
                }
                HomeIndexController.prototype.initialDisplayQuestion = function () {
                    this.$scope.displayQuestion = {
                        text: "This is a super long question for twin to test the multi line system I am expecting a second line to pop up and then a third after this one to round it up",
                        flipped: false,
                        showQuestionText: false
                    };
                };
                HomeIndexController.prototype.initialAnswers = function () {
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
                HomeIndexController.prototype.generateProgressSegments = function () {
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
                HomeIndexController.prototype.openRemote = function () {
                    window.open("/Home/Remote", "newwindow", "width=800,height=800,left=150,top=200,toolbar=0,status=0,");
                };
                HomeIndexController.prototype.loadChosenQuestion = function (ctrl, data) {
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
                HomeIndexController.prototype.acceptQuestion = function (ctrl, data) {
                    ctrl.answerLocked = false;
                    ctrl.clockStopped = false;
                    ctrl.playQuestionMusic(data);
                };
                HomeIndexController.prototype.playQuestionMusic = function (question) {
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
                HomeIndexController.prototype.flipNextPanel = function (ctrl, data) {
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
                HomeIndexController.prototype.confirmAnswer = function (ctrl, data) {
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
                HomeIndexController.prototype.revealAnswer = function (ctrl, data) {
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
                HomeIndexController.prototype.hideAllPanels = function () {
                    this.revealCount = 0;
                    this.$scope.displayQuestion.flipped = false;
                    $.each(this.$scope.answers, function (i, v) {
                        v.flipped = false;
                    });
                    this.$scope.$applyAsync();
                };
                HomeIndexController.prototype.changeAllAnswerColors = function () {
                    $.each(this.$scope.answers, function (i, v) {
                        v.answerStatus = 1 /* AnswerStatus.Normal */;
                    });
                    this.$scope.$applyAsync();
                };
                HomeIndexController.prototype.revealCorrectAnswer = function (ctrl, data) {
                    ctrl.revealAnswer(ctrl, data);
                };
                HomeIndexController.prototype.startClock = function (ctrl, data) {
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
                HomeIndexController.prototype.resumeClock = function (ctrl, data) {
                    ctrl.timer.resumeTimer();
                    setTimeout(function () {
                        ctrl.playQuestionMusic(ctrl.$scope.chosenQuestion);
                    }, 500);
                };
                HomeIndexController.prototype.stopClock = function (ctrl, data) {
                    ctrl.timer.stopTimer();
                    ctrl.clockStopped = true;
                    ctrl.playImpossible(true);
                };
                HomeIndexController.prototype.playImpossible = function (fadeOut) {
                    var _this = this;
                    if (this.audioPlayer.bgAudio.src.indexOf(this.audioPlayer.Impossible.substring(2)) === -1) {
                        this.audioPlayer.stopBgMusic(fadeOut);
                        setTimeout(function () {
                            _this.audioPlayer.playBgMusic(_this.audioPlayer.Impossible, _this.$scope.audioMute);
                        }, 500);
                    }
                };
                HomeIndexController.prototype.clearClock = function (ctrl, data) {
                    ctrl.timer.clearTimer();
                };
                HomeIndexController.prototype.showAudienceAnswersGraph = function (ctrl) {
                    ctrl.dataService.getAudienceAnswers().then(function (results) {
                        ctrl.$scope.audienceAnswers = results;
                        ctrl.audioPlayer.stopBgMusic(false);
                        ctrl.audioPlayer.playBgMusic(ctrl.audioPlayer.AudiencePollRevealMusic, ctrl.$scope.audioMute);
                        setTimeout(function () {
                            ctrl.createAudienceAnswersGraph();
                            ctrl.showAudienceAnswers = true;
                            ctrl.$scope.$applyAsync();
                        }, 3920);
                        setTimeout(function () {
                            ctrl.playImpossible(false);
                        }, 5000);
                    });
                };
                HomeIndexController.prototype.hideAudienceAnswersGraph = function (ctrl, data) {
                    ctrl.showAudienceAnswers = false;
                    ctrl.$scope.$applyAsync();
                };
                HomeIndexController.prototype.displayAudienceAnswers = function () {
                    return this.showAudienceAnswers;
                };
                HomeIndexController.prototype.getAudienceLeaderboard = function () {
                    var _this = this;
                    this.dataService.getAudienceLeaderboard().then(function (results) {
                        _this.$scope.audienceLeaderboard = results;
                    });
                };
                HomeIndexController.prototype.createAudienceAnswersGraph = function () {
                    var canvas = document.getElementById("audienceAnswersGraph");
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    //fake data, please remove
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 1 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 1 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 1 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 1 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 2 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 2 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 2 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 3 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 3 });
                    this.$scope.audienceAnswers.push({ userName: '1', answerChosen: 4 });
                    var a = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 1; }).length;
                    var b = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 2; }).length;
                    var c = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 3; }).length;
                    var d = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 4; }).length;
                    var total = a + b + c + d;
                    canvas.style.backgroundColor = 'limegreen';
                    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
                    grd.addColorStop(0, App.TwinLifeline1);
                    grd.addColorStop(.33, App.TwinLifeline2);
                    grd.addColorStop(.66, App.TwinLifeline3);
                    grd.addColorStop(1, App.TwinLifeline4);
                    ctx.fillStyle = grd;
                    if (this.audienceAnswersGraph !== null)
                        this.audienceAnswersGraph.destroy();
                    this.audienceAnswersGraph = new Chart(canvas, {
                        type: 'bar',
                        data: {
                            labels: ['A', 'B', 'C', 'D'],
                            datasets: [{
                                    label: '# of Votes',
                                    data: [a, b, c, d],
                                    borderWidth: 1,
                                    backgroundColor: grd
                                }]
                        },
                        options: {
                            responsive: false,
                            animation: {
                                easing: "easeInCubic"
                            },
                            maintainAspectRatio: false,
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                        gridLines: {
                                            display: false
                                        },
                                        ticks: {
                                            fontSize: 24,
                                            fontFamily: App.TwinFont,
                                            fontColor: "white"
                                        }
                                    }],
                                yAxes: [{
                                        gridLines: {
                                            display: false
                                        },
                                        ticks: {
                                            beginAtZero: true,
                                            display: false
                                        }
                                    }]
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                                        return label;
                                    }
                                }
                            }
                        }
                    });
                };
                HomeIndexController.prototype.writeQuestion = function (question) {
                    this.$scope.displayQuestion.text = question;
                };
                HomeIndexController.prototype.writeAnswer = function (answer, index) {
                    this.$scope.answers[index].text = answer;
                    this.$scope.answers[index].answerStatus = 1 /* AnswerStatus.Normal */;
                };
                HomeIndexController.prototype.addProgress = function (ctrl, data) {
                    ctrl.audioPlayer.playSFX(ctrl.audioPlayer.MoneyBar, ctrl.$scope.audioMute);
                    ctrl.$scope.progressBar += data;
                    ctrl.$scope.$applyAsync();
                };
                HomeIndexController.prototype.removeProgress = function (ctrl, data) {
                    ctrl.$scope.progressBar -= data;
                    ctrl.$scope.$applyAsync();
                };
                HomeIndexController.prototype.setCurrentSegment = function (ctrl, currentSegment) {
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
                HomeIndexController.prototype.clearSegments = function (ctrl, data) {
                    $.each(ctrl.$scope.progressSegments, function (i, v) {
                        v.progressStatus = 1 /* ProgressStatus.Inactive */;
                    });
                    ctrl.$scope.$applyAsync();
                };
                HomeIndexController.prototype.setBGVolume = function (ctrl, data) {
                    ctrl.$scope.bgVolume = data;
                    ctrl.audioPlayer.bgAudio.volume = (ctrl.$scope.bgVolume / 100);
                    ctrl.audioPlayer.bgVolume = ctrl.$scope.bgVolume;
                };
                HomeIndexController.prototype.setSFXVolume = function (ctrl, data) {
                    ctrl.$scope.sfxVolume = data;
                    ctrl.audioPlayer.sfxAudio.volume = (ctrl.$scope.sfxVolume / 100);
                    ctrl.audioPlayer.sfxVolume = ctrl.$scope.sfxVolume;
                };
                HomeIndexController.prototype.mute = function () {
                    this.$scope.audioMute = true;
                };
                HomeIndexController.prototype.unmute = function () {
                    this.$scope.audioMute = false;
                };
                HomeIndexController.prototype.isAudioMuted = function () {
                    return this.$scope.audioMute;
                };
                HomeIndexController.$inject = [
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
                return HomeIndexController;
            }());
            Index.HomeIndexController = HomeIndexController;
        })(Index = Home.Index || (Home.Index = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map