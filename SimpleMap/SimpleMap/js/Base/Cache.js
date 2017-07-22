
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
        let tile = this.tiles.filter((o) => { return o.x == x && o.y == y; })[0];
        if (tile != null) {
            if (typeof (callback) == 'function') {
                callback(tile);
            }
        } else {
            let key = this.map.tileSystem.tileXYToQuadKey(x, y, this.map.zoom);
            let url = `http://t0.ssl.ak.tiles.virtualearth.net/tiles/a${key}.jpeg?g=5793`;
            tile = new Tile({ x: x, y: y });
            tile.load(url, (img) => {
                tile.img = img;
                this.tiles.push(tile);
                if (typeof (callback) == 'function') {
                    callback(tile);
                }
            });
        }
    }
}
