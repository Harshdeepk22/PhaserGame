import {CST} from "../cst.js";
import {doneScene} from "../scenes/doneScene.js";

export class gameanswerScene extends Phaser.Scene {
    constructor () {
        super({
            key: CST.SCENES.GAMEANSWER
        });

        this.words = 0;
        this.seconds = 0;
        this.chars = 0;

        this.questions;
        this.no_of_questions = null;
        this.current_question = null;
        this.score = null;
        this.question = null;
        this.answer_1 = null;
        this.answer_2 = null;
        this.answer_3 = null;
        this.answer_4 = null;
        this.button_1 = null;
        this.button_2 = null;
        this.button_3 = null;
        this.button_4 = null;
        this.correct_1 = null;
        this.correct_2 = null;
        this.correct_3 = null;
        this.correct_4 = null;
        this.incorrect_1 = null;
        this.incorrect_2 = null;
        this.incorrect_3 = null;
        this.incorrect_4 = null;
        this.startbutton = null

        this.txt_style = null;
        this.textStyle = null;
        this.fonttype = null;

        this.gamedata = null;

        this.button_clicked;

    }

    init(data)
    {
        'use strict';

        this.words = data.words;
        this.seconds = data.seconds;
        this.chars = data.chars;

        console.log('words = '+this.words);
        console.log('seconds = '+this.seconds);

        this.question_set = {

            "items": [{
                "asset_item_id": 339,
                "question": "What is the unchallengeable truth?",
                "question_category": "LOT",
                "answers": [{
                    "value": "If you cannot control your anger, you will never succeed.",
                    "is_correct": false
                }, {
                    "value": "Show people if you are unhappy.",
                    "is_correct": false
                }, {
                    "value": "If you get upset tell someone.",
                    "is_correct": false
                }, {
                    "value": "If you cannot control your thoughts, you can never succeed.",
                    "is_correct": true
                }]
            }, {
                "asset_item_id": 340,
                "question": "What happens if you let your environment control your emotions?",
                "question_category": "LOT",
                "answers": [{
                    "value": "You can never succeed.",
                    "is_correct": true
                }, {
                    "value": "You will be unhappy.",
                    "is_correct": false
                }, {
                    "value": "You will be happy.",
                    "is_correct": false
                }, {
                    "value": "You will waste time.",
                    "is_correct": false
                }]
            }, {
                "asset_item_id": 341,
                "question": "What do successful people generate?",
                "question_category": "LOT",
                "answers": [{
                    "value": "Their own money and optimism.",
                    "is_correct": false
                }, {
                    "value": "Their own energy and optimism.",
                    "is_correct": true
                }, {
                    "value": "Their own time and optimism.",
                    "is_correct": false
                }, {
                    "value": "Their own time and money.",
                    "is_correct": false
                }]
            }, {
                "asset_item_id": 342,
                "question": "When others despair, what action do successful people take?",
                "question_category": "HOT",
                "answers": [{
                    "value": "To find reasons to celebrate the past.",
                    "is_correct": false
                }, {
                    "value": "To find reasons to be negative about their environment.",
                    "is_correct": false
                }, {
                    "value": "To find reasons to party.",
                    "is_correct": false
                }, {
                    "value": "To put the right meaning to what happened to them.",
                    "is_correct": true
                }]
            }, {
                "asset_item_id": 343,
                "question": "Which country does the story teller come from?",
                "question_category": "LOT",
                "answers": [{
                    "value": "Carolina",
                    "is_correct": false
                }, {
                    "value": "South-Africa",
                    "is_correct": false
                }, {
                    "value": "South-America",
                    "is_correct": false
                }, {
                    "value": "Canada",
                    "is_correct": true
                }]
            }, {
                "asset_item_id": 344,
                "question": "Which country is the story teller currently in?",
                "question_category": "LOT",
                "answers": [{
                    "value": "South-America",
                    "is_correct": false
                }, {
                    "value": "Carolina",
                    "is_correct": false
                }, {
                    "value": "Canada",
                    "is_correct": false
                }, {
                    "value": "South-Africa",
                    "is_correct": true
                }]
            }, {
                "asset_item_id": 345,
                "question": "How do Canada and South Africa compare, according to the writer?",
                "question_category": "HOT",
                "answers": [{
                    "value": "Their conditions are much the same.",
                    "is_correct": false
                }, {
                    "value": "South African people are not optimistic.",
                    "is_correct": false
                }, {
                    "value": "South Africa is not as calm and stable as Canada.",
                    "is_correct": true
                }, {
                    "value": "Canada has more happy people than South Africa.",
                    "is_correct": false
                }]
            }, {
                "asset_item_id": 346,
                "question": "Which two factors can influence your emotions?",
                "question_category": "HOT",
                "answers": [{
                    "value": "The environment and your energy.",
                    "is_correct": false
                }, {
                    "value": "Your friends and your job.",
                    "is_correct": false
                }, {
                    "value": "Your thoughts and your environment.",
                    "is_correct": true
                }, {
                    "value": "The truth and your country of origin.",
                    "is_correct": false
                }]
            }, {
                "asset_item_id": 347,
                "question": "What kind of people and businesses will succeed?",
                "question_category": "LOT",
                "answers": [{
                    "value": "Healthy ones",
                    "is_correct": false
                }, {
                    "value": "Friendly ones",
                    "is_correct": false
                }, {
                    "value": "Positive ones",
                    "is_correct": true
                }, {
                    "value": "Happy ones",
                    "is_correct": false
                }]
            }, {
                "asset_item_id": 348,
                "question": "What can make or break you?",
                "question_category": "LOT",
                "answers": [{
                    "value": "The kind of person you are.",
                    "is_correct": false
                }, {
                    "value": "The personality you have.",
                    "is_correct": false
                }, {
                    "value": "The energy that you radiate.",
                    "is_correct": true
                }, {
                    "value": "The kindness you show to people.",
                    "is_correct": false
                }]
            }]
        };

        this.questions = this.question_set.items;
        console.log(this.questions);

        this.no_of_questions = this.questions.length;
        console.log("no_of_questions -> "+this.no_of_questions);

        this.current_question = 0;

        this.score = 0;
    }


