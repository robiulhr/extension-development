var stopWatchData = {
    tens: "",
    seconds: "",
    minute: ""
}
stopWatchData.seconds = 00;
stopWatchData.tens = 00;
stopWatchData.minute = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var appendMinute = document.getElementById("menute")
var buttonStart = document.getElementById('button-start');
var buttonStop = document.getElementById('button-stop');
var buttonReset = document.getElementById('button-reset');
var Interval;
buttonStart.onclick = function () {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

buttonStop.onclick = function () {
    clearInterval(Interval);
}


buttonReset.onclick = function () {
    clearInterval(Interval);
    stopWatchData.tens = "00";
    stopWatchData.seconds = "00";
    stopWatchData.minute = "00"
    appendTens.innerHTML = stopWatchData.tens;
    appendSeconds.innerHTML = stopWatchData.seconds;
    appendMinute.innerHTML = stopWatchData.minute;

}

function startTimer() {
    stopWatchData.tens++;

    if (stopWatchData.tens <= 9) {
        appendTens.innerHTML = "0" + stopWatchData.tens;
    }

    if (stopWatchData.tens > 9) {
        appendTens.innerHTML = stopWatchData.tens;

    }

    if (stopWatchData.tens > 99) {
        stopWatchData.seconds++;
        appendSeconds.innerHTML = "0" + stopWatchData.seconds;
        stopWatchData.tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (stopWatchData.seconds > 9) {
        appendSeconds.innerHTML = stopWatchData.seconds;
    }
    if (seconds > 59) {
        stopWatchData.minute++
        appendMinute.innerHTML = "0" + stopWatchData.minute;
        stopWatchData.seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (stopWatchData.minute > 9) {
        appendMinute.innerHTML = stopWatchData.minute
    }
}





