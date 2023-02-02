/// <reference path="Typings/angular.d.ts" />
/// <reference path="Typings/jquery/jquery.d.ts"/>
var App;
(function (App) {
    "use strict";
    var AudioPlayer = /** @class */ (function () {
        function AudioPlayer() {
            this.MoneyBar = "../sounds/money_bar.mp3";
            this.ClockRunsOut = "../sounds/Clock_runs_out.mp3";
            this.Easy = "../sounds/EasyMusic.mp3";
            this.MediumHard = "../sounds/MediumHardMusic.mp3";
            this.VeryHard = "../sounds/VeryHardMusic.mp3";
            this.Impossible = "../sounds/ImpossibleMusic.mp3";
            this.Flutter = "../sounds/Flutter.mp3";
            this.bgAudio = new Audio();
            this.sfxAudio = new Audio();
        }
        AudioPlayer.prototype.playBgMusic = function (soundPath, volume, mute) {
            this.bgAudio.pause();
            this.bgAudio = new Audio(soundPath);
            if (!mute) {
                this.fadeIn(this.bgAudio, volume);
                this.bgAudio.play();
            }
        };
        AudioPlayer.prototype.stopBgMusic = function () {
            this.bgAudio.pause();
        };
        AudioPlayer.prototype.fadeIn = function (audio, maxVolume) {
            audio.volume = 0;
            var fadeIn = setInterval(function () {
                audio.volume = audio.volume += (maxVolume / 100 / 10);
                if (audio.volume >= (maxVolume / 100)) {
                    audio.volume = (maxVolume / 100);
                    clearInterval(fadeIn);
                }
            }, 300);
        };
        AudioPlayer.prototype.playSFX = function (soundPath, volume, mute) {
            this.sfxAudio = new Audio(soundPath);
            this.sfxAudio.volume = (volume / 100);
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