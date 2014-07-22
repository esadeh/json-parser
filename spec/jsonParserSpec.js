/**
 * Created by Eyal_Sadeh on 7/22/14.
 */
describe("json parser", function() {
    var parser;
    beforeEach(function () {
        parser = new JsonParser();

    });


    it("should generate empty json object for {}", function () {
        expect(parser.parse('{}')).toEqual({});
    });

    it("should parse object with one field", function () {
        expect(parser.parse('{ "a": 3}')).toEqual({ a : 3});
    });

    it("should parse object with spaces", function () {
        expect(parser.parse('{  "a"   :   4   }')).toEqual({ a : 4});
    });

    it("should parse numbers as strings", function () {
        expect(parser.parse('{  "a"   :   "4"   }')).toEqual({ a : '4'});
    });

    it("should parse object with spaces", function () {
        expect(parser.parse('{  "a"   :   "abc"   }')).toEqual({ a : 'abc'});
    });

    it("should parse boolean values", function () {
        expect(parser.parse('{  "a"   :   true   }')).toEqual({ a : true });
    });

    it("should parse boolean as string", function () {
        expect(parser.parse('{  "a"   :   "true""   }')).toEqual({ a : 'true' });
    });

    it("should parse object with 2 fields", function () {
        expect(parser.parse('{ "a" : 4, "b" : 3 }')).toEqual({ a : 4, b : 3});
    });

});