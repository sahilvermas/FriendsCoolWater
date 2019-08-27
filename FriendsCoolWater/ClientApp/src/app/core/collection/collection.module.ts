import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { FilterComponent } from './filter/filter.component';
import { CommonService } from '../shared/common.service';
import { CollectionService } from './collection.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [CollectionListComponent, FilterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CollectionRoutingModule,
    BsDatepickerModule.forRoot()

  ],
  providers: [CollectionService, CommonService]
})
export class CollectionModule { }
