//
// Вспомогательный модуль для работы с экранными единицами измерений
//

function Unit(value) {
    var _match = /(\d{1,})(px|%)/.exec(value);
    var _number = new Number(_match[1]);
    var _measure = _match[2];
    return {
        number: _number,
        measure: _measure, 
        add: function (unit) {
            console.log(unit);
            if (_measure !== unit.measure) throw new SyntaxError('Попытка сложения величин разной размерности: ' + this.toString() + ' + ' + unit.toString());
            return new Unit((unit.number + _number) + _measure);
        },
        toString: function () {
            return _number + _measure;
        }
    }
}
//
// Точка на экране
// left - число
// top - число
//
function Point(left, top) {
    var _left = left;
    var _top = top;
    return {
        left: _left,
        top: _top,
        render: function (chart) {
            chart.append('<div class = "element point" style="left:' + (_left - 4) + 'px; top:'+ (_top - 4) + 'px"></div>');
        },
        toString: function () {
            return 'new Point(' + _left + ',' + top + ')';
        }
    }
}
//
// Прямоугольная область на экране
// pointA - Point - один угол, например левый верхний
// pointB - Point - диагонально противоположный, правый нижний
//
function Region(pointA, pointB) {
    var _left = Math.min(pointA.left, pointB.left),
        _right = Math.max(pointA.left, pointB.left),
        _top = Math.min(pointA.top, pointB.top),
        _bottom = Math.max(pointA.top, pointB.top),
        _width = _right - _left,
        _height = _bottom - _top;
    return {
        left: _left,
        top: _top,
        right: _right,
        bottom: _bottom,
        width: _width,
        height: _height,
        join: function (region) {
            if (region === null) return this;
            var left = Math.min(_left, region.left);
            var top = Math.min(_top, region.top);
            var right = Math.max(_right, region.right);
            var bottom = Math.max(_bottom, region.bottom);
            return new Region(new Point(left, top), new Point(right, bottom));
        },
        toString: function () {
            return '(' + _left + ',' + _top  + ') - (' + _right + ',' + _bottom + ')';
        }
    }
}