/**
 * Created by Eyal_Sadeh on 7/22/14.
 */
function JsonParser(){

}
var pairSeparator = ':';
//JsonParser.prototype.spaces = '\s*';
//JsonParser.prototype.wildCard = '[^$]*';
var comma = ",";

function removeCurlyBraces(json) {
    return json.slice(json.indexOf('{') + 1, json.indexOf('}'));
}

function removeQuotationMarks(json) {
    return json.replace(/"/g, "");;
}

JsonParser.prototype.parse = function (json) {

    var obj = {};
//    if (!json.match(this.spaces+'{'+this.wildCard+'}'+this.spaces)){
//        return undefined;
//    }


    json = removeCurlyBraces(json).trim();
    if (json.length > 0) {
        var arr = json.split(comma);
        arr = arr.map(function(pair){
            return pair.split(pairSeparator)});

        arr.forEach(function(pair){
            var name = pair[0].trim();
           // name.slice(1,name.length-1);
            var val = pair[1].trim();
            obj[removeQuotationMarks(name)] = Number(val);
        });

//        arr = arr.map(function (str) {
//            return str.trim();
//        });
//        obj[arr[0]] = Number(arr[1]);
    }
    return obj;
}
