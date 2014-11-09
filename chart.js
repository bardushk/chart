var nodeList = [ 
	new Node('Root', '100px', '100px'),
	new Node('Node A', '0', '200px'),
	new Node('Node B', '200px', '200px'),
	new Node('Node C', '200px', '275px'),
	new Node('Node D', '200px', '350px'),
	new Node('Node E', '200px', '425px'),
	new Node('Node F', '375px', '425px'),
];

var lineList = [
	new Line([new Segment('Vertical', '175px', '150px', '25px'), new Segment('Horizontal', '175px', '175px', '100px'), 	new Segment('Vertical', '275px', '175px', '30px')]),	
	new Segment('Vertical', '275px', '250px', '30px'),	
	new Segment('Vertical', '275px', '325px', '30px'),	
	new Segment('Vertical', '275px', '400px', '30px'),	
	new Segment('Horizontal', '350px', '450px', '30px'),	
];

var glifList = [
	{image: 'up.png', left: '268px', top: '330px'},
	{image: 'down.png', left: '268px', top: '408px'},
	{image: 'right.png', left: '358px', top: '443px'},
] ;

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

//
// Отрезки линий
//
function Segment(type, left, top, length){
	var _type = type;
	var _left = left;
	var _length = length;
	var _top = top;
	return {
		render: function(chart){
			switch(_type){
				case 'Vertical':
					chart.append('<div class = "link linkVertical" style="left: ' + _left + '; top: ' + _top + '; height: ' + _length + ';"></div>');
					break;
				case 'Horizontal':
					chart.append('<div class = "link linkHorizontal" style="left: ' + _left + '; top: ' + _top + '; width: ' + _length + ';"></div>');
					break;
			}
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

function createNodes(chart, nodeList){
	for(var index in nodeList){
		var node = nodeList[index];
		node.render(chart);
	}
}

function createGlifs(chart, glifList){
	for(var index in glifList){
		var glif = glifList[index];
		chart.append('<div class = "glif" style="left: ' + glif.left + '; top: ' + glif.top + '; background-image: url(' + glif.image + ')"></div>');
	}
}

function createLines(chart, lineList){
	for(var index in lineList){
		var line = lineList[index];
		line.render(chart);
	}
}

$(document).ready(function(){	
	$('.chart').on('click', '.node' ,function(){alert('Node');});
	createLines($('.chart'), lineList);	
	createNodes($('.chart'), nodeList);
	createGlifs($('.chart'), glifList);
});