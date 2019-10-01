window.onload = function() {

    // Extract splash_style
    var url_string = window.location.href;
    var url = new URL(url_string);
    var splash_style = url.searchParams.get("splash_style");

    //Set game ratio
    var gameRatio = window.innerWidth/window.innerHeight;

    //Create game
    var config = {
        width:1280,
        height: 800,
        zoom: 1,
        type: Phaser.AUTO,
       // parent: Phaser.CANVAS,
        title: "Reading Test",
        backgroundColor: '#efefef'
    };


    var game = new Phaser.Game(config),
        main = function () {};

    //Set global variables
    var firstRunLandscape;
    var base_url;
    var api;
    var font;
    var results = {};
    var seconds = 0;
    var words = 0;
    var words_per_minute;
    var questions = [];
    var question;
    var answer_1;
    var answer_2;
    var answer_3;
    var answer_4;
    var current_question = 0;
    var no_of_questions = 0;
    var button_1;
    var button_2;
    var button_3;
    var button_4;
    var correct_1;
    var correct_2;
    var correct_3;
    var correct_4;
    var incorrect_1;
    var incorrect_2;
    var incorrect_3;
    var incorrect_4;
    var score;





    main.prototype = {

        init: function () {
            ebgAPI.calls.send_event(null, 'init_state_splash');
            console.log(ebgAPI.config);
            base_url = ebgAPI.config.elements.element_base_url;
            //console.log(base_url);

        },

        preload:function(){

            firstRunLandscape = game.scale.isGameLandscape;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.forceOrientation(true, false);
            game.scale.enterIncorrectOrientation.add(handleIncorrect);
            game.scale.leaveIncorrectOrientation.add(handleCorrect);

            if (splash_style == 'simple')
            {
                //game.load.image('splash_simple_loader', base_url + ebgAPI.config.elements.image.splash_simple_loader);
                console.log('In simple mode');
                game.load.atlasJSONHash('simple_loader', base_url + ebgAPI.config.elements.image.splash_simple_loader, base_url + ebgAPI.config.elements.downloadable_text_file.json_sprite_map);
            } else {
                //game.load.image('splash_check', base_url + ebgAPI.config.elements.image.splash_check);
                game.load.image('splash_loader_bg', base_url + ebgAPI.config.elements.image.splash_loader_bg);
                game.load.image('splash_loader_circle1', base_url + ebgAPI.config.elements.image.splash_loader_circle1);
                game.load.image('splash_loader_circle2', base_url + ebgAPI.config.elements.image.splash_loader_circle2);
                game.load.image('splash_loader_circle3', base_url + ebgAPI.config.elements.image.splash_loader_circle3);
                game.load.image('splash_loader_circle4', base_url + ebgAPI.config.elements.image.splash_loader_circle4);
                game.load.image('splash_loader_line', base_url + ebgAPI.config.elements.image.splash_loader_line);
                game.load.image('splash_logo', base_url + ebgAPI.config.elements.image.splash_logo);
                game.load.image('splash_slogan', base_url + ebgAPI.config.elements.image.splash_slogan);
                game.load.image('splash_run', base_url + ebgAPI.config.elements.image.splash_run);
            }

            game.load.script('polyfill', '/apps/lib/polyfill.js');
            game.load.script('utils', '/apps/lib/utils.js');
            game.load.script('splash', 'states/splash.js');

        },

        create:function(){
            //game.stage.backgroundColor = "#efefef";
            game.state.add('splash', splash);
            game.state.start('splash');
        }

    }



    function handleIncorrect(){

        if(!game.device.desktop){
            document.getElementById("turn").style.display="block";
        }

    }



    function handleCorrect(){

        if(!game.device.desktop){
            document.getElementById("turn").style.display="none";
        }

    }


    game.state.add('main', main);
    // game.state.start('main');

}