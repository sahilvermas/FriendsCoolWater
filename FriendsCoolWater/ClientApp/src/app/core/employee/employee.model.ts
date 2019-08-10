export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    active: boolean;
    teamId: number;
}

export interface EmployeeVM extends Employee {
    teamName: string;
}
