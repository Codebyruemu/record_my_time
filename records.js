
const studyData = JSON.parse(localStorage.getItem("studyData"))
const userName = studyData !== null ? studyData[0] : null
const lockInTimeObj = studyData !== null ? studyData[1] : null

if (userName !== null){
    const userNameField = document.getElementById('u-name')
    userNameField.textContent = userName
}

if(lockInTimeObj !== null){
    const reportFound = document.getElementById('report-found')
    const table = document.querySelector('table')
    
    const entryArr = Object.entries(lockInTimeObj).reverse()
    entryArr.forEach(([k,v])=>{
        let TotalTime = v.timeVest.reduce((x,y)=>x+y,0)

        let hrPart = Math.floor(TotalTime/3600)
        let minPart = Math.floor((TotalTime % 3600)/60)

        let avg = (TotalTime/v.timeVest.length)
        let avghrPart = Math.floor(avg/3600)
        let avgminPart = Math.floor((avg % 3600)/60)

        const tableRw = document.createElement('tr')
        const Day = document.createElement('td')
        const dayTotalTime = document.createElement('td')
        const dayAvgTime = document.createElement('td')
        

        Day.textContent = `${k}`
        
        dayTotalTime.textContent = `${hrPart}:${minPart}`
        dayAvgTime.textContent = `${avghrPart}:${avgminPart}`

        tableRw.appendChild(Day)
        tableRw.appendChild(dayTotalTime)
        tableRw.appendChild(dayAvgTime)

        table.appendChild(tableRw)

    })
    document.getElementById('no-report').classList.add('hidden')

    reportFound.classList.remove('hidden')
}else{
    document.getElementById('no-report').classList.remove('hidden')
}
