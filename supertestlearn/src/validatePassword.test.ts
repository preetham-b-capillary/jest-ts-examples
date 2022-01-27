import validatePassword from './validatePassword';

describe("validate password function test", () => {
    test("return false given an empty string", () => {
        expect(validatePassword("")).toBe(false);
    });

    test("return true given a password 8 characters or longer, a letter, and a number", () => {
        expect(validatePassword("1234567a")).toBe(true);
    });

    test("return false given a password that is 8 characters long, but no letters", () => {
        expect(validatePassword("12345678")).toBe(false);
    });

    test("return false given a password that is 8 characters long, but no numbers", () => {
        expect(validatePassword("asdfghjkl")).toBe(false);
    });

    test("returns false given a password that is 8 uppercase characters", () => {
        expect(validatePassword("ABCDEFGH")).toBe(false);
    });

    test("returns false given a password that is 8 uppercase characters", () => {
        expect(validatePassword("a1")).toBe(false);
    });
});