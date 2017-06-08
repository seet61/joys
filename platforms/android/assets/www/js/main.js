var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example',
    { preload: preload, create: create, update: update, render: render });

//Переменные
var block1Count, block2Count, block3Count;
var count1=0;
var count2=0;
var count3=0;

function preload() {
    game.load.bitmapFont('desyrel', 'css/desyrel.png', 'css/desyrel.xml');
    game.load.spritesheet('item', 'img/number-buttons-90x90.png', 90, 90);
}

function create() {
    //Фон
    game.stage.backgroundColor = '#124184';

    //Линии
    //Горизонтальная линия
    this.line1 = new Phaser.Line(0, height/2, width, height/2);
    //Линия слева
    this.line2 = new Phaser.Line(width*0.33, 0, width*0.33, height/2);
    //Линия справа
    this.line3 = new Phaser.Line(width*0.66, 0, width*0.66, height/2);

    //Зоны
    var block1 = game.add.bitmapText(width*0.33/2, height/4, 'desyrel', '1 <> 2', 64);
    block1.anchor.x = 0.5;
    block1.anchor.y = 0.5;
    block1Count = game.add.bitmapText(width*0.33/6, height/12, 'desyrel', count1, 32);
    block1Count.anchor.x = 1;
    block1Count.anchor.y = 1;

    var block2 = game.add.bitmapText(width*0.5, height/4, 'desyrel', '3 <> 4', 64);
    block2.anchor.x = 0.5;
    block2.anchor.y = 0.5;
    block2Count = game.add.bitmapText(width*0.33+width*0.33/6, height/12, 'desyrel', count2, 32);
    block2Count.anchor.x = 1;
    block2Count.anchor.y = 1;

    var block3 = game.add.bitmapText(width-width*0.33/2, height/4, 'desyrel', '5 <> 6', 64);
    block3.anchor.x = 0.5;
    block3.anchor.y = 0.5;
    block3Count = game.add.bitmapText(width*0.66+width*0.33/6, height/12, 'desyrel', count3, 32);
    block3Count.anchor.x = 1;
    block3Count.anchor.y = 1;

    addItem();
}

function update() {
    //game.input.events.addOnce(updateText, this);
}

function render() {
    //Горизонтальная линия
    game.debug.geom(this.line1);
    game.debug.geom(this.line1, '#ffff00');
    //Линия слева
    game.debug.geom(this.line2);
    game.debug.geom(this.line2, '#ffff00');
    //Линия справа
    game.debug.geom(this.line3);
    game.debug.geom(this.line3, '#ffff00');
}

function addItem(){
    //Загрузка слуйчаного элемента в нижней части экрана по середне
    this.number = Math.floor(Math.random()*5) + 1;
    item = game.add.sprite(window.innerWidth/2-45, window.innerHeight-90, 'item', this.number);
    this.number += 1;

    //Добавляем изменяемость
    item.inputEnabled = true;
    //Перемещаемым
    item.input.enableDrag();
    //Привязываем его к нижней части экрана
    item.events.onDragStop.add(fixLocation);
}

function fixLocation(item) {
    //Помещаем элемент в окошко, ести он перешел середину
    if (item.y > height/2) {
        //Приземляем в нижнюю часть экрана
        item.y = height-90;
    } else {
        //Перешли выше линии
        console.log('Выше линии: ' + this.number);
        //item.y = height/2-90;
        analyzePosition();
    }
}

function analyzePosition() {
    var posX = item.x+45;
    if ((posX < width*0.33) && (this.number == 1 || this.number == 2)) {
        // 1 или 2
        console.log('1 блок');
        block1Count.setText(++count1);
        item.destroy();
        addItem();
    } else if ((width*0.33 < posX) && (posX < width*0.66) && (this.number == 3 || this.number == 4)) {
        // 3 или 4
        console.log('2 блок');
        block2Count.setText(++count2);
        item.destroy();
        addItem();
    } else if ((posX > width*0.66) && (this.number == 5 || this.number == 6)) {
        // 5 или 6
        console.log('3 блок');
        block3Count.setText(++count3);
        item.destroy();
        addItem();
    }
}

function updateText() {
    this.block1Count.setText(this.count1);
}