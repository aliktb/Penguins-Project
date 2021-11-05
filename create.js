"use strict";

let nameTextInput = document.querySelector("#nameTextInput");
let ageNumberInput = document.querySelector("#ageNumberInput");
let hasHappyFeetInput = document.getElementsByName("hasHappyFeetInput");
let createNewButton = document.querySelector("#createNewButton");
let successDiv = document.querySelector("#successDiv");

let addSuccessMessage = (object) => {
  let newDiv = document.createElement("div");

  newDiv.classList = "alert alert-success col-sm mt-4";

  newDiv.innerHTML = `<strong>Success!</strong> Penguin <strong>${object.name}</strong> has been added!`;

  successDiv.appendChild(newDiv);
};

let postData = () => {
  let nameFromInput = nameTextInput.value;
  let ageFromInput = ageNumberInput.value;
  let hasHappyFeetFromInput;

  for (let radio of hasHappyFeetInput) {
    if (radio.checked) {
      hasHappyFeetFromInput = radio.value;
    }
  }

  let newObj = {
    name: nameFromInput,
    age: ageFromInput,
    happyFeet: hasHappyFeetFromInput,
  };

  postFunction(newObj);
};

let postFunction = (object) => {
  fetch("http://localhost:8083/createPenguin", {
    method: "POST", // We are specifying we are POSTing data
    headers: {
      "Content-type": "application/JSON", // Telling the server we are sending JSON
    },
    body: JSON.stringify(object), // We will be creating an object and passing it in here
  }).then((response) => {
    if (response.status !== 201) {
      console.error(`Status: ${response.status}`);
      return;
    }
    response.json().then((data) => {
      console.log(data);
    });
  });
  addSuccessMessage(object);
};

createNewButton.addEventListener("click", postData);
