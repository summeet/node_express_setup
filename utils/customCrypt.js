const crypto = require("crypto")

const createHash = (str, digit = 16) => {
    const salt = crypto.randomBytes(digit).toString('hex');
    const hash = crypto.createHash('sha256')
    hash.update(salt + str)
    hash.digest("hex")

    return `${salt}.${hash}`;
}

const compareHash = (str, storedValue) => {
    const [salt, originalHash] = storedValue.split(".");
    const hash = crypto.createHash('sha256')
    hash.update(salt + str)
    hash.digest('hex')

    return hash === originalHash
}

module.exports = {
    createHash,
    compareHash
}