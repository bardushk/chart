/// <reference path="../js/units.js"/>
/// <reference path="../js/jquery-1.11.1.min.js"/>


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

//
// Блоки
//
function Node(text, left, top){
	var _text = text,
        _left = left,
	    _top = top,
        _id = counter.newID().toString();
	return {
		render: function(chart){
		    chart.append('<div id = "' + _id +'" class = "element node" style="left: ' + _left + 'px; top: ' + _top + 'px;"><div class = "nodeContent">' + _text + '</div></div>');
		    $('#elementList').append('<div id="elementList' + _id + '" class="elementList">Node: ' + _id + ' ' + _text + '</div>');
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
            $('#elementList').append('<div>HorizontalSegment: ' + _id + '</div>');
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
            $('#elementList').append('<div>VerticalSegment: ' + _id + '</div>');

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
function Glif(left, top, image) {
    var _left = left,
        _top = top,
        _id = counter.newID().toString(),
        _image = image;
    return {
        render: function (chart) {
            chart.append('<div id = "' + _id + '" class = "element glif" style="left: ' + _left + 'px; top: ' + _top + 'px; background-image: url(images/' + _image + ')"></div>');
            $('#elementList').append('<div id="elementList' + _id + '" class="elementList">Glif: ' +_id + ' ' + _image + '</div>');
        }
    }
}
//
// Соединительные линии
// begin - Point начало линии
// segments - [Segment] массив сегментов 
//
function Line(params) {
    var _begin = params.begin || new Point(0,0) ,
        _segments = params.segments || [],
        _objectA = params.objectA || null,
        _getRegion = function () {
            var region = new Region(_begin, _begin);
            for (var index in _segments) {
                region = _segments[index].shift(_begin).getRegion().join(region);
            }
            return region;
        },
        _id = counter.newID().toString(),
        _group = new Group(_getRegion());

	return {
	    render: function (chart) {
	        var _groupId = _group.render(chart);
	        $('#elementList').append('<div id="elementList' + _id + '" class="elementList">Line: ' + _id + '</div>');
	        for (var index in _segments) {
			    var segment = _segments[index];
			    segment.render($('#' + _groupId));
			}
	    },
	    getRegion: _getRegion,
	    toString: function () {
	        var result = '';
	        for (var index in _segments) {
	            var segment = _segments[index];
	            result += segment.toString();
	        }
	        return result;
	    },
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
            return _id;
        }
    }
}

function createElements(chart, elementList) {
	for(var index in elementList){
		var node = elementList[index];
		node.render(chart);
	}
}
