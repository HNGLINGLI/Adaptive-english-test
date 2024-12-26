$(function() {
    makeButtonDisable('#raq_back');
    focusOnCurrentAnswer();

    var counter = 1;
    var numberOfQuestions = 5;
    $('#raq_next').click(function(){
        if( !validate() )
            return false;

        makeButtonEnable('#raq_back');
        
        // Check if the user is in the last question
        if( $(this).attr('isSubmit') == 'true' ) {
            submitForm();
        }
        
        showElement('#question-' + ++counter);

        nextNavigation(counter);
        changeQuestionTitle(counter);
        
        if( counter == numberOfQuestions ) {
            // Show submit button
            showSubmitButton();
        }
        focusOnCurrentAnswer();
    });
    $('#raq_back').click(function() {
        removeError();

        if( $('#raq_back').hasClass('disabled') )
            return false;
        
        if( $('#raq_next').attr('isSubmit') == 'true' )
            showNextButton();

        showElement('#question-' + --counter);

        backNavigation(counter);
        changeQuestionTitle(counter);

        if( counter == 1 )
            makeButtonDisable('#raq_back');
    });

    // By doing this users can use enter key instead of clicking the mouse
    accessibility();

    pageReload();
});

function fadeAll() {
    $('form .question-container').each(function(){
        $(this).hide();
    });
}

function fadeIn(theElement) {
    $(theElement).fadeIn(700);
}

function showElement(theElement) {
    fadeAll();
    fadeIn(theElement);
}

function showSubmitButton() {
    $('#raq_next').prop('value', 'Submit');
    $('#raq_next').addClass('submit');
    $('#raq_next').attr('isSubmit', 'true');
}

function showNextButton() {
    $('#raq_next').prop('value', 'Next');
    $('#raq_next').removeClass('submit');
    $('#raq_next').attr('isSubmit', 'false');
}

function makeButtonDisable(button) {
    $(button).addClass('disabled');
}

function makeButtonEnable(button) {
    $(button).removeClass('disabled');
}

function nextNavigation(currentQuestion) {
    $('.form-steps__item.step-' + currentQuestion).addClass('form-steps__item--active');
    $('.form-steps__item.step-' + (currentQuestion-1) + ' .form-steps__item-text').after('<div class="tick"></div>');
}

function backNavigation(currentQuestion) {
    $('.form-steps__item.step-' + (currentQuestion + 1) ).removeClass('form-steps__item--active');
    $('.form-steps__item.step-' + currentQuestion + ' .tick' ).remove();
}

function validate() {
    if( $('input[type="text"]:visible').val().length <= 0 ) {
        $('input[type="text"]:visible').addClass('error');
        if( !$('.error-text').length )
            $('input.error').after('<p class="error-text">This Field is Required</p>');
        return false;
    } else {
        $('input[type="text"]:visible').removeClass('error');
        $('.error-text').remove();
        return true;
    }
}

function changeQuestionTitle(counter) {
    $('.question-title').text('Question ' + counter);
}

function showAbout() {
    $('#overlay').show();
    initializeChart(); // Call the function to initialize the chart
}

function focusOnCurrentAnswer() {
    $('input[type="text"]:visible').focus();
}

function accessibility() {
    $('input[type="text"]').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13')
            $('#raq_next').click();
    });
}

function removeError() {
    $('input[type="text"]:visible').removeClass('error');
    $('.error-text').remove();
}

function submitForm() {
    // Submit, But do not refresh
    $('form').submit(function(e) {
        e.preventDefault();
    });
    showAbout();
    return false;
}

function pageReload() {
    $('#start-over').click(function(){
        window.location.reload();
    });
}

// Chart function
function initializeChart() {
    var ctx = document.getElementById("canvas").getContext("2d");

const getRandomDataset = () => {
  const arr = [];

  for (let i = 0; i < 5; i++) {
    arr.push((Math.random() * (4.9 - 1.5) + 1.5).toFixed(1));
  }
  return arr;
};

const data = {
  labels: [
    "Vocabulary",
    "Grammar",
    "Comprehension",
    "Reading",
    "Accuracy"
  ],
  datasets: [
    {
      data: getRandomDataset(),
      backgroundColor: "rgba(225, 123, 40, 0.3)",
      hoverBackgroundColor: "#ff5a36",
      borderColor: "#ffae42",
      borderWidth: 2
    }
  ]
};

options = {
  legend: {
    display: false
  },
  gridLines: {
    display: false
  },
  scale: {
    angleLines: {
      display: false
    },
    ticks: {
      suggestedMin: 0,
      suggestedMax: 5
    },
  }
};

var myRadarChart = new Chart(ctx, {
  type: "radar",
  data: data,
  options: options
});

const update = () => {
  myRadarChart.data.datasets.forEach((set) => {
    set.data = getRandomDataset();
  });
  myRadarChart.update();
};
}