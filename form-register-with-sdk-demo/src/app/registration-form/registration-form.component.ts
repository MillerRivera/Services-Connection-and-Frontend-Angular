import { Component } from '@angular/core';
import { ApisdkModule } from '../apisdk/apisdk.module';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  formData = {
    clientData:{
      name: '',
      email: '',
      phone: '',
    },
    token: '',
  };

  error: any;

  constructor(private apiSdKModule: ApisdkModule) {}

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    this.apiSdKModule.getToken().subscribe(
      (response) => {
        console.log('Token obtained:', response);
        this.formData.token = response.token;
      },
      (error) => {
        console.error('Error obtaining token:', error);
      }
    );
  }

  onSubmit() {
    this.apiSdKModule.register(this.formData).subscribe(
      (response) => {
        console.log('Registration and Authentication successful', response);
        if(response.success){
          alert("se registro correctamente :D");
        }
      },
      (error) => {
        alert("Se debe llenar todos los campos con el formato correcto");
        console.error('Registration and Authentication failed', error);
      }
    );
  }

}
