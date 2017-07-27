
// TileRenderer
class TileRenderer extends BaseRenderer {

    render(map) {
        this.ctx = this.map.ctx;
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.map.canvas.width, this.map.canvas.height);
        this.mapBox = new MapBox();
        let centerPixelXY = this.map.getCenterPixelXY();
        let centerScreenXY = this.map.getCenterScreenXY();

        this.mapBox.min = new Coordinate(this.map.tileSystem.pixelXYToLongLat(
            centerPixelXY[0] - centerScreenXY[0],
            centerPixelXY[1] - centerScreenXY[1],
            parseInt(this.map.zoom)
            ));
        this.mapBox.max = new Coordinate(this.map.tileSystem.pixelXYToLongLat(
            centerPixelXY[0] + this.map.canvas.width - centerScreenXY[0],
            centerPixelXY[1] + this.map.canvas.height - centerScreenXY[1],
            parseInt(this.map.zoom)
            ));
        let xy_min = this.map.tileSystem.longLatToPixelXY(this.mapBox.min.lon, this.mapBox.min.lat, parseInt(this.map.zoom));
        let tile_min = this.map.tileSystem.pixelXYToTileXY(xy_min[0], xy_min[1]);
        let xy_max = this.map.tileSystem.longLatToPixelXY(this.mapBox.max.lon, this.mapBox.max.lat, parseInt(this.map.zoom));
        let tile_max = this.map.tileSystem.pixelXYToTileXY(xy_max[0], xy_max[1]);

        let promises = [];
        for (let i = Math.floor(tile_min[0]) ; i <= Math.ceil(tile_max[0]) ; i++) {
            for (let j = Math.floor(tile_min[1]) ; j < Math.ceil(tile_max[1]) ; j++) {
                let promise = new Promise((resolve, reject) => {
                    this.map.cache.getTile(i, j, (tile) => {
                        let centerScreenXY = this.map.getCenterScreenXY();
                        let centerPixelXY = this.map.getCenterPixelXY();
                        let tilePixelXY = this.map.tileSystem.tileXYToPixelXY(tile.x, tile.y);
                        let scale = 1 + this.map.zoom - parseInt(this.map.zoom);
                        let x = (centerScreenXY[0] + tilePixelXY[0] - centerPixelXY[0]) * scale;
                        let y = (centerScreenXY[1] + tilePixelXY[1] - centerPixelXY[1]) * scale;
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

}