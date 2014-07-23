/**
 * Created by Eyal_Sadeh on 7/22/14.
 */
function JsonParser(){

}
var pairSeparator = ':';
var comma = ",";

function isBool(input){
    return input == 'false' || input == 'true';

}

function isNumeric(val) {
    return !isNaN(val);
}

function isArr(val) {
    return val.charAt(0) == '[';
}

function isObj(val) {
    return val.charAt(0) == '{';
}

function isValidPair(pair){
        return pair.split('{').length == pair.split('}').length && pair.split('[').length == pair.split(']').length;
}

function removeCurlyBraces(json) {
    return json.slice(json.indexOf('{') + 1, json.lastIndexOf('}'));
}

function removeBrackets(json) {
    return json.slice(json.indexOf('[') + 1, json.lastIndexOf(']'));
}

function removeAllQuotationMarks(json) {
    return json.replace(/"/g, '');;
}

function splitByPairSeparator (pair){
    var splittedPairIndex = pair.indexOf(pairSeparator);
    var splittedPair = [];
    splittedPair[0] = pair.slice(0,splittedPairIndex-1).trim();
    splittedPair[1] = pair.slice(splittedPairIndex+1).trim();
    return splittedPair;
}

function splitToValidStatement(json){
    var splittedByCommaArray = json.split(comma);
    var validStatement = [];
    var tempStatement;
    for (var i = 0; i<splittedByCommaArray.length; i++){
        tempStatement = splittedByCommaArray[i];
        while (!isValidPair(tempStatement)){
            i++;
            tempStatement+=','+splittedByCommaArray[i];
        }
        validStatement.push(tempStatement.trim());
    }
    return validStatement;
}

function splitJsonToPairs(json){
    var pairsArray = splitToValidStatement(json);
    return pairsArray.map(splitByPairSeparator);
}


function strToArr(val){
    val = removeBrackets(val).trim();
    if (val.length == 0){
        return [];
    }
    var splitedByCommasArr = splitToValidStatement(val);
    var parsedArr = splitedByCommasArr.map(getValueByType);
    return parsedArr;
}

function getValueByType(val) {
    if(isNumeric(val))
        return Number(val);
    if(isBool(val)){
        return val =='true';
    }
    if(isArr(val)){
        return strToArr(val);
    }
    if(isObj(val)){
        var parser = new JsonParser();
        return parser.parse(val);
    }
    return removeAllQuotationMarks(val);
}



JsonParser.prototype.parse = function (json) {
    var obj = {};
    json = removeCurlyBraces(json).trim();
    if (json.length == 0) {
        return obj;
    }

    var pairsArr = splitJsonToPairs(json);
    pairsArr.forEach(function (pair) {
        var key = removeAllQuotationMarks(pair[0]);
        var val = getValueByType(pair[1]);
        obj[key] = val;
    });
    return obj;
}
