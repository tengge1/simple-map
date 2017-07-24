
class Map {

    constructor(container_id, config) {
        if (container == undefined) {
            throw Error('Map: container_id is undefined.');
        }
        if (config == null) {
            config = new MapConfig();
        }
        if (!config instanceof MapConfig) {
            throw Error('Map: config is not instance of MapConfig.');
        }
        this.container_id = container_id;
        this.container = document.getElementById(container_id);
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.config = config;
        this.center = this.config.center;
        this.zoom = this.config.zoom;

        // canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext('2d');

        // system
        this.cache = new Cache(this);
        this.tileSystem = this.config.tileSystem;
        this.eventSystem = new EventSystem(this);
        this.renderSystem = new RenderSystem(this);

        this.isMouseDown = false;
        this.mouse = this.getCenterScreenXY();

        // start render
        this.renderSystem.render();
    }

    getCenter() {
        return this.center;
    }

    getCenterScreenXY() {
        return [this.width / 2, this.height / 2];
    }

    getCenterPixelXY() {
        let xy = this.tileSystem.longLatToPixelXY(this.center[0], this.center[1], this.zoom);
        return xy;
    }

    getMouse() {
        let mousePixelXY = this.getMousePixelXY();
        return this.tileSystem.pixelXYToLongLat(mousePixelXY[0], mousePixelXY[1], parseInt(this.zoom));
    }

    getMouseScreenXY() {
        return this.mouse;
    }

    getMousePixelXY() {
        let centerScreenXY = this.getCenterScreenXY();
        let centerPixelXY = this.getCenterPixelXY();

        let mouseXY = this.getMouseScreenXY();
        let mousePixelX = centerPixelXY[0] + mouseXY[0] - centerScreenXY[0];
        let mousePixelY = centerPixelXY[1] + mouseXY[1] - centerScreenXY[1];
        return [mousePixelX, mousePixelY];
    }

    setCenter(center) {
        this.center = center;
        this.renderSystem.render();
    }

    getZoom() {
        return this.zoom;
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }
}
