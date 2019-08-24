export interface Team {
  id?: number;
  name: string;
  description: string;
  active: boolean;
  createdOn: Date;
  createdBy: string;
  modifiedOn?: Date;
  modifiedBy: string;
}

export interface EmployeesInTeams {
  id: number;
  teamId: number,
  employeeId: string,
  teamName: string,
  employeeName: string  
}
