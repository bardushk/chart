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
    $('#exportButton').click(function () {
        console.log('#export', elementList);

        $('#export').html(exportElement(elementList));
    });
});