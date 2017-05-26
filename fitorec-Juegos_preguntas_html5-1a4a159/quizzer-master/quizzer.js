
// 1
var questions = [
	[
		"¿Qien es Enrique?",
		"una persona",
		"Mi novio",
		"Ni idea",
		"Un amigo",
		1
	],
	[
		"¿Qué se pasa el 19 de Mayo?",
		"Dia de la papa",
		"Dia internaciona de Minerva y Enrique",
		"firma del acta de la independencia",
		"Ninguno de los anteriores",
		1
	],
	[
		"¿Bebida favorita de Enrique?",
		"",
		"Coca Cola",
		"Cafe",
		"Ninguno de los anteriores",
		3
	],
	[
		"¿Tema para boda?",
		"cucarachas y ratones",
		"corazones y flores",
		"la luna  y la torre  ifel",
		"frutas :D",
		2
	],
	[
		"nombre de los futuros hijos",
		"sandra y santiago",
		"rosa y juan",
		"enrique y minerva",
		"santiago y camil",
		3
	],
	[
		"color favorito de  Enrique",
		"ninguno",
		"todos",
		"negro",
		"magenta",
		1
	],
	[
		"que cambiaria minerva de enrique",
		"nada",
		"su pelo ",
		"su naris",
		"la espalda que le gusta tanto a ella",
		0
	],
	[
		"por que estan juntos Minerva y Enrique?",
		"nadie lo sabe",
		"por suerte",
		"cosas del destino",
		"por que minerva lo acoso hasta que lo hizo suyo :$",
		3
	],
	[
		"mejor momento juntos",
		"momentos buenos",
		"momentos malos",
		"momentos bueno y malos",
		"todas  los  anteriores",
		2
	],
];

// 2
var questionTemplate = _.template(" \
	<div class='card question'><span class='question'><%= question %></span> \
      <ul class='options'> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
          <label for='q<%= index %>o1'><%= a %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
          <label for='q<%= index %>o2'><%= b %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
          <label for='q<%= index %>o3'><%= c %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
          <label for='q<%= index %>o4'><%= d %></label> \
        </li> \
      </ul> \
    </div> \
    ");


// 3
var points,
	pointsPerQuestion,
	currentQuestion,
	questionTimer,
	timeForQuestion = 30, // seconds
	timeLeftForQuestion; 

// 4
$(function() {

	// 
	$('button.start').click(start);
	$('.play_again button').click(restart);


	function restart() {
		points = 0;
		pointsPerQuestion = 10;
		currentQuestion = 0;
		timeLeftForQuestion = timeForQuestion;

		$('.finish.card').hide();
		$('div.start').show();
		$('.times_up').hide();

		generateCards();
		updateTime();
		updatePoints();
	}

	// 
	function start() {
		$('div.start').fadeOut(200, function() {
			moveToNextQuestion();
		});
	}

	// 
	function generateCards() {
		$('.questions').html('');
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			var html = questionTemplate({
				question: q[0],
				index: i,
				a: q[1],
				b: q[2],
				c: q[3],
				d: q[4]
			});
			$('.questions').append(html);
		};
		$('.question.card input').change(optionSelected);
	}

	// 
	function moveToNextQuestion() {
		currentQuestion += 1;
		if (currentQuestion > 1) {
			$('.question.card:nth-child(' + (currentQuestion-1) + ')').hide();
		}
		showQuestionCardAtIndex(currentQuestion);
		setupQuestionTimer();
	}

	// 
	function setupQuestionTimer() {
		if (currentQuestion > 1) {
			clearTimeout(questionTimer);
		}
		timeLeftForQuestion = timeForQuestion;
		questionTimer = setTimeout(countdownTick, 1000);
	}

	// 
	function showQuestionCardAtIndex(index) { // staring at 1
		var $card = $('.question.card:nth-child(' + index + ')').show();
	}

	// 
	function countdownTick() {
		timeLeftForQuestion -= 1;
		updateTime();
		if (timeLeftForQuestion == 0) { 
			return finish();
		}
		questionTimer = setTimeout(countdownTick, 1000);
	}

	//
	function sorpresa(){
		if (puntos == 50) {
			$('sorpresa').hide();
		};
	}

	// 
	function updateTime() {
		$('.countdown .time_left').html(timeLeftForQuestion + 's');
	}

	// 
	function updatePoints() {
		$('.points span.points').html(points + ' puntos');
	}

	// 
	function optionSelected() {
		var selected = parseInt(this.value);
		var correct = questions[currentQuestion-1][5];

		if (selected == correct) {
			points += pointsPerQuestion;
			updatePoints();
			correctAnimation();
		} else {
			wrongAnimation();
		}

		if (currentQuestion == questions.length) {
			clearTimeout(questionTimer);
			return finish();
		}
		moveToNextQuestion();
	}

	
	function correctAnimation() {
		animatePoints('right');
	}

	// 
	function wrongAnimation() {
		animatePoints('wrong');
	}

	// 
	function animatePoints(cls) {
		$('header .points').addClass('animate ' + cls);
		setTimeout(function() {
			$('header .points').removeClass('animate ' + cls);
		}, 500);
	}

	// 
	function finish() {
		if (timeLeftForQuestion == 0) {
			$('.times_up').show();
		}
		$('p.final_points').html(points + ' puntos');
		$('.question.card:visible').hide();
		$('.finish.card').show();
		$('p.sorpresa:visible').html
	}

	// 
	restart();

});