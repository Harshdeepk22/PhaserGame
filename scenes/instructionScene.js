import {CST} from "../cst.js";
import {gameScene} from "./gameScene.js";

const COLOR_PRIMARY = 0xf2f2f2;
const COLOR_LIGHT = 0xbfbfbf;
const COLOR_DARK = 0x737373;

export class instructionScene extends Phaser.Scene {
    constructor ()
    {
        super({
            key: CST.SCENES.INSTRUCTION
        });

        this.playbutton;
        this.countdown_1;
        this.countdown_2;
        this.countdown_3;

        this.count = 2;
        this.enter;
    }

    init()
    {
        // ebgAPI.calls.send_event(null, 'init_scene_instruction');

    }


    preload ()
    {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: './vendor/plugins/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create ()
    {
        // this.cameras.main.setViewport(0, 0, 1280, 800);

        let font;

        this.add.image(0, 30, 'instructions_title').setOrigin(0);
        this.add.image(0, 600, 'instructions_logo').setOrigin(0);
        this.add.image(788, 0, 'instructions_line').setOrigin(0);
        this.add.image(805, 164, 'instructions_play_header').setOrigin(0);

        this.countdown_1 = this.add.image(922, 345, 'countdown_1').setOrigin(0)
        this.countdown_1.visible = false;

        this.countdown_2 = this.add.image(922, 345, 'countdown_2').setOrigin(0)
        this.countdown_2.visible = false;

        this.countdown_3 = this.add.image(922, 345, 'countdown_3').setOrigin(0)
        this.countdown_3.visible = false;

        this.playbutton = this.add.image(922, 345, 'play_button_yellow').setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => this.clickStart());

        // let fonttype;
        //
        // if (ebgAPI.config.font.font_name === 'CenturyGothic') {
        //     fonttype = 'Arial';
        // }
        //
        // if (ebgAPI.config.font.font_name === 'EduAidGr1') {
        //     fonttype = 'EduAidGr1';
        // }

        // let txt_style = ebgAPI.config.font.font_size+'pt';

        let fonttype = 'Arial';

        let txt_style = '14pt';


        let textStyle = {
            fontFamily: fonttype,
            fontSize: txt_style,
            fill: '#737373',
            align: 'left',
            lineSpacing: 10,
            wordWrap: {width: 700, useAdvancedWrap: true}};

        // let instructions_db = "\n"+ebgAPI.config.elements.text.instructions;

        let instructions_db = "\nWe are going to read a short story. Concentrate on reading the words you have been working with. Remember the questions we've asked in the previous exercises. Now allow your eyes to flow from left to right across each sentence. You will be asked 10 questions at the end of the story. Our target is 70%.";

        // this.add.text(75, 250, ebgAPI.config.elements.text.instructions, textStyle);

        let textArea = this.rexUI.add.textArea({
            x: 435,
            y: 380,
            width: 730,
            height: 475,

            // Elements
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            text: this.rexUI.add.BBCodeText(0,0,instructions_db,textStyle),

            scroller: true,

            space: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5,

                text: 3,
            },

        })
            .layout();

        textArea
            .setText(instructions_db);

        let status = textArea.scrollerEnable;

        this.enter = this.input.keyboard.addKey('ENTER')
            .on('down', () => this.clickStart());


        console.log(status);
    }

    clickStart() {
        this.playbutton.visible = false;
        this.countdown_1.visible = false;
        this.countdown_2.visible = false;
        this.countdown_3.visible = true;

        let timer = this.time.addEvent({
            delay: 700,                // ms
            callback: this.countDown,
            //args: [],
            callbackScope: this,
            repeat: 3
        });
    }

    countDown() {

        console.log("count = "+this.count);
        switch(this.count) {
            case 3:
                this.playbutton.visible = false;
                this.countdown_1.visible = false;
                this.countdown_2.visible = false;
                this.countdown_3.visible = true;
                break;
            case 2:
                this.playbutton.visible = false;
                this.countdown_1.visible = false;
                this.countdown_2.visible = true;
                this.countdown_3.visible = false;
                break;
            case 1:
                this.playbutton.visible = false;
                this.countdown_1.visible = true;
                this.countdown_2.visible = false;
                this.countdown_3.visible = false;
                break;
            case 0:
                console.log("next scene");
                this.scene.add(CST.SCENES.GAME, gameScene, false);
                this.scene.start(CST.SCENES.GAME);
                break;
        }

        this.count--;
    }
}
