/***
 *
 *游戏运行的逻辑层
 *控制方块的变换,移动，消行，游戏开始和暂停
 *@author:Waterbear
 */

/*****service对象*******/

var service;

/******消的行数*********/

var Line = 0;

/*****开始游戏*******/

var startGame = function() {


    //调用diaAct.js文件中的函数,初始化地图

    mapInit();

    //获得diaAct.js文件中的Service对象

    service = getService();

    //随即生成下一个方块

    service.nextType = parseInt(Math.random() * 7);

    //生成当前方块

    service.nowType = parseInt(Math.random() * 7);

    //调用diaAct.js文件中的InitAct方法

    InitAct();

    InitcvsGame(service.GameMap,service.points,service.nowType);

    //调用draw.js文件中的InitcvsNext方法

    InitcvsNext(service.nextType);
    $('#score').empty();
};





/*****方向键上(旋转)********/

var moveUp = function() {

    //调用diaAct文件中的旋转函数

    Rotate();
};

/********方向键左(左移)**********/

var moveLeft = function() {

    //调用diaAct.js文件中的移动函数

    move(-1,0);
};

/*********方向键右(右移)**********/
var moveRight = function() {
    move(1,0);
};

/*******方向键下(下落)************/

var moveDown = function() {

    //能下落则不继续

    if(move(0,1)){
        return;
    }
    for(var i = 0; i < service.points.length; ++i){
        service.GameMap[service.points[i].x][service.points[i].y] = true;
    }

    //调用加分方法

    addLine();

    //生成当前方块

    service.nowType = service.nextType;

    //随即生成下一个方块

    service.nextType = parseInt(Math.random() * 7);


    //调用diaAct.js文件中的InitAct方法

    InitAct();

    InitcvsGame(service.GameMap,service.points,service.nowType);

    //调用draw.js文件中的InitcvsNext方法

    InitcvsNext(service.nextType);

    //判断游戏是否失败

   if(isLose()){
       reSet();
   }
};


/********计分方法******************/

var addLine = function() {
    for(var i = 0; i < 18; ++i){
        if(isCanRemoveLine(i)){
            Line++;
            removeLine(i);
        }
    }

    $('#score').empty();
    $('#score').append("<p>&nbsp" + (Line * 20) + "分</p>");
};


/******判断某一行能否消行**********/

var isCanRemoveLine = function(y) {
    for(var x = 0; x < 12; ++x){
        if(!service.GameMap[x][y]){
            return false;
        }
    }
    return true;
};

/******消除某一行********/

var removeLine = function(rowNumber) {
    for(var x = 0; x < 12; ++x){
        for(var y = rowNumber; y > 0; --y){
            service.GameMap[x][y] = service.GameMap[x][y-1];
        }
        service.GameMap[x][0] = false;
    }
    InitcvsGame(service.GameMap,service.points,service.nowType);
};

/*******判断游戏是否失败**********/

var isLose = function() {
    for(var i = 0; i < service.points.length; ++i){
        if(service.GameMap[service.points[i].x][service.points[i].y]){
            return true;
        }
    }
    return false;
};

/*****游戏失败时的重置函数*****/

var reSet = function() {
    Control.isLose = true;
    alert("少侠你完蛋了!");
};
