/**
* Returns a specified amount of randomly selected items from an array.
* @param {Array} array - The source array to pick items from.
* @param {number} amountRandoms - The number of random items to return.
* @returns {Array} - A new array containing the randomized items.
*/
function getAmountRandomsFromArray(array,amountRandoms){
    /*Copying the array*/
    let shuffledArray=[...array]
    /*Fisher-Yates shuffle algorithm*/
    for (let i = shuffledArray.length - 1; i>0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
            
    /*Getting only first few records*/
    let  randomsArray =shuffledArray.slice(0,amountRandoms)
    //console.log(randomsArray)
    return randomsArray
}

function getQuestionNumber(){
    
    let question_number;
    if (localStorage.getItem("question_number") && !isNaN(localStorage.getItem("question_number"))) {
        //console.log("Valid question number.")
        question_number = parseInt(localStorage.getItem("question_number"));
    } else {
        //console.log("Invalid question number.")
        question_number = 0;
    }
    //console.log("getQuestionNumber() returned "+question_number)
    return question_number
}
/**
* Generates Quiz elements
* @param {number} question_number - The number of question for which the Quiz window will be created
*/
function generateQuestion(examQuestions) {
    let question_number=getQuestionNumber()
    let question_data_array = examQuestions[question_number] /*choosing the array with specific id ( or question_number=Lp.-1) in our array of arrays*/

    let quiz_header = "<h2>Pytanie kategoria " + savedCat + " nr " + (question_number + 1) + " z " + examQuestions.length + "</h2><button onclick=popup()><img src='icons/arrow-right-left.svg' alt='change icon'></button>"
    //console.log(question_data_array)
    let quiz_question = "<p>" + question_data_array["Pytanie"] + "<p>"
    let quiz_media;
    let quiz_media_file = "https://pub-47109044b689494aa7adc2265c690c36.r2.dev/media/" + question_data_array["Media"]
    //console.log(quiz_media_file)
    
       
    if (!quiz_media_file.endsWith("wmv")) {
        quiz_media = "<img src='" + quiz_media_file + "' alt='question image'>" 
    } else {
        quiz_media_file = quiz_media_file.substring(0, quiz_media_file.length - 4) + ".mp4";
        quiz_media = "<video src='" + quiz_media_file + "' controls autoplay muted></video>"
    }
    
    if (!question_data_array["Media"]) {
        console.log("no media")
        quiz_media = "<img class='ico' style='height: 80%; width:auto'  src='icons/camera-slash.svg'  alt='no media'>"
    }

    let quiz_actions;
        
    if (question_data_array["Poprawna odp"] == "T" || question_data_array["Poprawna odp"] == "N") {
        quiz_actions = "<button onclick='previous()'><img class='ico'  src='icons/caret-big-left.svg'  alt='left'></button>"
            + "<button id='T' onclick='check_answer(\"T\")'>TAK</button>"
            + "<button id='N' onclick='check_answer(\"N\")'>NIE</button>"
            + "<button id='next' onclick='next()'><img class='ico'  src='icons/caret-big-right.svg'  alt='left'></button>"
    } else {
        quiz_actions = "<button onclick='previous()'><img class='ico' src='icons/caret-big-left.svg'  alt='left'></button>"
            + "<button id='A' onclick='check_answer(\"A\")'>" + question_data_array["Odpowiedź A"] + "</button>"
            + "<button id='B' onclick='check_answer(\"B\")'>" + question_data_array["Odpowiedź B"] + "</button>"
            + "<button id='C' onclick='check_answer(\"C\")'>" + question_data_array["Odpowiedź C"] + "</button>"
            + "<button id='next' onclick='next()'><img class='ico'  src='icons/caret-big-right.svg'  alt='left'></button>"
    }
        
    document.getElementById('quiz-header').innerHTML = quiz_header
    document.getElementById('quiz-question').innerHTML = quiz_question
    document.getElementById('quiz-media').innerHTML = quiz_media
    document.getElementById('quiz-actions').innerHTML = quiz_actions
    
    /*For ExamMode*/
    if (localStorage.ExamMode==1 && userAnswers[question_number]){
        
        console.log("User have already answered this question.")
        let question_answer_array=userAnswers[question_number]
        
        check_answer(question_answer_array["userAnswer"])
        disableAnswerButtons()
    }
    
    
    if (localStorage.ExamMode==1 && question_number==examQuestions.length-1){
        
        console.log("Last question.")
        document.getElementById("next").innerHTML="<img class='ico'  src='icons/clipboard-check.svg'  alt='check'>"
    }
    
    //console.log("Function generateQuestion() succesful question data:") 
    //console.log("Lp:"+question_data_array["Lp"])
    //console.log("Zakres struktury:"+question_data_array["Zakres struktury"])
    //console.log("Liczba punktów:"+question_data_array["Liczba punktów"])
    //console.log("Rest of data:")
    //console.log(question_data_array)
}
function disableAnswerButtons(){
    if(document.getElementById('T')){
        document.getElementById('T').disabled=true
        document.getElementById('N').disabled=true
    }else{
        document.getElementById('A').disabled=true
        document.getElementById('B').disabled=true
        document.getElementById('C').disabled=true
    }
}
function check_answer(userAnswer) {

    let question_number=getQuestionNumber()
    let question_data_array = examQuestions[question_number]
    let correctAnswer = question_data_array["Poprawna odp"]
    
    if (correctAnswer == userAnswer) {
        document.getElementById(userAnswer).style.backgroundColor = "rgb(0, 240, 34)";
    } else {
        document.getElementById(userAnswer).style.backgroundColor = "red";
    }

    /*For ExamMode*/
    if (localStorage.ExamMode==1 && !userAnswers[question_number]){
        console.log("Saving Answer.")
        console.log("Calculating reward.")
        let reward
        if(userAnswer==correctAnswer){
            reward=parseInt(question_data_array["Liczba punktów"])
        }else{
            reward=0
        }
        userAnswers[question_number] = {
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: userAnswer == correctAnswer,
        points:reward
        }
        disableAnswerButtons()

    }
}
    



function next() {
    let question_number=getQuestionNumber()
    if (question_number == questionsAmount - 1 && localStorage.ExamMode==1) {
        // If last question in exam mode (result button)
        getResult()
    } else {
        localStorage.setItem("question_number", question_number + 1)
        question_number = parseInt(localStorage.getItem("question_number"));
        generateQuestion(examQuestions)
    }


}

function previous() {
    let question_number=getQuestionNumber()
    if (question_number == 0) {
    } else {
        localStorage.setItem("question_number", question_number - 1)
        question_number = parseInt(localStorage.getItem("question_number"));
        generateQuestion(examQuestions)
    }
}

function popup() {
    console.log("popup() initiated.")
    document.getElementById("popup").style.display = "flex"
}
function popup_close() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup").innerHTML=
    "<section id='jump-box'>"+
        "<h3>Przejdź do pytania:</h3>"+
        "<section class='jump-controls'>"+
            "<input type='number' id='jump-input' min='1' placeholder='Nr'>"+
            "<button onclick='jumpToQuestion()'>Przejdź</button>"+
        "</section>"+
    "</section>"
}
function refresh(){
    window.location="test-exam.html"
}

