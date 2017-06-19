/**
 * Created by dmitry.arefyev on 19.06.2017.
 *
 * this is main file with initialization
 */

var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'joy',
    { preload: preload, create: create, update: update, render: render  });


function preload() {
    game.load.image('menu_button', 'img/flixel-button.png');
    game.load.image('menu_items', 'img/number-buttons-90x90.png', 270, 180);
    game.load.bitmapFont('desyrel', 'css/desyrel.png', 'css/desyrel.xml');
    game.load.spritesheet('items', 'img/number-buttons-90x90.png', 90, 90);
}

function create() {
    game.stage.backgroundColor = '#337799';

    //Кнопка меню и ее события
    menu_button = game.add.sprite( width - 100, 10, 'menu_button');
    menu_button.inputEnabled = true;
    menu_button.events.onInputUp.add(function () {
        //Когда меню нажато
        game.paused = true;

        //Добавляем содержимое меню
        menu_items = game.add.sprite(width/2, height/2, 'menu_items');
        menu_items.anchor.setTo(0.5, 0.5);

        //Добавляем выбор элемента
        //choiseLabel = game.add.text(width/2, height-150, 'Нажмите вне меню для продолжения игры', { font: '30px Arial', fill: '#fff' });
        //choiseLabel.anchor.setTo(0.5, 0.5);
    });

    //Обработчик нажатий меню
    game.input.onDown.add(unpause, self);

    function unpause(event) {
        if (game.paused) {
            //Границы меню
            var x1 = width/2 - 270/2, x2 = width/2 + 270/2,
                y1 = height/2 - 180/2, y2 = height/2 + 180/2;

            //Если нажали внутри меню
            if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                var choisemap = ['numbers', 'two', 'three', 'four', 'five', 'six'];
                //Координаты нажатия
                var x = event.x - x1,
                    y = event.y - y1;

                //Вычисляем выбор
                var choise = Math.floor(x / 90) + 3 * Math.floor(y / 90);

                //Результат
                console.log('Вы выбрали игру: ' + choisemap[choise]);
                //choiseLabel.text = 'Вы выбрали игру: ' + choisemap[choise];
                if (choisemap[choise] == 'numbers') {
                    menu_items.destroy();
                    game.paused = false;
                    var numbers = new numbers(game);
                    numbers.anchor.setTo(0.5, 0.5);

                }
            } else {
                //Просто нажатие вне меню
                menu_items.destroy();
                //choiseLabel.destroy();
                //resume game
                game.paused = false;
            }
        }
    }
}

function update() {
    
}

function render() {

}
