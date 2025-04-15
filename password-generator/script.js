
const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generate-btn");
const resultbox = document.getElementById("result");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

generateBtn.addEventListener("click", () => {

const length = parseInt(lengthInput.value);
let password = "";

for (let i = 0; i < length; i++){
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
}

    resultbox.textContent = password;
});