
// RenderSystem
class RenderSystem {

    constructor(map) {
        this.map = map;
        this.renderList = {}; // { name1: renderer1, name2: renderer2, ... }

        // register your custom renderer here
        this.register('tile', new TileRenderer(this.map));
    }

    render() {
        Object.keys(this.renderList).forEach((n, i) => {
            var renderer = this.renderList[n];
            renderer.render(this.map);
        });
    }

    register(name, renderer) {
        if (Object.keys(this.renderList).indexOf(name) > -1) {
            return;
        }
        this.renderList[name] = renderer;
    }

    unregister(name) {
        if (Object.keys(this.renderList).indexOf(name) == -1) {
            return;
        }
        delete this.renderList[name];
    }

}