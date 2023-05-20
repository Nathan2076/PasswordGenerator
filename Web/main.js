function random(min, max) {
    var range = max - min;

    if (range <= 0) {
        throw new Exception("The maximum value must be larger than the minimum.");
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

    console.log(password)
    document.getElementById("password").innerHTML = password;

    file = new Blob([password], {type: "text/plain"});
}

function generatePassword(length) {
    var chosenArray;
    var password = "";

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

    document.getElementById("download").setAttribute("src", "./assets/icons/download_FILL0_wght400_GRAD0_opsz24.svg");
    document.getElementById("copy").removeAttribute("disabled");
    document.getElementById("downloads").removeAttribute("disabled");
    document.getElementById("copy").style.cursor = "pointer";
    document.getElementById("downloads").style.cursor = "pointer";
    return password;
}

function download()
{
    var filename = "password";

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
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
