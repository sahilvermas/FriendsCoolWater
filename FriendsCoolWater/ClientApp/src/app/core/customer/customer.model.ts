export interface Customer {
  id?: number;
  firmName: string;
  customerName: string;
  mobileNumber: string;
  address: string;
  description: string;
  unitPerDay: number;
  unitPrice: number;
  active: boolean;
  createdOn: Date;
  createdBy: string;
  modfiedOn?: Date;
  modifiedBy: string;
}

export interface CustomerVM extends Customer {
  totalPerDay: number;
}
