var crypto = require("crypto")
let passwordKu = "jodohku1222"

function encryptMyPass(password) {
    let result = crypto.createHmac("sha256", "jc10").update(password).digest("hex")
    return result
}

console.log(passwordKu + " Berubah menjadi " + encryptMyPass(passwordKu));