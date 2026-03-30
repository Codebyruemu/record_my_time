
const studyData = JSON.parse(localStorage.getItem("studyData"))
const userName = studyData !== null ? studyData[0] : null
const lockInTimeObj = studyData !== null ? studyData[1] : null

if (userName !== null){
    const userNameField = document.getElementById('u-name')
    userNameField.textContent = userName
}

if(lockInTimeObj !== null){
    const reportFound = document.getElementById('report-found')
    const dataTbRow = document.getElementById('actual-data')
    dataTbRow.innerHTML=""
    const entryArr = Object.entries(lockInTimeObj).reverse()
    entryArr.forEach(([k,v])=>{
        let sumVal = v.reduce((x,y)=>x+y)
        let avg = sumVal/v.length

        const dataDay = document.createElement('td')
        const dataTotalTime = document.createElement('td')
        const dataAvgTime = document.createElement('td')

        dataDay.textContent = `${k}`
        dataTotalTime.textContent = `${sumVal}`
        dataAvgTime.textContent = `${avg}`

        dataTbRow.appendChild(dataDay)
        dataTbRow.appendChild(dataTotalTime)
        dataTbRow.appendChild(dataAvgTime)

    })
    document.getElementById('no-report').classList.add('hidden')

    reportFound.classList.remove('hidden')
}else{
    document.getElementById('no-report').classList.remove('hidden')
}
