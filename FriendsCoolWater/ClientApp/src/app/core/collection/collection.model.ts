export interface Collection {
  id?: number;
  customerId: number;
  dateTime: Date;
  collectionAmount: number;
  comments: string;
  createdOn: Date;
  createdBy: string;
  modifiedOn?: Date;
  modifiedBy: string;
}
