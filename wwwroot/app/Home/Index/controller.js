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
                function HomeIndexController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window, dataService, baseUrl) {
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
                        'loadChosenQuestion': this.loadChosenQuestion,
                        'flipNextPanel': this.flipNextPanel,
                        'confirmAnswer': this.confirmAnswer,
                        'revealCorrectAnswer': this.revealCorrectAnswer,
                        'startClock': this.startClock,
                        'stopClock': this.stopClock,
                        'resumeClock': this.resumeClock,
                        'clearClock': this.clearClock,
                        'showAudienceAnswersGraph': this.showAudienceAnswersGraph,
                        'hideAudienceAnswersGraph': this.hideAudienceAnswersGraph
                    };
                    this.revealCount = 0;
                    this.$scope.chosenQuestion = {};
                    this.$scope.audienceAnswers = [];
                    this.socketClient = new App.WebSocketClient(this.magicWand, this);
                    $("#QuestionFlipped").val("false");
                    $("#AnswerAFlipped").val("false");
                    $("#AnswerBFlipped").val("false");
                    $("#AnswerCFlipped").val("false");
                    $("#AnswerDFlipped").val("false");
                    this.$scope.accessToken = $("#accessToken").val();
                    this.$scope.ctrl = this;
                    var ctrl = this;
                    this.showAudienceAnswers = false;
                    this.audienceAnswersGraph = null;
                    this.socket = this.socketClient.createSocket(this.baseUrl);
                    this.drawInitialQuestion("Question");
                    $timeout(function () {
                        ctrl.drawAnswers();
                    }, 500);
                    this.timer = new App.Timer(this.$q, "timer", "timerOutline");
                    this.$scope.progressSegments = [];
                    this.$scope.progressBar = 0;
                    this.$scope.progressBarMax = 200;
                    this.$scope.progressAddRemove = 0;
                    this.numberOfQuestions = 20;
                    this.generateProgressSegments();
                }
                HomeIndexController.prototype.generateProgressSegments = function () {
                    var count = 1;
                    this.$scope.progressSegments = [];
                    while (count <= this.numberOfQuestions) {
                        var ps = {
                            text: "Question " + count,
                            progressStatus: 1 /* ProgressStatus.Inactive */
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
                    console.log("loadChosenQuestion");
                    console.log(data);
                    ctrl.hideAllPanels();
                    setTimeout(function () {
                        ctrl.$scope.chosenQuestion = data;
                        ctrl.writeQuestion("Question", data.questionContent);
                        ctrl.writeAnswer("AnswerA", data.firstAnswer);
                        ctrl.writeAnswer("AnswerB", data.secondAnswer);
                        ctrl.writeAnswer("AnswerC", data.thirdAnswer);
                        ctrl.writeAnswer("AnswerD", data.fourthAnswer);
                    }, 500);
                };
                HomeIndexController.prototype.revealQuestionText = function (ctrl, data) {
                    console.log("revealQuestionText");
                };
                HomeIndexController.prototype.flipNextPanel = function (ctrl, data) {
                    switch (ctrl.revealCount) {
                        case 0:
                            ctrl.flip("Question", false);
                            break;
                        case 1:
                            ctrl.flip("AnswerA", true);
                            break;
                        case 2:
                            ctrl.flip("AnswerB", true);
                            break;
                        case 3:
                            ctrl.flip("AnswerC", true);
                            break;
                        case 4:
                            ctrl.flip("AnswerD", true);
                            break;
                    }
                    if (ctrl.revealCount === 4)
                        ctrl.revealCount = 0;
                    else
                        ctrl.revealCount++;
                    console.log("flipNextPanel");
                };
                HomeIndexController.prototype.confirmAnswer = function (ctrl, data) {
                    console.log("confirmAnswer" + data);
                    ctrl.playerChoice = data;
                    ctrl.changeAllAnswerColors();
                    switch (data) {
                        case 1: {
                            ctrl.changeAnswerColors("AnswerA", App.TwinTeal);
                            break;
                        }
                        case 2: {
                            ctrl.changeAnswerColors("AnswerB", App.TwinTeal);
                            break;
                        }
                        case 3: {
                            ctrl.changeAnswerColors("AnswerC", App.TwinTeal);
                            break;
                        }
                        case 4: {
                            ctrl.changeAnswerColors("AnswerD", App.TwinTeal);
                            break;
                        }
                        default:
                            break;
                    }
                    ctrl.timer.clearTimer();
                };
                HomeIndexController.prototype.revealAnswer = function (ctrl, data) {
                    console.log("revealAnswer" + data);
                    ctrl.changeAllAnswerColors();
                    var isCorrect = (ctrl.playerChoice === ctrl.$scope.chosenQuestion.correctAnswer);
                    var color = App.TwinTeal;
                    if (isCorrect) {
                        color = App.TwinGreen;
                    }
                    switch (ctrl.$scope.chosenQuestion.correctAnswer) {
                        case 1: {
                            ctrl.turnOnCorrectAnswerLoop("AnswerA", color, isCorrect);
                            break;
                        }
                        case 2: {
                            ctrl.turnOnCorrectAnswerLoop("AnswerB", color, isCorrect);
                            break;
                        }
                        case 3: {
                            ctrl.turnOnCorrectAnswerLoop("AnswerC", color, isCorrect);
                            break;
                        }
                        case 4: {
                            ctrl.turnOnCorrectAnswerLoop("AnswerD", color, isCorrect);
                            break;
                        }
                        default:
                            break;
                    }
                    if (!isCorrect) {
                        switch (ctrl.playerChoice) {
                            case 1: {
                                ctrl.changeAnswerColors("AnswerA", App.TwinRed);
                                break;
                            }
                            case 2: {
                                ctrl.changeAnswerColors("AnswerB", App.TwinRed);
                                break;
                            }
                            case 3: {
                                ctrl.changeAnswerColors("AnswerC", App.TwinRed);
                                break;
                            }
                            case 4: {
                                ctrl.changeAnswerColors("AnswerD", App.TwinRed);
                                break;
                            }
                            default:
                                break;
                        }
                    }
                };
                HomeIndexController.prototype.hideAllPanels = function () {
                    this.flipAllPanelsBack();
                    this.changeAllAnswerColors();
                    this.revealCount = 0;
                };
                HomeIndexController.prototype.flipAllPanelsBack = function () {
                    $("#QuestionFlipped").val("true");
                    $("#AnswerAFlipped").val("true");
                    $("#AnswerBFlipped").val("true");
                    $("#AnswerCFlipped").val("true");
                    $("#AnswerDFlipped").val("true");
                    this.flip("Question", false);
                    this.flip("AnswerA", true);
                    this.flip("AnswerB", true);
                    this.flip("AnswerC", true);
                    this.flip("AnswerD", true);
                };
                HomeIndexController.prototype.changeAnswerColors = function (identity, color) {
                    document.getElementById(identity + "Card").style.backgroundColor = color;
                };
                HomeIndexController.prototype.turnOnCorrectAnswerLoop = function (identity, color, isCorrect) {
                    if (!isCorrect) {
                        var el = $("#" + identity + "Card");
                        el.before(el.clone(true)).remove();
                        this.drawAnwserCardFront(identity, false);
                        document.getElementById(identity + "Card").style.backgroundColor = App.TwinTeal;
                        document.getElementById(identity + "Card").style.animation = "blink 250ms";
                        document.getElementById(identity + "Card").style.animationDelay = "0ms";
                        document.getElementById(identity + "Card").style.animationIterationCount = "6";
                    }
                    else {
                        this.changeAnswerColors(identity, color);
                    }
                };
                HomeIndexController.prototype.changeAllAnswerColors = function () {
                    this.changeAnswerColors("AnswerA", App.TwinGold);
                    this.changeAnswerColors("AnswerB", App.TwinGold);
                    this.changeAnswerColors("AnswerC", App.TwinGold);
                    this.changeAnswerColors("AnswerD", App.TwinGold);
                };
                HomeIndexController.prototype.revealCorrectAnswer = function (ctrl, data) {
                    ctrl.revealAnswer(ctrl, data);
                };
                HomeIndexController.prototype.startClock = function (ctrl, data) {
                    console.log("startClock");
                    ctrl.timer.startTimer(data).then(function (result) {
                        if (result === true) {
                            var webSocketCall = ctrl.socketClient.createWebSocketCall("timeUp", null);
                            ctrl.socket.send(JSON.stringify(webSocketCall));
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                };
                HomeIndexController.prototype.resumeClock = function (ctrl, data) {
                    console.log("resumeClock");
                    ctrl.timer.resumeTimer();
                };
                HomeIndexController.prototype.stopClock = function (ctrl, data) {
                    console.log("stopClock");
                    ctrl.timer.stopTimer();
                };
                HomeIndexController.prototype.clearClock = function (ctrl, data) {
                    console.log("clearClock");
                    ctrl.timer.clearTimer();
                };
                HomeIndexController.prototype.showAudienceAnswersGraph = function (ctrl) {
                    console.log("showAudienceAnswersGraph");
                    ctrl.dataService.getAudienceAnswers().then(function (results) {
                        ctrl.$scope.audienceAnswers = results;
                        ctrl.createAudienceAnswersGraph();
                        ctrl.showAudienceAnswers = true;
                        ctrl.$scope.$applyAsync();
                    });
                };
                HomeIndexController.prototype.hideAudienceAnswersGraph = function (ctrl, data) {
                    console.log("hideAudienceAnswersGraph");
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
                    var e = { id: "379260db-cc3f-4b2c-a0f8-fb827ff0a282", userName: "gulski", answerChosen: 1 };
                    var ee = { id: "379260db-cc3f-4b2c-a0f8-fb827ff0a282", userName: "gulski", answerChosen: 2 };
                    var eee = { id: "379260db-cc3f-4b2c-a0f8-fb827ff0a282", userName: "gulski", answerChosen: 2 };
                    var eeee = { id: "379260db-cc3f-4b2c-a0f8-fb827ff0a282", userName: "gulski", answerChosen: 4 };
                    this.$scope.audienceAnswers.push(e, ee, eee, eeee);
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
                HomeIndexController.prototype.drawQuestionText = function (identity, text) {
                    var canvas = document.getElementById(identity + 'Text');
                    var context = canvas.getContext("2d");
                    context.font = "32px " + App.TwinFont;
                    this.wrapText(canvas, 0, context, text, (canvas.width / 2), 32, canvas.width, 32);
                    canvas.style.transform = "rotatex(" + 90 + "deg)";
                };
                HomeIndexController.prototype.drawInitialQuestion = function (identity) {
                    var text = "";
                    //text = "This is a small question that will not trigger the wrap question for the game";
                    //text = "This is a medium sized question that will trigger the wrap question for the game because I said so";
                    text = "This is a large sized question that will trigger the wrap question for the game hopefully this will be enough space for Twin but we will see what has to be done. This is a third line I added just because";
                    //var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus dui a commodo feugiat. Proin ante elit, tristique et orci non, pellentesque iaculis lorem. Ut non est nec nunc mollis accumsan. Aliquam et molestie magna. Integer gravida ipsum at quam mattis, et ultrices magna ullamcorper. Nulla non sapien augue. Integer dignissim pretium libero sit amet ornare.";
                    this.drawQuestionText(identity, text);
                    this.drawQuestionCardFront(identity);
                    this.drawQuestionBack(identity);
                };
                HomeIndexController.prototype.drawQuestionCardFront = function (identity) {
                    var ctrl = this;
                    var canvas = document.getElementById(identity + 'Card');
                    var context = canvas.getContext("2d");
                    canvas.style.transform = "rotatex(" + 90 + "deg)";
                };
                HomeIndexController.prototype.drawQuestionBack = function (identity) {
                    var ctrl = this;
                    var canvas = document.getElementById(identity + 'Back');
                    var context = canvas.getContext("2d");
                };
                HomeIndexController.prototype.drawAnswers = function () {
                    this.drawInitialAnswer("AnswerA", "A)");
                    this.drawInitialAnswer("AnswerB", "B)");
                    this.drawInitialAnswer("AnswerC", "C)");
                    this.drawInitialAnswer("AnswerD", "D)");
                };
                HomeIndexController.prototype.drawInitialAnswer = function (identity, choiceText) {
                    this.drawAnswerText(identity, "");
                    this.drawAnwserCardFront(identity, true);
                    this.drawAnswerChoice(identity, choiceText);
                    this.drawAnwserBack(identity);
                };
                HomeIndexController.prototype.drawAnswerText = function (identity, answer) {
                    var ctrl = this;
                    var canvas = document.getElementById(identity + 'Text');
                    var context = canvas.getContext("2d");
                    this.fitTextOnCanvas(canvas, context, 0, 0, answer, App.TwinFont);
                    canvas.style.transform = "rotatex(" + 90 + "deg)";
                };
                HomeIndexController.prototype.drawAnwserCardFront = function (identity, flip) {
                    var ctrl = this;
                    var canvas = document.getElementById(identity + 'Card');
                    var context = canvas.getContext("2d");
                    this.drawAnswerTemplate(context);
                    if (flip) {
                        canvas.style.transform = "rotatex(" + 90 + "deg)";
                    }
                };
                HomeIndexController.prototype.drawAnswerChoice = function (identity, text) {
                    var ctrl = this;
                    var canvas = document.getElementById(identity + 'Choice');
                    var context = canvas.getContext("2d");
                    this.fitTextOnCanvas(canvas, context, 0, 0, text, App.TwinFont);
                    canvas.style.transform = "rotatex(" + 90 + "deg)";
                };
                HomeIndexController.prototype.drawAnwserBack = function (identity) {
                    var ctrl = this;
                    var canvas = document.getElementById(identity + 'Back');
                    var context = canvas.getContext("2d");
                };
                HomeIndexController.prototype.drawAnswerTemplate = function (context) {
                    context.beginPath();
                    context.moveTo(92, 0);
                    context.lineTo(92, 75);
                    context.strokeStyle = '#d3d3d3';
                    context.stroke();
                };
                HomeIndexController.prototype.drawRightAnswerTemplate = function (context) {
                    context.beginPath();
                    context.moveTo(365, 0);
                    context.lineTo(365, 75);
                    context.strokeStyle = '#d3d3d3';
                    context.stroke();
                };
                HomeIndexController.prototype.writeQuestion = function (identity, question) {
                    var canvas = document.getElementById(identity + "Text");
                    var context = canvas.getContext("2d");
                    var text = question;
                    this.wrapText(canvas, 0, context, text, (canvas.width / 2), 32, canvas.width, 30);
                };
                HomeIndexController.prototype.writeAnswer = function (identity, answer) {
                    var canvas = document.getElementById(identity + 'Text');
                    var context = canvas.getContext("2d");
                    var text = answer;
                    this.fitTextOnCanvas(canvas, context, 0, 0, text, App.TwinFont);
                };
                HomeIndexController.prototype.bounds = function (x, y, context, text) {
                    var metrics = context.measureText(text);
                    return {
                        top: y - metrics.actualBoundingBoxAscent,
                        right: x + metrics.actualBoundingBoxRight,
                        bottom: y + metrics.actualBoundingBoxDescent,
                        left: x - metrics.actualBoundingBoxLeft
                    };
                };
                HomeIndexController.prototype.textActualHeight = function (context, text) {
                    return Math.abs(context.measureText(text).actualBoundingBoxDescent)
                        + Math.abs(context.measureText(text).actualBoundingBoxAscent);
                };
                HomeIndexController.prototype.textActualWidth = function (context, text) {
                    return Math.abs(context.measureText(text).actualBoundingBoxLeft)
                        + Math.abs(context.measureText(text).actualBoundingBoxRight);
                };
                HomeIndexController.prototype.fitTextOnCanvas = function (canvas, context, paddingX, paddingY, text, fontface) {
                    // start with a large font size
                    var fontsize = 42;
                    var xTotal = 0;
                    var actualTextWidth = 0;
                    var xAlignment = 0;
                    var yTotal = 0;
                    var actualTextHeight = 0;
                    var yAlignment = 0;
                    context.fillStyle = "white";
                    context.strokeStyle = 'black';
                    context.lineWidth = 5;
                    context.lineJoin = 'round';
                    // lower the font size until the text fits the canvas
                    do {
                        fontsize--;
                        context.font = fontsize + "px " + fontface;
                        actualTextWidth = this.textActualWidth(context, text);
                        xAlignment = this.xAlign(canvas.width, actualTextWidth);
                        xTotal = paddingX + actualTextWidth + xAlignment;
                        actualTextHeight = this.textActualHeight(context, text);
                        yAlignment = this.yAlign(canvas.height, actualTextHeight);
                        yTotal = paddingY + actualTextHeight + yAlignment;
                    } while ((xTotal > canvas.width) || (yTotal > canvas.height));
                    var boundary = this.bounds((paddingX + xAlignment), (canvas.height - yAlignment - paddingY), context, text);
                    // draw the text
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.textAlign = "center";
                    context.strokeText(text, (canvas.width / 2), (canvas.height - boundary.top));
                    context.fillText(text, (canvas.width / 2), (canvas.height - boundary.top));
                };
                HomeIndexController.prototype.xAlign = function (cWidth, tWidth) {
                    return ((cWidth - tWidth) / 2);
                };
                HomeIndexController.prototype.yAlign = function (cHeight, tHeight) {
                    return ((cHeight - tHeight) / 2);
                };
                HomeIndexController.prototype.wrapText = function (canvas, padding, context, text, x, y, maxWidth, lineHeight) {
                    var words = text.split(' ');
                    var line = '';
                    var metrics = context.measureText(text);
                    context.fillStyle = "white";
                    context.strokeStyle = 'black';
                    context.lineWidth = 5;
                    context.lineJoin = 'round';
                    if (metrics.width < canvas.width) {
                        y = ((canvas.height + metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) / 2);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.textAlign = "center";
                        context.strokeText(text, x, y);
                        context.fillText(text, x, y);
                    }
                    else {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        for (var n = 0; n < words.length; n++) {
                            var testLine = line + words[n] + ' ';
                            var metrics = context.measureText(testLine);
                            var testWidth = metrics.width;
                            if (testWidth > maxWidth && n > 0) {
                                context.textAlign = "center";
                                context.fillText(line, x, y);
                                context.strokeText(line, x, y);
                                line = words[n] + ' ';
                                y += lineHeight;
                            }
                            else {
                                line = testLine;
                            }
                        }
                        context.textAlign = "center";
                        context.strokeText(line, x, y);
                        context.fillText(line, x, y);
                    }
                };
                HomeIndexController.prototype.flip = function (identity, isAnswer) {
                    var _this = this;
                    if ($("#" + identity + "Flipped").val() === 'false') {
                        $("#" + identity + "Flipped").val("true");
                        this.flipPiece(identity + 'Back', 90);
                        setTimeout(function () {
                            _this.flipPiece(identity + 'Text', 0);
                            _this.flipPiece(identity + 'Card', 0);
                            if (isAnswer)
                                _this.flipPiece(identity + 'Choice', 0);
                        }, 500);
                    }
                    else {
                        $("#" + identity + "Flipped").val("false");
                        this.flipPiece(identity + 'Text', 90);
                        this.flipPiece(identity + 'Card', 90);
                        if (isAnswer)
                            this.flipPiece(identity + 'Choice', 90);
                        setTimeout(function () {
                            _this.flipPiece(identity + 'Back', 0);
                        }, 500);
                    }
                };
                HomeIndexController.prototype.flipPiece = function (identity, amount) {
                    var k = document.getElementById(identity);
                    k.style.transform = "rotatex(" + amount + "deg)";
                    k.style.transitionDuration = "0.5s";
                };
                HomeIndexController.prototype.addProgress = function () {
                    this.$scope.progressBar += this.$scope.progressAddRemove;
                    this.$scope.progressAddRemove = 0;
                };
                HomeIndexController.prototype.removeProgress = function () {
                    this.$scope.progressBar -= this.$scope.progressAddRemove;
                    this.$scope.progressAddRemove = 0;
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
                    'baseUrl'
                ];
                return HomeIndexController;
            }());
            Index.HomeIndexController = HomeIndexController;
        })(Index = Home.Index || (Home.Index = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map