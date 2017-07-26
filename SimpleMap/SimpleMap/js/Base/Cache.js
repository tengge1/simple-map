
// Cache

class Cache {

    constructor(map) {
        if (map == undefined) {
            throw Error('Cache: map is not defined.');
        }
        this.map = map;
        this.tiles = [];
    }

    getTile(x, y, callback) {
        let tile = this.tiles.filter((o) => { return o.x == x && o.y == y && o.zoom == parseInt(this.map.zoom); })[0];
        if (tile != undefined) {
            if (typeof (callback) == 'function') {
                callback(tile);
            }
        } else {
            var url = this.map.tileSystem.tileXYToUrl(x, y, parseInt(this.map.zoom));
            tile = new Tile({ x: x, y: y, zoom: parseInt(this.map.zoom) });
            tile.load(url, (img) => {
                this.tiles.push(tile);
                if (typeof (callback) == 'function') {
                    callback(tile);
                }
            });
        }
    }
}
