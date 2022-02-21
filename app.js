const workContainer = document.getElementById("work");
const timeOption = document.querySelectorAll(".time");
const container = document.getElementById("cards-container");

let timeframe = "weekly";

let data = {};

fetch("data.json")
  .then((resp) => resp.json())
  .then((jsonData) => {
    jsonData.forEach((element) => {
      container.insertAdjacentHTML(
        "beforeend",
        createRegularCard(element, timeframe)
      );
    });

    jsonData.forEach((element) => {
      data[element.title] = element.timeframes;
    });

    console.log(data);

    cards = document.querySelectorAll(".play-card");

    console.log(cards);
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
}

// update cards

function updateCards() {
  cards.forEach((card) => {
    updateCards(card, timeframe);
  });
}

function updateCard() {
  console.log("update");
}

function createRegularCard(element, timeframe) {
  let title = element["title"];
  let current = element["timeframes"][timeframe]["current"];
  let previous = element["timeframes"][timeframe]["previous"];
  console.log(title, current, previous);
  return `

  <div class="col">
                <div class="card play-card">
                  <div class="card-img-top cards-top">
                    <img
                      src="/images/icon-play.svg"
                      alt="Play"
                      class="top-img"
                    />
                  </div>
                  <div class="card-body">
                  <div class="d-flex flex-row justify-content-between"><h5 class="card-title">${title}</h5>
                  <img
                  src="/images/icon-ellipsis.svg"
                  alt="Play"
                  class="dots"
                /> </div>
                    
                    <div class="card-text">
                    <h5 class="current">${current}</h5>
                    <h5 class="last">Last week - ${previous}</h5>
                    </div> 
                  </div>
                  
                </div>
              </div>
  `;
}
