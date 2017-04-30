import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Copyright } from './copyright';

@NgModule({
  declarations: [
    Copyright,
  ],
  imports: [
    IonicPageModule.forChild(Copyright),
  ],
  exports: [
    Copyright
  ]
})
export class CopyrightModule {}
