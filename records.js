
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
    console.log(table)
    
    const entryArr = Object.entries(lockInTimeObj).reverse()
    entryArr.forEach(([k,v])=>{
        let sumVal = v.timeVest.reduce((x,y)=>x+y)
        let avg = (sumVal/v.timeVest.length)
        let processAvg = parseFloat(avg.toFixed(2))

        const tableRw = document.createElement('tr')
        const Day = document.createElement('td')
        const dayTotalTime = document.createElement('td')
        const dayAvgTime = document.createElement('td')

        Day.textContent = `${k}`
        dayTotalTime.textContent = `${sumVal}`
        dayAvgTime.textContent = `${processAvg}`

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
