/// <reference path="../js/units.js"/>
/// <reference path="../js/chart.js"/>
/// <reference path="../js/jquery-1.11.1.min.js"/>

var elementList = [
	new Line({
	    begin: new Point(175, 150),
	    segments: [
            new VerticalSegment(0, 0, 25),
            new HorizontalSegment(0, 25, 100),
            new VerticalSegment(100, 25, 30)
	        ]
	    }
    ),
	new VerticalSegment(275, 250, 30),
	new VerticalSegment(275, 325, 30),
	new VerticalSegment(275, 400, 30),
	new HorizontalSegment(350, 450, 30),

	new Node('СИКН', 100, 100),
	new Node('УПВСН', 0, 200),
	new Node('ДНС А', 200, 200),
	new Node('ДНС Б', 200, 275),
	new Node('ДНС В', 200, 350),
	new Node('ДНС Г', 200, 425),
	new Node('ДНС Д', 375, 425),

	new Glif(268, 330, 'up.png'),
	new Glif(268, 408, 'down.png'),
	new Glif(358, 443, 'right.png'),
];


$(document).ready(function () {
    createElements($('.chart'), elementList);
    dragMaster.init();
    dragMaster.makeDraggable('.element');
});
