const records = document.getElementById("history")
const displayTime1 = document.getElementById('displayTime1'); 
const displayTime2 = document.getElementById('displayTime2'); 

const watchStopBtn = document.getElementById("watchStop");
const watchStartBtn = document.getElementById("watchStart");

const motivationTips = document.getElementById('slide-words');
const sessionBtn = document.getElementById('session-btn');
const subjectFocus = document.getElementById("study-2-header");

const dynamicTxtOne = document.getElementById('dynamic-txt-1')
const dynamicTxtTwo = document.getElementById('dynamic-txt-2')

let threshold = 0;
let onStopCallback = null;

const Quotes = [
    "Don’t watch the clock; do what it does. Keep going.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Education is the most powerful weapon which you can use to change the world.",
    "The expert in anything was once a beginner.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."

] 



export const slider = (htmlEl)=>{
    let count = 0;
    return(
        setInterval(()=>{
        let curntQuote = Quotes[count]
        htmlEl.textContent= curntQuote
        count = count< Quotes.length-1 ? count +1 : 0
    },10000)
    )
 }


watchStartBtn.addEventListener('click', resumeClock1);
watchStopBtn.addEventListener('click', pauseClock1);

let [sec1, min1, hr1] = [0,0,0]; // Clock1
let [sec2, min2, hr2] = [0,0,0]; // Clock2

let clock1 = null;
let clock2 = null;

 
let start = null;

function formatTime(h, m, s) {
  let hh = h < 10 ? "0" + h : h;
  let mm = m < 10 ? "0" + m : m;
  let ss = s < 10 ? "0" + s : s;
  return `${hh}:${mm}:${ss}`;
}

// Clock1 tick
function tickClock1() {
  sec1++;
  if (sec1 === 60) { sec1 = 0; min1++; }
  if (min1 === 60) { min1 = 0; hr1++; }
  displayTime1.textContent = formatTime(hr1, min1, sec1);
}

// Clock2 tick
function tickClock2() {
  sec2++;
  if (sec2 === 60) { sec2 = 0; min2++; }
  if (min2 === 60) { min2 = 0; hr2++; }
  displayTime2.textContent = formatTime(hr2, min2, sec2);

  let elapsed = Date.now() - start;
  if (elapsed >= threshold) {
    stopAll();
  }
}
//reset hr,ms,ss in ui
function resetTimeUI (){
  [sec1, min1, hr1] = [0,0,0]; 
  [sec2, min2, hr2] = [0,0,0]
  displayTime1.textContent = formatTime(hr1, min1, sec1);
  displayTime2.textContent = formatTime(hr2, min2, sec2);
}

// Auto‑start both clocks
export function initClocks(lockedInTime, stopCallback = null) {
  threshold = lockedInTime * 60 * 60 * 1000;
  onStopCallback = stopCallback;
  if (!clock1 && !clock2) {
    start = Date.now();
    clock1 = setInterval(tickClock1, 1000);
    clock2 = setInterval(tickClock2, 1000);
  }
}

// Pause Clock1
//we first of all clear the interval set clock1 value to be null and on resume set back the interval
export function pauseClock1() {
  clearInterval(clock1);
  clock1 = null;
}

// Resume Clock1
export function resumeClock1() {
  if (!clock1) {
    clock1 = setInterval(tickClock1, 1000);
  }
}

// Stop everything at threshold
function stopAll() {
  clearInterval(clock1);
  clearInterval(clock2);
  clock1 = null;
  clock2 = null;

  console.log("Threshold reached!");
  console.log("Clock1 final:", formatTime(hr1, min1, sec1));
  console.log("Clock2 final:", formatTime(hr2, min2, sec2));

    let currentDayName = getDay()
    let timeValue = hr1 + (min1/100)
    console.log(currentDayName)
    console.log(hr1,min1,sec1)

  if (onStopCallback) onStopCallback();

   addStudyItem(currentDayName,timeValue)
   
}

function getDay() {
    let dateNum = new Date().getDay()
    switch(dateNum){
        case 1:
            return 'monday';
        case 2:
            return 'tuesday';
        case 3:
            return 'wednessday';
        case 4:
            return 'thursday';
        case 5:
            return 'friday';
        case 6:
            return 'saturday';
        default:
            return 'sunday'
        
    }
}

function addStudyItem(day, timeValue) {
  let studyData = JSON.parse(localStorage.getItem('studyData')) || [];

  let clockedTime = studyData[1] !== undefined ? studyData[1] : {};
  let todayDate = new Date().getDate()

  if (clockedTime.hasOwnProperty(day)) {
      if(clockedTime.lastTime){
          if(lastTime === todayDate ){
              clocked[day].push(timeValue) 
          }
          clockedTime[day]=[timeValue];

      }else{
        clockedTime[day]=[timeValue];
        clockedTime.lastTime = todayDate

      }
      
  } else {
    clockedTime[day] = [timeValue];
    clockedTime.lastTime = todayDate

  }

  studyData[1] = clockedTime;

  localStorage.setItem('studyData', JSON.stringify(studyData));
  reseUiEl()
    
 
}

//this function just updates UI does not have anything todo with slider() above
function reseUiEl() {
  setTimeout(()=>{
    motivationTips.textContent='No Active study session!'
  },3000)
  motivationTips.textContent = "Time investment saved successful";
  sessionBtn.classList.remove('hidden');
  watchStartBtn.classList.add('hidden')
  watchStopBtn.classList.add('hidden')
  subjectFocus.innerHTML=""
  dynamicTxtOne.textContent=""
  dynamicTxtTwo.textContent=""

  resetTimeUI()
  records.classList.remove('hidden')

}



