/// <reference path="../Typings/angular.d.ts" />
/// <reference path="../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Shared;
    (function (Shared) {
        var Answers;
        (function (Answers) {
            "use strict";
            angular.module('sharedAnswersApp', ['sharedAnswersAnswerApp'])
                .controller('sharedAnswersController', Answers.SharedAnswersController)
                .directive('answer', function () {
                return {
                    restrict: 'E',
                    scope: {
                        answer: '='
                    },
                    templateUrl: '/Shared/Answer'
                };
            });
            function transformSegment() {
                var directive = {
                    link: link,
                    restrict: 'A'
                };
                return directive;
                function link(scope, element, attrs) {
                    //var delay = scope.segment.sequence * 100;
                    //scope.$watch('segment', function (newValue, oldValue, scope) {
                    //    changeSegmentBackground(delay, scope, scope.segment, element);
                    //}, true);
                }
            }
            var baseDelay = 100;
            //function changeSegmentBackground(delay, scope, segment: IProgressSegment, element) {
            //    element.removeClass('progress-segment-flip');
            //    element.removeClass('progress-status-current-animate');
            //    setTimeout(() => {
            //        element.addClass('progress-segment-flip');
            //    }, (baseDelay + delay));
            //    setTimeout(() => {
            //        removePreviousClass(element);
            //    }, (baseDelay + Math.round(App.FlipDuration / 2) + delay));
            //    setTimeout(() => {
            //        switch (segment.progressStatus) {
            //            case ProgressStatus.Inactive:
            //                element.addClass('progress-status-inactive');
            //                break;
            //            case ProgressStatus.Current:
            //                element.addClass('progress-status-current');
            //                break;
            //            case ProgressStatus.Pass:
            //                element.addClass('progress-status-pass');
            //                break;
            //            case ProgressStatus.Fail:
            //                element.addClass('progress-status-fail');
            //                break;
            //        }
            //    }, (baseDelay + Math.round(App.FlipDuration / 2) + delay));
            //    setTimeout(() => {
            //        switch (segment.progressStatus) {
            //            case ProgressStatus.Current:
            //                element.removeClass('progress-segment-flip');
            //                element.addClass('progress-status-current-animate');
            //                break;
            //        }
            //    }, (baseDelay + App.FlipDuration + delay));
            //}
            //function removePreviousClass(element) {
            //    element.removeClass('progress-status-inactive');
            //    element.removeClass('progress-status-current');
            //    element.removeClass('progress-status-pass');
            //    element.removeClass('progress-status-fail');
            //}
        })(Answers = Shared.Answers || (Shared.Answers = {}));
    })(Shared = App.Shared || (App.Shared = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map