/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
/// <reference path="../../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Remote;
        (function (Remote) {
            "use strict";
            var HomeRemoteController = /** @class */ (function () {
                function HomeRemoteController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl) {
                    var _this = this;
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
                    this.magicWand = {
                        'timeUp': this.timeUp
                    };
                    this.flipCount = 0;
                    this.$scope.chosenQuestion = {};
                    this.$scope.newQuestion = {};
                    var controller = this;
                    this.currentUri = $("#currentUrl").val();
                    this.$scope.accessToken = $("#accessToken").val();
                    this.currentTimerState = 1 /* TimerState.Clear */;
                    this.currentRoundState = 1 /* RoundState.Start */;
                    this.$scope.clockSetTime = 20;
                    this.$scope.progressAddRemove = 0;
                    this.$scope.currentProgressSegment = 0;
                    this.$scope.ctrl = this;
                    this.clearNewQuestion();
                    this.getQuestions();
                    this.dataService.getDifficultyLevelTypeEnum().then(function (results) {
                        _this.$scope.difficultyLevelTypes = results;
                    });
                    this.getAccessToken();
                    this.socketClient = new App.WebSocketClient(this.magicWand, this);
                    this.socket = this.socketClient.createSocket(this.baseUrl);
                }
                HomeRemoteController.prototype.getAccessToken = function () {
                    var _this = this;
                    var href = window.location.href.substring(this.currentUri.length + 3);
                    var parameters = href.split("&");
                    console.log(parameters);
                    parameters.forEach(function (p) {
                        var s = p.split("=");
                        if (s[0] === 'access_token') {
                            _this.accessToken = s[1];
                            _this.dataService.setAccessToken(_this.accessToken).then(function (results) {
                                window.location.href = _this.currentUri;
                            });
                        }
                    });
                };
                HomeRemoteController.prototype.isAccessTokenEmpty = function () {
                    return this.$scope.accessToken === "" || this.$scope.accessToken === null || this.$scope.accessToken === undefined;
                };
                HomeRemoteController.prototype.clearNewQuestion = function () {
                    this.$scope.newQuestion.questionContent = "";
                    this.$scope.newQuestion.firstAnswer = "";
                    this.$scope.newQuestion.secondAnswer = "";
                    this.$scope.newQuestion.thirdAnswer = "";
                    this.$scope.newQuestion.fourthAnswer = "";
                    this.$scope.newQuestion.correctAnswer = 1;
                    this.$scope.newQuestion.difficultyLevelTypeId = 1 /* DifficultyLevelType.Easy */;
                    this.$scope.newQuestion.hasBeenUsed = "false";
                };
                HomeRemoteController.prototype.questionHasBeenUsed = function (question) {
                    return question.hasBeenUsed === 'true';
                };
                HomeRemoteController.prototype.toggleHasBeenUsed = function (question) {
                    if (question.hasBeenUsed === 'false')
                        question.hasBeenUsed = 'true';
                    else
                        question.hasBeenUsed = 'false';
                };
                HomeRemoteController.prototype.getQuestions = function () {
                    var _this = this;
                    this.dataService.getQuestions().then(function (results) {
                        _this.$scope.questions = results;
                    });
                };
                HomeRemoteController.prototype.getAudienceLeaderboard = function () {
                    var _this = this;
                    this.dataService.getAudienceLeaderboard().then(function (results) {
                        _this.$scope.audienceLeaderboard = results;
                    });
                };
                HomeRemoteController.prototype.addQuestion = function (question) {
                    var _this = this;
                    this.dataService.addQuestion(question).then(function (results) {
                        _this.getQuestions();
                        _this.clearNewQuestion();
                    });
                };
                HomeRemoteController.prototype.editQuestion = function (question) {
                    var _this = this;
                    this.dataService.editQuestion(question).then(function (results) {
                        _this.getQuestions();
                    });
                };
                HomeRemoteController.prototype.deleteQuestion = function (question) {
                    var _this = this;
                    this.dataService.deleteQuestion(question.id).then(function (results) {
                        _this.getQuestions();
                    });
                };
                HomeRemoteController.prototype.startChatbot = function () {
                    this.dataService.startChatbot().then(function (results) {
                    });
                };
                HomeRemoteController.prototype.stopChatbot = function () {
                    this.dataService.stopChatbot().then(function (results) {
                    });
                };
                HomeRemoteController.prototype.sendMessageToChat = function () {
                    this.dataService.sendMessageToChat("This is a test from button click").then(function (results) {
                    });
                };
                HomeRemoteController.prototype.askForTwitchAccess = function () {
                    var chatbotClient = $("#chatbotClient").val();
                    var url = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=" + chatbotClient + "&redirect_uri=" + this.currentUri + "&scope=chat%3Aread+chat%3Aedit&state=c3ab8aa609ea11e793ae92361f002671";
                    console.log(url);
                    window.open(url, "_self");
                };
                HomeRemoteController.prototype.getRandomUnusedQuestionOfDifficulty = function (difficulty) {
                    var _this = this;
                    this.dataService.getRandomUnusedQuestionOfDifficulty(difficulty).then(function (results) {
                        console.log(results);
                        _this.setClock(difficulty);
                        if (results === null) {
                            alert("No question of this difficulty found!");
                        }
                        else {
                            _this.$scope.chosenQuestion = results;
                            var webSocketCall = _this.socketClient.createWebSocketCall("loadChosenQuestion", results);
                            _this.socket.send(JSON.stringify(webSocketCall));
                            _this.currentRoundState = 2 /* RoundState.QuestionReceived */;
                        }
                    });
                };
                HomeRemoteController.prototype.setClock = function (difficulty) {
                    switch (difficulty) {
                        case 1 /* DifficultyLevelType.Easy */:
                            this.$scope.clockSetTime = 30;
                            break;
                        case 2 /* DifficultyLevelType.Medium */:
                            this.$scope.clockSetTime = 35;
                            break;
                        case 3 /* DifficultyLevelType.Hard */:
                            this.$scope.clockSetTime = 45;
                            break;
                        case 4 /* DifficultyLevelType.VeryHard */:
                            this.$scope.clockSetTime = 60;
                            break;
                        case 5 /* DifficultyLevelType.Impossible */:
                            this.$scope.clockSetTime = 80;
                            break;
                    }
                };
                HomeRemoteController.prototype.acceptQuestion = function () {
                    var _this = this;
                    this.dataService.setQuestionAsUsed(this.$scope.chosenQuestion.id).then(function (results) {
                        _this.currentRoundState = 3 /* RoundState.QuestionAccepted */;
                        _this.getQuestions();
                        _this.flipCount = 0;
                    });
                };
                HomeRemoteController.prototype.showAcceptQuestion = function () {
                    return this.currentRoundState === 2 /* RoundState.QuestionReceived */;
                };
                HomeRemoteController.prototype.closeTakingAnswers = function () {
                    this.dataService.closeTakingAnswers();
                };
                HomeRemoteController.prototype.clearAudienceLeaderboard = function () {
                    var _this = this;
                    this.dataService.clearAudienceLeaderboard().then(function (results) {
                        _this.getAudienceLeaderboard();
                    });
                };
                HomeRemoteController.prototype.flipNextPanel = function () {
                    this.flipCount++;
                    if (this.flipCount === 5) {
                        this.currentRoundState = 4 /* RoundState.QuestionFullyRevealed */;
                        this.flipCount = 0;
                    }
                    var webSocketCall = this.socketClient.createWebSocketCall("flipNextPanel", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.showFlipNextPanel = function () {
                    return this.currentRoundState === 3 /* RoundState.QuestionAccepted */;
                };
                HomeRemoteController.prototype.confirmAnswer = function (answer) {
                    this.currentRoundState = 5 /* RoundState.AnswerChosen */;
                    this.clearClock();
                    var webSocketCall = this.socketClient.createWebSocketCall("confirmAnswer", answer);
                    this.socket.send(JSON.stringify(webSocketCall));
                    this.dataService.closeTakingAnswers();
                };
                HomeRemoteController.prototype.timeUp = function (ctrl, data) {
                    ctrl.currentRoundState = 5 /* RoundState.AnswerChosen */;
                    ctrl.clearClock();
                    var webSocketCall = ctrl.socketClient.createWebSocketCall("confirmAnswer", null);
                    ctrl.socket.send(JSON.stringify(webSocketCall));
                    ctrl.dataService.closeTakingAnswers();
                };
                HomeRemoteController.prototype.revealCorrectAnswer = function () {
                    this.currentRoundState = 1 /* RoundState.Start */;
                    var webSocketCall = this.socketClient.createWebSocketCall("revealCorrectAnswer", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.showConfirmAnswer = function () {
                    return this.currentRoundState === 4 /* RoundState.QuestionFullyRevealed */ || this.currentRoundState === 5 /* RoundState.AnswerChosen */;
                };
                HomeRemoteController.prototype.showRevealAnswer = function () {
                    return this.currentRoundState === 5 /* RoundState.AnswerChosen */;
                };
                HomeRemoteController.prototype.startClock = function () {
                    this.currentTimerState = 2 /* TimerState.Started */;
                    var webSocketCall = this.socketClient.createWebSocketCall("startClock", this.$scope.clockSetTime);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.stopClock = function () {
                    this.currentTimerState = 3 /* TimerState.Stopped */;
                    var webSocketCall = this.socketClient.createWebSocketCall("stopClock", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.resumeClock = function () {
                    this.currentTimerState = 2 /* TimerState.Started */;
                    var webSocketCall = this.socketClient.createWebSocketCall("resumeClock", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.clearClock = function () {
                    console.log("clearClock");
                    this.currentTimerState = 1 /* TimerState.Clear */;
                    var webSocketCall = this.socketClient.createWebSocketCall("clearClock", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.showClockFunctions = function () {
                    return this.currentRoundState === 4 /* RoundState.QuestionFullyRevealed */;
                };
                HomeRemoteController.prototype.showStartClock = function () {
                    return this.currentTimerState === 1 /* TimerState.Clear */;
                };
                HomeRemoteController.prototype.showResumeClock = function () {
                    return this.currentTimerState === 3 /* TimerState.Stopped */;
                };
                HomeRemoteController.prototype.showStopClock = function () {
                    return this.currentTimerState === 2 /* TimerState.Started */;
                };
                HomeRemoteController.prototype.showClearClock = function () {
                    return this.currentTimerState === 2 /* TimerState.Started */ || this.currentTimerState === 3 /* TimerState.Stopped */;
                };
                HomeRemoteController.prototype.showAudienceAnswersGraph = function () {
                    var webSocketCall = this.socketClient.createWebSocketCall("showAudienceAnswersGraph", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.hideAudienceAnswersGraph = function () {
                    var webSocketCall = this.socketClient.createWebSocketCall("hideAudienceAnswersGraph", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                };
                HomeRemoteController.prototype.addProgress = function () {
                    var webSocketCall = this.socketClient.createWebSocketCall("addProgress", this.$scope.progressAddRemove);
                    this.socket.send(JSON.stringify(webSocketCall));
                    this.$scope.progressAddRemove = 0;
                };
                HomeRemoteController.prototype.removeProgress = function () {
                    var webSocketCall = this.socketClient.createWebSocketCall("removeProgress", this.$scope.progressAddRemove);
                    this.socket.send(JSON.stringify(webSocketCall));
                    this.$scope.progressAddRemove = 0;
                };
                HomeRemoteController.prototype.setCurrentSegment = function () {
                    var webSocketCall = this.socketClient.createWebSocketCall("setCurrentSegment", this.$scope.currentProgressSegment);
                    this.socket.send(JSON.stringify(webSocketCall));
                    this.$scope.progressAddRemove = 0;
                };
                HomeRemoteController.prototype.clearSegments = function () {
                    var webSocketCall = this.socketClient.createWebSocketCall("clearSegments", null);
                    this.socket.send(JSON.stringify(webSocketCall));
                    this.$scope.progressAddRemove = 0;
                };
                HomeRemoteController.$inject = [
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
                    'baseUrl'
                ];
                return HomeRemoteController;
            }());
            Remote.HomeRemoteController = HomeRemoteController;
        })(Remote = Home.Remote || (Home.Remote = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map