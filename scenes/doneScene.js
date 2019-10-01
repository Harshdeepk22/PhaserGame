import {CST} from "../cst.js";
// import {gameScene} from "../scenes/gameScene.js";

export class doneScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.DONE
        });

        this.words = 0;
        this.seconds = 0;
        this.chars = 0;
        this.score = 0;
        this.message;
    }

    init(data) {


        // ebgAPI.calls.send_event(function(ajax_response) {
        //     //Do score calculation as needed (var "data" is available from parent function)
        //     let wpm = data.words / data.seconds;
        //
        //     //Fire "results_calculated" event and send results data object
        //     ebgAPI.calls.send_event(null, 'results_calculated', {
        //         wpm: wpm,
        //         score: data.score,
        //     }, true, true);
        // }, 'init_scene_done',true,true);

    }

    preload() {
    }

    create() {
        this.cameras.main.setViewport(0, 0, 1280, 800);

        this.add.image(0, 44, 'game_done_title').setOrigin(0);
        this.add.image(0, 600, 'instructions_logo').setOrigin(0);
        this.add.image(788, 0, 'instructions_line').setOrigin(0);
        this.add.image(805, 164, 'game_done_button_title').setOrigin(0);

        let donebutton = this.add.image(922, 345, 'play_button_yellow').setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => this.clickStart());

        // let done = ebgAPI.config.elements.text.done;

        let done = "Well done! You have completed this placement. Your results will be used to compile the best practise course for your individual training sessions.";
        this.message = done;

        // let i;
        // for (i = 0; i < done.length; i++) {
        //
        //     // console.log("value = "+done[i].value+": start = "+done[i].range_start+": end = "+done[i].range_end);
        //
        //     if (this.score >= done[i].range_start && this.score <= done[i].range_end) {
        //         this.message = done[i].value;
        //         // console.log("message -> "+this.message);
        //     }
        //
        // }

        let font;

        // if (ebgAPI.config.font.font_name === 'CenturyGothic') {
        //     font = 'Arial';
        // }
        //
        // if (ebgAPI.config.font.font_name === 'EduAidGr1') {
        //     font = 'EduAidGr1';
        // }
        //
        // let txt_style = ebgAPI.config.font.font_size + 'pt ' + font;
        //
        // let textStyle = {
        //     font: txt_style,
        //     fill: '#737373',
        //     align: 'left',
        //     wordWrap: {width: 670, useAdvancedWrap: true}
        // };

        this.fonttype = 'Arial';
        this.txt_style = '14pt';

        this.textStyle = {
            fontFamily: this.fonttype,
            fontSize: this.txt_style,
            fill: '#737373',
            align: 'left',
            lineSpacing: 10,
            wordWrap: {width: 700, useAdvancedWrap: true}};


        this.add.text(75, 165, this.message, this.textStyle);


    }

    clickStart() {
        console.log('clicked');
        // ebgAPI.calls.send_event(function () {
        //     window.parent.close_exercise_app();
        // }, 'done_button_clicked', {attempt_count: 3});

    }
}
