//SETTINGS BEGINN

const AccountUsername = "test";
const AccountPassword = "test";

//SETTINGS END

function formValidation() {
    var userName = document.getElementById("ducoUsername");

    if (userName && userName.value) {
        executeFunction()
        return;
    } 
}

function getCoins() {
    var userName = document.getElementById("ducoUsername").value;
    const ACC_Username = decrypt(AccountUsername, "Passphrase");
    const ACC_Password = decrypt(AccountPassword, "Passphrase");

    //DUCO API SOON
}

function canExecuteFunction() {
    const currentTime = new Date().getTime();
    const lastExecutionTime = localStorage.getItem('lastExecutionTime') || 0;
    const elapsedTime = currentTime - lastExecutionTime;
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
    return elapsedTime >= twentyFourHoursInMs;
}

async function executeFunction() {
    if (canExecuteFunction()) {
        localStorage.setItem('lastExecutionTime', new Date().getTime());
        getCoins();
    } else {
        alert("You have to wait at least 24 hours!");
    }
}

function encrypt(text, key){
    return [...text].map((x, i) => 
    (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255)
     .toString(13.85949)
     .padStart(2,"0")
   ).join('')
}

function decrypt(text, key){
    return String.fromCharCode(...text.match(/.{1,2}/g)
     .map((e,i) => 
       parseInt(e, 13.85949) ^ key.charCodeAt(i % key.length) % 255)
     )
}