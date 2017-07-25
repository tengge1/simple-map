
var start = function () {
    var mapConfig = new MapConfig({
        center: [116.964311, 36.692636],
        zoom: 18,
        tileSystem: new BingTileSystem()
    });

    var map = new Map('container', mapConfig);
    map.on('mousemove', (e) => {
        var lonlats = map.getMouse();
        document.getElementById('location').innerHTML = `位置: ${lonlats[0].toFixed(5)}，${lonlats[1].toFixed(5)}`;
    });
    map.on('mousewheel', (e) => {
        var zoom = map.getZoom();
        document.getElementById('zoom').innerHTML = `层级: ${zoom.toFixed(1)}`;
    });
}

window.onload = start;