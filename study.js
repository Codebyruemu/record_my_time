
localStorage.removeItem('studyData')

import { initClocks,slider } from './utilityfunc.js' 

const studyData = JSON.parse(localStorage.getItem('studyData')) || []
const profileName = studyData[0]





let firstModal = document.getElementById('modal-cont')
let profileForm = document.getElementById('name-form')

let userID = document.getElementById('u-name')
let closeModalBtn = document.querySelector('.close-modal')
let ModalTwoCont = document.getElementById("modal-cont-2")
let backBtn = document.getElementById("bck-login")

if(!profileName){
   
    firstModal.classList.remove('hidden')  
}
//fill ui with name obtained from studyDB[0]
userID.textContent = profileName

if(profileForm){
    profileForm.addEventListener("submit" , (e) =>{
        e.preventDefault();
        let formInput = document.getElementById('name').value
        let savedName = nameSave(processName(formInput))
        firstModal.classList.add('hidden')
        userID.textContent = savedName
    })
}

closeModalBtn.addEventListener('click', ()=>{
    firstModal.classList.add('hidden')
    ModalTwoCont.classList.remove('hidden')
})
backBtn.addEventListener('click', ()=>{
    ModalTwoCont.classList.toggle('hidden')
    firstModal.classList.toggle('hidden')

})

const sessionBtn = document.getElementById("session-btn");
const TimeContDiv = document.getElementById("time-buttons");
const timeControls = TimeContDiv.querySelectorAll('img')
const studyContainer = document.getElementById("study-cont");
const subjectFocus = document.getElementById("study-2-header");
const motivationTips = document.getElementById('slide-words');


//session subject entry trigger button
sessionBtn.addEventListener('click', ()=>{
    studyContainer.classList.remove('hidden')
})

//session subject login
const focusForm = document.getElementById('study-form')
const dynamicTxtOne = document.getElementById('dynamic-txt-1')
const dynamicTxtTwo = document.getElementById('dynamic-txt-2')
if(focusForm){
    focusForm.addEventListener("submit" , (e) =>{
        e.preventDefault();
        subjectFocus.innerHTML=""
        let focusInput = document.getElementById('study-focus').value
        let studyDuration = document.getElementById('locked-in-time').value
        let lockedInTime = saveLockedInTime(Number(studyDuration),dynamicTxtOne,dynamicTxtTwo);
        studyContainer.classList.add('hidden');
        
        subjectFocus.innerHTML = `
        <img src="./images/182321.png" alt="book" width="20px" height="20px">
        <h3 class="section-2-h3">${focusInput}</h3>`
        timeControls.forEach((el)=>{
            el.classList.remove('hidden')
        })
        motivationTips.textContent="Be intentional about what you want"
        sessionBtn.classList.add('hidden')
        let sliderIntervalId = slider(motivationTips)

        //its the timer engine(starts timer, stop timer)
        initClocks(lockedInTime, () => clearInterval(sliderIntervalId))
        
    })
}




const processName = (name)=>{
 return name.slice(0,1).toUpperCase() + name.slice(1,name.length).toLowerCase()

}

function nameSave(name){
    if(name){
        studyData[0] = name
        localStorage.setItem('studyData',JSON.stringify(studyData))
        return name
    }
};

function saveLockedInTime(timeVal,elone,elTwo){
    console.log(timeVal)
    if(timeVal<=0) return null
    elone.textContent ='time invested'
    elTwo.textContent= `${timeVal} hr(s) stoppage time`
    //studyData[2] = timeVal
    //localStorage.setItem('studyData',JSON.stringify(studyData))
    return timeVal
}




function getLastThreeDays(clockedTime) {
  const keys = Object.keys(clockedTime);

  const lastThreeKeys = keys.slice(-3);

  return lastThreeKeys.map(key => ({ [key]: clockedTime[key] }));
}
