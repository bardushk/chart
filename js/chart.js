//
// Блоки
//
function Node(text, left, top){
	var _text = text;
	var _left = left;
	var _top = top;
	return {
		render: function(chart){
			chart.append('<div class = "node" style="left: ' + _left + '; top: ' + _top + ';"><div class = "nodeContent">' + _text + '</div></div>');
		}
	} 
}

function HorizontalSegment(left, top, length) {
    var _left = left;
    var _top = top;
    var _length = length;
    return {
        render: function (chart) {
            chart.append('<div class = "line horizontalSegment" style="left: ' + _left + '; top: ' + _top + '; width: ' + _length + ';"></div>');
        }
    }
}

function VerticalSegment(left, top, length) {
    var _left = left;
    var _top = top;
    var _length = length;
    return {
        render: function (chart) {
            chart.append('<div class = "line verticalSegment" style="left: ' + _left + '; top: ' + _top + '; height: ' + _length + ';"></div>');
        }
    }
}

function Glif(left, top, image) {
    var _left = left;
    var _top = top;
    var _image = image;
    return {
        render: function (chart) {
            chart.append('<div class = "glif" style="left: ' + _left + '; top: ' + _top + '; background-image: url(images/' + _image + ')"></div>');
        }
    }
}

//
// Соединительные линии
//
function Line(segments){
	var _segments = segments;
	return {
		render: function(chart){
			for(var index in segments){
			var segment = segments[index];
				segment.render(chart);
			}
		}
	}
}

function createElements(chart, elementList) {
	for(var index in elementList){
		var node = elementList[index];
		node.render(chart);
	}
}

