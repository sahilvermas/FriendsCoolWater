import { Injectable } from '@angular/core';
import { TeamService } from '../team/team.service';
import { CustomerService } from '../customer/customer.service';
import { CollectionService } from '../collection/collection.service';

@Injectable()
export class CommonService {

  constructor(
    //  private teamService: TeamService,
    //  private customerService: CustomerService,
    //  private collectionService: CollectionService
  ) { }

  clearAllCache() {
    //this.teamService.clearCache();
    //this.customerService.clearCache();
    //this.collectionService.clearCache();
  }
}
