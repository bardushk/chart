/// <reference path="../js/units.js"/>
/// <reference path="../js/jquery-1.11.1.min.js"/>

//
// Счетчик объектов
//
var counter = (function () {
    var _count = 0;
    return {
        newID: function () {
            _count++;
            return this;
        },
        getValue: function(){
            return _count;
        },
        toString: function () {
            var _string = '00000' + _count,
                _digitNumber = 4;
            return 'id' + _string.substr(_string.length - _digitNumber);
        }
    }
})();

function htmlEntities(string) {
    return String(string).replace(/</g, '&lt;');
}

//
// Прямоугольники
// параметры: {
//     text - содержимое прямоугольника (произвольный html)
//     position: Point - левый верхний угол
//     cssClass: String - имя css класса
//     width: Number - ширина в пикселях
//     height: Number - высота в пикселях
//     isDraggable: bool - прямоугольник можно перетаскивать
// }
//
function Node(params){
    var _text = params.text || 'Прямоугольник',
        _position = params.position || new Point(0, 0),
	    _cssClass = params.cssClass || 'node',
        _id = counter.newID().toString(),
        _isDraggable = params || _isDraggable,
        _name = params.name || 'Прямоугольник ' + _id,
        _width = params.width || null,
        _height = params.height || null,
        _style = params.style || '';

    return {
        toString: function () {
            var result = '';
            result += 'position: ' + _position.toString();
            result += ', text: "' + htmlEntities(_text) + '"';
            result += ', cssClass: "' + _cssClass + '"';
            result += ', name: "' + _name + '"';
            if (_width) {
                result += ', width: ' + _width;
            }
            if (_height) {
                result += ', height: ' + _height;
            }
            if (_style) {
                result += ', style: "' + _style + '"';
            }
            return 'new Node({ ' + result + ' })';
        },

	    render: function (chart) {
	        _cssClass += _isDraggable ? ' element ' : '';
	        _style += ' left: ' + _position.left + 'px; top: ' + _position.top + 'px;';
	        if(_width) {
	            _style += 'width: ' + _width + 'px;';
	        }
	        if (_height) {
	            _style += ' height: ' + _height + 'px;';
	        }

	        chart.append('<div id = "' + _id + '" class = "' + _cssClass + '" style="' + _style + '"><div class = "nodeContent">' + _text + '</div></div>');
		    $('#elementList').prepend('<div id="elementList' + _id + '" class="elementList">' + _name + '</div>');
		}
	} 
}

function HorizontalSegment(left, top, length) {
    var _left = left,
        _top = top,
        _length = length,
        _begin = new Point(_left, _top),
        _end = new Point(_left + _length, _top),
        _id = counter.newID().toString(),
        _region = new Region(_begin, _end);
    return {
        render: function (chart) {
            chart.append('<div id = "' + _id + '" class = "line horizontalSegment" style="left: ' + _left + 'px; top: ' + _top + 'px; width: ' + _length + 'px;"></div>');
        },
        getRegion: function () {
            return _region;
        },
        toString: function () {
            return _region.toString();
        },
        shift: function (point) {
            return new HorizontalSegment(_left + point.left, _top + point.top, _length);
        }
    }
}
//
// Вертикальный сегмент
//
function VerticalSegment(left, top, length) {
    var _left = left,
        _top = top,
        _length = length,
        _begin = new Point(_left, _top),
        _end = new Point(_left, _top + _length),
        _id = counter.newID().toString(),
        _region = new Region(_begin, _end);
    return {
        render: function (chart) {
            chart.append('<div id = "' + _id + '" class = "line verticalSegment" style="left: ' + _left + 'px; top: ' + _top + 'px; height: ' + _length + 'px;"></div>');
        },
        getRegion: function () {
            return _region;
        },
        toString: function () {
            return _region.toString();
        },
        shift: function (point) {
            return new VerticalSegment(_left + point.left, _top + point.top, _length);
        }
    }
}
//
// Стрелки и другие значки
// left - число
// top - число
//
function Glyph(left, top, image) {
    var _left = left,
        _top = top,
        _id = counter.newID().toString(),
        _image = image;
    return {
        render: function (chart) {
            chart.append('<div id = "' + _id + '" class = "element glyph" style="left: ' + _left + 'px; top: ' + _top + 'px; background-image: url(images/' + _image + ')"></div>');
            $('#elementList').prepend('<div id="elementList' + _id + '" class="elementList">Glyph: ' +_id + ' ' + _image + '</div>');
        }
    }
}

//
// Пустой объект, предназначен для организации других объектов в целое
//
function Group(region) {
    var _region = region,
        _id = counter.newID().toString();
    return {
        render: function (chart) {
            var _group = chart.append('<div id = "' + _id + '" class = "element group" style = "left: ' + region.left + 'px; top:  ' + region.top + 'px; width: ' + region.width + 'px; height: ' + region.height + 'px;"></div>');
            $('#elementList').prepend('<div id="elementList' + _id + '" class="elementList">Group: ' + _id + '</div>');
            return _id;
        }
    }
}
//
// Рендерим все элементы
//
function createElements(chart, elementList) {
	for(var index in elementList){
		var node = elementList[index];
		node.render(chart);
	}
}
//
// Экспортируем элементы
//
function exportElement(elementList) {
    var result = '';
    for (var index in elementList) {
        var node = elementList[index];
        result += ',' + node;
    }
    return '[' + result + ']';
}
