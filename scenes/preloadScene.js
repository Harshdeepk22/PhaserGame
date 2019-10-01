import {CST} from "../cst.js";
import {loadScene} from "../scenes/loadScene.js";

export class preloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.PRELOAD
        });
    }

    init(params) {
        // ebgAPI.calls.send_event(null, 'init_scene_preload');
    }

    preload() {
        // let base_url = ebgAPI.config.elements.element_base_url;

        this.load.image('splash_loader_bg', 'assets/images/splash_loader_bg.png');
        this.load.image('splash_loader_circle1', 'assets/images/splash_loader_circle1.png');
        this.load.image('splash_loader_circle2', 'assets/images/splash_loader_circle2.png');
        this.load.image('splash_loader_circle3', 'assets/images/splash_loader_circle3.png');
        this.load.image('splash_loader_circle4', 'assets/images/splash_loader_circle4.png');
        this.load.image('splash_loader_line', 'assets/images/splash_loader_line.png');
        this.load.image('splash_logo', 'assets/images/splash_logo.png');
        this.load.image('splash_slogan', 'assets/images/splash_slogan.png');
        this.load.image('splash_run', 'assets/images/splash_run.png');
    }

    create() {
        // this.cameras.main.centerOn(0, 0);
        this.scene.add(CST.SCENES.LOAD, loadScene, false);
        this.scene.start(CST.SCENES.LOAD);
    }
}
