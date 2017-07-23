
// EventSystem
class EventSystem {

    constructor(map) {
        this.map = map;
        this.eventList = {}; // { event1: [handler1, handler2, handler3], event2: [handler1, ...] }
        this.handleEvent();
    }

    Register(eventName, handler) {
        if (this.eventList[eventName] == null) {
            this.eventList[eventName] = [];
            this.map.container.addEventListener(eventName, (e) => {
                this.eventList[eventName].forEach((n, i) => {
                    n.handle(e);
                });
            });
        }
        if (this.eventList[eventName].indexOf(handler) == -1) {
            this.eventList[eventName].push(handler);
        }
    }

    UnRegister(eventName, handler) {
        if (this.eventList[eventName] == null) {
            return;
        }
        var index = this.eventList[eventName].indexOf(handler);
        if (index > -1) {
            this.eventList[eventName].splice(index, 1);
        }
    }

    handleEvent() {
        this.Register('mousedown', new MouseDownEvent(this.map));
        this.Register('mouseup', new MouseUpEvent(this.map));
        this.Register('mousemove', new MouseMoveEvent(this.map));
    }

}