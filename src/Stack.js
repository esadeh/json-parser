/**
 * Created by Eyal_Sadeh on 7/20/14.
 */
"use strict";
function Stack(cap) {
    this.size = 0;
    this.capacity = cap;
    this.items = [];
}

Stack.prototype.getSize = function () {
    return this.size;
};

Stack.prototype.push = function (num) {
    if(this.size == this.capacity)
        throw new Error('pushing to full stack');
    this.items[this.size++] = num;
};

Stack.prototype.pop = function () {
    if(this.size == 0)
        throw new Error('popping empty stack');
    return this.items[--this.size];
};
