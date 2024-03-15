import apmtController from './Controllers/appointmentController.js';

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span"),
inputButton = document.getElementById('submitButton');

let dateToSend, timeToSend;

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const constantCurrentMonth = date.getMonth();
const constantCurrentYear = date.getFullYear();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {    

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";

        if ( (constantCurrentMonth > currMonth && constantCurrentYear === currYear) ||  constantCurrentYear > currYear) {
            liTag += `<li class="inactive">${i}</li>`;
        } else {    

            if ( i < date.getDate() && constantCurrentMonth === currMonth ) {
                liTag += `<li class="inactive">${i}</li>`;
            } else {
                liTag += `<li class="${isToday}" data-day="${i}">${i}</li>`;
            }
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}

renderCalendar();

// Después de agregar los elementos li al DOM, asigna los eventos onclick
document.querySelectorAll('.days li').forEach((li) => {
    li.addEventListener('click', function() {
        mostrarDiv(parseInt(this.dataset.day));
    });
});

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    
        if (icon.id === "exit") {

        } else {
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        }

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

inputButton.addEventListener("click", () => {
    sendAppointment()
});

function setTimeToSend()
{
    let time = document.getElementById('hora').value;
    timeToSend = time;
}

function setDateToSend(day)
{
    let date = new Date(currYear, currMonth, day)
    dateToSend = formatDate(date)
}

function mostrarDiv(day) {
    let div = document.querySelector(".time");
    div.style.display = 'block';

    // Quitar la clase 'active' solo de los elementos li que no sean el día actual
    document.querySelectorAll('.days li:not(.inactive)').forEach((li) => {
        if (li.innerText != date.getDate()) {
            li.classList.remove('active', 'selected');
        }
    });

    // Agregar la clase 'active' al día seleccionado
    event.target.classList.add('active');

    // Agregar la clase 'selected' al día seleccionado
    event.target.classList.add('selected');

    setDateToSend(day)
}

function formatDate(date)
{
    // Obtener el año, mes y día del objeto Date
    const anio = date.getFullYear(); // Obtiene el año (ej. 2023)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes (de 0 a 11, se suma 1 y se formatea con 0 a la izquierda)
    const day = date.getDate().toString().padStart(2, '0'); // Obtiene el día del mes y lo formatea con 0 a la izquierda

    // Formatear la fecha como "año - mes - día"
    const formatDate = `${anio}-${month}-${day}`;

    return formatDate;
}

function sendAppointment()
{
    setTimeToSend();    

    let apmt = {
        date: dateToSend,
        start_time: timeToSend,
        email: "frontend@gmail.com"
    }

    apmtController.create(apmt)
}

// Agrega un evento de clic al elemento con id 'exit' para cerrar .time
document.getElementById('exit').addEventListener('click', function(event) {
    document.querySelector(".time").style.display = 'none';
});






