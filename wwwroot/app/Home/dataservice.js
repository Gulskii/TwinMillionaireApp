/// <reference path="../Typings/angular.d.ts" />
/// <reference path="../Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    var Home;
    (function (Home) {
        "use strict";
        var HomeDataService = /** @class */ (function () {
            function HomeDataService($http, $log, $q, baseUrl) {
                this.$http = $http;
                this.$log = $log;
                this.$q = $q;
                this.baseUrl = baseUrl;
            }
            HomeDataService.prototype.getQuestions = function () {
                var query = this.baseUrl + "/api/Questions/GetQuestions";
                var deferred = this.$q.defer();
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.addQuestion = function (question) {
                var query = this.baseUrl + "/api/Questions/AddQuestion/";
                var deferred = this.$q.defer();
                this.$http.post(query, question)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.editQuestion = function (question) {
                var query = this.baseUrl + "/api/Questions/EditQuestion/";
                var deferred = this.$q.defer();
                this.$http.post(query, question)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.deleteQuestion = function (id) {
                var query = this.baseUrl + "/api/Questions/DeleteQuestion/" + id;
                var deferred = this.$q.defer();
                this.$http.delete(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.getDifficultyLevelTypeEnum = function () {
                var query = this.baseUrl + "/api/Enum/GetDifficultyLevelTypeEnum";
                var deferred = this.$q.defer();
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.getAudienceLeaderboard = function () {
                var query = this.baseUrl + "/api/AudienceLeaderboard/GetAudienceLeaderboard";
                var deferred = this.$q.defer();
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.getAudienceAnswers = function () {
                var query = this.baseUrl + "/api/AudienceAnswers/GetAudienceAnswers";
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.startChatbot = function () {
                var query = this.baseUrl + "/api/Chatbot/StartChatbot";
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.stopChatbot = function () {
                var query = this.baseUrl + "/api/Chatbot/StopChatbot";
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                    console.log(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.sendMessageToChat = function (message) {
                var query = this.baseUrl + "/api/Chatbot/SendMessageToChat";
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.post(query, message)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.pingChatbot = function () {
                var query = this.baseUrl + "/api/Chatbot/PingChatBot";
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.setAccessToken = function (token) {
                var query = this.baseUrl + "/api/Chatbot/SetAccessToken/" + token;
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.getRandomUnusedQuestionOfDifficulty = function (difficulty) {
                var query = this.baseUrl + "/api/Questions/GetRandomUnusedQuestionOfDifficulty/" + difficulty;
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    if (result.data === '')
                        deferred.resolve(null);
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.setQuestionAsUsed = function (id) {
                var query = this.baseUrl + "/api/Questions/SetQuestionAsUsed/" + id;
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.closeTakingAnswers = function () {
                var query = this.baseUrl + "/api/Chatbot/CloseTakingAnswers/";
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.clearAudienceLeaderboard = function () {
                var query = this.baseUrl + "/api/AudienceLeaderboard/clearAudienceLeaderboard/";
                var deferred = this.$q.defer();
                console.log(query);
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.prototype.getChosenQuestion = function () {
                var query = this.baseUrl + "/api/Questions/getChosenQuestion/";
                var deferred = this.$q.defer();
                this.$http.get(query)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) { return deferred.reject(); });
                return deferred.promise;
            };
            HomeDataService.$inject = [
                '$http',
                '$log',
                '$q',
                'baseUrl'
            ];
            return HomeDataService;
        }());
        Home.HomeDataService = HomeDataService;
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=dataservice.js.map