var App;
(function (App) {
    function createWebSocketClient(url) {
        var socket = new WebSocket("ws:" + url + "ws/");
        socket.onopen = function (e) {
            console.log("[open] Connection established");
            console.log("Sending to server");
        };
        socket.onmessage = function (event) {
            console.log("[message] Data received from server: ".concat(event.data));
        };
        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log("[close] Connection closed cleanly, code=".concat(event.code, " reason=").concat(event.reason));
            }
            else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.log('[close] Connection died');
            }
        };
        socket.onerror = function (error) {
            console.log("[error]" + error);
        };
        return socket;
    }
    App.createWebSocketClient = createWebSocketClient;
})(App || (App = {}));
//# sourceMappingURL=webSocketClient.js.map