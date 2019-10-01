import {preloadScene} from "./scenes/preloadScene.js";
import {CST} from "./cst.js";

window.onload = function () {
    //This is a blocking call - it retrieves the config in synchronous mode
    // ebgAPI.init(null, true);


    let gameConfig = {
        parent: "game_div",
        title: "Reading Test",
        width: 1280,
        height: 800,
        backgroundColor: 0xf2f2f2,
        transparent: true,
        type: Phaser.WEBGL
    }

    window.game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);

    window.game.scene.add(CST.SCENES.PRELOAD, preloadScene, false);
    window.game.scene.start(CST.SCENES.PRELOAD);
}


function resizeGame() {

    let windowHeight = jQuery(window).height();
    let windowWidth = jQuery(window).width();
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = 1280 / 800;
    let game_height;
    let game_width;
    let game_top;
    let game_left;

    // let canvas = document.getElementsByTagName('canvas')[0];

    console.log("width = "+windowWidth+"   height ="+windowHeight);
    console.log("ratio = "+windowRatio);

    if (windowHeight > 800) {
        if (windowWidth > 1280) {
            game_height = 800;
            game_width = 1280;
        } else {
            game_width = windowWidth;
            game_height = game_width / gameRatio;
        }
    } else {
        game_height = windowHeight;
        game_width = game_height * gameRatio;
    }

    game_top = (windowHeight - game_height) / 2;
    game_left = (windowWidth - game_width) / 2;

    $("#game_div").width(game_width);
    $("#game_div").height(game_height);
    // $("#game_div").css('top',game_top+'px');
    // $("#game_div").css('left',game_left+'px');

    // canvas.style.width = game_width + 'px';
    // canvas.style.height = game_height + 'px';


    // if (windowRatio < gameRatio) {
    //     canvas.style.width = windowWidth + "px";
    //     canvas.style.height = (windowWidth / gameRatio) + "px";
    // } else {
    //     canvas.style.width = (windowHeight * gameRatio) + "px";
    //     canvas.style.height = windowHeight + "px";
    // }
}


