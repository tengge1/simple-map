
// EventSystem
class EventSystem {

    constructor(map) {
        this.map = map;
        this.eventList = {}; // { event1: [handler1, handler2, handler3], event2: [handler1, ...] }

        // add your custom event here
        let dragEvent = new DragEvent(this.map);
        dragEvent.handle(this);
    }

    register(eventName, handler) {
        if (this.eventList[eventName] == null) {
            this.eventList[eventName] = [];
            this.map.container.addEventListener(eventName, (e) => {
                this.eventList[eventName].forEach((n, i) => {
                    n.call(this, e);
                });
            });
        }
        if (this.eventList[eventName].indexOf(handler) == -1) {
            this.eventList[eventName].push(handler);
        }
    }

    unRegister(eventName, handler) {
        if (this.eventList[eventName] == null) {
            return;
        }
        var index = this.eventList[eventName].indexOf(handler);
        if (index > -1) {
            this.eventList[eventName].splice(index, 1);
        }
    }

}