/// <reference path="../js/units.js"/>
/// <reference path="../js/chart.js"/>
/// <reference path="../js/jquery-1.11.1.min.js"/>
/// <reference path="../js/line.js"/>

function testLoadjQuery() {
    var _passed = !(typeof $ === 'undefined');
    var _message = 'Load jQuery';
    return { message: _message, passed: _passed };
}
//
// Сложение двух размерных единиц в пикселах
//
function testUnitAddPixels() {
    var _message = 'Пиксели  + пиксели: 10px + 20px = 30px';
    var _A = new Unit("10px");
    var _B = new Unit("20px");
    var _C = _A.add(_B);
    var _passed = (_C.toString() === '30px');
    console.log(_C);
    return {
        message: _message, passed: _passed
    }
}

//
// Сложение двух размерных единиц в процентах
//
function testUnitAddPercent() {
    var _message = 'Проценты + проценты: 10% + 20% = 30%';
    var _A = new Unit("10%");
    var _B = new Unit("20%");
    var _C = _A.add(_B);
    var _passed = (_C.toString() === '30%');
    return {
        message: _message, passed: _passed
    }
}

//
// Сложение пикселей с процентами
//
function testUnitAddPixelAndPercent() {
    var _message = 'Пиксели + проценты: 10% + 20px SyntaxError';
    var _A = new Unit("10%");
    var _B = new Unit("20px");
    var _passed = false;
    try {
        var _C = _A.add(_B);
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            _passed = true;
            _message += ' ' + e.message;
        }
    }
    return {
        message: _message, passed: _passed
    }
}
//
// Создание точки
//
function testPointCreate() {
    var _point = new Point(10, 20);
    var _passed = (_point.toString() === '(10,20)');
    var _message = 'Создание точки ' + _point.toString();
    return { message: _message, passed: _passed };
}

//
// Создание региона
//
function testRegionCreate() {
    var _pointA = new Point(10, 20),
        _pointB = new Point(30, 40),
        _region = new Region(_pointA, _pointB);
        _passed = _region.toString() === '(10,20) - (30,40)';
    var _message = 'Создание региона ' + _region.toString();
    return { message: _message, passed: _passed };
}

//
// Создание горизонтального сегмента и определение региона
//
function testHorizontalSegment() {
    var _segment = new HorizontalSegment(10, 20, 50),
        _passed = _segment.getRegion().toString() === '(10,20) - (60,20)',
        _message = 'Создание горизонтального сегмента и определение региона ' + _segment.getRegion().toString();
    return { message: _message, passed: _passed }
}

//
// Создание вертикального сегмента и определение региона
//
function testVerticalSegment() {
    var _segment = new VerticalSegment(60, 70, 120);
        _passed = _segment.getRegion().toString() === '(60,70) - (60,190)',
        _message = 'Создание вертикального сегмента и определение региона ' + _segment.getRegion().toString();
        return { message: _message, passed: _passed };
}


//
// Объединение регионов
//
function testRegionJoin() {
    var _regionA = new Region(new Point(10, 10), new Point(20, 20)),
        _regionB = new Region(new Point(5, 30), new Point(10, 40)),
        _regionC = new _regionA.join(_regionB),
        _passed = (_regionC.toString() === '(5,10) - (20,40)'),
        _message = 'Объединение прямоугольников ' + _regionC.toString();
    return { message: _message, passed: _passed };
}

//
// Тестирование линий
//
function testLine() {
    var _line = new Line({ begin: new Point(0, 0), segments: [new VerticalSegment(0, 0, 100), new HorizontalSegment(0, 100, 100)] }),
        _passed = _line.toString() === '(0,0) - (0,100)(0,100) - (100,100)',
        _message = 'Тестирование линий ' + _line.toString();
    return { message: _message, passed: _passed };

}

//
// Тестирование охватывающего региона для линий
//
function testLineGetRegion() {
    var _line = new Line({ begin: new Point(0, 0), segments: [new VerticalSegment(0, 0, 100), new HorizontalSegment(0, 100, 100)] }),
        _passed = _line.getRegion().toString() === '(0,0) - (100,100)',
        _message = 'Тестирование охватывающего региона для линий ' + _line.getRegion().toString();
    return { message: _message, passed: _passed };
}


//
// Тестирование нумератора объектов
//
function testCounter() {
    var _idValue = counter.getValue(),
        _idString = counter.toString(),        
        _idNextValue = counter.newID().getValue(),
        _idNextString = counter.toString(),
        _passed = _idNextValue - _idValue === 1;
    return { message: 'Тестирование нумератора объектов: ' + _idString + ', ' + _idNextString, passed: _passed };
}

//
// Тестирование генерацию сегментов
//
function testGenerateSegmnents() {
    var message = 'Тестирование генерацию сегментов',
        line = new Line({ begin: new Point(50, 10), end: new Point(10, 100) }),
        passed = line.toString() === '(40,0) - (40,45)(0,45) - (40,45)(0,45) - (0,90)';
    
    return { message: message + ' ' + line.toString(), passed: passed };
}

$(document).ready(function () {
    log($('.log'), testLoadjQuery());
    log($('.log'), testUnitAddPixels());
    log($('.log'), testUnitAddPercent());
    log($('.log'), testUnitAddPixelAndPercent());
    log($('.log'), testPointCreate());
    log($('.log'), testRegionCreate());
    log($('.log'), testRegionJoin());
    log($('.log'), testHorizontalSegment());
    log($('.log'), testVerticalSegment());
    log($('.log'), testLine());
    log($('.log'), testLineGetRegion());
    log($('.log'), testCounter());
    log($('.log'), testGenerateSegmnents());
});

function log(log, test) {
    var passedClass = (test.passed) ? 'ok' : 'fail';
    log.append('<div class = "test ' + passedClass + '">' + test.message + '</div>');
}

