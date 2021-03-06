import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../helpers/apiUrl';
import { Observable } from 'rxjs';
import { Team, EmployeesInTeams } from './team.Model';
import { shareReplay, flatMap, first } from 'rxjs/operators';
import { CommonService } from '../shared/common.service';

@Injectable()
export class TeamService {
  apiUrl: ApiUrl;

  private teams$: Observable<Team[]>;
  private employeesInTeams$: Observable<EmployeesInTeams[]>;

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = new ApiUrl();
  }

  getTeams(): Observable<Team[]> {
    if (!this.teams$) {
      // shareReplay will get the data from the browser cache if any
      this.teams$ = this.http.get<Team[]>(this.apiUrl.getTeamsUrl).pipe(shareReplay());
    }

    return this.teams$;
  }

  getTeamById(teamId: number): Observable<Team> {
    // flatMap is use to search the record from the list with lambda expr.
    return this.getTeams()
      .pipe(flatMap(result => result), first(team => team.id === teamId));
  }

  getEmployeesInTeams(): Observable<EmployeesInTeams[]> {
    if (!this.employeesInTeams$) {
      this.employeesInTeams$ = this.http.get<EmployeesInTeams[]>(this.apiUrl.getEmployeesInTeamsUrl).pipe(shareReplay());
    }
    return this.employeesInTeams$;
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl.addTeamUrl, team);
  }

  updateTeam(teamId: number, team: Team): Observable<Team> {
    return this.http.put<Team>(this.apiUrl.updateTeamUrl + teamId, team);
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete(this.apiUrl.deleteTeamUrl + teamId);
  }

  // Clear cache
  clearCache() {
    this.commonService.clearAllCache();
  }

}
