
// MapBox

class MapBox {

    constructor(box) {
        box = box || {
            min: new Coordinate([0, 0]),
            max: new Coordinate([0, 0])
        };
        if (Array.isArray(box.min)) {
            box.min = new Coordinate(box.min);
        }
        if (Array.isArray(box.max)) {
            box.max = new Coordinate(box.max);
        }
        this.min = box.min;
        this.max = box.max;
    }

    toObject() {
        return { min: [this.min.lon, this.min.lat], max: [this.max.lon, this.max.lat] };
    }

    toString() {
        return `{ min: [${this.min.lon}, ${this.min.lat}], max: [${this.max.lon}, ${this.max.lat}] }`;
    }
}
