export class LoginModel {
    constructor(public username: string,
        public password: string
    ) {
        this.username = username;
        this.password = password;
    }
}

export class RegisterModel {
    constructor(public email: string,
        public username: string,
        public password: string,
        public confirmPassword: string
    ) {

        this.email = email;
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}