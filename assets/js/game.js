var maxInt = 10; // the highest number to be used in the equations
var maxQuestions = 20; // the maximum number of questions for any game;
var maxTimer = 120; // timer length for the timed test: 120 seconds/2 minutes;
var questions = new Array; // array to hold the arguments, operands answers and whether the question was answer correctly

var j = 0; // current position answering questions

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var loop = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.html(minutes + ":" + seconds);

        if (--timer < 0) {
           clearInterval(loop);
        }
    }, 1000);
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
}

function advanceQuestion(){
	$('footer .game-progress .count').html(j + 1);
	$('#game-wrapper #question .n1').html(questions[j].num1);
	$('#game-wrapper #question .operand').html(questions[j].operand);
	$('#game-wrapper #question .n2').html(questions[j].num2);
	$('#game-wrapper #question .answer').html(questions[j].answer);
	if(j < maxQuestions - 1) {
		j++;
	}
}

$(document).ready(function(){
	$('#begin').on('click', function(e){
		setQuestions(maxQuestions, '-');
		$('#intro').fadeOut(350, function(){
			$('#game-wrapper').fadeIn(350, function(){
				advanceQuestion();
			});
		});
		e.preventDefault();
	})
	var timer = $("footer .game-timer");
	startTimer(maxTimer, timer)
});

