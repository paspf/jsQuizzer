
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


        // Check if radio buttons have been created
        if ( data[questionID].correct.length == 1) {
            answeredTotal++;
            answer_id = -1;
            // Find out which radio button was checked
            for (let i = 0; i < data[questionID].answers.length; i++) {
                id = "a" + i
                if (document.getElementById(id).checked) {
                    answer_id = i;
                }
            }
            
            // No radio button was checked
            if (answer_id == -1) {
                document.getElementById("correction").innerHTML = "No button checked."
                answeredTotal--;
                return;
            }
            // Correct radio button was checked
            else if (answer_id == data[questionID].correct[0]) {
                document.getElementById("correction").innerHTML = "<b>Correct!<b>"
                answeredCorrect++;
            }
            // Wrong radio button was checked
            else {
                document.getElementById("correction").innerHTML = "<b>Wrong answer!</b> <br>" + 
                    "solution is: <br>" + data[questionID].answers[data[questionID].correct[0]];
            }
        }
        // It is a multiple choice question.
        else {
            answeredTotal++;
            answer_id = [];
            // Find out which checkboxes were checked
            for (let i = 0; i < data[questionID].answers.length; i++) {
                id = "a" + i
                if (document.getElementById(id).checked) {
                    answer_id.push(i);
                }
            }
            
            answer_id.sort();
            sortedCorrect = data[questionID].correct.sort();
            let correctAnswered = equalArray(answer_id, sortedCorrect);

            // Each checked box was correct
            if (correctAnswered) {
                document.getElementById("correction").innerHTML = "<b>Correct!<b>"
                answeredCorrect++;
            }
            // Wrong checkboxes were checked
            else {
                text = "<b>Wrong answer!</b> <br> Correct are: <br>";
                for (let i = 0; i < data[questionID].correct.length; i++) {
                    text += "[" + data[questionID].correct[i] + "] " + data[questionID].answers[data[questionID].correct[i]] + "<br>";
                }
                document.getElementById("correction").innerHTML = text;
            }
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

    // Check if radio buttons have been created
    if ( data[questionID].correct.length == 1) {
        for (let i = 0; i < data[questionID].answers.length; i++) {
            idc = "a" + i + "c"
            id = "a" + i
            text += '<input type="radio" id="' + id + '" name="answerPick">' +
            '<label for="' + id + '" id="' + idc + '">' + data[questionID].answers[i] + '</label><br>'
        }
    }
    // It is a multiple choice question.
    else {
        for (let i = 0; i < data[questionID].answers.length; i++) {
            idc = "a" + i + "c"
            id = "a" + i
            text += '<input type="checkbox" id="' + id + '" name="answerPick">' + 
            '<label for= "' + id + '" id= "' + idc + '">' + data[questionID].answers[i] + '</label><br>'
        }
    }
    document.getElementById("answers").innerHTML = text;
}


function equalArray(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }
        return false;
      });
    }
    return false;
}
