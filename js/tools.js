/// <reference path="../js/units.js"/>
/// <reference path="../js/chart.js"/>
/// <reference path="../js/line.js"/>
/// <reference path="../js/jquery-1.11.1.min.js"/>

$(document).ready(function () {
    var chart = $('.chart');
    $('#nodeCreate').click(function () {
        var node = new Node("New node", 10, 10);
        node.render(chart);
    });
    $('#lineCreate').click(function () {
        var line = new Line({ begin: new Point(0, 0), end: new Point(100, 100) });
        line.render(chart);
    });
    $('#glyphCreate').click(function () {
        var glyph = new Glyph(10, 10, 'left.png');
        glyph.render(chart);
    });
});