    preload ()
    {

    }

    create ()
    {
        // this.cameras.main.setViewport(0, 0, 1280, 800);

        this.add.image(0, 30, 'game_answers_title').setOrigin(0);
        this.add.image(945, 650, 'game_logo').setOrigin(0);

        this.fonttype = 'Arial';
        this.txt_style = '14pt';

        this.textStyle = {
            fontFamily: this.fonttype,
            fontSize: this.txt_style,
            fill: '#737373',
            align: 'left',
            lineSpacing: 10,
            wordWrap: {width: 700, useAdvancedWrap: true}};


        this.question = this.add.text(120, 150, '', this.textStyle);

        this.answer_1 = this.add.text(220, 221, '', this.textStyle).setOrigin(0);
        this.answer_2 = this.add.text(220, 336, '', this.textStyle).setOrigin(0);
        this.answer_3 = this.add.text(220, 450, '', this.textStyle).setOrigin(0);
        this.answer_4 = this.add.text(220, 568, '', this.textStyle).setOrigin(0);

        this.button_1 = this.add.image(114, 221, 'normal').setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => this.clickAnswer1());

        this.button_2 = this.add.image(114, 336, 'normal').setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => this.clickAnswer2());

        this.button_3 = this.add.image(114, 450, 'normal').setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => this.clickAnswer3());

        this.button_4 = this.add.image(114, 568, 'normal').setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => this.clickAnswer4());



        this.correct_1 = this.add.image(114, 221, 'correct').setOrigin(0);
        this.correct_2 = this.add.image(114, 336, 'correct').setOrigin(0);
        this.correct_3 = this.add.image(114, 450, 'correct').setOrigin(0);
        this.correct_4 = this.add.image(114, 568, 'correct').setOrigin(0);


        this.incorrect_1 = this.add.image(114, 221, 'incorrect').setOrigin(0);
        this.incorrect_2 = this.add.image(114, 336, 'incorrect').setOrigin(0);
        this.incorrect_3 = this.add.image(114, 450, 'incorrect').setOrigin(0);
        this.incorrect_4 = this.add.image(114, 568, 'incorrect').setOrigin(0);

        let answer_1_height = this.answer_1.height;
        let button_1_y = this.button_1.y;
        let button_1_height = this.button_1.height;
        let answer_1_y = button_1_y + ((button_1_height - answer_1_height) / 2);
        this.answer_1.y = answer_1_y;

        let answer_2_height = this.answer_2.height;
        let button_2_y = this.button_2.y;
        let button_2_height = this.button_2.height;
        let answer_2_y = button_2_y + ((button_2_height - answer_2_height) / 2);
        this.answer_2.y = answer_2_y;

        let answer_3_height = this.answer_3.height;
        let button_3_y = this.button_3.y;
        let button_3_height = this.button_3.height;
        let answer_3_y = button_3_y + ((button_3_height - answer_3_height) / 2);
        this.answer_3.y = answer_3_y;

        let answer_4_height = this.answer_4.height;
        let button_4_y = this.button_4.y;
        let button_4_height = this.button_4.height;
        let answer_4_y = button_4_y + ((button_4_height - answer_4_height) / 2);
        this.answer_4.y = answer_4_y;

        this.score_increase = 100 / this.no_of_questions;

        this.resetButtons();
    }




    nextQuestion() {

        this.question.text = this.questions[this.current_question].question;

        this.textStyle = {
            fontFamily: this.fonttype,
            fontSize: this.txt_style,
            fill: '#737373',
            align: 'left',
            lineSpacing: 10,
            wordWrap: {width: 1100, useAdvancedWrap: true}};

        this.question.setStyle(this.textStyle);

        this.answer_1.text = this.questions[this.current_question].answers[0].value;
        this.answer_2.text = this.questions[this.current_question].answers[1].value;
        this.answer_3.text = this.questions[this.current_question].answers[2].value;
        this.answer_4.text = this.questions[this.current_question].answers[3].value;

        this.answer_1.setStyle(this.textStyle);
        this.answer_2.setStyle(this.textStyle);
        this.answer_3.setStyle(this.textStyle);
        this.answer_4.setStyle(this.textStyle);

        let answer_1_height = this.answer_1.height;
        let button_1_y = this.button_1.y;
        let button_1_height = this.button_1.height;
        let answer_1_y = button_1_y + ((button_1_height - answer_1_height) / 2);
        this.answer_1.y = answer_1_y;

        let answer_2_height = this.answer_2.height;
        let button_2_y = this.button_2.y;
        let button_2_height = this.button_2.height;
        let answer_2_y = button_2_y + ((button_2_height - answer_2_height) / 2);
        this.answer_2.y = answer_2_y;

        let answer_3_height = this.answer_3.height;
        let button_3_y = this.button_3.y;
        let button_3_height = this.button_3.height;
        let answer_3_y = button_3_y + ((button_3_height - answer_3_height) / 2);
        this.answer_3.y = answer_3_y;

        let answer_4_height = this.answer_4.height;
        let button_4_y = this.button_4.y;
        let button_4_height = this.button_4.height;
        let answer_4_y = button_4_y + ((button_4_height - answer_4_height) / 2);
        this.answer_4.y = answer_4_y;

        console.log('1 ->'+this.questions[this.current_question].answers[0].is_correct);
        console.log('2 ->'+this.questions[this.current_question].answers[1].is_correct);
        console.log('3 ->'+this.questions[this.current_question].answers[2].is_correct);
        console.log('4 ->'+this.questions[this.current_question].answers[3].is_correct);

        this.button_1.inputEnabled = true;
        this.button_2.inputEnabled = true;
        this.button_3.inputEnabled = true;
        this.button_4.inputEnabled = true;
    }

    clickAnswer1() {
        console.log('clickAnswer1');

        this.button_1.inputEnabled = false;
        this.button_2.inputEnabled = false;
        this.button_3.inputEnabled = false;
        this.button_4.inputEnabled = false;

        if (this.questions[this.current_question].answers[0].is_correct) {
            this.correct_1.visible = true;
            this.score = this.score + this.score_increase;
            this.timedEvent = this.time.delayedCall(1000, this.resetButtons, [], this);
        } else {
            this.incorrect_1.visible = true;
            this.button_clicked = 1;

            let event = this.time.delayedCall(1000, this.setIncorrect, [], this);

        }

    }

    clickAnswer2() {
        console.log('clickAnswer2');

        this.button_1.inputEnabled = false;
        this.button_2.inputEnabled = false;
        this.button_3.inputEnabled = false;
        this.button_4.inputEnabled = false;

        if (this.questions[this.current_question].answers[1].is_correct) {
            this.correct_2.visible = true;
            this.score = this.score + this.score_increase;
            this.timedEvent = this.time.delayedCall(1000, this.resetButtons, [], this);
        } else {
            this.incorrect_2.visible = true;
            this.button_clicked = 2;
            let event = this.time.delayedCall(1000, this.setIncorrect, [], this);


        }

 }

    clickAnswer3() {
        console.log('clickAnswer3');

        this.button_1.inputEnabled = false;
        this.button_2.inputEnabled = false;
        this.button_3.inputEnabled = false;
        this.button_4.inputEnabled = false;

        if (this.questions[this.current_question].answers[2].is_correct) {
            this.correct_3.visible = true;
            this.score = this.score + this.score_increase;
            this.timedEvent = this.time.delayedCall(1000, this.resetButtons, [], this);
        } else {
            this.incorrect_3.visible = true;
            this.button_clicked = 3;
            let event = this.time.delayedCall(1000, this.setIncorrect, [], this);


        }

 }

    clickAnswer4() {
        console.log('clickAnswer4');

        this.button_1.inputEnabled = false;
        this.button_2.inputEnabled = false;
        this.button_3.inputEnabled = false;
        this.button_4.inputEnabled = false;

        if (this.questions[this.current_question].answers[3].is_correct) {
            this.correct_4.visible = true;
            this.score = this.score + this.score_increase;
            this.timedEvent = this.time.delayedCall(1000, this.resetButtons, [], this);
        } else {
            this.incorrect_4.visible = true;
            this.button_clicked = 4;
            let event = this.time.delayedCall(1000, this.setIncorrect, [], this);
        }

 }


    resetButtons() {
        this.current_question ++;

        this.correct_1.visible = false;
        this.correct_2.visible = false;
        this.correct_3.visible = false;
        this.correct_4.visible = false;
        this.incorrect_1.visible = false;
        this.incorrect_2.visible = false;
        this.incorrect_3.visible = false;
        this.incorrect_4.visible = false;

        console.log('current_question -> '+this.current_question);
        console.log('no_of_questions -> '+this.no_of_questions);
        console.log('score -> '+this.score);

        if (this.current_question < this.no_of_questions) {
            this.nextQuestion();
        } else {

            'use strict';

            this.gamedata = {
                words: this.words,
                seconds: this.seconds,
                chars: this.chars,
                score: this.score
            };

            this.scene.add(CST.SCENES.DONE, doneScene, false,this.gamedata);
            this.scene.start(CST.SCENES.DONE, this.gamedata);
        }


    }

    setIncorrect() {

        console.log("Set incorrect button");
        switch(this.button_clicked) {
            case 1:
                if (this.questions[this.current_question].answers[3].is_correct) {
                    this.incorrect_1.visible = false;
                    this.correct_4.visible = true;
                }
                if (this.questions[this.current_question].answers[1].is_correct) {
                    this.incorrect_1.visible = false;
                    this.correct_2.visible = true;
                }
                if (this.questions[this.current_question].answers[2].is_correct) {
                    this.incorrect_1.visible = false;
                    this.correct_3.visible = true;
                }
                break;
            case 2:
                if (this.questions[this.current_question].answers[0].is_correct) {
                    this.incorrect_2.visible = false;
                    this.correct_1.visible = true;
                }
                if (this.questions[this.current_question].answers[3].is_correct) {
                    this.incorrect_2.visible = false;
                    this.correct_4.visible = true;
                }
                if (this.questions[this.current_question].answers[2].is_correct) {
                    this.incorrect_2.visible = false;
                    this.correct_3.visible = true;
                }
                break;
            case 3:
                if (this.questions[this.current_question].answers[0].is_correct) {
                    this.incorrect_3.visible = false;
                    this.correct_1.visible = true;
                }
                if (this.questions[this.current_question].answers[1].is_correct) {
                    this.incorrect_3.visible = false;
                    this.correct_2.visible = true;
                }
                if (this.questions[this.current_question].answers[3].is_correct) {
                    this.incorrect_3.visible = false;
                    this.correct_4.visible = true;
                }
                break;
            case 4:
                if (this.questions[this.current_question].answers[0].is_correct) {
                    this.incorrect_4.visible = false;
                    this.correct_1.visible = true;
                }
                if (this.questions[this.current_question].answers[1].is_correct) {
                    this.incorrect_4.visible = false;
                    this.correct_2.visible = true;
                }
                if (this.questions[this.current_question].answers[2].is_correct) {
                    this.incorrect_4.visible = false;
                    this.correct_3.visible = true;
                }
                break;
        }

        this.timedEvent = this.time.delayedCall(1000, this.resetButtons, [], this);
    }
}
