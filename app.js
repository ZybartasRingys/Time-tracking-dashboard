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
  });

timeOption.forEach((element) => {
  element.addEventListener("click", optionsOnClick);
});

// functions

function optionsOnClick(e) {
  timeOption.forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
  timeframe = e.target.innerText.toLowerCase();
}

function createRegularCard(element, timeframe) {
  let title = element["title"];
  let current = element["timeframes"][timeframe]["current"];
  let previous = element["timeframes"][timeframe]["previous"];
  console.log(title, current, previous);
  return `

  <div class="col">
                <div class="card play-card">
                  <div class="card-img-top play-card-top">
                    <img
                      src="/images/icon-play.svg"
                      alt="Play"
                      class="top-img"
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">
                      ${current}
                    </p>
                    <p>${previous} </p>
                  </div>
                </div>
              </div>
  `;
}
