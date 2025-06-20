let container = document.getElementById("container");
var regName = document.getElementById("name");
let regEmail = document.getElementById("email");
let regpassword = document.getElementById("password");
let confirmPass = document.getElementById("confirmPassword");
let userName = document.getElementById("loginUserName");
let userPassword = document.getElementById("loginPassword");
let signBtn = document.getElementById("signUpBtn");
let loginBtn = document.getElementById("logIn");
let logOutBtn = document.getElementById("logOut");
let Home = document.getElementById("Home");
let regData = [];

function setLocalStotage() {
  localStorage.setItem("users", JSON.stringify(regData));
}

function getLocalStorage() {
  regData = JSON.parse(localStorage.getItem("users"));
}
// check local storage 
(function () {
  if (localStorage.getItem("users") != null) {
    getLocalStorage();
  }
})();

// 
function registration() {
  var user = {
    Name: regName.value,
    Email: regEmail.value,
    pass: regpassword.value,
    confirmPassword: confirmPass.value,
  };
  regData.push(user);
  setLocalStotage();
  clearInputs();
}
signBtn.addEventListener("click", () => {
  signUp();
});
function clearInputs() {
  regName.value = "";
  regEmail.value = "";
  regpassword.value = "";
  confirmPass.value = "";
  userName.value = "";
  userPassword.value = "";
}

function signUp() {
  if (regData.length === 0) {
    // If there are no registered users, register the first user
    if (notEmpty())
      if (checkPassWord()) {
        registration();
        iziToast.success({
          title: "Registration Successful",
          message: "You have successfully registered. Welcome!",
        });
      }
  } else {
    // Check if the provided email is unique
    let isUnique = true;
    for (let i = 0; i < regData.length; i++) {
      if (regEmail.value === regData[i].Email) {
        // The email is not unique
        isUnique = false;
        iziToast.error({
          title: "Email Already Exists",
          message:
            "The provided email is already registered. Please use a different email.",
        });
        break; // Exit the loop
      }
    }

    if (isUnique)
      if (notEmpty())
        if (checkPassWord() && validateEmail(mail) && validatePassword(pass)) {
          registration();
          iziToast.success({
            title: "Registration Successful",
            message: "You have successfully registered. Welcome!",
          });
        }
  }
}

toggle = () => {
  container.classList.toggle("sign-in");
  container.classList.toggle("sign-up");
};

setTimeout(() => {
  container.classList.add("sign-in");
}, 200);

function checkPassWord() {
  if (regpassword.value === confirmPass.value) {
    return true; // Passwords match, return true
  } else {
    console.error("Problem in password");
    iziToast.error({
      title: "Password Mismatch",
      message:
        "Password and confirm password do not match. Please check and try again.",
    });
    return false; // Passwords do not match, return false
  }
}
function notEmpty() {
  if (
    regName.value != "" &&
    regEmail.value != "" &&
    regpassword.value != "" &&
    confirmPass.value != ""
  ) {
    return true; // inputs is  Not Empty
  } else {
    iziToast.error({
      title: "Registration Error",
      message:
        "There was a problem with your registration. Please make sure all fields are correctly filled and try again.",
    });
    return false; // inputs  Empty
  }
}

function logIn() {

  if (regData.length != 0) {
    if (checkLoginregName())
      if (checkLoginPassword()) {
       
        document.getElementById('welcome').innerHTML = `Welcome ${userName.value}` ;
        clearInputs();
        iziToast.success({
          title: "Success",
          message: "log in completed successfully!",
        });
        Home.classList.remove("d-none");
        container.classList.add("d-none");        
      }
  } else {
    iziToast.error({
      title: "Login Error",
      message: "Please check your username and password and try again.",
    });
  }
}

function checkLoginregName() {
  
  if (userName.value != "") {
    for (let i = 0; i < regData.length; i++) {
      if (
        userName.value === regData[i].Name ||
        userName.value === regData[i].Email
      ) {
        return true;
      }
    }
  }
  iziToast.error({
    title: "Login Error",
    message: "Please check your username and password and try again.",
  });
  return false; // regName is not found in any user records or input fields are empty
}

function checkLoginPassword() {
  for (let i = 0; i < regData.length; i++) {
    if (userPassword.value === regData[i].pass) {
      return true;
    }
  }
  iziToast.error({
    title: "Login Error",
    message: "Please check your username and password and try again.",
  });
  return false; // Password does not match any user's password
}

loginBtn.addEventListener("click", () => {
  logIn();
});
// logout btn
logOutBtn.addEventListener("click", () => {
  Home.classList.add("d-none");
  container.classList.remove("d-none");
  iziToast.success({
    title: "Success",
    message: "log out completed successfully!",
  });
});

const currentDate = new Date();

// Get the month and day
const month = currentDate.toLocaleString("default", { month: "long" });
const day = currentDate.getDate();
const dayName = currentDate.toLocaleString("default", { weekday: "long" });
console.log();
// Create the formatted date string
const formattedDate = ` ${dayName},${month} ${day} `;
// Get the name of the day

document.getElementById("date").innerHTML = formattedDate;

function displayTime() {
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Update the time in the DOM
  document.getElementById("clock").textContent = formattedTime;
}

// Update the time every second (1000 milliseconds)
setInterval(displayTime, 1000);

// Initial call to display the time
displayTime();
const passRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/gm;
const emailRegex = /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/gm;
let mail;
let pass;
regEmail.addEventListener("blur", function () {
  console.log(this.value);
   mail = this.value;

  validateEmail(mail);
});
regpassword.addEventListener("blur",function (){
   pass = this.value;
  validatePassword(pass)
})

function validateEmail(mail) {
  if (mail.match(emailRegex)) return true;
  else {
    iziToast.error({
      title: "Email Error",
      message: "Please enter at least 3 characters and @ and email provider and TLDs such as .co .com ...",
    });
    return false;
  }
}
function validatePassword(pass) {
  if (pass.match(passRegex)) return true;
  else {
    iziToast.error({
      title: "Password Error",
      message: "Password does not meet the criteria.",
    });
    return false;
  }
}
