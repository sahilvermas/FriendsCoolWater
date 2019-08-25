import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [CollectionListComponent, FilterComponent],
  imports: [
    FormsModule,
    CommonModule,
    CollectionRoutingModule
  ]
})
export class CollectionModule { }
