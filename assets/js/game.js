var maxInt = 10; // the highest number to be used in the equations
var maxQuestions = 4; // the maximum number of questions for any game;
var maxTimer = 120; // timer length for the timed test: 120 seconds/2 minutes;
var animationSpeed = 350;
var questions = new Array; // array to hold the arguments, operands answers and whether the question was answer correctly

var j = 0; // current position answering questions

function startTimer(duration, display) {
	display.html(formatTime(duration));
	var loop = setInterval(function () {
		display.html(formatTime(duration));
		if (--duration < 0) {
			clearInterval(loop);
		}
	}, 1000);
}

function formatTime(d) {
	var m = parseInt(d / 60, 10);
	var s = parseInt(d % 60, 10);
	return twoDigits(m) + ':' + twoDigits(s);
}

function twoDigits(d) {
	return d < 10 ? "0" + d : d;
}

function getRandomInt(max) {
	return Math.round(Math.random()*max);
}

function setQuestions(j, o){
	for(i = 0; i < j; i++){
		questions[i] = {
			num1: getRandomInt(maxInt),
			num2: getRandomInt(maxInt),
			answer: null,
			operand: o,
			isCorrect :null
		};

		// make sure the digits aren't the same as the last group
		if(i > 1){
			while((questions[i].num1 == questions[i-1].num1 && questions[i].num2 == questions[i-1].num2) || (questions[i].num1 == questions[i-1].num2 && questions[i].num2 == questions[i-1].num1)) { // digits are flipped)
				questions[i].num1 = getRandomInt(maxInt);
				questions[i].num2 = getRandomInt(maxInt);
			}
		}

		// make sure the answer isn't negative
		if(o == '-' && questions[i].num1 < questions[i].num2) {
			var temp = questions[i].num2;
			questions[i].num2 = questions[i].num1;
			questions[i].num1 = temp;
		}
		
		switch(questions[i].operand) {
			case '+':
				questions[i].answer = questions[i].num1 + questions[i].num2;
				break;
			case '-':
				questions[i].answer = questions[i].num1 - questions[i].num2;
				break;
			case '?':
				questions[i].answer = questions[i].num1 + questions[i].num2;
				questions[i].answer += Math.random() > .65 ? Math.round(Math.random()*1 + 1) : -1*Math.round(Math.random()*1 + 1);
				console.log(i+1 + ') ' + questions[i].num1 + questions[i].operand + questions[i].num2 + ' = ' + questions[i].answer);
				break;
		}
	}
}

function answerQuestion() {
	if(pageOperand == '?'){
	}
	else {
		if($('#typed-answer').val() == questions[j].answer){
			questions[j].isCorrect = true;
		}
		else {
			questions[j].isCorrect = false;
		}
	}
	if(j < maxQuestions - 1) {
		j++;
	}
	$('#game-wrapper').fadeOut(animationSpeed, function(){
		advanceQuestion();
		$('#game-wrapper').fadeIn(animationSpeed);
	});
}

function advanceQuestion(){
	setProgress();
	$('#game-wrapper #question .n1').html(questions[j].num1);
	$('#game-wrapper #question .operand').html(questions[j].operand);
	$('#game-wrapper #question .n2').html(questions[j].num2);
	$('#game-wrapper #question .answer').html(questions[j].answer);
}

function setProgress() {
	$('footer .game-progress .count').html(j + 1);
	$('footer .game-progress .modifier').html('of');
	$('footer .game-progress .total').html(maxQuestions);
}

function showResults(){

}

$(document).ready(function(){
	// start the game
	$('#begin').on('click', function(e){
		setQuestions(maxQuestions, pageOperand);
		$('#intro').fadeOut(animationSpeed, function(){
			advanceQuestion(); // set the first question
			var timer = $("footer .game-timer"); // set the timer target
			startTimer(maxTimer, timer); // start the timer
			$('#game-wrapper').fadeIn(animationSpeed); // fade in the questions
		});
		e.preventDefault();
	});
	// go to the next question
	$('#submitAnswer').on('click', function(e){
		answerQuestion();
		e.preventDefault();
	});
});

