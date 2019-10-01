import {CST} from "../cst.js";
import {gameanswerScene} from "../scenes/gameanswerScene.js";

const COLOR_PRIMARY = 0xefefef;

export class gameScene extends Phaser.Scene {
    constructor () {
        super({
            key: CST.SCENES.GAME
        });

        this.words = 0;
        this.seconds = 0;
        this.chars = 0;
        this.slot = {};     // textMask object
        this.wpm = 5000;    // tween duration in ms
        this.lines = [];    
        this.currLine = 0;
        this.currPage = 0;
    }

    init() {
        // ebgAPI.calls.send_event(null, 'init_scene_game');
        console.log("game scene");
    }

    preload () {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: '/vendor/plugins/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        // this.cameras.main.setViewport(0, 0, 1280, 800);
        let fonttype = "";

        this.game_box = this.add.image(70, 120, 'game_box').setOrigin(0);
        this.add.image(0, 30, 'game_title').setOrigin(0);
        this.add.image(945, 655, 'game_logo').setOrigin(0);

        // if (ebgAPI.config.font.font_name === 'CenturyGothic') {
        //     fonttype = 'Arial';
        // }
        //
        // if (ebgAPI.config.font.font_name === 'EduAidGr1') {
        //     fonttype = 'EduAidGr1';
        // }

        fonttype = 'Arial';

        // let txt_style = ebgAPI.config.font.font_size+'pt';

        let txt_style = '14pt';

        this.textStyle = {
            fontFamily: fonttype,
            fontSize: txt_style,
            fill: '#737373',
            align: 'left',
            lineSpacing: 10,
            wordWrap: {width: 1160}};

        // console.log(ebgAPI.resource);

        // let passage = "\n"+ebgAPI.resource.assets.text.text_content+"\n";

        let passage = "When he came to, his T-shirt was wet with blood. There was a gaping wound at the back of his head, deep cuts on his forehead and lacerations all down his body. Blood blocked both ears since it had dried. Ashley – his watch torn off in the fall - reckoned he must have been out for several hours. As he moved, pain wrecked his chest, and he spat blood. He tried to stand, but agonising pain from both ankles forced him down again. Through the fine drizzle he could see Paul's body draped over a ledge about 30 metres above. He shouted as loudly as his chest injuries allowed. There was no response - and no way could he climb the almost vertical rock that separated them. From first-aid and survival courses during his years as a Scout, Ashley remembered the importance of preserving body heat. His rucksack was still on, but its contents had scattered as he fell. Crawling round, he retrieved a few items: a change of clothes, sleeping bag, orange plastic survival bag, plastic first-aid box – now empty. The only food was a packet of nuts and raisins. He stumbled over to some trees and pulled on a clean T-shirt, sweater and waterproof jacket. Without removing his boots – he needed them to support his shattered ankles - he eased on a pair of trousers. Then he set up a rain trap, splitting the survival bag into one sheet and fastening it with clips to branches, to drain into the first-aid box underneath. Still slightly concussed, Ashley slumped in exhausted sleep. When he woke the sky had cleared. He drank water from the first-aid box, and pondered his next move. He knew he would never reach Paul. It would be better to get above the tree line, where rescuers could spot him from the air. Starting slowly up the mountain, he stumbled; his left ankle crumpled and he collapsed in agony. It was ten minutes before the pain began to subside. He set off again, but after 300 metres he was in such pain he could go no further. He fixed the rain trap and slept. Waking, he drained the first-aid box and continued his trance-like walk upwards.Come on, Ashley. You've got to keep moving.Another 300 metres and at last he had reached the tree line. He picked a two-metre-long ledge of rock, broke off branches to make a bed, set up the rain trap, and dried his clothes in the sun. As darkness came, he dressed again and eased himself into his sleeping bag. He remembered the limp body on the ledge. Then he realised he was all alone, without his friend. Since he and Paul had failed to turn up at the Operation Raleigh camp by nightfall, the alarm would already have been raised. He would surely be spotted by helicopter or search party the following day.";

        var st = new Phaser.GameObjects.Text(this, 0, 0, passage, null);

        st.setWordWrapWidth(1160);

        this.split = st.getWrappedText(st.text);

        this.nextPage();

        //this.words = this.wordCount(passage);
        //this.chars = this.charCount(passage);
    }
    
    update() {
    }

    nextLine() {
        if (this.currLine == this.lines.length) {
            if (this.completed) {
                this.scene.add(CST.SCENES.GAMEANSWER, gameanswerScene, false);
                this.scene.start(CST.SCENES.GAMEANSWER);
                this.stop = true;
            }
            else {
                this.currPage++;
                this.nextPage();
                this.tweens.getAllTweens()[0].targets[0].destroy();            }
        }
        else {
            this.doTween(this.currLine);
            if (this.lines[this.currLine + 1]) this.lines[this.currLine + 1].alpha = 0.3;
            if (this.lines[this.currLine + 2]) this.lines[this.currLine + 2].alpha = 0.15;
            this.currLine++;
        }
    }

    doTween = function(cl) {
        //console.log('CLLL--->', cl);
        var fired = false;
        this.lines[cl].alpha = 1;
        if (this.lines[cl - 2]) this.lines[cl - 2].alpha = 0.4;
        if (this.lines[cl - 3]) this.lines[cl - 3].alpha = 0.15;
       
        var graphicsss = this.add.graphics(50, 100);
        graphicsss.lineStyle(2, 0xbdb76b);
        graphicsss.lineTo(-180, this.lines[this.currLine].y-10);
        graphicsss.lineTo(140, this.lines[this.currLine].y-10);
        graphicsss.lineTo(110, this.lines[this.currLine].y+30);
        graphicsss.lineTo(-180, this.lines[this.currLine].y+30);
        graphicsss.lineTo(-180, this.lines[this.currLine].y-10);
        var new_image = graphicsss.stroke();
        var f = new_image;
        var t = this.add.image(0, 0, 'slotmask').setScale(4).setVisible(false);
        t.x = this.lines[cl].x - 110;
        t.y = this.lines[cl].y + 8;

        f.mask = this.add.image(78, 120, 'game_box').setOrigin(0).setScale(0.987).setVisible(false).createBitmapMask();

        this.lines[cl].mask = t.createBitmapMask();

        this.tweens.add({
            targets: f,
            x: 1280,
            ease: 'Linear',
            duration: this.wpm,
            onCompleteScope: this,
            onComplete: function (t, o) { o[0].destroy(); }
        });
        

        this.tweens.add({
            targets: t,
            x: 1280,
            ease: 'Linear',
            duration: this.wpm,
            onUpdateScope: this,
            onUpdate: function (t, o) { if (o.x > 1000 && !fired) { fired = true; this.nextLine(); } }
        });
    }

    nextPage() {
        for (var i = 0; i < this.lines.length; i++) this.lines[i].destroy();
        this.lines = [];
        for (var i = 0; i < 19; i++) {
            if (this.currPage * 19 + i == this.split.length) {
                this.completed = true;
                break;
            }
            this.lines[i] = this.add.text(90, i * 28 + 140, this.split[this.currPage * 19 + i], this.textStyle);
        }
        for (var i = 0; i < this.lines.length; i++) this.lines[i].alpha = 0.07;
        this.currLine = 0;
        this.nextLine();
    }

    wordCount(str) {
        return str.split(" ").length;
    }

    charCount(str) {
        return str.length;
    }

}
