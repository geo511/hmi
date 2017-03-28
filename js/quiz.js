(function($) {
	$.fn.emc = function(options) {
    
		var defaults = {
		  key: [],
		  scoring: "normal",
		  progress: true
		},
		
		settings = $.extend(defaults,options),
		$quizItems = $('[data-quiz-item]'),
		$choices = $('[data-choices]'),
		itemCount = $quizItems.length,
		chosen = [],
		$option = null,
		$label = null;
    
	emcInit();	
		
		if (settings.progress) {
			var $bar = $('#emc-progress'),
				$inner = $('<div id="emc-progress_inner"></div>'),
				$perc = $('<span id="emc-progress_ind">0/'+itemCount+'</span>');
			$bar.append($inner).prepend($perc);
		}
    
		function emcInit() {
			$quizItems.each( function(index,value) {
			var $this = $(this),
				$choiceEl = $this.find('.choices'),
				choices = $choiceEl.data('choices');
				for (var i = 0; i < choices.length; i++) {
					$option = $('<input name="'+index+'" id="'+index+'_'+i+'" type="radio">');
					$label = $('<label for="'+index+'_'+i+'">'+choices[i]+'</label>');
					$choiceEl.append($option).append($label);
				
					$option.on( 'change', function() {
						return getChosen();
					}); 
				}
			});
		}
		
		function getChosen() {
			chosen = [];
			$choices.each( function() {
				var $inputs = $(this).find('input[type="radio"]');
				$inputs.each( function(index,value) {
					if($(this).is(':checked')) {
						chosen.push(index + 1);
					}
				});
			});
			getProgress();
		}
    
		function getProgress() {
			var prog = (chosen.length / itemCount) * 100 + "%",
				$submit = $('#emc-submit');
			if (settings.progress) {
				$perc.text(chosen.length+'/'+itemCount);  
				$inner.css({height: prog});
			}
			if (chosen.length === itemCount) {
				$submit.addClass('ready-show');
				$submit.click( function(){
					return scoreNormal();
				});
			}
		}
    
		function scoreNormal() {
			var wrong = [],
				score = null,
				$scoreEl = $('#emc-score');
			for (var i = 0; i < itemCount; i++) {
				if (chosen[i] != settings.key[i]) {
					wrong.push(i);
				}
			}
			$quizItems.each( function(index) {
				var $this = $(this);
				if ($.inArray(index, wrong) !== -1 ) {
					$this.removeClass('item-correct').addClass('item-incorrect');
				} else {
					$this.removeClass('item-incorrect').addClass('item-correct');
				}
			});
		  
            timeRemaining = 0;
			score = ((itemCount - wrong.length) / itemCount).toFixed(2) * 100 + "%" ;
			$scoreEl.text("Your scored is "+score).addClass('new-score');
			$('html,body').animate({scrollTop: 0}, 50);			
		} 
		
		$('.trigger').click(function() {
			$('.modal-wrapper').toggleClass('open');
				$('.page-wrapper').toggleClass('blur');
				return false;
		});
	}
	
	// the time limit, in minutes
		var QUIZ_TIME_LIMIT = 10;
	
	// array of all the correct answers
		var QUIZ_ANSWERS = ['align-content', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page', 'page-break-after', 'page-break-before', 'page-break-inside', 'page-policy', 'pause', 'pause-after', 'pause-before', 'perspective', 'perspective-origin', 'pitch', 'pitch-range', 'play-during', 'position', 'presentation-level', 'quotes', 'region-fragment', 'rendering-intent', 'resize', 'rest', 'rest-after', 'rest-before', 'richness', 'right', 'rotation', 'rotation-point', 'ruby-align', 'ruby-overhang', 'ruby-position', 'ruby-span', 'shape-image-threshold', 'shape-outside', 'shape-margin', 'size', 'speak', 'speak-as', 'speak-header', 'speak-numeral', 'speak-punctuation', 'speech-rate', 'stress', 'string-set', 'tab-size', 'table-layout', 'target', 'target-name', 'target-new', 'target-position', 'text-align', 'text-align-last', 'text-combine-horizontal', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-skip', 'text-decoration-style', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-height', 'text-indent', 'text-justify', 'text-orientation', 'text-outline', 'text-overflow', 'text-shadow', 'text-space-collapse', 'text-transform', 'text-underline-position', 'text-wrap', 'top', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'vertical-align', 'visibility', 'voice-balance', 'voice-duration', 'voice-family', 'voice-pitch', 'voice-range', 'voice-rate', 'voice-stress', 'voice-volume', 'volume', 'white-space', 'widows', 'width', 'word-break', 'word-spacing', 'word-wrap', 'wrap-flow', 'wrap-through', 'writing-mode', 'z-index'];

		
	function startQuiz() {
	  // init some variables
	  initAnswers();
	  timeRemaining = Math.round(QUIZ_TIME_LIMIT * 60);
	  score = 0;
	  
	  // prepare UI
	  $('.time-remaining').text(getTimeString());	  
	  $('.total').text(QUIZ_ANSWERS.length);
	  $('.start').hide();
	  $('.started').show();
	  $('.input').focus();
	  $('.reveal').css("display","block");

	  // start the clock
	  timeInterval = setInterval(reduceTime, 1000);
	  setToastMood('neutral');
	}
	
	function initAnswers() {
	  answers = {};
	  QUIZ_ANSWERS.forEach(function(item) {
		var answer = item.trim().toLowerCase()
		answers[answer] = false;
	  });
	}
	
	function getTimeString() {
	  if (timeRemaining <= 0) {
		return '0:00';
	  } else {
		var minutes = Math.floor(timeRemaining / 60);
		var seconds = timeRemaining % 60;
		if (seconds < 10) {
		  seconds = '0' + seconds;
		}
		return minutes + ':' + seconds;
	  }
	}
	
	function reduceTime() {
	  timeRemaining--;
	  if (timeRemaining === 0) {
		$('.modal-wrapper').toggleClass('open');
				$('.page-wrapper').toggleClass('blur');
				return false;
	  } else {
		$('.time-remaining').text(getTimeString());
	  }
	}
	
	$('.start').on('click', startQuiz);	
	
	
	
}(jQuery));


$(document).emc({
	key: ["2","1","1","2","2","1","1", "1", "2", "1"]
});


