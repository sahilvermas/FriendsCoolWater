import { Injectable } from '@angular/core';
import { ApiUrl } from '../helpers/apiUrl';
import { Observable } from 'rxjs';
import { Collection } from './collection.model';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Utility } from '../helpers/utility';
import { CommonService } from '../shared/common.service';

@Injectable()
export class CollectionService {
  apiUrl: ApiUrl;

  private collection$: Observable<Collection[]>;

  constructor(
    private http: HttpClient,
    private util: Utility,
    private commonService: CommonService) {
    this.apiUrl = new ApiUrl();
  }

  getCollection(startDate: Date, endDate: Date): Observable<Collection[]> {
    const startDateStr = this.util.getDateFromDateTime(startDate);
    const endDateStr = this.util.getDateFromDateTime(endDate);
    const dateRange = `${startDateStr}/${endDateStr}`;
    if (!this.collection$) {
      // shareReplay will get the data from the browser cache if any
      this.collection$ = this.http.get<Collection[]>(this.apiUrl.getCollectionUrl + dateRange).pipe(shareReplay());
    }
    return this.collection$;
  }

  updateCollection(collectionId: number, collection: Collection): Observable<Collection> {
    return this.http.put<Collection>(this.apiUrl.updateCollectionUrl + collectionId, collection);
  }

  clearCache() {
    this.commonService.clearAllCache();
  }
}
