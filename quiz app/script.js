const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');
const scoreCard=document.querySelector('.scoreCard');
const alert=document.querySelector(".alert");
const startBtn=document.querySelector(".startBtn");
const timer=document.querySelector(".timer");
//Make an array of objects that stores question,choices of question and answers
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
];
let currentQuestionIndex=0;
let score=0;
let quizOver=false;
let timeLeft=15;
let timerID=null;
const showQuestions=()=>{
    const questionDetails=quiz[currentQuestionIndex];
    questionBox.textContent=questionDetails.question;
    choicesBox.textContent=""
    for(let i=0;i<questionDetails.choices.length;i++){
        const currentChoice=questionDetails.choices[i];
        const choiceDiv=document.createElement('div');
        choiceDiv.classList.add('choice');
        choiceDiv.textContent=currentChoice;
        choicesBox.appendChild(choiceDiv)
        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected')
            }
        })
    }
    if(currentQuestionIndex<quiz.length){
        startTimer()
    }
}
//Function to check your answer
const checkAnswer=()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if(selectedChoice.textContent===quiz[currentQuestionIndex].answer){
        displayAlert("Correct Answer!")
        score++;
    }
    else{
        displayAlert(`Wrong answer but correct answer is ${quiz[currentQuestionIndex].answer}`)
    }
    timeLeft=15
    currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
        showQuestions();
    }
    else{
        stopTimer();
        showSCore()
    }
}
//Function to show score
const showSCore=()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    nextBtn.textContent="Play Again"
    displayAlert("You have completed the quiz")
    scoreCard.textContent=`You scored ${score} out of ${quiz.length}!`;
    quizOver=true;
    timer.style.display="none"
}
//Function to show Alert
const displayAlert=(msg)=>{
    setTimeout(()=>{
        alert.style.display="none"
    },2000)
    alert.style.display="block";
    alert.textContent=msg;
}
//function to start the timer of the quiz app
const startTimer=()=>{
    clearInterval(timerID)
    const countDown=()=>{
        timer.textContent=timeLeft
        timeLeft--;
        if(timeLeft===0){
            const confirmUser=confirm("TIme Up!!! Do you wnat to play the quiz again")
            if(confirmUser){
                timeLeft=15;
                startQuiz();
            }
            else{
                startBtn.style.display="block"
                container.style.display="none"
                return
            }
        }
    }
    timerID=setInterval(countDown,1000)
}
const stopTimer=()=>{
    clearInterval(timerID)
}
const shuffleQuestions=()=>{
    for(let i=quiz.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    currentQuestionIndex=0;
    showQuestions()
}
const startQuiz=()=>{
    timeLeft=15
    timer.style.display="flex"
    shuffleQuestions()
}
//adding event listener to start button
startBtn.addEventListener("click",()=>{
    container.style.display="block";
    startBtn.style.display="none"
    startQuiz()
})
nextBtn.addEventListener("click",()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent==="Next"){
        displayAlert("Select your answer")
        return
    }
    if(quizOver){
        nextBtn.textContent="Next";
        scoreCard.textContent="";
        currentQuestionIndex=0;
        startQuiz()
        quizOver=false
        score=0
    }
    else{
        checkAnswer()
    }
})