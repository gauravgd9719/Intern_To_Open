
const isValidRequestBody = function (validBody){
    return Object.keys(validBody).length > 0
}

const IsValidate = function (value) {
    if (typeof (value) === undefined ||typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).length > 0) { return true }
}

const isValidname =function(name){
    return /^[a-zA-Z]+([_-]?[a-zA-Z])*$/.test(name)
    
}

const isValidEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const isValidLogoLink = function(logoLink){
    return /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(logoLink)
}

const isValidmobile = function (mobile) {
    return /^([+]\d{2})?\d{10}$/.test(mobile);
}

module.exports = {
    isValidRequestBody,
    IsValidate,
    isValidname,
    isValidEmail,
    isValidLogoLink,
    isValidmobile
}