export interface LoginCredentials {
  username: string;
  password: string;
}

export class LoginCredentialsImpl implements LoginCredentials{
    username: string;
    password: string;
    constructor(){
        this.username='';
        this.password='';
    }
}