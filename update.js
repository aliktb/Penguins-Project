"use strict";

let idToUpdateInput = document.querySelector("#idToUpdateInput");
let newNameTextInput = document.querySelector("#newNameTextInput");
let newAgeNumberInput = document.querySelector("#newAgeNumberInput");
let hasHappyFeetInputUpdated = document.getElementsByName(
  "hasHappyFeetInputUpdated"
);
let updateButton = document.querySelector("#updateButton");
let alertUpdateDiv = document.querySelector("#alertUpdateDiv");

let addSuccessUpdateMessage = (object) => {
  let newDiv = document.createElement("div");

  newDiv.classList = "alert alert-success col-sm mt-4 new-alert";

  newDiv.innerHTML = `<strong>Success!</strong> Penguin <strong>${object.name}</strong> has been updated!`;

  alertUpdateDiv.appendChild(newDiv);

  setTimeout(function () {
    $(".new-alert").fadeOut(400);
  }, 2000);
};

let addFailUpdateMessage = () => {
  let newDiv = document.createElement("div");

  newDiv.classList = "alert alert-danger col-sm mt-4 new-alert";

  newDiv.innerHTML = `<strong>Error!</strong> An error has occured!`;

  alertUpdateDiv.appendChild(newDiv);

  setTimeout(function () {
    $(".new-alert").fadeOut(400);
  }, 2000);
};

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
  }).then((response) => {
    if (response.status < 200 || response.status > 299) {
      console.error(`status: ${response.status}`);
      addFailUpdateMessage();
      console.log(`There was an error trying to update`);
      return;
    }
    addSuccessUpdateMessage(updatedObject);
    response.json().then((json) => console.log(json));
  });
};

updateButton.addEventListener("click", createUpdatedObject);
