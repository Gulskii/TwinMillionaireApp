/// <reference path="../Typings/angular.d.ts" />
/// <reference path="../Typings/jquery/jquery.d.ts"/>
/// <reference path="../Typings/chart.js/index.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var AudienceAnswers;
        (function (AudienceAnswers) {
            "use strict";
            var SharedAudienceAnswersController = /** @class */ (function () {
                function SharedAudienceAnswersController($scope, $filter, $log, $timeout, $attrs, $q, $location, $anchorScroll, $window) {
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
                    this.$scope.ctrl = this;
                    this.audienceAnswersGraph = null;
                    this.showAnimation = false;
                    this.$scope.$on("showAudienceAnswersGraph", function () {
                        _this.showAudienceAnswersGraph();
                    });
                    this.$scope.$on("hideAudienceAnswersGraph", function () {
                        _this.hideAudienceAnswersGraph();
                    });
                }
                SharedAudienceAnswersController.prototype.hideAudienceAnswersGraph = function () {
                    this.showAudienceAnswers = false;
                    this.$scope.$applyAsync();
                };
                SharedAudienceAnswersController.prototype.displayAudienceAnswers = function () {
                    return this.showAudienceAnswers;
                };
                SharedAudienceAnswersController.prototype.animateFlux = function (componentName) {
                    var head = document.getElementsByTagName('head')[0];
                    var el = document.getElementById(componentName);
                    var keyframes = "@keyframes flux" + componentName + " {\n0%  {transform: scaleY(1); transform-origin: 0% 0%;}\n10%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n20%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n30%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n40%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n50%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n60%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n70%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n80%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n90%  {transform: scaleY(" + Math.random() + "); transform-origin: 0% 0%;}\n100%  {transform: scaleY(1); transform-origin: 0% 0%;}}";
                    var style = document.createElement('STYLE');
                    style.innerHTML = keyframes;
                    head.appendChild(style);
                    el.style.animationName = 'flux' + componentName;
                    el.style.animationPlayState = "started";
                };
                SharedAudienceAnswersController.prototype.showAudienceAnswersGraph = function () {
                    var _this = this;
                    var ctrl = this;
                    this.showAnimation = true;
                    this.showAudienceAnswers = true;
                    this.defaultAudienceAnswersGraph([0, 0, 0, 0]);
                    this.animateFlux('testCoverBar1');
                    this.animateFlux('testCoverBar2');
                    this.animateFlux('testCoverBar3');
                    this.animateFlux('testCoverBar4');
                    this.$scope.$applyAsync();
                    setTimeout(function () {
                        _this.showAnimation = false;
                        _this.createAudienceAnswersGraph();
                        _this.$scope.$applyAsync();
                    }, 3980);
                };
                SharedAudienceAnswersController.prototype.showCalculatingAnimation = function () {
                    return this.showAnimation;
                };
                SharedAudienceAnswersController.prototype.defaultAudienceAnswersGraph = function (data) {
                    var canvas = document.getElementById("audienceAnswersGraph");
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                                    data: data,
                                    borderWidth: 1,
                                    backgroundColor: grd
                                }]
                        },
                        options: {
                            responsive: false,
                            animation: {
                                duration: 300,
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
                SharedAudienceAnswersController.prototype.createAudienceAnswersGraph = function () {
                    var a = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 1; }).length;
                    var b = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 2; }).length;
                    var c = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 3; }).length;
                    var d = this.$scope.audienceAnswers.filter(function (result) { return result.answerChosen == 4; }).length;
                    var data = [a, b, c, d];
                    this.defaultAudienceAnswersGraph(data);
                };
                SharedAudienceAnswersController.$inject = [
                    '$scope',
                    '$filter',
                    '$log',
                    '$timeout',
                    '$attrs',
                    '$q',
                    '$location',
                    '$anchorScroll',
                    "$window",
                ];
                return SharedAudienceAnswersController;
            }());
            AudienceAnswers.SharedAudienceAnswersController = SharedAudienceAnswersController;
        })(AudienceAnswers = Shared.AudienceAnswers || (Shared.AudienceAnswers = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map