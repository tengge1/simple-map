
// Tile

class Tile {

    constructor(tile) {
        tile = tile || {
            x: 0,
            y: 0,
            zoom: 0
        };
        this.x = tile.x;
        this.y = tile.y;
        this.zoom = tile.zoom;
        this.img = null;
    }

    load(url, callback) {
        let img = document.createElement('img');
        img.width = 256;
        img.height = 256;
        img.src = url;
        img.onload = (e) => {
            this.img = img;
            if (typeof (callback) == 'function') {
                callback(e.target);
            }
        };
    }
}