
// Coordinate

class Coordinate {

    constructor(coordinate) {
        coordinate = coordinate || [0, 0];
        if (Array.isArray(coordinate)) {
            this.lon = coordinate[0];
            this.lat = coordinate[1];
        } else {
            this.lon = coordinate.lon;
            this.lat = coordinate.lat;
        }
    }

    toArray() {
        return [this.lon, this.lat];
    }

    toObject() {
        return { lon: this.lon, lat: this.lat };
    }

    toString() {
        return `[${this.lon}, ${this.lat}]`;
    }
}