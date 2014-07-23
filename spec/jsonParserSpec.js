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

    it("should parse numbers received as string", function () {
        expect(parser.parse('{  "a"   :   "4"   }')).toEqual({ a : '4'});
    });

    it("should parse object with spaces", function () {
        expect(parser.parse('{  "a"   :   "abc"   }')).toEqual({ a : 'abc'});
    });

    it("should parse boolean values", function () {
        expect(parser.parse('{  "a"   :   true   }')).toEqual({ a : true });
    });

    it("should parse boolean as string", function () {
        expect(parser.parse('{  "a"   :   "true"   }')).toEqual({ a : 'true' });
    });

    it("should parse empty array", function () {
        expect(parser.parse('{  "a"   :   []   }')).toEqual({ a : [] });
    });

    it("should parse array with one number", function () {
        expect(parser.parse('{  "a"   :   [1]   }')).toEqual({ a : [1] });
    });

    it("should parse array with two numbers", function () {
        expect(parser.parse('{  "a"   :   [1,2]   }')).toEqual({ a : [1,2] });
    });

    it("should parse object with 2 fields", function () {
        expect(parser.parse('{ "a" : 1, "b" : 2}')).toEqual({ a : 1 , b : 2});
    });

    it("should parse object with inner object", function () {
        expect(parser.parse('{ "a" : {"b" : 1}}')).toEqual({ a : {b : 1}});
    });


    it("should parse object with inner array", function () {
        expect(parser.parse('{ "a" :[1 , 2, [3 , 4 , 5]]}')).toEqual({ a : [1, 2, [3,4,5]]});
    });

    it("should parse object with inner array", function () {
        expect(parser.parse('{ "a" :[1 , 2, { "b" : 5}, [3 , false , 5]]}')).toEqual({ a : [1, 2, { b : 5 }, [3,false,5]]});
    });


});


xdescribe('JSON Parser', function () {
    var parser;
    beforeEach(function () {
        parser = new JsonParser();
    });

    describe('parsing numbers', function () {
        it('parsing an empty object', function () {
            expect(parser.parse('{}')).toEqual({});
        });
        it('parsing an object with one k:v pair', function () {
            expect(parser.parse('{ "a":  1}')).toEqual({'a': 1});
        });
        it('parsing an object with tow simple pairs', function () {
            var obj = {'a': 1, 'b': 2};
            expect(parser.parse(JSON.stringify(obj))).toEqual(obj);
        });
        it('parsing an object with many pairs', function () {
            var obj = {'a': 1, 'b': 2, 'c': 3};
            expect(parser.parse(JSON.stringify(obj))).toEqual(obj);
        });
    });

    describe('parsing strings', function () {
        /**
         * Philosophic-TDD note: i added a test which check for multiple strings pairs, but it passed immediately
         * because the mechanism that were implemented for number values. Therefore i removed the last test and
         * rename the corresponding number test to "parsing an object with many pairs" to indicate that it covers
         * that issue.
         */
        it('parsing single pair', function () {
            var obj = {'a': 'eran amar'};
            expect(parser.parse(JSON.stringify(obj))).toEqual(obj);
        });
    });

    describe('parsing boolean', function () {
        it('value is true', function () {
            var obj = {'a': true};
            expect(parser.parse(JSON.stringify(obj))).toEqual(obj);
        });
        it('value is false', function () {
            var obj = {'a': false};
            expect(parser.parse(JSON.stringify(obj))).toEqual(obj);
        });
    });

    describe('parsing null', function () {
        it('value is null', function () {
            var obj = {'a': null};
            expect(parser.parse(JSON.stringify(obj))).toEqual(obj);
        });
    });

    describe('parsing mixed types - acceptance tests', function () {
        it('long object with multiple value types', function () {
            var obj = {
                'a': null,
                'b': 123,
                'c': 12.5,
                'd': -5,
                'e': true,
                'f': false,
                'g': '!@#$%^&*()_+/;><?. eran amar '
            };
            expect(parser.parse(JSON.stringify(obj))).toEqual(obj);
        });
        it('long object with multiple value types', function () {
            var obj = { 'a': null};
            var str = '{"a":"first value", "a": -8.99, "a": null}';
            expect(parser.parse(str)).toEqual(obj);
        });
    });

    describe('invalid input string', function () {
        it('trivial object missing open bracket', function () {
            expect(function () {
                parser.parse('}');
            }).toThrow("missing token: {");
        });
        it('trivial object missing close bracket', function () {
            expect(function () {
                parser.parse('{');
            }).toThrow("missing token: }");
        });

        it('string value is not given with double quotes', function () {
            expect(function () {
                parser.parse('{"a": \'eran\'}');
            }).toThrow("unrecognized next token in: 'eran'");
        });

        it('first pair ok, next pair missing double quotes for string', function () {
            expect(function () {
                parser.parse('{"OkValue": true, "BadValue": \'eran\'}');
            }).toThrow("unrecognized next token in: 'eran'");
        });
    });
});