function validatePassword(password: string) {
    const validLength = password.length >= 8;
    const containsLetter = /[a-z]/g.test(password);
    const containsNumber = /[0-9]/g.test(password);

    return validLength && containsLetter && containsNumber;
}

export default validatePassword;