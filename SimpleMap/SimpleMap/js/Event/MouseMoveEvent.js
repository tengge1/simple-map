
// MouseMoveEvent
class MouseMoveEvent extends BaseEvent {

    handle(e) {
        this.map.mouse = [e.x, e.y];
        if (this.map.isMouseDown) {
            let centerPixelXY = this.map.getCenterPixelXY();
            centerPixelXY[0] -= e.x - this.map.mouseDownX;
            centerPixelXY[1] -= e.y - this.map.mouseDownY;
            let center = this.map.tileSystem.pixelXYToLongLat(centerPixelXY[0], centerPixelXY[1], this.map.zoom);
            this.map.setCenter(center);
            this.map.mouseDownX = e.x;
            this.map.mouseDownY = e.y;
        }
    }

}