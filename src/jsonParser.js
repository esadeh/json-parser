/**
 * Created by Eyal_Sadeh on 7/22/14.
 */
function remove_spaces(str){
    return str.replace(/ /g,'');
}
(function (w) {
    function JsonParser() {

    }
    var PAIR_SEPERATOR = ':';
    var STATEMENT_SEPERATOR = ",";

    function isBool(input) {
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

    function isNul(val) {
        return val == 'null';
    }

    function isValidStatement(statement) {
        return statement.split('{').length == statement.split('}').length &&
            statement.split('[').length == statement.split(']').length;
    }

    function removeCurlyBraces(json) {
        return json.slice(json.indexOf('{') + 1, json.lastIndexOf('}'));
    }

    function removeBrackets(json) {
        return json.slice(json.indexOf('[') + 1, json.lastIndexOf(']'));
    }

    function parseKey(json) {
        return json.replace(/"/g, '');

    }

    function splitByPairSeparator(pair) {
        var splittedPairIndex = pair.indexOf(PAIR_SEPERATOR);
        return {
            key: pair.slice(0, splittedPairIndex - 1).trim(),
            value: pair.slice(splittedPairIndex + 1).trim()
        };
    }

    function splitToValidStatement(json) {
        if (json.length == 0) {
            return [];
        }
        var splittedByCommaArray = json.split(STATEMENT_SEPERATOR);
        var validStatements = [];
        var tempStatement;
        for (var i = 0; i < splittedByCommaArray.length; i++) {
            tempStatement = splittedByCommaArray[i];
            while (!isValidStatement(tempStatement)) {
                i++;
                tempStatement += ',' + splittedByCommaArray[i];
            }
            validStatements.push(tempStatement.trim());
        }
        return validStatements;
    }

    function splitJsonToPairs(json) {
        var pairsArray = splitToValidStatement(json);
        return pairsArray.map(splitByPairSeparator);
    }


    function strToArr(val) {
        val = removeBrackets(val).trim();
        if (val.length == 0) {
            return [];
        }
        var splitedByCommasArr = splitToValidStatement(val);
        var parsedArr = splitedByCommasArr.map(parseValue);
        return parsedArr;
    }

    function parseValue(valAsString) {
        if (isNumeric(valAsString))
            return Number(valAsString);
        if (isBool(valAsString)) {
            return valAsString == 'true';
        }
        if (isArr(valAsString)) {
            return strToArr(valAsString);
        }
        if (isObj(valAsString)) {
            var parser = new JsonParser();
            return parser.parse(valAsString);
        }
        if (isNul(valAsString))
            return null;
        return parseKey(valAsString);
    }


    JsonParser.prototype.parse = function (json) {
        if (!isValidStatement(json)) {
            throw('statement is not valid');
        }
        var obj = {};
        json = removeCurlyBraces(json).trim();
        var pairsArr = splitJsonToPairs(json);
        pairsArr.forEach(function (pair) {
            obj[parseKey(pair.key)] = parseValue(pair.value);
        });
        return obj;
    };

    function isStr(value){
        return typeof value == 'string' || value instanceof String ;
    }

    function mystringifyArray(arr){
//        var stringifyArr = arr.map(function(value){
//            return strinifyValue(value);
//        })
//        return '[' + stringifyArr.join() +']';
        return '[' + arr +']';
    }

    function strinifyValue(value){
        if (isStr(value))
            return '"'+value+'"';
        if (value instanceof Array)
            return mystringifyArray(value);
        if (value instanceof Object) {
            var parser = new JsonParser();
            return parser.toStr(value);
        }
        return value;
    }

    JsonParser.prototype.toStr = function (object) {

        var keys = Object.keys(object);

        var keyValuePairs = keys.map(function(key){
            return'"'+key+'":'+strinifyValue(object[key]);
        });

        return '{' + keyValuePairs.join() + '}';

    };

    w.JsonParser = JsonParser;
}(window));