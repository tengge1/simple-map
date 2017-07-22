
var start = function () {
    var mapConfig = new MapConfig({
        center: [116.964311, 36.692636],
        zoom: 18,
        tileSystem: new BingTileSystem()
    });

    var map = new Map('container', mapConfig);
}

window.onload = start;