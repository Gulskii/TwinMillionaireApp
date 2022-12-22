/// <reference path="../../Typings/angular.d.ts" />
/// <reference path="../../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Index;
        (function (Index) {
            "use strict";
            var HomeIndexController = /** @class */ (function () {
                function HomeIndexController($scope
                //public $filter: ng.IFilterService,
                //public $log: ng.ILogService,
                //public $timeout: ng.ITimeoutService,
                //public $attrs: ng.IAttributes,
                //public $q: ng.IQService,
                //public $location: ng.ILocationService,
                //public $anchorScroll: ng.IAnchorScrollService,
                //public $window: ng.IWindowService,
                //public dataService: HomeDataService
                ) {
                    this.$scope = $scope;
                    //this.$scope.unitNumber = this.$attrs["unitNumber"];
                    //this.$scope.settingService = JSON.parse(JSON.parse(JSON.stringify(this.$attrs["softwareSettings"])));
                    //this.$scope.filteredUnits = new Array<IAutoCompleteView>();
                    //this.$scope.filteredGenericOptions = new Array<IAutoCompleteView>();
                    this.$scope.chosenQuestion = {};
                    ;
                    var controller = this;
                    this.$scope.chosenQuestion.QuestionContent = "This is a test";
                    this.$scope.chosenQuestion.FirstAnswer = "1";
                    this.$scope.chosenQuestion.SecondAnswer = "2";
                    this.$scope.chosenQuestion.ThirdAnswer = "3";
                    this.$scope.chosenQuestion.FourthAnswer = "4";
                    this.$scope.chosenQuestion.CorrectAnswer = 1;
                    //this.$scope.taxSchedules = [];
                    //$("#btnSaveDetails").on("click", function () {
                    //    controller.saveUnit(this.$scope.unit);
                    //    return false;
                    //});
                    //this.loaderLock.wrapPromise(() => {
                    //    return this.$q.all([
                    //        this.dataService.loadEnumTypes().then(() => {
                    //            this.$scope.groundingReasonTypes = this.dataService.getEnumType("GroundingReasonType");
                    //            this.$scope.retainedBuybackReasonTypes =
                    //                this.dataService.getEnumType("RetainedBuybackReasonType");
                    //        }),
                    //        this.dataService.getPOPReceivingsInboundHeader(this.$scope.unitNumber).then(results => {
                    //            this.$scope.popReceivingsInboundHeaders = results;
                    //        }).catch(err => {
                    //            this.notify.error("Failed to get pop receivings: " + err);
                    //        }),
                    //        this.dataService.getReceivingInvoiceUnitTransactions(this.$scope.unitNumber).then(results => {
                    //            this.$scope.unitTransactions = results;
                    //        }).catch(err => {
                    //            this.notify.error("Failed to get unit transactions: " + err);
                    //        }),
                    //        this.dataService.getUserService()
                    //            .then(result => {
                    //                this.$scope.userService = result;
                    //            })
                    //            .catch(ex => {
                    //                this.showError(ex, "Error loading User Service");
                    //            }),
                    //        this.dataService.getFinancialPeriods().then(results => {
                    //            this.$scope.financialPeriods = results;
                    //        }).catch(ex => {
                    //            this.showError(ex, "Error loading financial periods");
                    //        })
                    //    ])
                    //        .then(() => {
                    //            this.loadAssetClasses();
                    //            this.initialUnitLoad();
                    //        })
                    //        .catch(ex => {
                    //            this.showError(ex, "Error loading details");
                    //        });
                    //});
                }
                HomeIndexController.$inject = [
                    '$scope',
                    //    //'$filter',
                    //    //'$log',
                    //    //'$timeout',
                    //    //'$attrs',
                    //    //'$q',
                    //    //'$location',
                    //    //'$anchorScroll',
                    //    //"$window",
                    //'dataService'
                ];
                return HomeIndexController;
            }());
            Index.HomeIndexController = HomeIndexController;
        })(Index = Home.Index || (Home.Index = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//public autoUnitLoad(element: any) {
//    var controller = (<any>this).$parent.ctrl;
//    if (controller.hasUnsavedChanges()) {
//        Common.yesNoDialog("There are unsaved changes, are you sure you want to leave this unit?",
//            "Leave unit",
//            function () {
//                controller.$scope.unitNumber = element.value;
//                controller.initialUnitLoad();
//                controller.$window.history.pushState("object or string",
//                    "Title",
//                    controller.dataService.baseUri + "Unit/Details/" + controller.$scope.unitNumber);
//            });
//    }
//    else {
//        controller.$scope.unitNumber = element.value;
//        controller.initialUnitLoad();
//        controller.$window.history.pushState("object or string",
//            "Title",
//            controller.dataService.baseUri + "Unit/Details/" + controller.$scope.unitNumber);
//    }
//}
//# sourceMappingURL=controller.js.map