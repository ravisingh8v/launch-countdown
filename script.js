// when user select the input
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

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
    // const getLunchTime = localStorage.getItem("date-time");
    const formattedDate = convertUserInputTime(date + " " + time);
    if (Date.parse(formattedDate) >= Date.parse(new Date())) {
      isOverlayVisible = false;
      overlay.classList.add("invisible");
      localStorage.setItem("date-time", formattedDate);
      clearInterval(interval);
      flipSeconds.classList.remove(...animateFlipClass);
      launchCountDownStart(formattedDate);
    } else {
      alert(
        "you cant set previous dates as a launch time please set upcoming dates"
      );
    }
    // console.log(event);
  }
}

function launchCountdown(endTime) {
  // here to set the launch date
  const setLaunchingDate = Date.parse(endTime) - Date.parse(new Date());
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

// getting Element to show them when the timer completed
const smoke = document.getElementById("smokes");
const smokeItem = document.querySelectorAll(".smoke-item");
const rocket = document.querySelector(".rocket");

// resetting the launch effect
// smoke.classList.remove("visible");
// smokeItem.forEach((res) => {
//   res.classList.remove("smoke");
// });
// rocket.classList.remove("rocket-animate");

// calling the launcher countDown every second to get new time
let interval;
function launchCountDownStart(endTime) {
  interval = setInterval(() => {
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

// On Init
const getLunchTime = localStorage.getItem("date-time");
// if (getLunchTime) {
if (getLunchTime && Date.parse(getLunchTime) >= Date.parse(new Date())) {
  launchCountDownStart(getLunchTime);
} else {
  launchCountDownStart("december 20,2023 13:30:60");
}
// }
//  else {
//   launchCountDownStart("december 20,2023 13:30:60");
// }

// ================== helper functions ====================

// converting input time to parsing form
function convertUserInputTime(getLunchTime) {
  const date = getLunchTime.split(" ")[0].split("-");
  const time = getLunchTime.split(" ")[1] + ":" + "00";
  const formattedDate =
    months[+date[1] - 1] + " " + date[2] + ", " + date[0] + " " + time;
  return formattedDate;
}

// to set 0 in single digit number
function convertToDoubleDigit(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number.toString();
  }
}

const overlay = document.querySelector(".overlay");
let isOverlayVisible = false;
function toggleOverlay() {
  isOverlayVisible = !isOverlayVisible;
  if (!isOverlayVisible) {
    overlay.classList.add("invisible");
  } else {
    overlay.classList.remove("invisible");
  }
}

// driver js

const driver = window.driver.js.driver;

const driverObj = driver();

function highlightTour() {
  driverObj.setConfig({
    stagePadding: 5,
    disableActiveInteraction: true,
    onDeselected() {
      localStorage.setItem("highlightTour", "true");
    },
    // Animation: false,
  });

  driverObj.highlight({
    element: "#setting",
    popover: {
      title: "Set Launch Time",
      description: "You can set new launch time from here",
    },
  });
}

if (!localStorage.getItem("highlightTour")) {
  setTimeout(() => {
    highlightTour();
  }, 500);
}

function startTour() {
  driverObj.destroy();

  if (!localStorage.getItem("setLaunchTour")) {
    driver({
      showProgress: true,
      stagePadding: 3,
      allowClose: false,
      steps: [
        {
          element: "#date",
          popover: {
            title: "Date",
            description: "Select date, When you are going to launch ",
          },
        },
        {
          element: "#time",
          popover: {
            title: "Time",
            description: "Select time, When you are going to launch ",
          },
        },
        {
          element: "#submit",
          popover: {
            title: "Submit",
            description: "Set Selected launch time and start Countdown",
            onNextClick(element, step, opts) {
              driver().moveNext();
              localStorage.setItem("setLaunchTour", "true");
            },
          },
        },
      ],
    }).drive();
  }
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
