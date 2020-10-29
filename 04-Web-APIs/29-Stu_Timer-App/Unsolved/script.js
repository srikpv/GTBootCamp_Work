var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");

const workMinutes = "WorkMinutes";
const restMinutes = "RestMinutes";

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var Working = true;
var timerInterval = null;
var paused = false;


playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("click", StatusToggle);

workMinutesInput.addEventListener("change", function(e){
  localStorage.setItem(workMinutes, this.value);
  ResetNumbers();
});
restMinutesInput.addEventListener("change", function(e){
  localStorage.setItem(restMinutes, this.value);
  ResetNumbers();
});

function stopTimer(){
  ResetTime();
  DisplayNumbers();
}

function pauseTimer(){
  paused = !paused;
  paused ? clearInterval(timerInterval) : startTimer(); 
}

function startTimer(){
  paused = false;
  timerInterval = setInterval(function(){
    if(totalSeconds === 0 || paused) {
      return;
    }
    DisplayNumbers();
    totalSeconds--;
  }, 1000);
}

function ResetTime(){
  totalSeconds = (Working) ? parseInt(workMinutesInput.value) * 60 : parseInt(restMinutesInput.value) * 60;
  clearInterval(timerInterval);
}

function StatusToggle(){
  Working = !Working;
  ResetTime();
  DisplayNumbers();
}

function DisplayNumbers(){
  var minutes = parseInt(totalSeconds / 60);
  var seconds = (totalSeconds - (parseInt(totalSeconds / 60)*60));
  minutesDisplay.textContent = (minutes < 10) ? ("0" + minutes) : minutes;
  secondsDisplay.textContent = (seconds < 10) ? ("0" + seconds) : seconds;
}

function ResetNumbers(){  
  var storage_work_minutes = localStorage.getItem(workMinutes);
  if(storage_work_minutes == null){
    localStorage.setItem(workMinutes, workMinutesInput.value);
    storage_work_minutes = workMinutesInput.value;
  }
  var storage_rest_minutes = localStorage.getItem(restMinutes);
  if(storage_rest_minutes == null){
    localStorage.setItem(restMinutes, restMinutesInput.value);
    storage_rest_minutes = restMinutesInput.value;
  }

  workMinutesInput.value = storage_work_minutes;
  restMinutesInput.value = storage_rest_minutes;

  ResetTime();
  DisplayNumbers();
}

window.addEventListener("load", ResetNumbers);