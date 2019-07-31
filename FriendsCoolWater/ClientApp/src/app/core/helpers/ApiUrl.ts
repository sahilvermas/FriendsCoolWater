export class ApiUrl {
    private baseUrl: string = 'https://localhost:44302/api/';
    public loginUrl: string = `${this.baseUrl}account/login`;
    public registerUrl: string = `${this.baseUrl}account/register`;

    public getTeamsUrl: string = `${this.baseUrl}team/getTeams`;
    public getTeamByIdUrl: string = `${this.baseUrl}team/getTeam/`;
    public addTeamUrl: string = `${this.baseUrl}team/addTeam/`;
    public updateTeamUrl: string = `${this.baseUrl}team/updateTeam/`;
    public deleteTeamUrl: string = `${this.baseUrl}team/deleteTeam/`;
}