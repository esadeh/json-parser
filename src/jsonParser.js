/**
 * Created by Eyal_Sadeh on 7/22/14.
 */
function JsonParser(){

}
var pairSeparator = ':';
//JsonParser.prototype.spaces = '\s*';
//JsonParser.prototype.wildCard = '[^$]*';

function removeCurlyBraces(json) {
    return json.slice(json.indexOf('{') + 1, json.indexOf('}'));
}
JsonParser.prototype.parse = function (json) {

    var obj = {};
//    if (!json.match(this.spaces+'{'+this.wildCard+'}'+this.spaces)){
//        return undefined;
//    }


    json = removeCurlyBraces(json).trim();
    if (json.length>0) {
        var arr = json.split(pairSeparator);
        arr = arr.map(function (str) {
            return str.trim();
        });
        obj[arr[0]] = Number(arr[1]);
    }
    return obj;
}
