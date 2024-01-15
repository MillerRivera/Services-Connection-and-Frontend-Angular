import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { AuthService } from './auth.service';
import { RegistrationService } from './registration.service';
import { Observable } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService, RegistrationService],
})
export class ApisdkModule {
  constructor(private authService: AuthService, private registrationService: RegistrationService) {}

  getToken(): Observable<any> {
    return this.authService.getToken();
  }

  register(formatData:any):  Observable<any> {
    return this.registrationService.register(formatData);
  }
}
