/// <reference path="Typings/angular.d.ts" />
/// <reference path="Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    "use strict";
    var AudioPlayer = /** @class */ (function () {
        function AudioPlayer() {
            this.AudiencePollRevealMusic = "../sounds/Audience_Poll_Reveal_Music.mp3";
            this.MoneyBar = "../sounds/money_bar.mp3";
            this.ClockRunsOut = "../sounds/Clock_runs_out.mp3";
            this.Easy = "../sounds/EasyMusic.mp3";
            this.MediumHard = "../sounds/MediumHardMusic.mp3";
            this.VeryHard = "../sounds/VeryHardMusic.mp3";
            this.Impossible = "../sounds/ImpossibleMusic.mp3";
            this.Flutter = "../sounds/Flutter.mp3";
            this.CorrectAnswer = "../sounds/correct answer.mp3";
            this.WrongAnswer = "../sounds/wrong answer.mp3";
            this.bgAudio = new Audio();
            this.sfxAudio = new Audio();
            this.bgVolume = 100;
            this.sfxVolume = 100;
        }
        AudioPlayer.prototype.playBgMusic = function (soundPath, mute) {
            this.bgAudio.pause();
            this.bgAudio = new Audio(soundPath);
            if (!mute) {
                this.fadeIn(this.bgAudio);
                this.bgAudio.play();
            }
        };
        AudioPlayer.prototype.stopBgMusic = function (fade) {
            if (fade)
                this.fadeOut(this.bgAudio);
            else
                this.bgAudio.pause();
        };
        AudioPlayer.prototype.fadeIn = function (audio) {
            audio.volume = 0;
            var ctrl = this;
            var count = 0;
            var s = 0;
            var r = ctrl.bgVolume / 10;
            var fadeIn = setInterval(function () {
                count++;
                s = s + r;
                if (s >= ctrl.bgVolume || count >= 10) {
                    audio.volume = (ctrl.bgVolume / 100);
                    clearInterval(fadeIn);
                }
                else {
                    audio.volume = (s / 100);
                }
            }, 50);
        };
        AudioPlayer.prototype.fadeOut = function (audio) {
            var ctrl = this;
            var count = 0;
            var s = ctrl.bgVolume;
            var r = s / 10;
            var fadeOut = setInterval(function () {
                count++;
                s = s - r;
                if (s <= 0 || count >= 10) {
                    audio.volume = 0;
                    clearInterval(fadeOut);
                }
                else {
                    audio.volume = (s / 100);
                }
            }, 50);
        };
        AudioPlayer.prototype.playSFX = function (soundPath, mute) {
            this.sfxAudio = new Audio(soundPath);
            this.sfxAudio.volume = (this.sfxVolume / 100);
            if (!mute) {
                this.sfxAudio.play();
            }
        };
        AudioPlayer.$inject = [];
        return AudioPlayer;
    }());
    App.AudioPlayer = AudioPlayer;
})(App || (App = {}));
//# sourceMappingURL=audioPlayer.js.map