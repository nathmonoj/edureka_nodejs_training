import { expect } from "chai";
import { add } from "../src/utils/calculator.js";

describe("Calculator Util Test", () => {

    it("should add 2 number and provide result", (done) => {
        expect(add(2, 6)).to.be.eq(8)
        done()
    })

    it("should return null if a is null", (done) => {
        expect(add(null, 6)).to.be.eq(null)
        done()
    })

    it("should return null if b is null", (done) => {
        expect(add(2, null)).to.be.eq(null)
        done()
    })

})