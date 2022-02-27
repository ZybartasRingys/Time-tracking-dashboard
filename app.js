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
    // forEach metodas visiems kartojamiesiams pritaiko callback funkcijas insertAdjacentHTM ir  createRegularCard
    jsonData.forEach((element) => {
      container.insertAdjacentHTML(
        "beforeend",
        createRegularCard(element, timeframe)
      );

      // array to dictionary
      jsonData.forEach((element) => {
        data[element.title] = element.timeframes;
      });
    });

    // pasirinkti visas korteles
    regularCards = document.querySelectorAll(".regular-card");
  });

//forEach metodas ir click eventas su callback funckija optionsOnClick

timeOption.forEach((element) => {
  element.addEventListener("click", optionsOnClick);
});

// funkcija

function optionsOnClick(event) {
  // forEach metodas timeOptions nuimti active class

  timeOption.forEach((element) => {
    element.classList.remove("active");
  });

  // prideti active classe pasirinktam elemntui

  event.target.classList.add("active");

  // timeframe kintamajam priskiriamas pasirinktojo elemento vidinis tekstas
  timeframe = event.target.innerText.toLowerCase();

  // funckija
  updateCards(timeframe);
}

// update cards

function updateCards(timeframe) {
  // kortelems taikomas forEach metodas ir callback funkcija update card su parametrais card ir timeframe
  regularCards.forEach((card) => {
    updateCard(card, timeframe);
  });
}

// funckija

function updateCard(card, timeframe) {
  // title priskiriamas kiekvienos korteles title vidinis tekstas
  const title = card.querySelector(".card-title").innerText;

  // current
  const current = data[title][timeframe]["current"];
  const previous = data[title][timeframe]["previous"];

  console.log(data);

  const timeframeMsg = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  // pasirinkta korteles
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
