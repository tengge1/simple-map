
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
        this.map.zoom += delta * 0.001;
        if (this.map.zoom < 6) {
            this.map.zoom = 6;
        }
        if (this.map.zoom > 20) {
            this.map.zoom = 20;
        }
        this.map.render();
    }

}