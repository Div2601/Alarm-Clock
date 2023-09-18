// DOM elements
const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second')
const ampmSelect = document.getElementById('ampm');
const setAlarmBtn = document.getElementById('setAlarm');
const alarmList = document.getElementById('alarmList');

// Store alarms
const alarms = [];

// Update the clock display
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    timeDisplay.textContent = `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
    dateDisplay.textContent = now.toDateString();
}

// Update the clock display every second
setInterval(updateClock, 1000);
updateClock();

// Set an alarm
setAlarmBtn.addEventListener('click', () => {
    const hour = parseInt(hourInput.value);
    const minute = parseInt(minuteInput.value);
    const second = parseInt(secondInput.value);
    const ampm = ampmSelect.value;

    if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        alert('Please enter valid time values.');
        return;
    }

    const alarmTime = new Date();
    alarmTime.setHours(hour + (ampm === 'PM' && hour !== 12 ? 12 : 0));
    alarmTime.setMinutes(minute);
    alarmTime.setSeconds(second);

    alarms.push(alarmTime);

    const li = document.createElement('li');
    li.textContent = `${hour}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} ${ampm}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const index = alarms.indexOf(alarmTime);
        if (index !== -1) {
            alarms.splice(index, 1);
            alarmList.removeChild(li);
        }
    });
    li.appendChild(deleteBtn);
    alarmList.appendChild(li);

    hourInput.value = '';
    minuteInput.value = '';
    secondInput.value = '';
    ampmSelect.value = 'AM';
});

// Check for alarms every minute
setInterval(() => {
    const now = new Date();
    for (const alarm of alarms) {
        if (
            now.getHours() === alarm.getHours() &&
            now.getMinutes() === alarm.getMinutes()
        ) {
            alert('Alarm!');
        }
    }
}, 60000);
