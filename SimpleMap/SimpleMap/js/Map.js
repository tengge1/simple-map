
class Map {

    constructor(container_id, config) {
        if (container == null) {
            throw Error('Map: container_id is undefined.');
        }
        if (config == null) {
            config = new MapConfig();
        }
        if (!config instanceof MapConfig) {
            throw Error('Map: config is not instance of MapConfig.');
        }
        this.container_id = container_id;
        this.container = document.getElementById(container_id);
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.config = config;
        this.center = this.config.center;
        this.zoom = this.config.zoom;
        this.tileSystem = this.config.tileSystem;

        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext('2d');

        this.cache = new Cache(this);

        this.drawMap();
        this.handleEvent();
        this.isMouseDown = false;
        this.mouse = this.getCenterScreenXY();
    }

    drawMap() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapBox = new MapBox();
        let xy = this.getCenterPixelXY(this.center[0], this.center[1], parseInt(this.zoom));
        this.mapBox.min = new Coordinate(this.tileSystem.pixelXYToLongLat(
            xy[0] - this.width / 2,
            xy[1] - this.height / 2,
            parseInt(this.zoom)
            ));
        this.mapBox.max = new Coordinate(this.tileSystem.pixelXYToLongLat(
            xy[0] + this.width / 2,
            xy[1] + this.height / 2,
            parseInt(this.zoom)
            ));
        let xy_min = this.tileSystem.longLatToPixelXY(this.mapBox.min.lon, this.mapBox.min.lat, parseInt(this.zoom));
        let tile_min = this.tileSystem.pixelXYToTileXY(xy_min[0], xy_min[1]);
        let xy_max = this.tileSystem.longLatToPixelXY(this.mapBox.max.lon, this.mapBox.max.lat, parseInt(this.zoom));
        let tile_max = this.tileSystem.pixelXYToTileXY(xy_max[0], xy_max[1]);

        let promises = [];
        for (let i = Math.floor(tile_min[0]) ; i <= Math.ceil(tile_max[0]) ; i++) {
            for (let j = Math.floor(tile_min[1]) ; j < Math.ceil(tile_max[1]) ; j++) {
                let promise = new Promise((resolve, reject) => {
                    this.cache.getTile(i, j, (tile) => {
                        let centerScreenXY = this.getCenterScreenXY();
                        let centerPixelXY = this.getCenterPixelXY();
                        let mouseScreenXY = this.getMouseScreenXY();
                        let mousePixelXY = this.getMousePixelXY();
                        let tilePixelXY = this.tileSystem.tileXYToPixelXY(tile.x, tile.y);
                        let scale = 1 + this.zoom - parseInt(this.zoom);
                        let x = centerScreenXY[0] + tilePixelXY[0] - centerPixelXY[0] + (tilePixelXY[0] - mousePixelXY[0]) * (scale - 1);
                        let y = centerScreenXY[1] + tilePixelXY[1] - centerPixelXY[1] + (tilePixelXY[1] - mousePixelXY[1]) * (scale - 1);
                        this.ctx.drawImage(tile.img, x, y, 256 * scale, 256 * scale);
                        resolve();
                    });
                });
                promises.push(promise);
            }
        }
        Promise.all(promises).then((e) => {

        });
    }

    handleEvent() {
        this.container.onmousedown = (e) => {
            this.isMouseDown = true;
            this.mouseDownX = e.x;
            this.mouseDownY = e.y;
        }
        this.container.onmouseup = (e) => {
            this.isMouseDown = false;
            this.mouseDownX = 0;
            this.mouseDownY = 0;
        }
        this.container.onmousemove = (e) => {
            this.mouse = [e.x, e.y];
            if (this.isMouseDown) {
                let centerPixelXY = this.getCenterPixelXY();
                centerPixelXY[0] -= e.x - this.mouseDownX;
                centerPixelXY[1] -= e.y - this.mouseDownY;
                let center = this.tileSystem.pixelXYToLongLat(centerPixelXY[0], centerPixelXY[1], this.zoom);
                this.setCenter(center);
                this.mouseDownX = e.x;
                this.mouseDownY = e.y;
            }
        }
        this.container.onmousewheel = (e) => {
            var delta = e.wheelDelta;
            this.zoom += delta * 0.002;
            if (this.zoom < 8) {
                this.zoom = 8;
            }
            if (this.zoom > 20) {
                this.zoom = 20;
            }
            this.drawMap();
        }
    }

    getCenter() {
        return this.center;
    }

    getCenterScreenXY() {
        return [this.width / 2, this.height / 2];
    }

    getCenterPixelXY() {
        let xy = this.tileSystem.longLatToPixelXY(this.center[0], this.center[1], this.zoom);
        return xy;
    }

    getMouse() {
        let mousePixelXY = this.getMousePixelXY();
        return this.tileSystem.pixelXYToLongLat(mousePixelXY[0], mousePixelXY[1], parseInt(this.zoom));
    }

    getMouseScreenXY() {
        return this.mouse;
    }

    getMousePixelXY() {
        let centerScreenXY = this.getCenterScreenXY();
        let centerPixelXY = this.getCenterPixelXY();

        let mouseXY = this.getMouseScreenXY();
        let mousePixelX = centerPixelXY[0] + mouseXY[0] - centerScreenXY[0];
        let mousePixelY = centerPixelXY[1] + mouseXY[1] - centerScreenXY[1];
        return [mousePixelX, mousePixelY];
    }

    setCenter(center) {
        this.center = center;
        this.drawMap();
    }

    getZoom() {
        return this.zoom;
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }
}
