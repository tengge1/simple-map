
// MapConfig
class MapConfig {

    constructor(config) {
        config = config || {};
        this.center = config.center || [116.964311, 36.692636];
        this.zoom = config.zoom || 18;
        this.tileSystem = config.tileSystem || new BingTileSystem();
    }

}
