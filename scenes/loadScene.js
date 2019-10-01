import {CST} from "../cst.js";
import {instructionScene} from "../scenes/instructionScene.js";

export class loadScene extends Phaser.Scene {
    constructor ()
    {
        super({
            key: CST.SCENES.LOAD
        });
    }

    init()
    {
        // ebgAPI.calls.send_event(null, 'init_scene_load');
    }

    preload ()
    {
        this.load.scenePlugin({
            key: 'WebFont',
            url: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
            sceneKey: 'WebFont'
        });

        // let base_url = ebgAPI.config.elements.element_base_url;

        this.add.image(0, 74, 'splash_slogan').setOrigin(0);
        this.add.image(0, 245, 'splash_loader_bg').setOrigin(0);
        this.add.image(0, 600, 'splash_logo').setOrigin(0);

        this.add.image(226, 319, 'splash_loader_circle1').setOrigin(0);

        let splash_loader_line1 = this.add.image(300, 352, 'splash_loader_line').setOrigin(0);
        splash_loader_line1.visible = false;

        let splash_loader_line2 = this.add.image(555, 352, 'splash_loader_line').setOrigin(0);
        splash_loader_line2.visible = false;

        let splash_loader_line3 = this.add.image(808, 352, 'splash_loader_line').setOrigin(0);
        splash_loader_line3.visible = false;

        let splash_loader_circle2 = this.add.image(478, 319, 'splash_loader_circle2').setOrigin(0);
        splash_loader_circle2.visible = false;

        let splash_loader_circle3 = this.add.image(734, 319, 'splash_loader_circle3').setOrigin(0);
        splash_loader_circle2.visible = false;

        let splash_loader_circle4 = this.add.image(984, 319, 'splash_loader_circle4').setOrigin(0);
        splash_loader_circle2.visible = false;

        // let splash_run = this.add.image(984, 319, 'splash_run').setOrigin(0);
        let splash_run = this.add.image(380, 560, 'splash_run').setOrigin(0);
        splash_run.visible = false;



        this.load.on('progress', function (value) {

            // console.log(value);

            if (value >= 0.14) {
                splash_loader_line1.visible = true;

            }

            if (value >= 0.28) {

                splash_loader_circle2.visible = true;
            }

            if (value >= 0.42) {
                splash_loader_line2.visible = true;

            }

            if (value >= 0.56) {
                splash_loader_circle3.visible = true;
            }

            if (value >= 0.70) {
                splash_loader_line3.visible = true;
            }

            if (value >= 0.84) {
                splash_loader_circle4.visible = true;
            }



        });


        this.load.on('complete', function () {
            splash_run.visible = true;

            WebFont.load({
                active: () => this.loaded = true,
                custom: {
                    families: ['CenturyGothic','EduAidGr1'],
                    urls: ['assets/style/fonts.css']
                }
            });

            // let story_id = ebgAPI.config.story_id;

            // ebgAPI.calls.get_resource(story_id,  function (jsonObj) {
            //     ebgAPI.resource = jsonObj.payload;
            //     console.log(ebgAPI.resource);
            // });

        });

        this.load.image('instructions_line', 'assets/images/instructions_line.png');
        this.load.image('instructions_logo', 'assets/images/instructions_logo.png');
        this.load.image('instructions_play_header', 'assets/images/instructions_play_header.png');
        this.load.image('instructions_title', 'assets/images/instructions_title.png');
        this.load.image('play_button_gray', 'assets/images/play_button_gray.png');
        this.load.image('play_button_yellow', 'assets/images/play_button_yellow.png');
        this.load.image('game_box', 'assets/images/game_box.png');
        this.load.image('game_logo', 'assets/images/game_logo.png');
        this.load.image('game_next', 'assets/images/game_next.png');
        this.load.image('game_scrollbar', 'assets/images/game_scrollbar.png');
        // this.load.image('game_scrollbar_border', 'assets/images/game_scrollbar_border.png');
        this.load.image('game_title', 'assets/images/game_title.png');
        this.load.image('game_answers_title', 'assets/images/game_answers_title.png');
        this.load.image('normal', 'assets/images/answer_button_normal.png');
        this.load.image('correct', 'assets/images/answer_button_correct.png');
        this.load.image('incorrect', 'assets/images/answer_button_incorrect.png');
        this.load.image('game_done_title', 'assets/images/game_done_title.png');
        this.load.image('game_done_button_title', 'assets/images/game_done_button_title.png');
        this.load.image('countdown_1', 'assets/images/countdown_1.png');
        this.load.image('countdown_2', 'assets/images/countdown_2.png');
        this.load.image('countdown_3', 'assets/images/countdown_3.png');

        this.load.image('slotmask', 'assets/images/mask_slot.png');     // added by Dj 0710
        this.load.image('slotframe', 'assets/images/slotframe.png');    // added by Dj 0716


        // console.log(base_url);

        // console.log('instruction line -> '+ebgAPI.config.elements.image.instructions_line);
    }

    create () {
        let game = this.scene.add(CST.SCENES.INSTRUCTION, instructionScene, false);
        setTimeout(function () {

            game.start(CST.SCENES.INSTRUCTION);
        }, 1000);
    }

}
