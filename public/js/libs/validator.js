export default class Validator {
    static validateNickname(string) {
        return this.validateLogin(string);
    }

    static validateLogin(string) {
        const reg = /^[a-zA-Z][a-zA-Z0-9-_.]{3,20}$/;
        return reg.test(string);
    }

    static validateEmail(string) {
        const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/
        return reg.test(string);
    }

    static validateName(string) {
        return this.validateSurname(string);
    }

    static validateSurname(string) {
        const reg = /[а-яёА-ЯЁa-zA-z]{2,}$/;
        return reg.test(string);
    }

    static validatePassword(string) {
        const reg = /[^а-яёА-ЯЁ]{6,}$/;
        return reg.test(string);
    }
}
