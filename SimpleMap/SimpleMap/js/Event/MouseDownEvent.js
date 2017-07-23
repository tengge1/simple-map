
// MouseDownEvent
class MouseDownEvent extends BaseEvent {

    handle(e) {
        this.map.isMouseDown = true;
        this.map.mouseDownX = e.x;
        this.map.mouseDownY = e.y;
    }

}