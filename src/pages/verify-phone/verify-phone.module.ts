import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyPhonePage } from './verify-phone';

@NgModule({
  declarations: [
    VerifyPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyPhonePage),
  ],
})
export class VerifyPhonePageModule {}
