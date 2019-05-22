$(function(){

  $("#next").hide()
  $("#reset").hide()
  $(".space-stone, .mind-stone, .power-stone, .reality-stone, .time-stone, .soul-stone").hide()
  $("#winning-image, #losing-image").hide()

  let allQuestions;
  // add point variable
  let points = 0
  let questionIndex = 0
  let currentQuestion
  let answerChoices

  // pulling data from questions.json
  $.ajax({
    url: '../data/questions.json',
    dataType: 'json',
    async: false
  }).done(function (data) {
    console.log('questions', data)
    // store the array list of questions.json in a variable called allQuestions
    allQuestions = data
  }).fail(function (a, b, error) {
    console.log(error)
  })

  // calling the displayQuestion function to display questions and choices to the screen; pass in questionIndex as a parameter
  displayQuestion(questionIndex)

  function displayQuestion(index) {
    // pull first question from questions array and store in variable called currentQuestion
    currentQuestion = allQuestions[index]
    console.log("currentQuestion", currentQuestion)

    // print question to the screen. Use dot notation
    $(".question p").text(currentQuestion.questionLabel)

    // get the choices and store in a variable called answerChoices
    answerChoices = currentQuestion.choices
    console.log("answerChoices", answerChoices)


    // print the answer choices. target the button id
    $("#a").text(answerChoices[0].label)
    $("#b").text(answerChoices[1].label)
    $("#c").text(answerChoices[2].label)
    $("#d").text(answerChoices[3].label)
  }



  // listen for click event on all buttons
  $(".multiple-choice button").click(printAnswerMsg);

  function printAnswerMsg() {
    let message
    // ids of all 4 buttons
    let buttonIds = ["a", "b", "c", "d"]

    // id of the button that was selected
    let selectedButtonId = $(this).attr("id")

    // create a new array of all buttonIds that are NOT equal
    // to the selectedButtonId
    let disabledButtonIds = buttonIds.filter(function(buttonId) {
      return buttonId !== selectedButtonId
    })

    console.log(disabledButtonIds)

    // call disableButtons function that will be responsible for
    // disabling the buttons of every button except the one that
    // was selected
    disableButtons(disabledButtonIds)





    console.log("index of button clicked", $(this).data("index"))
    console.log("button that was clicked", $(this).attr("name"))
    console.log("id of button clicked", $(this).attr("id"))



    let answerChoiceIndex = parseInt($(this).data("index"))
    console.log("answerChoiceIndex", answerChoiceIndex)

    if (answerChoices[answerChoiceIndex].isCorrect === true) {
      playCorrectAnswer
      message = "You are correct!"
      $("#next").show()
      points = points + 1
      // show stone with id= stone-{points} // #stone-1, #stone-2, etc
      $(`#stone-${points}`).show()
      $(`#stone-${points}`).addClass("animated infinite heartBeat delay-0s")

    } else {
      message = "You are wrong!"
      $("#reset").show()
      handleLoser()
      playLosingSound()
      showLosingImage()
    }

    if(points === 6){
      console.log("you won")
      playWinningSound()
      handleWinner()
      showWinningImage()
    }

    // display msg to screen
    $(".answer-message").text(message)
  }

  // next question
  $("#next").click(goNext)
  function goNext() {
    // adding or incrementing 1 to questionIndex
    questionIndex = questionIndex + 1
    // reassign currentQuestion to next question in list
    // currentQuestion = allQuestions[questionIndex]
    // $(".question p").text(currentQuestion.questionLabel)
    displayQuestion(questionIndex)
    // get the next question out of the allQuestions array
    // and display that question

    clearMsg()

    console.log('enabling buttons')
    enableButtons()
    $("#next").hide()
  }

  function clearMsg() {
    $(".answer-message").text("")
  }

  // reset game
  $("#reset").click(resetGame)
  function resetGame() {
    // hide stones, hide msg, show 1st question and choices
    $(".space-stone, .mind-stone, .power-stone, .reality-stone, .time-stone, .soul-stone").removeClass("animated infinite heartBeat delay-0s bounceOutDown")
    $(".space-stone, .mind-stone, .power-stone, .reality-stone, .time-stone, .soul-stone").hide()

    $(".question-main").show()
    $("#winning-image, #losing-image").hide()


    enableButtons()
    clearMsg()
    questionIndex = 0
    displayQuestion(questionIndex)
    $("#reset").hide()
  }

  function handleWinner() {
    // when all 6 questions are correct- hide next button, new message, image gauntlet, gauntlet sound, show play again button, hide question-intruction
    $("#next").hide()
    $(".question-instruction p").hide()
    $(".answer-message").text("You won!")
    $("#reset").show()
  }

  function handleLoser() {
    // thanos image, thanos sound, add css animation bounceOutDown to infinity stones
    // remove infinite class
    $(".space-stone, .mind-stone, .power-stone, .reality-stone, .time-stone, .soul-stone").removeClass("infinite")
    // add class
    $(".space-stone, .mind-stone, .power-stone, .reality-stone, .time-stone, .soul-stone").addClass("animated bounceOutDown delay-0s")
  }

  function disableButtons(buttonIds) {
    // iterate through array of buttonIds and disable the button
    // associated with each id

    buttonIds.forEach(function(id) {
      $(`#${id}`).attr("disabled","true")
    })
  }

  function enableButtons() {
    console.log("calling enableButtons")
    // enable all buttons by removing the disabled attribute
    $("#a, #b, #c, #d").removeAttr("disabled")
  }

  function playWinningSound() {
    // play infinity-gauntlet.mp3
    $("audio#winning-sound")[0].play()
  }

  function playLosingSound() {
    // play thanos.mp3
    $("audio#losing-sound")[0].play()
  }

  function showLosingImage() {
    // hide question-main, show losing-image, add css animation
    $(".question-main").hide()
    $("#losing-image").show()
  }

  function showWinningImage() {
    $(".question-main").hide()
    $("#winning-image").show()

  }

  // add correct answer sound when earn each infinity stone
  function playCorrectAnswer() {
    $("audio#correct-answer")[0].play()

  }

  // add reset logic


  // disable other buttons when one is selected, also add css style fading out the unselected buttons



  // use jquery to select the element, use attr to specify 1. the string disabled and 2. that the value is true
  // $("#a, #b, #c, #d").attr("disabled","true")


  // add hover message on each stone
  // $(".space-stone").hover(stoneMsg)
  // function stoneMsg() {
  //   // $(".sidebar-hover-message").show()
  //   $(".sidebar-hover-message").text("Space: The Space Stone gives the user power over space. Anyone holding the Space Stone can create a portal from one part of the universe to another.")
  //   $(".sidebar-hover-message").fadeIn( 3000 );
  //   // $(".sidebar-hover-message").fadeOut( 3000 );
  //
  // }


  // add animation to stone when user gets answer correct - pop and highlight




  // let userAnswer = selectedAnswer
  // let selectedAnswer = currentQuestion.choices
  // console.log("userAnswer", userAnswer)

})
