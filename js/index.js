$(function(){

  $("#next").hide()
  $("#reset").hide()
  $(".space-stone, .mind-stone, .power-stone, .reality-stone, .time-stone, .soul-stone").hide()

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
    console.log("index of button clicked", $(this).data("index"))
    console.log("button that was clicked", $(this).attr("name"))

    let answerChoiceIndex = parseInt($(this).data("index"))
    console.log("answerChoiceIndex", answerChoiceIndex)

    if (answerChoices[answerChoiceIndex].isCorrect === true) {
      message = "You are correct!"
      $("#next").show()
      points = points + 1
      // show stone with id= stone-{points} // #stone-1, #stone-2, etc
      $(`#stone-${points}`).show()

    } else {
      message = "You are wrong!"
      $("#reset").show()
      handleLoser()
    }

    if(points === 6){
      console.log("you won")
      handleWinner()
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
    $("#next").hide()
  }

  function clearMsg() {
    $(".answer-message").text("")
  }

  // reset game
  $("#reset").click(resetGame)
  function resetGame() {
    // hide stones, hide msg, show 1st question and choices
    $(".space-stone, .mind-stone, .power-stone, .reality-stone, .time-stone, .soul-stone").hide()
    clearMsg()
    questionIndex = 0
    displayQuestion(questionIndex)
    $("#reset").hide()
  }

  function handleWinner() {
    // when all 6 questions are correct- hide next button, new message, image gauntlet, gauntlet sound, show play again button
    $("#next").hide()
    $(".answer-message").text("You won!")
    $("#reset").show()
  }

  function handleLoser() {
    // thanos image, thanos sound

  }

  // add hover message on each stone
  // add animation to stone when user gets answer correct - pop and highlight




  // let userAnswer = selectedAnswer
  // let selectedAnswer = currentQuestion.choices
  // console.log("userAnswer", userAnswer)

})
