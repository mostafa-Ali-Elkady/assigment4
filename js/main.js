let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let loginBtn = document.getElementById("loginBtn");
let loginForm = document.getElementById("login-form");
let signupForm = document.getElementById("signup-form");
let welcomHeading = document.getElementById("welcomHeading");
let users;

if (localStorage.userData != null) {
  users = JSON.parse(localStorage.userData);
} else {
  users = [];
}

if (window.location.href.endsWith("signup.html")) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (isValidEmail() && isValidName() && isValidPassword()) {
      const name = signupName.value;
      const email = signupEmail.value;
      const password = signupPassword.value;
      // Check if the email is already registered
      const emailExists = users.some((user) => user.userEmail === email);

      if (emailExists) {
        Swal.fire({
          title: "<h3>Email already registered</h3>",
          html: "<p>-- Please use a different email address--</p>",
          confirmButtonText: "OK",
        });
      } else {
        let user = {
          userName: name,
          userEmail: email,
          userPassword: password,
        };

        users.push(user);
        localStorage.setItem("userData", JSON.stringify(users));
        window.location.href = "./index.html";
      }
    } else {
      if (!isValidName()) {
        Swal.fire({
          title: "<h3>Name is not valid</h3>",
          html: "<p>--name must contain at least 5 characters<</p>",
          confirmButtonText: "OK",
        });
      }
      if (!isValidEmail()) {
        Swal.fire({
          title: "<h3>Email is not valid</h3>",
          html: "<p>--Please Enter a Correct Email</p> <p>examaple@gmail.com </p>",
          confirmButtonText: "OK",
        });
      }
      if (!isValidPassword()) {
        Swal.fire({
          title: "<h3>Password is not valid</h3>",
          html: "<p>--Password must contain at least 5 characters or Characters</p>",
          confirmButtonText: "OK",
        });
      }
      if (!isValidName() && !isValidEmail() && !isValidPassword()) {
        Swal.fire({
          title: "<h3> Please Fill The Form </h3>",
          html: "<p>-- All Inputs Must Be Filled--</p>",
          confirmButtonText: "OK",
        });
      }
    }
  });
}

if (window.location.href.endsWith("index.html")) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    if (loginEmail.value === "" || loginPassword.value === "") {
      Swal.fire({
        title: "<h3>Fill The login Inputs Please</h3>",
        html: "<p>-- All Inputs Must Be Filled--<</p>",
        confirmButtonText: "OK",
      });
    } else {
      // Check if there is a user with the same email and password
      const user = users.find(
        (user) => user.userEmail === email && user.userPassword === password
      );

      if (user) {
        localStorage.setItem("username", user.userName); // Store the username
        window.location.href = "./home.html";
      } else {
        Swal.fire({
          title: "<h3> Email or Password is not correct</h3>",
          html: "<p>-- Please Try Again--</p>",
          confirmButtonText: "OK",
        });
      }
    }
  });
}
if (window.location.href.endsWith("home.html")) {
  let username = localStorage.getItem("username");
  if (username) {
    welcomHeading.innerText = `Welcome ${username}`;
  }
}
////////////////////////////////////////////////////////
//Name Validation
function isValidName() {
  const regex = /^[A-Za-z0-9]{2,}$/;
  return regex.test(signupName.value.toLowerCase());
}
//  email validation
function isValidEmail() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(signupEmail.value);
}
// Validate password
function isValidPassword() {
  const regex = /^[a-zA-Z0-9]{5,}$/;
  return regex.test(signupPassword.value);
}
////////////////////////////////////////////////////////
