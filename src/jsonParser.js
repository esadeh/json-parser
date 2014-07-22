/**
 * Created by Eyal_Sadeh on 7/22/14.
 */
function JsonParser(){

}
var pairSeparator = ':';
var comma = ",";

function removeCurlyBraces(json) {
    return json.slice(json.indexOf('{') + 1, json.indexOf('}'));
}

function removeAllQuotationMarks(json) {
    return json.replace(/"/g, "");;
}

function splitByPairSeparator (pair){
    var splittedPair = pair.split(pairSeparator);
    splittedPair[0] = splittedPair[0].trim();
    splittedPair[1] = splittedPair[1].trim();
    return splittedPair;
}

function IsNumeric(input){
    return (input - 0) == input && (''+input).replace(/^\s+|\s+$/g, "").length > 0;
}

function isBoolean(input){
    return input == 'false' || input == 'true';

}

function getValueByType(val) {
    if (IsNumeric(val))
        return Number(val);
    if (isBoolean(val)){
        return val =='true';
    }
    return removeAllQuotationMarks(val);
}

function splitJsonToPairs(json){
    var pairsStr = json.split(comma);
    return pairsStr.map(splitByPairSeparator);
}



JsonParser.prototype.parse = function (json) {

    var obj = {};

    json = removeCurlyBraces(json).trim();
    if (json.length == 0) {
        return obj;
    }

    var pairsArr = splitJsonToPairs(json);

    pairsArr.forEach(function(pair){
        var key = removeAllQuotationMarks(pair[0]);
        var val = getValueByType(pair[1]);
        obj[key] = val;
    });



    return obj;
}
