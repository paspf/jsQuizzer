
questionID = 0;
isStarted = 0;
isChecked = 0;
answeredTotal = 0;
answeredCorrect = 0;

function Check() {
    if (isStarted == 0) {
        drawQuestion();
        isStarted = 1;
        return;
    }
    if (isChecked == 0) {
        // check question
        answer_id = -1;
        for (let i = 0; i < data[questionID].answers.length; i++) {
            id = "a" + i
            if (document.getElementById(id).checked) {
                answer_id = i;
            }
        }
        answeredTotal++;
        // No radio button has been checked
        if (answer_id == -1) {
            document.getElementById("correction").innerHTML = "Please give an answer."
        }
        // Correct radio button has been checked
        else if (answer_id == data[questionID].correct) {
            document.getElementById("correction").innerHTML = "<b>Correct!<b>"
            answeredCorrect++;
        }
        // Wrong radio button has been checked
        else {
            document.getElementById("correction").innerHTML = "<b>Wrong answer!</b> <br>" + 
                "solution is: <br>" + data[questionID].answers[data[questionID].correct];
        }
        isChecked = 1;
        updateStatistics();
        return;
    }
    // draw next question or restart quiz.
    questionID++;

    if(questionID >= data.length) {
        document.getElementById("correction").innerHTML = "You reached the end! <br> Press submit to restart!";
        document.getElementById("question").innerHTML = "";
        document.getElementById("answers").innerHTML = "";
        questionID = 0;
        isStarted = 0;
        isChecked = 0;
        return;
    }
    
    drawQuestion();
    isChecked = 0;
}

function updateStatistics() {
    if (answeredTotal == 0) {
        return;
    }
    document.getElementById("statistics").innerHTML = "Answered questions: " + answeredTotal + 
        "<br>Answered correct: " + answeredCorrect + "<br>Score: " + ~~((answeredCorrect / answeredTotal)*100) + "%";
}

function drawQuestion() {
    document.getElementById("correction").innerHTML = "";
    document.getElementById("question").innerHTML = data[questionID].question;
    let text = "";
    for (let i = 0; i < data[questionID].answers.length; i++) {
        idc = "a" + i + "c"
        id = "a" + i
        text += '<input type="radio" id="' + id + 
        '" name="answerPick"> <label for="' + id + 
        '" id="' + idc + '">' + data[questionID].answers[i] + '</label><br>'
    } 
    document.getElementById("answers").innerHTML = text;
}
