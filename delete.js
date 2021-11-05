"use strict";

let idToDelete = document.querySelector("#IDNumberInput");
let deleteButton = document.querySelector("#deleteButton");
let alertDiv = document.querySelector("#alertDiv");

let addSuccessDeleteMessage = (idVal) => {
  let newDiv = document.createElement("div");

  newDiv.classList = "alert alert-success col-sm mt-4 new-alert";

  newDiv.innerHTML = `<strong>Success!</strong> Penguin with ID <strong>${idVal}</strong> has been deleted!`;

  alertDiv.appendChild(newDiv);

  setTimeout(function () {
    $(".new-alert").fadeOut(400);
  }, 4000);
};

let addFailDeleteMessage = () => {
  let newDiv = document.createElement("div");

  newDiv.classList = "alert alert-danger col-sm mt-4 new-alert";

  newDiv.innerHTML = `<strong>Error!</strong> An error has occured!`;

  alertDiv.appendChild(newDiv);

  setTimeout(function () {
    $(".new-alert").fadeOut(400);
  }, 4000);
};

let deleteFunction = (idVal) => {
  fetch(`http://localhost:8083/delete/${idVal}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.status == 500) {
      console.log(response.status);
      console.error(`Status: ${response.statusText}`);
      addFailDeleteMessage();
      console.log(`the delete response failed`);
      return;
    }
    addSuccessDeleteMessage(idVal);
    response.json().then((data) => {
      console.log(data);
    });
  });
};

deleteButton.addEventListener("click", () => {
  deleteFunction(idToDelete.value);
});
