
// ZoomEvent
class ZoomEvent extends BaseEvent {

    handle(eventSystem) {
        if (eventSystem == undefined) {
            throw new Error('ZoomEvent: eventSystem is undefined');
        }
        eventSystem.register('mousewheel', this.onMouseWheel);
    }

    onMouseWheel(e) {
        var delta = e.wheelDelta;
        let oldZoom = this.map.zoom;
        let mouseScreenXY = this.map.getMouseScreenXY();
        let mouse = this.map.getMouse();

        this.map.zoom += delta * 0.001;
        if (this.map.zoom < 6) {
            this.map.zoom = 6;
        }
        if (this.map.zoom > 20) {
            this.map.zoom = 20;
        }

        let mousePixelXY = this.map.tileSystem.longLatToPixelXY(mouse[0], mouse[1], parseInt(this.map.zoom));
        let centerPixelXY = [mousePixelXY[0] - mouseScreenXY[0] + this.map.canvas.width / 2, mousePixelXY[1] - mouseScreenXY[1] + this.map.canvas.height / 2];
        let center = this.map.tileSystem.pixelXYToLongLat(centerPixelXY[0], centerPixelXY[1], parseInt(this.map.zoom));

        this.map.setCenter(center);
    }

}