const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copy-msg]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const inputSlider=document.querySelector("[data-lengthSlider]");
const  uppercaseCheck=document.querySelector("#uppercase");
const  lowercaseCheck=document.querySelector("#lowercase");
const  numbersCheck=document.querySelector("#numbers");
const  symbolsCheck=document.querySelector("#symbols");
const  indicator=document.querySelector("[data-indicator]");
const  generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//intially->first time open website then these things is given by default
let password="";
let passwordLength=10;
let checkCount=0;

//set passwordLength
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
handleSlider(); // call
setIndicator("#ccc");
// This function sets the background color of an indicator element.
function setIndicator(color) {
    indicator.style.color = color;
 
}

// This function generates a random integer between 'min' (inclusive) and 'max' (exclusive).
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// This function generates a random digit (0-9) and returns it as a string.
function generateRandomNumber() {
    return getRndInteger(0, 10).toString();
}

// This function generates a random lowercase letter (a-z) and returns it as a string.
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

// This function generates a random uppercase letter (A-Z) and returns it as a string.
function generateUpperCase() {
    // String.fromCharCode -> Converts an integer to a character.
    return String.fromCharCode(getRndInteger(65, 91));
}

// This function generates a random symbol for the password.
function genrateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    // charAt -> selects a character at the specified index from the 'symbols' string.
    return symbols.charAt(randNum);
}

// This function calculates the strength of the password based on selected options.
// This function calculates the strength of the password based on selected options.
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    // Check if various character sets (uppercase, lowercase, numbers, symbols) are selected.
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    // Determine the strength of the password and update the indicator color.
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 10) {
      
        setIndicator("#0f0"); // Strong password (green).
    indicator.innerHTML="Strong password";
    } else if ((hasLower || hasUpper)   && (hasNum || hasSym) && passwordLength > 5) {
        setIndicator("#ff0"); // Medium password (yellow).
        indicator.innerHTML="Medium Password"
    } else {
        indicator.innerHTML="Weak Password"
        setIndicator("#f00"); // Weak password (red).  
       
    }
}


// This function copies the password to the clipboard when the "Copy" button is clicked.
async function copyContent() {
    try {
        // Use the Clipboard API to copy the value in the 'passwordDisplay' element.
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }

    // Make the "Copied" message visible.
    copyMsg.classList.add("active");

    // Remove the "Copied" message after 2 seconds.
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

// Function to shuffle the characters in an array to create a randomized password.
function shufflepassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index 'j' within the current bounds of the array.
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the characters at positions 'i' and 'j' in the array.
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    // Concatenate the shuffled characters back into a string.
    array.forEach((el) => (str += el));
    return str;
}

// Function to handle changes in checkboxes.
function CheckBoxChange() {
    checkCount = 0;
    // Iterate through all checkboxes and count the number of checked ones.
    allCheckBox.forEach(checkbox => {
        if (checkbox.checked) {
            checkCount++;
        }
    });
}

// Check if the selected password length is less than the number of checked character sets.
if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
}

// Add event listeners for checkbox changes.
allCheckBox.forEach(checkbox => {
    checkbox.addEventListener('change', CheckBoxChange);
});

// Add an event listener for the input slider to update the password length.
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

// Add an event listener for the "Copy" button to copy the password to the clipboard.
copyBtn.addEventListener('click', () => {
    // Check if the password length is greater than 0 before copying.
    if (passwordLength > 0) {
        copyContent();
    }
});

// Add an event listener for the "Generate" button to create a password.
generateBtn.addEventListener('click', () => {
    if (checkCount == 0) {
        return; // If no character sets are selected, do nothing.
    }

    // If the selected password length is less than the number of checked character sets, update it.
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    

    // Clear the old password.
    password = "";
     //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    // Create an array of functions for generating character sets based on checkbox selections.
    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }
    if (symbolsCheck.checked) {
        funcArr.push(genrateSymbol);
    }

    // Generate the compulsory character sets.
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("Compulsory addition done");

    // Generate the remaining character sets to match the desired password length.
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    // Shuffle the password characters for added security.
    password = shufflepassword(Array.from(password));
    console.log("Shuffling done");

    // Display the generated password in the UI.
    passwordDisplay.value = password;
    console.log("UI addition done");

    // Calculate the password strength based on the selected options.
    calcStrength();
});
