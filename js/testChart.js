﻿/// <reference path="../js/units.js"/>
/// <reference path="../js/chart.js"/>
/// <reference path="../js/Line.js"/>
/// <reference path="../js/jquery-1.11.1.min.js"/>

var elementList = [

    new Line({
        begin: new Point(173, 150),
        end: new Point(75, 200)
    }),

    new Line({
        begin: new Point(180, 150),
        end: new Point(275, 200)
    }),

    new Line({
        begin: new Point(150, 225),
        end: new Point(200, 225)
    }),

	new Node({ text: '<b>Ново-Суксинское</b> месторорожение <br/>(СИКН 237)', position: new Point(0, 0), width: 150, height: 75, style: ';background: none; border: dashed 1px #333;' }),
    new Node({ text: '<b>«Азнакаевскнефть»</b><br/>(автоцистерны)', position: new Point(175, 0), width: 150, height: 75, style: ';background: none; border: dashed 1px #333;' }),
    new Node({ text: '<b>Ново-Суксинская УПВСН</b><br/>', position: new Point(0, 100), width: 325, height: 350, style: ';background: none; border: dashed 1px #333;' }),
    new Node({ text: '<b>Орловское  месторождение</b><br/>(скважины)', position: new Point(350, 100), width: 325, height: 150, style: ';background: none; border: dashed 1px #333;' }),
    new Node({ text: '<b>Зычебашское месторождение</b><br/>(Бурдинский участок)', position: new Point(375, 275), width: 150, height: 75, style: ';background: none; border: dashed 1px #333;' }),
    new Node({ text: '<b>ЗАО «ЯмбулОйл» Юсуповское  месторождение</b><br/>(Бурдинский участок)', position: new Point(375, 375), width: 150, height: 75, style: ';background: none; border: dashed 1px #333;' }),
    new Node({ text: '<b>СИКНС 2039</b>', position: new Point(383, 134), width: 76, height: 76, style: ';background: none; border: solid 1px #333; border-radius: 38px;' }),

	new Glyph(268, 330, 'up.png'),
	new Glyph(268, 408, 'down.png'),
	new Glyph(358, 443, 'right.png'),
];


$(document).ready(function () {
    createElements($('.chart'), elementList);
    dragMaster.init();
    dragMaster.makeDraggable('.element');
});
