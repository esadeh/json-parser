/**
 * Created by Eyal_Sadeh on 7/20/14.
 */
xdescribe("Stack", function() {
    var stack;
    var capacity = 5;
    beforeEach(function () {
        stack = new Stack(capacity);
    });

    it("initially size should be 0", function () {
        expect(stack.getSize()).toEqual(0);
    });

    it("after push size should be 1", function () {
        stack.push(2);
        expect(stack.getSize()).toEqual(1);
    });

    it("after popping an element size should be 0", function () {
        stack.push(2);
        stack.pop();
        expect(stack.getSize()).toEqual(0);
    });

    it("should throw an exception when popping an empty stack", function () {
        expect(function () {
            stack.pop();
        }).toThrow('popping empty stack');
    });

    it("should throw an exception when to a full stack", function () {
        expect(function () {
          for(var i = 0; i <= capacity; i++)
            stack.push(i);
        }).toThrow('pushing to full stack');
    });

    it("pop returns pushed item (2)", function () {
        stack.push(2);
        expect(stack.pop()).toEqual(2);
    });

    it("pop returns pushed item (3)", function () {
        stack.push(3);
        expect(stack.pop()).toEqual(3);
    });

    it("pop returns last pushed item", function () {
        stack.push(3);
        stack.push(4);
        expect(stack.pop()).toEqual(4);
        expect(stack.pop()).toEqual(3);
    });

    it("should return items in reverse", function () {
        for(var i = 0; i < capacity; i++)
            stack.push(i);

        for(var i = capacity-1; i >= 0; i--)
            expect(stack.pop()).toEqual(i);
    });

});