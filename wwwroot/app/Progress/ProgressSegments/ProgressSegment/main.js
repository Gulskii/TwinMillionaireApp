/// <reference path="../../../Typings/angular.d.ts" />
/// <reference path="../../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var ProgressSegments;
        (function (ProgressSegments) {
            var ProgressSegment;
            (function (ProgressSegment) {
                "use strict";
                angular.module('sharedProgressSegmentsProgressSegmentApp', [])
                    .controller('sharedProgressSegmentsProgressSegmentController', ProgressSegment.SharedProgressSegmentsProgressSegmentController)
                    .directive('transformSegment', transformSegment);
                function transformSegment() {
                    var directive = {
                        link: link,
                        restrict: 'A'
                    };
                    return directive;
                    function link(scope, element, attrs) {
                        var delay = scope.segment.sequence * 100;
                        scope.$watch('segment', function (newValue, oldValue, scope) {
                            changeSegmentBackground(delay, scope, scope.segment, element);
                        }, true);
                    }
                }
                var baseDelay = 100;
                function changeSegmentBackground(delay, scope, segment, element) {
                    element.removeClass('progress-segment-flip');
                    element.removeClass('progress-status-current-animate');
                    setTimeout(function () {
                        element.addClass('progress-segment-flip');
                    }, (baseDelay + delay));
                    setTimeout(function () {
                        removePreviousClass(element);
                    }, (baseDelay + Math.round(App.FlipDuration / 2) + delay));
                    setTimeout(function () {
                        switch (segment.progressStatus) {
                            case 1 /* ProgressStatus.Inactive */:
                                element.addClass('progress-status-inactive');
                                break;
                            case 2 /* ProgressStatus.Current */:
                                element.addClass('progress-status-current');
                                break;
                            case 3 /* ProgressStatus.Pass */:
                                element.addClass('progress-status-pass');
                                break;
                            case 4 /* ProgressStatus.Fail */:
                                element.addClass('progress-status-fail');
                                break;
                        }
                    }, (baseDelay + Math.round(App.FlipDuration / 2) + delay));
                    setTimeout(function () {
                        switch (segment.progressStatus) {
                            case 2 /* ProgressStatus.Current */:
                                element.removeClass('progress-segment-flip');
                                element.addClass('progress-status-current-animate');
                                break;
                        }
                    }, (baseDelay + App.FlipDuration + delay));
                }
                function removePreviousClass(element) {
                    element.removeClass('progress-status-inactive');
                    element.removeClass('progress-status-current');
                    element.removeClass('progress-status-pass');
                    element.removeClass('progress-status-fail');
                }
            })(ProgressSegment = ProgressSegments.ProgressSegment || (ProgressSegments.ProgressSegment = {}));
        })(ProgressSegments = Shared.ProgressSegments || (Shared.ProgressSegments = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map