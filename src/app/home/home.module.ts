import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';

import { KeysPipe } from './keys.pipe';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    HomeRoutingModule
  ],
  declarations: [
    KeysPipe,
    HomeComponent
  ]
})
export class HomeModule { }
