//constants-------------------------------
const moon_Images =[
    "0.png" , "1.png" , "2.png" , "3.png" , "4.png" , "5.png" , "6.png" , "7.png" , 
     "8.png" , "9.png" , "10.png" , "11.png" , "12.png" , "13.png" , "14.png" , "15.png" , 
]

const moon_Phases= [
    "Now Moon " ,  "Waning Crescent" , "Third Quarter" , " Waning Gibbous",
     "Full Foon" ,  "Waxing Gibbous" , "First Quarter" , "Waxing Crescent"
]

const  moon_Cycle_days = 29.5
const new_moon_Date = new Date(2024 , 0, 10)


// current month and year__________________________________

let current_Month = new Date().getMonth()
let current_Year = new Date().getFullYear()

let selectedDay = new Date().getDate()


//  Create Calendar______________________________________________

function create_Calendar(month, year) {
    let Calendar = document.getElementById("Calendar-grid")
    const month_days = new Date(year,month+ 1, 0).getDate()
    //console.log(month_days)
    let div_element=''
    for(let day = 1; day <= month_days; day++){
    div_element +=`<div 
    class="${selectedDay === day ? 'selected' : ''}" 
    onclick="handleDaySelect(${day})">${day}
    </div>`
}
        
Calendar.innerHTML = div_element 
   document.getElementById("Current-Month").innerText = new Date(year, month).toLocaleString('en-US', {
    year: '2-digit',
    month: 'long'
    })

}

function handleDaySelect(day){
    //console.log(day)
    selectedDay = day
    const date = new Date(current_Year,current_Month, day)
    const moon_Index = get_moon_phase_index(date)
    display_moon_phase(date, moon_Index)
    create_Calendar(current_Month, current_Year)

}


// Prev Month & Next Month button______________________________________

function prevMonth(){
current_Month--
    if (current_Month < 0) {
        current_Month = 11
        current_Year--
    }
    create_Calendar(current_Month, current_Year)
}

function nextMonth(){
    current_Month++
    if (current_Month > 11) {
        current_Month = 0
        current_Year++
    }
    create_Calendar(current_Month, current_Year)
}

// display moon phase ______________________________________________

function get_moon_phase_index(date){
    const days_since_new_moon =Math.floor ((date - new_moon_Date)  / (1000 * 60  *60 * 24))
    const moon_age = Math.floor(days_since_new_moon % moon_Cycle_days)
    const index = Math.floor((moon_age / moon_Cycle_days) * moon_Images.length)
    return index

}
 
// MAIN FUNction ____________________________________________________

function display_moon_phase(date,index){
    document.getElementById("moon-image").src = `./images/${moon_Images[index]}`
    document.getElementById("moon-phase-name").textContent= moon_Phases[Math.floor(index/2)]
    document.getElementById("selected-date").textContent = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    })
}

function show_Current_Phase(){
    const today = new Date()
    const index = get_moon_phase_index(today)
    display_moon_phase(today, index)
}
show_Current_Phase()
create_Calendar(current_Month ,current_Year)

