var dice = require("../lib/dice");
var expect = require("chai").expect;

describe("Dice Roller", function () {
    describe("Get Random Integer", function () {
        it("Takes two numbers and returns a random integer between or equal to one of them", function () {
            var value = dice.getRandomInt(1, 2);
            expect(value).to.be.at.least(1);
            expect(value).to.be.at.most(2);
        });
    });
    describe("Parse Int String", function () {
        it("Takes a number and returns the integer, or 1", function () {
            var value = dice.parseValue("1");
            expect(value).to.equal(1)
        });
    });
    describe("Parse Int Null", function () {
        it("Takes a number and returns the integer, or 1", function () {
            var value = dice.parseValue(null);
            expect(value).to.equal(1)
        });
    });
    describe("Roll with a prefix", function () {
        it("Should be between 1 and 6", function () {
            var value = dice.roll('1d6');
            expect(value.total).to.be.at.least(1);
            expect(value.total).to.be.at.most(6);
        });
    });
    describe("Roll with a larger prefix", function () {
        it("Should be between 3 and 12", function () {
            var value = dice.roll('3d4');
            expect(value.total).to.be.at.least(3);
            expect(value.total).to.be.at.most(12);
        });
    });
    describe("Roll without a prefix", function () {
        it("Should be between 1 and 6", function () {
            var value = dice.roll('d6');
            expect(value.total).to.be.at.least(1);
            expect(value.total).to.be.at.most(6);
        });
    });

    describe("Roll with a plus", function () {
        it("Should be between 3 and 8", function () {
            var value = dice.roll('d6+2');
            expect(value.total).to.be.at.least(3);
            expect(value.total).to.be.at.most(8);
        });
    });

    describe("Roll with a larger prefix and a plus", function () {
        it("Should be between 4 and 13", function () {
            var value = dice.roll('3d4+1');
            expect(value.total).to.be.at.least(4);
            expect(value.total).to.be.at.most(13);
        });
    });
    describe("Roll with a minus", function () {
        it("Should be between -1 and 4", function () {
            var value = dice.roll('d6-2');
            expect(value.total).to.be.at.least(-1);
            expect(value.total).to.be.at.most(4);
        });
        it("Should be between -1 and 4", function () {
            var value = dice.roll('1d6-2');
            expect(value.total).to.be.at.least(-1);
            expect(value.total).to.be.at.most(4);
        });
        it("Should be between 2 and 11", function () {
            var value = dice.roll('3d4-1');
            expect(value.total).to.be.least(2);
            expect(value.total).to.be.most(11);
        });
        it("Should be between -5 and 5", function () {
            var value = dice.roll('1d6-1d6');
            expect(value.total).to.be.at.least(-5);
            expect(value.total).to.be.at.most(5);
        });
    });
    describe("Roll with two dice, no prefix", function () {
        it("Should be between 2 and 10", function () {
            var value = dice.roll('d6+d4');
            expect(value.total).to.be.at.least(2);
            expect(value.total).to.be.at.most(10);
        });
    });
    describe("Roll with two dice, one prefix", function () {
        it("Should be between 2 and 10", function () {
            var value = dice.roll('1d6+d4');
            expect(value.total).to.be.at.least(2);
            expect(value.total).to.be.at.most(10);
        });
    });
    describe("Roll with two dice, one prefix", function () {
        it("Should be between 2 and 10", function () {
            var value = dice.roll('d6+1d4');
            expect(value.total).to.be.at.least(2);
            expect(value.total).to.be.at.most(10);
        });
    });
    describe("Roll with two dice, one prefix", function () {
        it("Should be between 2 and 10", function () {
            var value = dice.roll('d6+1d4');
            expect(value.total).to.be.at.least(2);
            expect(value.total).to.be.at.most(10);
        });
    });
    describe("Roll with two dice, both prefixed", function () {
        it("Should be between 2 and 10", function () {
            var value = dice.roll('1d6+1d4');
            expect(value.total).to.be.at.least(2);
            expect(value.total).to.be.at.most(10);
        });
    });
    describe("Roll with two dice, both prefixed with add", function () {
        it("Should be between 5 and 13", function () {
            var value = dice.roll('1d6+1d4+3');
            expect(value.total).to.be.at.least(5);
            expect(value.total).to.be.at.most(13);
        });
    });
    describe("Roll three dice", function () {
        it("Should be between 3 and 13", function () {
            var value = dice.roll('1d6+1d4+1d3');
            expect(value.total).to.be.at.least(3);
            expect(value.total).to.be.at.most(13);
        });
    });
    describe("Spaces", function () {
        it("Should be between 1 and 6", function () {
            var value = dice.roll('1 d 6');
            expect(value.total).to.be.at.least(1);
            expect(value.total).to.be.at.most(6);
        });
        it("Should be between 1 and 6", function () {
            var value = dice.roll('d 6');
            expect(value.total).to.be.at.least(1);
            expect(value.total).to.be.at.most(6);
        });
        it("Should be between 3 and 13", function () {
            var value = dice.roll('1 d 6 + 1 d 4 + 1 d 3');
            expect(value.total).to.be.at.least(3);
            expect(value.total).to.be.at.most(13);
        });
        it("Should be between 3 and 13", function () {
            var value = dice.roll('1 d 6 + 1 d 4 + 1 d 3');
            expect(value.total).to.be.at.least(3);
            expect(value.total).to.be.at.most(13);
        });
        it("Should be between 3 and 13", function () {
            var value = dice.roll("1d20+1d20+2");
            expect(value.total).to.be.at.least(4);
            expect(value.total).to.be.at.most(42);
        });
        it("human input", function(){
            var value = dice.roll("Roll 6d6+6 for damage");
            expect(value.total).to.be.at.least(12);
            expect(value.total).to.be.at.most(42);
        });
        it("zero sided dice", function(){
            var value = dice.roll("Roll 6d0");
            expect(value.total).to.equal(0);
        })

    });
    describe("Parsing", function () {
        it("Parses without a prefix", function () {
            var value = dice.isADieRoll("d6");
            expect(value).to.equal(true);
        });
        it("Parses with a prefix", function () {
            var value = dice.isADieRoll("1d6");
            expect(value).to.equal(true);
        });
        it("Parses with a prefix", function () {
            var value = dice.isADieRoll("1d6");
            expect(value).to.equal(true);
        });
        it("Parsing should fail on non die rolls", function () {
            var value = dice.isADieRoll("1asdf6");
            expect(value).to.equal(false);
        });
    });
    describe("Object", function () {
        it("Returns the right kind of object", function () {
            var value = dice.roll("Roll 1d6");
            expect(value).to.have.property('log');
            expect(value).to.have.property('total');
        });
    });
});