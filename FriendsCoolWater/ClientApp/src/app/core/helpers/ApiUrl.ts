export class ApiUrl {
    private baseUrl: string = 'https://localhost:44302/api/';

    public loginUrl: string = `${this.baseUrl}account/login`;

    public registerUrl: string = `${this.baseUrl}account/register`;
}