export class ApiUrl {
  private baseUrl = 'https://localhost:44302/api/';
  public loginUrl = `${this.baseUrl}account/login`;
  public registerUrl = `${this.baseUrl}account/register`;

  public getTeamsUrl = `${this.baseUrl}team/getTeams`;
  public getEmployeesInTeamsUrl = `${this.baseUrl}team/GetEmployeesInTeams`;
  public getTeamByIdUrl = `${this.baseUrl}team/getTeam/`;
  public addTeamUrl = `${this.baseUrl}team/addTeam/`;
  public updateTeamUrl = `${this.baseUrl}team/updateTeam/`;
  public deleteTeamUrl = `${this.baseUrl}team/deleteTeam/`;

  public getCustomersUrl = `${this.baseUrl}customer/getCustomers`;
  public getCustomerByIdUrl = `${this.baseUrl}customer/getCustomer/`;
  public addCustomerUrl = `${this.baseUrl}customer/addCustomer/`;
  public updateCustomerUrl = `${this.baseUrl}customer/updateCustomer/`;
  public deleteCustomerUrl = `${this.baseUrl}customer/deleteCustomer/`;

  public getCollectionUrl = `${this.baseUrl}collection/GetCollection/`;
  public addCollectionUrl = `${this.baseUrl}collection/saveCollection`;
  public updateCollectionUrl = `${this.baseUrl}collection/updateCollection`;
  public deleteCollectionUrl = `${this.baseUrl}collection/deleteCollection`;
}
