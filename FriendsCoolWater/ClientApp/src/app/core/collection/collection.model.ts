export interface Collection {
  id?: number;
  dateTime: Date;
  calculatedAmount: number;
  collectionAmount: number;
  comments: string;
  customerId: number;
  createdOn: Date;
  createdBy: string;
  modifiedOn?: Date;
  modifiedBy: string;
}