function jumpToQuestion() {

    let inputElement = document.getElementById("jump-input")
    let inputValue = parseInt(inputElement.value)-1
    localStorage.setItem("question_number", inputValue)
    generateQuestion(examQuestions)
    document.getElementById("popup").style.display = "none"
}

function getResult() {
    console.log()
    let totalScore=0
    let unanswered=0
    for(let i=1;i<33;i++){
        if(userAnswers[i-1]){
            let question_data_array = userAnswers[i-1]
            
            totalScore=totalScore+parseInt(question_data_array["points"])
        }else{
            unanswered=unanswered+1
        }
    }
    console.log(userAnswers)
    console.log(totalScore,"  unaswered:",unanswered)

    let result_header
    let result_score
    if (totalScore>=68){
        result_header="<section id='result-header'><h2>Zaliczony</h2><button onclick=popup_close()><img src='icons/x.svg' alt='change icon'></button></section>"
        result_score="<section id='result-score'><h1 style='color:rgb(0, 240, 34)'>"+totalScore+"/74</h1></section>"
    }else{
        result_header="<section id='result-header'><h2>Niezaliczony</h2><button onclick=popup_close()><img src='icons/x.svg' alt='change icon'></button></section>"
        result_score="<section id='result-score' style='color: red'><h1 style='color: red'>"+totalScore+"/74</h1></section>"
    }
    
    let result_details ="<section id='result-details'><p>Pytania bez odpowiedzi: "+unanswered+"</p></section>"
    let result_actions="<section id='result-actions'><button onclick=refresh()><img src='icons/refresh-cw.svg' alt='change icon'></button></section>"
    
    document.getElementById("popup").innerHTML=
    "<section id='result-box'>"+result_header+result_score+result_details+result_actions+"</section>"
    popup()
    
}