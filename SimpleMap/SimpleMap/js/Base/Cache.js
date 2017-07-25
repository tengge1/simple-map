
// Cache

class Cache {

    constructor(map) {
        if (map == null) {
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
            let key = this.map.tileSystem.tileXYToQuadKey(x, y, parseInt(this.map.zoom));
            let url = `http://t0.ssl.ak.tiles.virtualearth.net/tiles/a${key}.jpeg?g=5793`;
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
