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

    it("should generate empty json object for {}", function () {
        expect(parser.parse('{ a : 3 }')).toEqual({ a : 3});
    });

    it("should generate empty json object for {}", function () {
        expect(parser.parse('{  a   :   4   }')).toEqual({ a : 4});
    });

});