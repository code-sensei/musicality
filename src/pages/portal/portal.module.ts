import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Portal } from './portal';

@NgModule({
  declarations: [
    Portal,
  ],
  imports: [
    IonicPageModule.forChild(Portal),
  ],
  exports: [
    Portal
  ]
})
export class PortalModule {}
