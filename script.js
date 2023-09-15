// getting dom element to set time in DOM
const daysElem = document.getElementById("days");
const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");

// getting flip element to flip when need
const flipDays = document.querySelector(".days");
const flipHours = document.querySelector(".hours");
const flipMinutes = document.querySelector(".minutes");
const flipSeconds = document.querySelector(".seconds");
const removeFlipElem = document.querySelectorAll(".remove-flip");

// common classes for flip
const animateFlipClass = ["animate", "animate-normal", "top-50"];

// set by the user
function setLaunchTime(event) {
  event.preventDefault();
  const date = event.target[0].value;
  const time = event.target[1].value;
  if (!date || !time) {
    alert("you have to fill all the input first");
  } else {
    console.log(date, time);
    localStorage.setItem("date-time", date + " " + time);
    launchCountDownStart("hey");
  }
}

function launchCountdown(endTime) {
  // here to set the launch date
  const setLaunchingDate =
    Date.parse("september 14,2023 16:30:00") - Date.parse(new Date());

  if (setLaunchingDate >= 0) {
    // converting the date that we get from parse in to days, hour, second and minutes
    const launchRemainingDays = convertToDoubleDigit(
      Math.floor(setLaunchingDate / (1000 * 60 * 60 * 24))
    );
    const launchRemainingHour = convertToDoubleDigit(
      Math.floor((setLaunchingDate / (1000 * 60 * 60)) % 24)
    );
    const launchRemainingMinutes = convertToDoubleDigit(
      Math.floor((setLaunchingDate / 1000 / 60) % 60)
    );
    const launchRemainingSecond = convertToDoubleDigit(
      Math.floor((setLaunchingDate / 1000) % 60)
    );

    // setting the timer into DOM
    daysElem.innerHTML = `${launchRemainingDays}`;

    hoursElem.innerHTML = `${launchRemainingHour}`;

    minutesElem.innerHTML = `${launchRemainingMinutes}`;

    secondsElem.innerHTML = `${launchRemainingSecond}`;

    // for flipping
    flipSeconds.classList.add("animate", "animate-second", "top-50");

    if (launchRemainingSecond <= 0) {
      flipMinutes.classList.add(...animateFlipClass);
      if (launchRemainingMinutes <= 0) {
        flipHours.classList.add(...animateFlipClass);
        if (launchRemainingHour <= 0) {
          flipDays.classList.add(...animateFlipClass);
        }
      }
    }
    // removing flip effect from others when second change
    if (launchRemainingSecond > 0) {
      removeFlipElem.forEach((res) => {
        res.classList.remove(...animateFlipClass);
      });
    }
  }
  return setLaunchingDate < 1;
}
// to set 0 in single digit number
function convertToDoubleDigit(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number.toString();
  }
}

// getting Element to show them when the timer completed
const smoke = document.getElementById("smokes");
const smokeItem = document.querySelectorAll(".smoke-item");
const rocket = document.querySelector(".rocket");

// calling the launcher countDown every second to get new time
function launchCountDownStart(endTime) {
  const interval = setInterval(() => {
    // calling the launcher countDown
    const countDown = launchCountdown(endTime);

    //   when countdown finish
    if (countDown) {
      // removing animated class from all the flip element when launch successful
      flipSeconds.classList.remove(...animateFlipClass);
      removeFlipElem.forEach((res) => {
        res.classList.remove(...animateFlipClass);
      });
      // showing some effects with elements when the timer is completed
      smoke.classList.add("visible");
      smokeItem.forEach((res) => {
        res.classList.add("smoke");
      });
      rocket.classList.add("rocket-animate");

      // clearing the interval so the setTimeout is stop calling it self when the launch completed
      clearInterval(interval);
      localStorage.setItem("launched", "true");
    }
  }, 1000);
}
//-------------- previous tries -----------------

// let setSeconds = "10";
// secondsElem.innerHTML = `<span> ${setSeconds}</span>`;
// setInterval(() => {
//   if (setSeconds && setSeconds !== "01") {
//     setSeconds = convertToDoubleDigit(setSeconds).toString();
//     secondsElem.innerHTML = `<span> ${setSeconds}</span>`;
//   } else {
//     setSeconds = 59;
//     secondsElem.innerHTML = `<span> ${setSeconds}</span>`;
//   }
// }, 1000);

// let days = 21;
// let seconds = 60;
// const hours = 24;

// const a = Date.parse("september 15,2023 18:14:30") - Date.parse(new Date());

// // seconds
// console.log(Math.floor((a / 1000) % 60));
// // minutes
// console.log(Math.floor((a / 1000 / 60) % 60));
// // Hours
// console.log((a / (1000 * 60 * 60)) % 24);
// // Days
// console.log(a / (1000 * 60 * 60 * 24));

// function launchCountdown() {
//   const launchingDates = 14;
//   const launchingHours = 24;
//   const launchingMinutes = 60;
//   const launchingSeconds = 60;

//   const launchRemainingDays = convertToDoubleDigit(
//     launchingDates - new Date().getDate()
//   );

//   const launchRemainingHour = convertToDoubleDigit(
//     launchingHours - new Date().getHours()
//   );
//   const launchRemainingMinutes = convertToDoubleDigit(
//     launchingMinutes - new Date().getMinutes()
//   );
//   const launchRemainingSecond = convertToDoubleDigit(
//     launchingSeconds - new Date().getSeconds()
//   );

//   daysElem.innerHTML = `<span>${launchRemainingDays}</span>`;
//   hoursElem.innerHTML = `<span>${launchRemainingHour}</span>`;
//   minutesElem.innerHTML = `<span>${launchRemainingMinutes}</span>`;
//   secondsElem.innerHTML = `<span>${launchRemainingSecond}</span>`;
// }

// setInterval(() => {
//   launchCountdown();
// }, 1000);

// function convertToDoubleDigit(number) {
//   if (number < 10) {
//     // if (number < 0) {
//     //   return "00";
//     // } else {
//     return "0" + number;
//     // }
//   } else {
//     return number.toString();
//   }
// }
