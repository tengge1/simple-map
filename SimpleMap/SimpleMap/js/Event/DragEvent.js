
// DragEvent
class DragEvent extends BaseEvent {

    handle(eventSystem) {
        if (eventSystem == undefined) {
            throw new Error('DragEvent: eventSystem is undefined');
        }
        eventSystem.register('mousedown', this.onMouseDown);
        eventSystem.register('mouseup', this.onMouseUp);
        eventSystem.register('mousemove', this.onMouseMove);
    }

    onMouseDown(e) {
        this.isMouseDown = true;
        this.mouseDownX = e.x;
        this.mouseDownY = e.y;
    }

    onMouseUp(e) {
        this.isMouseDown = false;
        this.mouseDownX = 0;
        this.mouseDownY = 0;
    }

    onMouseMove(e) {
        this.mouse = [e.x, e.y];
        if (this.isMouseDown) {
            let centerPixelXY = this.map.getCenterPixelXY();
            centerPixelXY[0] -= e.x - this.mouseDownX;
            centerPixelXY[1] -= e.y - this.mouseDownY;
            let center = this.map.tileSystem.pixelXYToLongLat(centerPixelXY[0], centerPixelXY[1], this.map.zoom);
            this.map.setCenter(center);
            this.mouseDownX = e.x;
            this.mouseDownY = e.y;
        }
    }
}
