// Cryptographically secure pseudorandom number generator w/ range
// Implementation taken from: https://stackoverflow.com/a/41452318
function random(min, max) {
    var range = max - min;

    if (range <= 0) {
        throw new Exception("The maximum value must be greater than the minimum.");
    }

    var requestBytes = Math.ceil(Math.log2(range) / 8);
    
    if (!requestBytes) {
        return min;
    }

    var maxNumber    = Math.pow(256, requestBytes);
    var numbersArray = new Uint8Array(requestBytes);

    while (true) {
        window.crypto.getRandomValues(numbersArray);

        var val = 0;

        for (var i = 0; i < requestBytes; i++) {
            val = (val << 8) + numbersArray[i];
        }

        if (val < maxNumber - maxNumber % range) {
            return min + (val % range);
        }
    }
}

const uppercaseLetters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
const lowercaseLetters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
const numbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
const symbols = [ '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\', ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/', '´', '`' ];

var file;

function validate(e) {
    e.preventDefault();

    var passwordLength = document.getElementById("length").value;
    var password = generatePassword(passwordLength);
    
    styleDownloadButton();

    document.getElementById("password").textContent = password;

    var passwordArea = document.getElementById("password");

    var fontSize = 1;
    passwordArea.style.fontSize = fontSize + "em";

    if (passwordArea.offsetHeight >= passwordArea.scrollHeight && passwordArea.offsetWidth >= passwordArea.scrollWidth) {
        while (passwordArea.offsetHeight >= passwordArea.scrollHeight && passwordArea.offsetWidth >= passwordArea.scrollWidth) {
            fontSize += 0.1;
            passwordArea.style.fontSize = fontSize + "em";
        }
        passwordArea.style.fontSize = fontSize - 0.1 + "em";
    }
    else {
        while ((passwordArea.offsetHeight < passwordArea.scrollHeight && passwordArea.offsetWidth < passwordArea.scrollWidth) && fontSize > 0.1) {
            fontSize -= 0.1;
            passwordArea.style.fontSize = fontSize + "em";
        }
        passwordArea.style.fontSize = fontSize - 0.1 + "em";
    }

    var minSize = 0.8;

    if (fontSize < minSize)
    {
        passwordArea.style.fontSize = tamanhoMinimo + "em";
    }

    file = new Blob([password], {type: "text/plain"});
}

function generatePassword(length) {
    var chosenArray, password = "";

    for (var i = 0; i < length; i++)
    {
        chosenArray = random(0, 4);

        switch (chosenArray)
        {
            case 0:
                password += uppercaseLetters[random(0, 26)];
                break;
            case 1:
                password += lowercaseLetters[random(0, 26)];
                break;
            case 2:
                password += numbers[random(0, 10)];
                break;
            case 3:
                password += symbols[random(0, 32)];
                break;
        }
    }

    return password;
}

function styleDownloadButton() {
    document.getElementById("download-icon").setAttribute("src", "./assets/icons/download.svg");
    document.getElementById("download").removeAttribute("disabled");
    document.getElementById("download").style.cursor = "pointer";
    document.getElementById("download").style.borderColor = "#3240BA";
    document.getElementById("download").style.backgroundColor = "#4153ED";
}

// File downloader
// Implementation taken from: https://stackoverflow.com/a/30832210
function download()
{
    var filename = "password";

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
        var a = document.createElement("a"), url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
