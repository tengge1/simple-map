
// MouseUpEvent
class MouseUpEvent extends BaseEvent {

    handle(e) {
        this.map.isMouseDown = false;
        this.map.mouseDownX = 0;
        this.map.mouseDownY = 0;
    }

}