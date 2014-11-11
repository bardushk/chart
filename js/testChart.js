var elementList = [
	new Line([
        new VerticalSegment('175px', '150px', '25px'),
        new HorizontalSegment('175px', '175px', '100px'),
        new VerticalSegment('275px', '175px', '30px')
	]),
	new VerticalSegment('275px', '250px', '30px'),
	new VerticalSegment('275px', '325px', '30px'),
	new VerticalSegment('275px', '400px', '30px'),
	new HorizontalSegment('350px', '450px', '30px'),

	new Node('СИКН', '100px', '100px'),
	new Node('УПВСН', '0', '200px'),
	new Node('ДНС А', '200px', '200px'),
	new Node('ДНС Б', '200px', '275px'),
	new Node('ДНС В', '200px', '350px'),
	new Node('ДНС Г', '200px', '425px'),
	new Node('ДНС Д', '375px', '425px'),

	new Glif('268px', '330px', 'up.png'),
	new Glif('268px', '408px', 'down.png'),
	new Glif('358px', '443px', 'right.png'),
];


$(document).ready(function () {
    createElements($('.chart'), elementList);
});