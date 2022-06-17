const variables = require('../models/data/formVariables.json');

function validate(body) {
    const keys = Object.keys(body);
    let key, value;

    for (let index in Object.keys(body)) {
        key = keys[index];
        value = body[key];
        
        if (!isValidName(key)) {
            console.log(`${key} not a valid key!`);
            return false;
        }

        if (!isValidValue(key, value)) {
            console.log(`${key} has invalid value ${value}!`);
            return false;
        }
    }

    return true;
}

function isValidName(key) {
    return (key in variables);
}

function isValidValue(key, value) {
    if (variables[key].length === 0) {
        return true;
    }
    
    const validValues = variables[key];
    let validValue;
    
    if (key === "types[]") {
        return areValidTypes(key, value, validValues);
    }

    for (let index in variables[key]) {
        validValue = validValues[index];
        
        if (value === validValue) {
            return true;
        }
    }

    return false;
}

function areValidTypes(key, values, validValues) {
    if (typeof values === "object") {
        for (let index in values) {
            if (!(validValues.includes(values[index]))) {
                return false;
            }
        }
    } else {
        return validValues.includes(values);
    }    

    return true;
}

module.exports = {validate};