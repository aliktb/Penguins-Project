"use strict";

let idToUpdateInput = document.querySelector("#idToUpdateInput");
let newNameTextInput = document.querySelector("#newNameTextInput");
let newAgeNumberInput = document.querySelector("#newAgeNumberInput");
let hasHappyFeetInputUpdated = document.getElementsByName(
  "hasHappyFeetInputUpdated"
);
let updateButton = document.querySelector("#updateButton");

let createUpdatedObject = () => {
  let idVal = idToUpdateInput.value;
  let updatedName = newNameTextInput.value;
  let updatedAge = newAgeNumberInput.value;
  let hasHappyFeetFromInputUpdated;

  for (let radio of hasHappyFeetInputUpdated) {
    if (radio.checked) {
      hasHappyFeetFromInputUpdated = radio.value;
    }
  }

  let updatedObj = {
    name: updatedName,
    age: updatedAge,
    happyFeet: hasHappyFeetFromInputUpdated,
  };

  updateFuntion(idVal, updatedObj);
};

let updateFuntion = (idToUpdate, updatedObject) => {
  fetch(`http://localhost:8083/update/${idToUpdate}`, {
    method: "PUT",
    body: JSON.stringify(updatedObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

updateButton.addEventListener("click", createUpdatedObject);
