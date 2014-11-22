/// <reference path="../js/jquery-1.11.1.min.js"/>
/// <reference path="../js/diagram.js"/>

function testLoadjQuery() {
    var passed = !(typeof $ === 'undefined');
    var message = 'Load jQuery';
    return { message: message, passed: passed };
}
//
// Сложение двух размерных единиц в пикселах
//
function testUnitAddPixels() {
    var message = 'Создание элемента: ';
    Diagramm.addElement({});
    var passed = Diagramm === '';
    return {
        message: message + Diagramm, passed: passed
    }
}


$(document).ready(function () {
    log($('.log'), testLoadjQuery());
    log($('.log'), testUnitAddPixels());
});

function log(log, test) {
    var passedClass = (test.passed) ? 'ok' : 'fail';
    log.append('<div class = "test ' + passedClass + '">' + test.message + '</div>');
}

