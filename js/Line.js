/// <reference path="../js/chart.js"/>
//
// Класс Line
// файл: Line.js
// начат: 14.11.2014
//

//
// Соединительные линии
//
// Параметры:
// {
//        begin:    Point         - начало линии
//        end:      Point         - конец линии
//        segments: [(VerticalSegment|HorizontalSegment)]     - массив сегментов (необязательный параметр)   
// }
// Интерфейс:
// {
//        render: function(chart) - добавление html к объекту chart  
//        toString: function()    - к строке (0,0)-(100,100)
//        getRegion: function()   - получение ограничивающего прямоугольника
// }
function Line(params) {
    var _begin = params.begin || new Point(0, 0),
        _end = params.end || new Point(0, 0),
        _generateSegments = function (pointA, pointB) {
            var segments = [],
                left = Math.min(pointA.left, pointB.left),
                top = Math.min(pointA.top, pointB.top),
                right = Math.max(pointA.left, pointB.left),
                bottom = Math.max(pointA.top, pointB.top),
                height = bottom - top,
                width = right - left,
                halfHeight = Math.floor(height / 2),
                halfWidth = Math.floor(width / 2);
            segments.push(new VerticalSegment(pointA.left - left, 0, halfHeight));
            segments.push(new HorizontalSegment(0, halfHeight, width));
            segments.push(new VerticalSegment(pointB.left - left, halfHeight, height - halfHeight));
            return segments;
        },
        _segments = params.segments || _generateSegments(_begin, _end),
        _objectA = params.objectA || null,
        _getRegion = function () {
            var region = new Region(_begin, _end);
            return region;
        },
        _id = counter.newID().toString(),
        _group = new Group(_getRegion());


    return {
        render: function (chart) {
            var groupId = _group.render(chart);
            for (var index in _segments) {
                var segment = _segments[index];
                segment.render($('#' + groupId));
            }
            _begin.render(chart);
            _end.render(chart);
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
        fit: function (pointA, pointB) {
            console.log('fit');
        }
    }
}