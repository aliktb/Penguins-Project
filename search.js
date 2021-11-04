"use strict";

let readAllButton = document.querySelector("#readAllButton");
let clearButton = document.querySelector("#clearButton");
let idNumberInput = document.querySelector("#idNumberInput");
let searchButton = document.querySelector("#searchButton");
let starterDiv = document.querySelector("#starterDiv");

//used so it doesn't print all cards more than once if clicked multiple times
let allRead = false;

let addCard = (data) => {
  let newDiv2 = document.createElement("div");
  let headerDiv = document.createElement("div");
  let bodyDiv = document.createElement("div");
  let newh5 = document.createElement("h5");
  let idPara = document.createElement("p");
  let agePara = document.createElement("p");
  let happyFeetPara = document.createElement("p");

  newDiv2.classList = "card, card bg-light mb-3";
  newDiv2.style.maxWidth = "22rem";

  headerDiv.classList.add("d-flex", "flex-column", "card-header");

  bodyDiv.classList.add("card-body");

  newh5.classList.add("card-title");
  newh5.textContent = `Penguin's name: ${data.name}`;

  idPara.classList.add("card-text");
  idPara.textContent = `Penguin's ID: ${data.id}`;

  agePara.classList.add("card-text");
  agePara.textContent = `Penguin's age: ${data.age}`;

  happyFeetPara.classList.add("card-text");

  let hasHappyFeet = "Unknown";
  if (data.happyFeet) {
    hasHappyFeet = "yes";
  } else if (!data.happyFeet) {
    hasHappyFeet = "no";
  }

  happyFeetPara.textContent = `Penguin has happy feet: ${hasHappyFeet}`;

  starterDiv.appendChild(newDiv2);

  newDiv2.appendChild(headerDiv);
  headerDiv.appendChild(newh5);
  newDiv2.appendChild(bodyDiv);
  bodyDiv.appendChild(idPara);
  bodyDiv.appendChild(agePara);
  bodyDiv.appendChild(happyFeetPara);
};

let clearScreen = () => {
  var cardList = document.getElementsByClassName("card");

  while (cardList[0]) {
    cardList[0].parentNode.removeChild(cardList[0]);
  }
  allRead = false;
};

let readAll = () => {
  console.log(`allRead is ${allRead}`);
  fetch("http://localhost:8083/getAll").then((response) => {
    if (response.status !== 200) {
      console.error(`status: ${response.status}`);
      return;
    }

    response.json().then((json) => {
      for (let object of json) {
        addCard(object);
      }
    });

    console.log("fetched");
    allRead = true;
    console.log(`allRead is ${allRead}`);
  });
};

let addNotFoundCard = (idVal) => {
  let newDiv2 = document.createElement("div");
  let headerDiv = document.createElement("div");
  let bodyDiv = document.createElement("div");
  let newh5 = document.createElement("h5");
  let firstPara = document.createElement("p");
  let secondPara = document.createElement("p");

  newDiv2.classList = "card, card bg-warning mb-3";
  newDiv2.style.maxWidth = "22rem";

  headerDiv.classList.add("d-flex", "flex-column", "card-header");

  bodyDiv.classList.add("card-body");

  newh5.classList.add("card-title");
  newh5.textContent = `Penguin not found`;

  firstPara.classList.add("card-text");
  firstPara.textContent = `Sorry. It seems like no penguin with an id of ${idVal} exists.`;

  secondPara.classList.add("card-text");
  secondPara.textContent = `Try viewing all penguins or creating a new one`;

  starterDiv.appendChild(newDiv2);

  newDiv2.appendChild(headerDiv);
  headerDiv.appendChild(newh5);
  newDiv2.appendChild(bodyDiv);
  bodyDiv.appendChild(firstPara);
  bodyDiv.appendChild(secondPara);
};

let readByID = (idVal) => {
  console.log(`allRead is ${allRead}`);
  fetch(`http://localhost:8083/get/${idVal}`).then((response) => {
    if (response.status !== 202) {
      console.error(`status: ${response.status}`);
      addNotFoundCard(idVal);
      allRead = false;
      return;
    }
    response.json().then((json) => {
      addCard(json);
    });

    console.log("fetched");
    allRead = false;
    console.log(`allRead is ${allRead}`);
  });
};

readAllButton.addEventListener("click", () => {
  if (allRead == false) {
    clearScreen();
    readAll();
  }
});

searchButton.addEventListener("click", () => {
  let idToCheck = idNumberInput.value;
  clearScreen();
  readByID(idToCheck);
  idNumberInput.value = "";
});

clearButton.addEventListener("click", clearScreen);
