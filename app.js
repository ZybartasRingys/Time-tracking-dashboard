const workContainer = document.getElementById("work");
const timeOption = document.querySelectorAll(".time");
const container = document.querySelector(".regular-cards");

let timeframe = "weekly"; //
let regularCards;

let data = {};

// fetch funckija gauti data is json failo.

fetch("data.json")
  .then((resp) => resp.json())
  .then((jsonData) => {
    jsonData.forEach((element) => {
      container.insertAdjacentHTML(
        "beforeend",
        createRegularCard(element, timeframe)
      );

      // array to dict
      jsonData.forEach((element) => {
        data[element.title] = element.timeframes;
      });
    });

    jsonData.forEach((element) => {
      data[element.title] = element.timeframes;
    });

    regularCards = document.querySelectorAll(".regular-card");
  });

timeOption.forEach((element) => {
  element.addEventListener("click", optionsOnClick);
});

// functions

function optionsOnClick(event) {
  timeOption.forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
  timeframe = event.target.innerText.toLowerCase();

  updateCards(timeframe);
}

// update cards

function updateCards(timeframe) {
  regularCards.forEach((card) => {
    updateCard(card, timeframe);
  });
}

function updateCard(card, timeframe) {
  const title = card.querySelector(".card-title").innerText;
  const current = data[title][timeframe]["current"];
  const previous = data[title][timeframe]["previous"];

  const timeframeMsg = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  const hoursElement = card.querySelector(".current");
  hoursElement.innerText = `${current}hrs`;
  const msgElement = card.querySelector(".last");
  msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe) {
  let title = element["title"];
  let current = element["timeframes"][timeframe]["current"];
  let previous = element["timeframes"][timeframe]["previous"];

  const timeframeMsg = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  return `
  <div class="card regular-card ${title.toLowerCase().replace(/\s/g, "")} ">
                <div class="card-top"></div>
                <div
                  class="card-body d-flex flex-column justify-content-between justify-content-xxl-evenly"
                >
                  <div class="title d-flex justify-content-between">
                    <h5 class="card-title">${title}</h5>
                    <img
                      class="dots"
                      src="/images/icon-ellipsis.svg"
                      alt="icon-ellipsis"
                    />
                  </div>

                  <div
                    class="hours d-flex flex-xxl-column justify-content-between align-items-center align-items-xxl-start"
                  >
                    <h5 class="current">${current}hrs</h5>
                    <h5 class="last">${
                      timeframeMsg[timeframe]
                    } - ${previous}hrs</h5>
                  </div>
                </div>
              </div>
  
  `;
}
