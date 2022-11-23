const inputs = document.querySelectorAll("input");
const confirmPwd = document.querySelector("#confirm-pwd");
const pwd = document.querySelector("#pwd");

confirmPwd.checkValidity = function () {
  console.log(confirmPwd.textContent);
  console.log(pwd.textContent);
  if (confirmPwd.value === pwd.value) {
    return true;
  } else {
    return false;
  }
};

function showError(err, input) {
  if (input.value === "" && input.id != "pwd" && input.id != "confirm-pwd") {
    err.textContent = err.dataset.errEmpty;
  } else {
    err.classList.add("error");
    err.textContent = err.dataset.errInvalid;
  }
}

inputs.forEach((input) => {
  const err = input.nextElementSibling;
  input.addEventListener("focus", (e) => {
    input.classList.add("focus");
  });
  input.addEventListener("input", (e) => {
    if (input.checkValidity()) {
      input.classList.remove("invalid");
      if (input.id === "confirm-pwd") {
        if (pwd.checkValidity()) {
          input.classList.add("valid");
        }
      } else {
        input.classList.add("valid");
      }
      err.textContent = "";
    } else {
      if (input.classList.contains("valid")) {
        input.classList.remove("valid");
        input.classList.add("invalid");
        showError(err, input);
      } else if (input.classList.contains("invalid")) {
        showError(err, input);
      }
    }
  });
  input.addEventListener("blur", (e) => {
    input.classList.remove("focus");
    if (input.checkValidity()) {
      input.classList.remove("invalid");
      if (input.value) {
        input.classList.add("valid");
      }
    } else {
      if (input.id === "confirm-pwd" && !pwd.checkValidity()) {
        input.classList.remove("invalid");
        input.classList.remove("valid");
        input.nextElementSibling.textContent = "";
      } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        showError(err, input);
      }
    }
  });
});

const button = document.querySelector("button");
button.addEventListener("click", (e) => {
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      e.preventDefault();
      if (input.id === "confirm-pwd") {
        confirmPwd.classList.remove("valid");
        if (pwd.checkValidity()) {
          confirmPwd.nextElementSibling.textContent =
            confirmPwd.nextElementSibling.dataset.errInvalid;
          confirmPwd.classList.add("invalid");
        } else {
          confirmPwd.nextElementSibling.textContent = "";
        }
        confirmPwd.value = "";
      } else {
        input.classList.add("invalid");
        const err = input.nextElementSibling;
        showError(err, input);
      }
    }
  });
});
